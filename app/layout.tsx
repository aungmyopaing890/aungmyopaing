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
  // generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
