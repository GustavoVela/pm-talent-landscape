import type { Metadata } from 'next'
import Script from 'next/script'
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
  title: 'El Product Management en la Era de la IA | Datos reales. Menos hype. Habilidades. Futuro.',
  description: 'Análisis empírico de 2,836 ofertas de trabajo de roles de Product Management en EE. UU., Brasil, México, Colombia y Chile. Descubre qué dominios, competencias y habilidades específicas exige el mercado en 2026 — incluyendo IA, datos, técnico, negocio y UX. Datos reales extraídos de LinkedIn.',
  keywords: [
    // Términos directos — roles
    'Product Manager',
    'Product Management',
    'Product Owner',
    'Head of Product',
    'vacantes Product Manager',
    'ofertas de trabajo Product Management 2026',
    // Competencias y habilidades
    'habilidades Product Manager 2026',
    'competencias Product Management',
    'skills product manager latinoamerica',
    'SQL product manager',
    'inteligencia artificial product management',
    'IA product manager',
    'APIs product manager',
    // Mercados y geografía
    'mercado laboral Product Management Latinoamérica',
    'Product Manager México',
    'Product Manager Colombia',
    'Product Manager Brasil',
    'Product Manager Chile',
    'Product Manager Perú',
    'Product Manager Estados Unidos',
    'LATAM vs USA product management',
    // Análisis y tendencias
    'tendencias product management 2026',
    'talent landscape product management',
    'product management data analysis',
    'product manager salary 2026',
    'premium salarial product manager IA',
    // Inglés — búsquedas bilingües en LATAM
    'product manager jobs latin america',
    'product manager skills 2026',
    'AI product manager skills',
  ],
  authors: [{ name: 'Gustavo Vela Zúñiga', url: 'https://www.linkedin.com/in/gustavo-vela/' }],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'article',
    url: BASE_URL,
    title: 'El Product Management en la Era de la IA — Datos reales. Menos hype. Habilidades. Futuro.',
    description: 'Análisis empírico de 2,836 vacantes en EE. UU. y Latinoamérica. Dominios, competencias, brechas de IA, perfiles Unicornio y diferencial salarial. Datos reales de LinkedIn, 2026.',
    siteName: 'Product Management Talent Landscape',
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
    title: 'El Product Management en la Era de la IA — Datos reales, menos hype',
    description: 'Análisis empírico de 2,836 vacantes en EE. UU. y LATAM. Competencias, brechas de IA y diferencial salarial real.',
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P7KP48X6NK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P7KP48X6NK');
          `}
        </Script>
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
