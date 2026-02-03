import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "AtlasSign - Assinatura Digital Segura",
  description: "Plataforma de assinatura digital com validade jurídica. Assine documentos online de forma segura, rápida e em conformidade com a legislação brasileira.",
  keywords: ["assinatura digital", "assinatura eletrônica", "ICP-Brasil", "PAdES", "documentos online", "LGPD"],
  authors: [{ name: "Atlas" }],
  openGraph: {
    title: "AtlasSign - Assinatura Digital Segura",
    description: "Assine documentos online de forma segura e juridicamente válida.",
    type: "website",
    locale: "pt_BR",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
