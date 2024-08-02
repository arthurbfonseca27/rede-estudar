'use client'

import React, { useEffect, useState, useRef } from 'react'
import ProfileCard from '@/components/ProfileCard'

interface User {
  id: string
  email: string
  name: string
  occupation: string
  state?: string
  city?: string
  university?: string
  course?: string
  linkedin?: string
  sendEmail?: boolean
  bio?: string
  imageSrc?: string | null
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setLoading(false)
      setUsers(data.users)
    }

    fetchUsers()
  }, [])

  const handleImageChange = () => {}
  const handlePlaceholderClick = () => {}
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (loading) return <div>Carregando...</div>

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-4 text-2xl font-bold">Lista de Usuários</h1>
      <div className="flex w-full max-w-2xl flex-col items-center gap-6">
        {users.map((user) => (
          <ProfileCard
            key={user.id}
            handleImageChange={handleImageChange}
            fileInputRef={fileInputRef}
            imageSrc={user.imageSrc || null}
            handlePlaceholderClick={handlePlaceholderClick}
            Placeholder="/placeholder.png" // Use um caminho para um placeholder adequado
            name={user.name}
            occupation={user.occupation}
            selectedCity={user.city}
            selectedState={user.state}
            course={user.course}
            university={user.university}
            linkedin={user.linkedin}
            email={user.email}
            bio={user.bio || ''}
          />
        ))}
      </div>
    </div>
  )
}

export default UsersPage
