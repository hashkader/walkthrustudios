import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
  display: 'swap',
})

const BASE_URL = 'https://www.walkthrustudios.co.za'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'WalkThru Studios | 360° Virtual Property Tours Johannesburg',
    template: '%s | WalkThru Studios',
  },
  description:
    'Professional 360° virtual tours for real estate agents, private sellers and Airbnb hosts in Johannesburg and Gauteng. Step inside any property before you arrive.',
  keywords: [
    'virtual tours johannesburg',
    '360 virtual tour south africa',
    'real estate virtual tour gauteng',
    'airbnb virtual tour johannesburg',
    'property virtual tour randburg',
    '360 degree property tour',
    'virtual property showcase',
  ],
  authors: [{ name: 'WalkThru Studios', url: BASE_URL }],
  creator: 'WalkThru Studios',
  publisher: 'WalkThru Studios',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: BASE_URL,
    siteName: 'WalkThru Studios',
    title: 'WalkThru Studios | 360° Virtual Property Tours Johannesburg',
    description:
      'Professional 360° virtual tours for real estate agents, private sellers and Airbnb hosts in Johannesburg and Gauteng.',
    images: [
      {
        url: '/og-image.jpg', // create a 1200x630px branded image and place in /public
        width: 1200,
        height: 630,
        alt: 'WalkThru Studios — 360° Virtual Property Tours',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WalkThru Studios | 360° Virtual Property Tours',
    description:
      'Professional 360° virtual tours for real estate and Airbnb in Johannesburg.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: BASE_URL,
  },
}

// Local business structured data for Google
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'WalkThru Studios',
  description:
    'Professional 360° virtual tours for real estate agents, private sellers and Airbnb hosts in Johannesburg and Gauteng.',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/og-image.jpg`,
  telephone: '+27 84 786 4747', // ← replace with your number
  email: 'hello@walkthrustudios.co.za', // ← replace if different
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Randburg',
    addressRegion: 'Gauteng',
    postalCode: '2194',
    addressCountry: 'ZA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -26.0931,
    longitude: 27.9689,
  },
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'City', name: 'Randburg' },
    { '@type': 'City', name: 'Sandton' },
    { '@type': 'State', name: 'Gauteng' },
  ],
  priceRange: 'R899 - R2499',
  currenciesAccepted: 'ZAR',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  sameAs: [
    // add your social links here e.g.:
    // 'https://www.instagram.com/walkthrustudios',
    // 'https://www.facebook.com/walkthrustudios',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}