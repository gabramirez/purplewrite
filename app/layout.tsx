import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "./context/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Purple Write - Humanize AI Text & Outsmart AI Detectors",
  description:
    "Purple Write converts your AI-generated content into fully humanized, undetectable writing—ensuring it passes every AI detection tool.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
      </AuthProvider>
    </html>
  )
}
