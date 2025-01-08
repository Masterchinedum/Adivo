import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: 'https://delicate-cheetah-43265.upstash.io',
  token: process.env.REDIS_KEY!,
})

// import { Redis } from '@upstash/redis'

// const redis = new Redis({
//   url: 'https://delicate-cheetah-43265.upstash.io',
//   token: ,
// })

// await redis.set('foo', 'bar');
// const data = await redis.get('foo');