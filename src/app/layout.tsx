import type { Metadata } from "next"
import { Outfit, Syne, Cormorant_Garamond, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"
import "./globals.css"

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
})

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
})

const cormorant = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "oberstufe.site",
  description: "Eine Sammlung von Projekten",
}

const hasValidClerkKey =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_") &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("YOUR_KEY")

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const content = (
    <html lang="de">
      <body className={`${outfit.variable} ${syne.variable} ${cormorant.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )

  return hasValidClerkKey ? <ClerkProvider>{content}</ClerkProvider> : content
}
