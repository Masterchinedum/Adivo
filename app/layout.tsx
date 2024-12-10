import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import './globals.css'
import Link from 'next/link'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <div>
              <Link href="/" > Adivo advice </Link>
              <Link href="/future" > future texts </Link>
            </div>
            <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}