import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React
import { ThemeProvider } from "./providers/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Loginware - Industrial IoT Solutions",
  description:
    "Advanced Industry 4.0 solutions including EAGLE edge computing device and SPARROW ERP platform for smart manufacturing",
  keywords: "IIOT, Industry 4.0, EAGLE, SPARROW, Manufacturing Solutions, ERP Platform",
  openGraph: {
    title: "Loginware - Industrial IoT Solutions",
    description: "Advanced Industry 4.0 solutions for smart manufacturing",
    images: ["images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loginware - Industrial IoT Solutions",
    description: "Advanced Industry 4.0 solutions for smart manufacturing",
    images: ["images/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

