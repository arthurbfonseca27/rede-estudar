'use client'

import { Button } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'

export default function ButtonLogout() {
  return (
    <div>
      <Button
        variant="outline"
        size="lg"
        _hover={{ bg: 'transparent' }}
        _focus={{
          borderColor: '#5C2D91',
          boxShadow: '0 0 0 1px #5C2D91',
        }}
        _active={{
          borderColor: '#5C2D91',
          boxShadow: '0 0 0 1px #5C2D91',
        }}
        onClick={() => signOut()}
      >
        Sair
      </Button>
    </div>
  )
}
