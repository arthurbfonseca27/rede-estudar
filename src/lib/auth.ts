import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from './db'
import { compare } from 'bcrypt'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'exemplo@exemplo.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        })
        if (!existingUser) {
          return null
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password,
        )

        if (!passwordMatch) {
          return null
        }

        return {
          id: `${existingUser.id}`,
          email: existingUser.email,
          name: existingUser.name,
          occupation: existingUser.occupation,
          state: existingUser.state,
          city: existingUser.city,
          university: existingUser.university,
          course: existingUser.course,
          linkedin: existingUser.linkedin,
          sendEmail: existingUser.sendEmail,
          bio: existingUser.bio,
        }
      },
    }),
  ],
}
