import { getPayloadClient } from '@/lib/payload'
import { NextResponse } from 'next/server'

/**
 * Заглушка под CloudPayments / ЮKassa: передайте orderNumber и подпись в теле.
 * Реальную проверку подписи провайдера добавьте при интеграции.
 */
export async function POST(request: Request) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'PAYMENT_WEBHOOK_SECRET not configured' }, { status: 501 })
  }

  let body: { orderNumber?: string; paid?: boolean; signature?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  if (body.signature !== secret) {
    return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 401 })
  }

  if (!body.orderNumber) {
    return NextResponse.json({ ok: false, error: 'orderNumber required' }, { status: 400 })
  }

  const payload = await getPayloadClient()
  const found = await payload.find({
    collection: 'orders',
    where: { orderNumber: { equals: body.orderNumber } },
    limit: 1,
    depth: 0,
  })
  const order = found.docs[0]
  if (!order) {
    return NextResponse.json({ ok: false, error: 'Order not found' }, { status: 404 })
  }

  await payload.update({
    collection: 'orders',
    id: order.id,
    data: {
      paid: body.paid !== false,
      status: body.paid !== false ? 'processing' : order.status,
    },
    overrideAccess: true,
  })

  return NextResponse.json({ ok: true })
}
