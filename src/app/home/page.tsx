'use-client'

import { getServerSession } from 'next-auth'
import ButtonLogout from './ButtonLogout'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <div>Olá {session?.user?.name}</div>
      <div>Home</div>
      <ButtonLogout />
    </div>
  )
}
