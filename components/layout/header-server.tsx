import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { getCollection } from '@/lib/mongodb'
import { Header } from './header'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

type UserLite = { name: string; email: string }

export async function HeaderServer() {
  let initialUser: UserLite | null = null

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (token) {
      const payload: any = jwt.verify(token, JWT_SECRET)
      const users = await getCollection('users')
      const user = await users.findOne({ email: payload.email })
      if (user) {
        initialUser = { name: user.name ?? '', email: user.email ?? '' }
      }
    }
  } catch (e) {
    initialUser = null
  }

  return <Header initialUser={initialUser} />
}