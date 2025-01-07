//@/app/layout.tsx

import { ClerkProvider } from '@clerk/nextjs'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ProfileCompletionProvider } from '@/lib/contexts/ProfileCompletionContext'
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Relationship Matrix",
  description: "Interactive tests to explore relationships and self-reflection.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ProfileCompletionProvider>
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
            </ProfileCompletionProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}