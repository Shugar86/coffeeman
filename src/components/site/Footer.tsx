import Link from 'next/link'

type Props = {
  companyName?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
}

export function Footer({ companyName, phone, email, address }: Props) {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50 py-10 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2">
        <div>
          <p className="font-semibold">{companyName || 'CoffeeMan'}</p>
          {address ? <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{address}</p> : null}
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {phone ? <p>Тел.: {phone}</p> : null}
          {email ? (
            <p className="mt-1">
              Email:{' '}
              <Link href={`mailto:${email}`} className="underline">
                {email}
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
