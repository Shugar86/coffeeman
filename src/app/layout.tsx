import type { Metadata } from 'next'
import { Great_Vibes, Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
})

const greatVibes = Great_Vibes({
  variable: '--font-great-vibes',
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CoffeeMan',
  description: 'Кофе и чай — CoffeeMan',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${playfair.variable} ${inter.variable} ${greatVibes.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
