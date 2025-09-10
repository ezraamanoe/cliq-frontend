import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { NextResponse } from 'next/server'

const handler = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: { email: {}, password: {}, name: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        // mock user
        return {
          id: 'u1',
          name: (credentials as any).name || 'Cliq User',
          email: credentials.email as string,
        }
      },
    }),
  ],
  pages: {},
})

export { handler as GET, handler as POST }
