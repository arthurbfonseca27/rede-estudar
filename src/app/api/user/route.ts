import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hash } from 'bcrypt'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      email,
      password,
      name,
      occupation,
      state,
      city,
      university,
      course,
      linkedin,
      sendEmail,
      bio,
    } = body

    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    })
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'Já existe um usuário com esse e-mail.' },
        { status: 409 },
      )
    }

    const hashPassword = await hash(password, 10)
    const newUser = await db.user.create({
      data: {
        email,
        password: hashPassword,
        name,
        occupation,
        state,
        city,
        university,
        course,
        linkedin,
        sendEmail,
        bio,
      },
    })
    return NextResponse.json(
      { user: newUser, message: 'Usuário criado com sucesso!' },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ message: 'Ocorreu um erro!' }, { status: 201 })
  }
}
