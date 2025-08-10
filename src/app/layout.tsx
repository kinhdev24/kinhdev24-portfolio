import type { Metadata } from "next"
import localFont from "next/font/local"
import "../styles/globals.css"

const segoeUI = localFont({
  src: [
    {
      path: "../assets/font/Segoe UI.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/font/Segoe UI Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/font/Segoe UI Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/font/Segoe UI Bold Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
})

export const metadata: Metadata = {
  title: "Window 10 | Kinhdev Portfolio",
  description: "Kinhdev Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${segoeUI.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
