import { PrismaClient } from '@prisma/client'



export const db = globalThis.prisma || new PrismaClient({
  log: ['info', 'warn', 'error']
})

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db