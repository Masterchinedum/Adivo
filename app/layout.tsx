//@/app/layout.tsx

import { ClerkProvider} from '@clerk/nextjs'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Relationship Matrix",
  description: "Interactive tests to explore relationships and self-reflection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; 
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
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8"> 
              {children} 
            </main>
            <Footer /> 
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>  
  );
}