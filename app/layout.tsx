import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vaxbrev.se – Omvaxningstjänst för Barbour & vaxjackor',
  description:
    'Sveriges bekvämlaste omvaxningstjänst för Barbour och vaxjackor. Skicka påsen, skicka jackan – få den tillbaka perfekt vaxad.',
  openGraph: {
    title: 'Vaxbrev.se – Omvaxningstjänst för Barbour & vaxjackor',
    description:
      'Sveriges bekvämlaste omvaxningstjänst för Barbour och vaxjackor.',
    url: 'https://vaxbrev.se',
    siteName: 'Vaxbrev.se',
    locale: 'sv_SE',
    type: 'website',
  },
  metadataBase: new URL('https://vaxbrev.se'),
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
