import type { Metadata } from 'next'
import { Nunito_Sans, Manrope } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const BASE_URL = 'https://pm-talent-landscape.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'PM Talent Landscape | Análisis del Mercado de Product Management en Las Américas',
  description: 'Analizamos 2,836 ofertas de trabajo de Product Manager en EE. UU., Brasil, México, Colombia y Chile para descubrir qué habilidades de negocio, datos, SQL, inteligencia artificial y UX solicita el mercado en 2026. Datos reales extraídos de LinkedIn.',
  keywords: [
    // Términos de búsqueda directa — roles
    'Product Manager',
    'Product Management',
    'Product Owner',
    'vacantes Product Manager',
    'ofertas de trabajo Product Management',
    // Skills y competencias
    'habilidades Product Manager 2026',
    'competencias Product Manager',
    'skills product manager latinoamerica',
    'SQL product manager',
    'inteligencia artificial product manager',
    'IA product management',
    // Mercados y geografía
    'mercado laboral Product Management Latinoamérica',
    'Product Manager México',
    'Product Manager Colombia',
    'Product Manager Brasil',
    'Product Manager Chile',
    'Product Manager Estados Unidos',
    'LATAM vs USA product management',
    // Análisis y tendencias
    'tendencias product management 2026',
    'análisis mercado product management',
    'talent landscape product management',
    'product management data analysis',
    // Inglés — por búsquedas bilingües en LATAM
    'product manager jobs latin america',
    'product manager skills 2026',
  ],
  authors: [{ name: 'Gustavo Vela Zúñiga', url: 'https://www.linkedin.com/in/gustavo-vela/' }],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'article',
    url: BASE_URL,
    title: 'PM Talent Landscape — ¿Qué exige el mercado de un Product Manager en 2026?',
    description: 'Análisis de 2,836 vacantes en EE. UU. y Latinoamérica. Competencias, brechas de IA, perfiles Unicornio y más. Datos reales de LinkedIn, 2026.',
    siteName: 'PM Talent Landscape',
    locale: 'es_ES',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'PM Talent Landscape — Análisis de vacantes de Product Management en Las Américas 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PM Talent Landscape — ¿Qué exige el mercado de un Product Manager en 2026?',
    description: 'Análisis de 2,836 vacantes en EE. UU. y Latinoamérica. Competencias, brechas de IA, perfiles Unicornio y más.',
    images: ['/images/og.png'],
    creator: '@gustavovela',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${nunitoSans.variable} ${manrope.variable} min-h-screen bg-background font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
