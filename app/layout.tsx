import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Aung Myo Paing",
  description: "Aung Myo Paing's personal website",
  keywords: [
    "Aung Myo Paing",
    "aungmyopaing",
    "aungmyopaing.me",
    "portfolio",
    "mobile developer",
    "flutter developer",
    "developer",
    "software engineer",
    "web developer",
    "programmer",
  ],
  openGraph: {
    title: "Aung Myo Paing",
    description: "Senior Mobile Developer | Flutter Developer | Software Engineer",
    url: "https://aungmyopaing.me",
    siteName: "Aung Myo Paing",
    images: [
      {
        url: "https://aungmyopaing.me/profile.png?height=200&width=200",
        width: 1200,
        height: 630,
        alt: "Aung Myo Paing Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aung Myo Paing",
    description: "Senior Mobile Developer | Flutter Developer | Software Engineer",
    images: ["https://aungmyopaing.me/profile.png?height=200&width=200"],
    creator: "@yourtwitterhandle",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
