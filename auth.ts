import NextAuth from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from "./lib/prisma"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getAccountByUserId } from "./data/account"

// Removed DefaultSession import since it is not used

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification, can be account?.type too
      if (account?.provider !== 'credentials') return true

      if (!user.id) {
        return false
      }
      
      const existingUser = await getUserById(user.id)

      // Prevent sign in without email verification
      if (!existingUser || !existingUser.emailVerified) {
        return false
      }

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = 
          await getTwoFactorConfirmationByUserId(existingUser.id)

          // If not have a confirmation, block login
          if (!twoFactorConfirmation) return false

          // Delete two factor confirmation for next sign in
          await db.twoFactorConfirmation.delete({
            where: { userId: existingUser.id }
          })
      }

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as 'ADMIN' | 'USER'
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      if (session.user) {
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})