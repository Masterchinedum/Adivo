//@/app/layout.tsx

import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
import { ProfileCompletionProvider } from '@/lib/contexts/ProfileCompletionContext'
import { ProfileCompletionDialog } from '@/components/profile/ProfileCompletionDialog'
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sociolytics | Relationship Psychology Tests & Analysis",
  description: "Discover insights about your relationships through scientifically-designed psychological tests. Get personalized analysis and improve your connections with others.",
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
              <ProfileCompletionDialog />
              <Toaster />
            </ProfileCompletionProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}