'use client'

import { useFormFields } from '@payloadcms/ui'
import type { UIFieldClientComponent } from 'payload'
import React, { useMemo } from 'react'

type ItemRow = {
  title?: string
  grindLabel?: string
  unitPrice?: number
  quantity?: number
}

const deliveryLabels: Record<string, string> = {
  courier: 'Курьер',
  pickup: 'Самовывоз',
  post: 'Почта',
}

const paymentLabels: Record<string, string> = {
  online: 'Онлайн',
  on_site: 'На месте',
}

const statusLabels: Record<string, string> = {
  new: 'Новый',
  processing: 'В обработке',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
}

/**
 * Только для чтения: агрегирует ключевые поля заказа для операторов в одном блоке.
 */
export const OrderSummaryUIField: UIFieldClientComponent = () => {
  const orderNumber = useFormFields(([fields]) => fields?.orderNumber?.value as string | undefined)
  const status = useFormFields(([fields]) => fields?.status?.value as string | undefined)
  const paid = useFormFields(([fields]) => fields?.paid?.value as boolean | undefined)
  const paymentMethod = useFormFields(([fields]) => fields?.paymentMethod?.value as string | undefined)
  const deliveryType = useFormFields(([fields]) => fields?.deliveryType?.value as string | undefined)
  const customerName = useFormFields(([fields]) => fields?.customerName?.value as string | undefined)
  const customerPhone = useFormFields(([fields]) => fields?.customerPhone?.value as string | undefined)
  const customerEmail = useFormFields(([fields]) => fields?.customerEmail?.value as string | undefined)
  const address = useFormFields(([fields]) => fields?.address?.value as string | undefined)
  const comment = useFormFields(([fields]) => fields?.comment?.value as string | undefined)
  const total = useFormFields(([fields]) => fields?.total?.value as number | undefined)
  const itemsValue = useFormFields(([fields]) => fields?.items?.value as unknown)

  const items = useMemo((): ItemRow[] => {
    if (!Array.isArray(itemsValue)) return []
    return itemsValue.map((row: Record<string, unknown>) => ({
      title: typeof row.title === 'string' ? row.title : undefined,
      grindLabel: typeof row.grindLabel === 'string' ? row.grindLabel : undefined,
      unitPrice: typeof row.unitPrice === 'number' ? row.unitPrice : undefined,
      quantity: typeof row.quantity === 'number' ? row.quantity : undefined,
    }))
  }, [itemsValue])

  const lineSum = items.reduce((acc, row) => acc + (row.unitPrice ?? 0) * (row.quantity ?? 0), 0)

  const boxStyle = React.useMemo(
    () =>
      ({
        marginBottom: '1.5rem',
        padding: '1rem 1.25rem',
        borderRadius: 'var(--style-radius-s, 4px)',
        border: '1px solid var(--theme-elevation-150)',
        background: 'var(--theme-elevation-50)',
      }) as React.CSSProperties,
    [],
  )

  const headingStyle: React.CSSProperties = {
    margin: '0 0 0.75rem',
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--theme-elevation-1000)',
  }

  const muted: React.CSSProperties = { color: 'var(--theme-elevation-600)', fontSize: '12px' }

  return (
    <div className="payload-custom order-summary-ui" style={boxStyle}>
      <h3 style={headingStyle}>Сводка заказа</h3>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div>
          <p style={muted}>Номер</p>
          <p style={{ margin: '0.25rem 0 0', fontWeight: 600 }}>{orderNumber || '—'}</p>
          <p style={{ ...muted, marginTop: '0.5rem' }}>Статус / оплата</p>
          <p style={{ margin: '0.25rem 0 0' }}>
            {status ? statusLabels[status] ?? status : '—'}
            {' · '}
            {paid ? 'Оплачено' : 'Не оплачено'}
          </p>
          {paymentMethod ? (
            <p style={{ margin: '0.35rem 0 0', fontSize: '13px' }}>
              Способ оплаты: {paymentLabels[paymentMethod] ?? paymentMethod}
            </p>
          ) : null}
          {deliveryType ? (
            <p style={{ margin: '0.25rem 0 0', fontSize: '13px' }}>
              Доставка: {deliveryLabels[deliveryType] ?? deliveryType}
            </p>
          ) : null}
        </div>
        <div>
          <p style={muted}>Клиент</p>
          <p style={{ margin: '0.25rem 0 0', fontSize: '14px' }}>{customerName || '—'}</p>
          <p style={{ margin: '0.35rem 0 0', fontSize: '13px' }}>{customerPhone || '—'}</p>
          {customerEmail ? <p style={{ margin: '0.25rem 0 0', fontSize: '13px' }}>{customerEmail}</p> : null}
        </div>
        <div>
          <p style={muted}>Адрес / комментарий</p>
          <p style={{ margin: '0.25rem 0 0', fontSize: '13px', whiteSpace: 'pre-wrap' }}>{address || '—'}</p>
          {comment ? (
            <p style={{ margin: '0.5rem 0 0', fontSize: '13px', whiteSpace: 'pre-wrap' }}>{comment}</p>
          ) : null}
        </div>
      </div>

      <div style={{ marginTop: '1rem', borderTop: '1px solid var(--theme-elevation-150)', paddingTop: '0.75rem' }}>
        <p style={muted}>Позиции ({items.length})</p>
        <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem', fontSize: '13px' }}>
          {items.length === 0 ? (
            <li style={{ color: 'var(--theme-elevation-600)' }}>Нет строк (заполните блок «Позиции» ниже)</li>
          ) : (
            items.map((row, i) => (
              <li key={`${row.title}-${i}`} style={{ marginBottom: '0.35rem' }}>
                {row.title ?? 'Без названия'}
                {row.grindLabel ? ` · ${row.grindLabel}` : ''}
                {' — '}
                {row.quantity ?? 0} × {row.unitPrice ?? 0} ₽
              </li>
            ))
          )}
        </ul>
        <p style={{ margin: '0.75rem 0 0', fontSize: '14px', fontWeight: 600 }}>
          Сумма по строкам: {lineSum} ₽ · Итого в заказе: {total ?? '—'} ₽
        </p>
      </div>
    </div>
  )
}
