'use server'

import { getPayloadClient } from '@/lib/payload'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const itemSchema = z.object({
  productId: z.number(),
  quantity: z.number().int().min(1),
  grindValue: z.string(),
  grindLabel: z.string(),
})

const formSchema = z.object({
  customerName: z.string().min(1),
  customerPhone: z.string().min(5),
  customerEmail: z.string().optional(),
  address: z.string().optional(),
  comment: z.string().optional(),
  deliveryType: z.enum(['courier', 'pickup', 'post']),
  paymentMethod: z.enum(['online', 'on_site']),
  items: z.array(itemSchema).min(1),
})

export type PlaceOrderInput = z.infer<typeof formSchema>

export type PlaceOrderResult =
  | { ok: true; orderNumber: string }
  | { ok: false; error: string }

async function sendManagerEmail(subject: string, text: string) {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.MANAGER_EMAIL

  if (!host || !to) {
    console.info('[order email skipped] SMTP_HOST or MANAGER_EMAIL not set')
    console.info(subject, text)
    return
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  })

  await transporter.sendMail({
    from: user || 'no-reply@coffeeman.local',
    to,
    subject,
    text,
  })
}

export async function placeOrder(raw: unknown): Promise<PlaceOrderResult> {
  const parsed = formSchema.safeParse(raw)
  if (!parsed.success) {
    return { ok: false, error: 'Проверьте поля формы' }
  }
  const rawEmail = parsed.data.customerEmail?.trim()
  let customerEmail: string | undefined
  if (rawEmail) {
    const em = z.string().email().safeParse(rawEmail)
    if (!em.success) {
      return { ok: false, error: 'Некорректный email' }
    }
    customerEmail = em.data
  }
  const data = { ...parsed.data, customerEmail }

  const payload = await getPayloadClient()

  const lineItems: {
    product: number | null
    title: string
    grindLabel: string
    unitPrice: number
    quantity: number
  }[] = []

  for (const line of data.items) {
    const doc = await payload.findByID({
      collection: 'products',
      id: line.productId,
      depth: 0,
    })
    if (!doc) {
      return { ok: false, error: `Товар #${line.productId} не найден` }
    }
    const packSep = line.grindValue.lastIndexOf('___')
    const baseGrind = packSep >= 0 ? line.grindValue.slice(0, packSep) : line.grindValue
    const gramsRaw = packSep >= 0 ? line.grindValue.slice(packSep + 3) : '150'
    const grams = gramsRaw === '500' ? 500 : 150
    const packMult = grams >= 500 ? 500 / 150 : 1
    const price = Math.round(Number(doc.price) * packMult * 100) / 100

    const grindOk =
      !doc.grindOptions?.length ||
      doc.grindOptions.some((g) => g.value === baseGrind) ||
      baseGrind === 'whole'
    if (!grindOk) {
      return { ok: false, error: 'Некорректный вариант помола' }
    }
    lineItems.push({
      product: line.productId,
      title: doc.title,
      grindLabel: line.grindLabel,
      unitPrice: price,
      quantity: line.quantity,
    })
  }

  const total = lineItems.reduce((s, l) => s + l.unitPrice * l.quantity, 0)

  const order = await payload.create({
    collection: 'orders',
    data: {
      status: 'new',
      paid: false,
      paymentMethod: data.paymentMethod,
      deliveryType: data.deliveryType,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail || undefined,
      address: data.address || undefined,
      comment: data.comment || undefined,
      items: lineItems,
      total,
    },
    overrideAccess: true,
  })

  const orderNumber = order.orderNumber || String(order.id)

  const emailBody = [
    `Новый заказ ${orderNumber}`,
    `Имя: ${data.customerName}`,
    `Тел: ${data.customerPhone}`,
    data.customerEmail ? `Email: ${data.customerEmail}` : '',
    `Доставка: ${data.deliveryType}`,
    `Оплата: ${data.paymentMethod}`,
    `Сумма: ${total} ₽`,
    '',
    ...lineItems.map(
      (l) => `- ${l.title} (${l.grindLabel}) x${l.quantity} @ ${l.unitPrice} = ${l.unitPrice * l.quantity}`,
    ),
  ]
    .filter(Boolean)
    .join('\n')

  try {
    await sendManagerEmail(`CoffeeMan заказ ${orderNumber}`, emailBody)
  } catch (e) {
    console.error('Email error', e)
  }

  return { ok: true, orderNumber }
}
