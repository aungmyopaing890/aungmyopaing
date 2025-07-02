import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aung Myo Paing',
  description: 'Aung Myo Paing\'s personal website',
  keywords: [
    'Aung Myo Paing',
    'aungmyopaing',
    'aungmyopaing.me',
    'portfolio',
    'mobile developer',
    'flutter developer',
    'developer',
    'software engineer',
    'web developer',
    'programmer',
  ],
  openGraph: {
    title: 'Aung Myo Paing',
    description: 'Senior Mobile Developer | Flutter Developer | Software Engineer',
    url: 'https://aungmyopaing.me',
    siteName: 'Aung Myo Paing',
    images: [
      {
        url: 'https://aungmyopaing.me/profile.png?height=200&width=200',
        width: 1200,
        height: 630,
        alt: 'Aung Myo Paing Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aung Myo Paing',
    description: 'Senior Mobile Developer | Flutter Developer | Software Engineer',
    images: ['https://aungmyopaing.me/profile.png?height=200&width=200'],
    creator: '@yourtwitterhandle', // Optional: replace with your Twitter username
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Open Graph */}
        <meta property="og:title" content="Aung Myo Paing" />
        <meta property="og:description" content="Senior Mobile Developer | Flutter Developer | Software Engineer" />
        <meta property="og:image" content="https://aungmyopaing.me/profile.png?height=200&width=200" />
        <meta property="og:url" content="https://aungmyopaing.me" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Aung Myo Paing" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aung Myo Paing" />
        <meta name="twitter:description" content="Senior Mobile Developer | Flutter Developer | Software Engineer" />
        <meta name="twitter:image" content="https://aungmyopaing.me/profile.png?height=200&width=200" />
        <meta name="twitter:creator" content="@yourtwitterhandle" /> {/* optional */}
      </head>
      <body>{children}</body>
    </html>
  )
}
