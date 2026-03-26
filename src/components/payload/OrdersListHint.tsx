import type { BeforeListServerProps } from 'payload'

/**
 * Подсказка для операторов на экране списка заказов Payload.
 */
export default function OrdersListHint({ collectionSlug }: BeforeListServerProps) {
  if (collectionSlug !== 'orders') {
    return null
  }

  return (
    <div
      className="payload-custom orders-list-hint"
      style={{
        marginBottom: '1rem',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--style-radius-s, 4px)',
        border: '1px solid var(--theme-elevation-150)',
        background: 'var(--theme-elevation-50)',
        fontSize: '13px',
        lineHeight: 1.45,
        color: 'var(--theme-elevation-800)',
      }}
    >
      <strong>Заказы:</strong> фильтруйте по колонке «Статус» и «Оплачено». Сортировка по дате — через заголовок
      колонки «Created At». В карточке заказа сводка позиций и контактов — в блоке «Сводка заказа» сверху.
    </div>
  )
}
