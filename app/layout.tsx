import type React from "react"
import { Poppins } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import { LoaderProvider } from "@/context/LoaderContext"
import { Loader } from "@/components/Loader"
import { CustomCursor } from "@/components/CustomCursor"

export const metadata: Metadata = {
  title: "Coffee - A Premium Coffee Experience",
  description: "Discover the finest handpicked coffee blends, crafted for the ultimate coffee lover's indulgence.",
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-poppins",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased">
        <LoaderProvider>
          <CustomCursor />
          <Loader />
          {children}
        </LoaderProvider>
      </body>
    </html>
  )
}
