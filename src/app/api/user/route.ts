import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hash } from 'bcrypt'

export async function POST(req: NextRequest) {
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
    console.error('Error creating user:', error)
    return NextResponse.json({ message: 'Ocorreu um erro!' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const users = await db.user.findMany()
    return NextResponse.json(
      { users, message: 'Usuários listados com sucesso!' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ message: 'Ocorreu um erro!' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json()

    // Verify if the user ID was provided
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 },
      )
    }

    // Delete the user from the database
    const deletedUser = await db.user.delete({
      where: { id: userId },
    })

    return NextResponse.json(
      { message: 'User deleted successfully', deletedUser },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 },
    )
  }
}

export default async function handler(req: NextRequest) {
  switch (req.method) {
    case 'POST':
      return await POST(req)
    case 'GET':
      return await GET()
    case 'DELETE':
      return await DELETE(req)
    default:
      return NextResponse.json(
        { message: `Method ${req.method} Not Allowed` },
        { status: 405 },
      )
  }
}
