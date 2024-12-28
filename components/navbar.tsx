//@/components/navbar.tsx

"use client"

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/tests', label: 'Tests' },
    { href: '/about', label: 'About' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/admindash', label: 'Admin' },
  ]

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-xl font-bold hover:opacity-80 transition-opacity"
        >
          Relationship Matrix
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href 
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <Button variant="outline" size="sm" asChild>
                <SignInButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </SignedIn>
            <ModeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}