'use client'

import React from 'react'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import Rede from '../../public/Rede.svg'
import Link from 'next/link'
import Image from 'next/image'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import { EmailPasswordSchema } from '@/validation/EmailPasswordSchema'
import { useRouter } from 'next/navigation'

interface FormValues {
  email: string
  password: string
}

export default function Home() {
  const [show, setShow] = React.useState(false)
  const [loginError, setLoginError] = React.useState('')
  const handleClick = () => setShow(!show)
  const router = useRouter()

  const initialValues: FormValues = {
    email: '',
    password: '',
  }

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    setSubmitting(true)
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })

    if (signInData?.error) {
      console.log(signInData.error)
    } else {
      router.push('/admin')
    }

    setSubmitting(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="border-red w-1/3 rounded border px-24 pb-24">
        <div className="relative right-5">
          <Image
            src={Rede}
            alt="Descrição da imagem"
            width={200}
            height={100}
          />
        </div>
        <div className="relative bottom-8 flex flex-col gap-3 pb-4">
          <p className="text-4xl font-bold">Entrar</p>
          <p className="text-base text-[#969696]">
            Por favor, faça login para entrar na sua conta.
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={EmailPasswordSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 bg-white">
              <div className="flex flex-col justify-start">
                <p className="relative left-4 top-2.5 z-10 w-fit bg-[#FFFFFF] px-1 text-sm">
                  E-mail
                </p>
                <Field
                  name="email"
                  as={Input}
                  placeholder="exemplo@exemplo.com"
                  size="lg"
                  fontSize="16px"
                  _focus={{
                    borderColor: '#5C2D91',
                    boxShadow: '0 0 0 1px #5C2D91',
                  }}
                  _active={{
                    borderColor: '#5C2D91',
                    boxShadow: '0 0 0 1px #5C2D91',
                  }}
                  _hover={{
                    borderColor: '#5C2D91',
                  }}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex flex-col justify-start">
                <p className="relative left-4 top-2.5 z-10 w-fit bg-[#FFFFFF] px-1 text-sm">
                  Senha
                </p>
                <InputGroup size="lg">
                  <Field
                    name="password"
                    as={Input}
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="******"
                    fontSize="16px"
                    _focus={{
                      borderColor: '#5C2D91',
                      boxShadow: '0 0 0 1px #5C2D91',
                    }}
                    _active={{
                      borderColor: '#5C2D91',
                      boxShadow: '0 0 0 1px #5C2D91',
                    }}
                    _hover={{
                      borderColor: '#5C2D91',
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleClick}
                      variant="ghost"
                      _hover={{ bg: 'transparent' }}
                    >
                      {show ? (
                        <IoMdEyeOff size={24} color="#9A9A9A" />
                      ) : (
                        <IoMdEye size={24} color="#9A9A9A" />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              {loginError && (
                <p className="text-sm text-red-500">{loginError}</p>
              )}
              <Button
                type="submit"
                isLoading={isSubmitting}
                width="full"
                variant="solid"
                bg="#5C2D91"
                color="#FFFFFF"
                fontWeight="semibold"
                fontSize="16px"
                size="lg"
                _hover={{ bg: '#5C2D91' }}
                _focus={{
                  borderColor: '#5C2D91',
                  boxShadow: '0 0 0 1px #5C2D91',
                }}
                _active={{
                  borderColor: '#5C2D91',
                  boxShadow: '0 0 0 1px #5C2D91',
                }}
              >
                Entrar
              </Button>
              <Button
                rightIcon={<FcGoogle />}
                variant="outline"
                size="lg"
                fontWeight="semibold"
                fontSize="16px"
                _hover={{ bg: 'transparent', borderColor: '#5C2D91' }}
                _focus={{
                  borderColor: '#5C2D91',
                  boxShadow: '0 0 0 1px #5C2D91',
                }}
                _active={{
                  borderColor: '#5C2D91',
                  boxShadow: '0 0 0 1px #5C2D91',
                }}
                onClick={() => signIn('google', { callbackUrl: '/home' })}
              >
                Entrar com Google
              </Button>
              <div className="flex flex-row items-center justify-center gap-1">
                <span>Não tem uma conta?</span>
                <Link href="/signInPart1">
                  <button className="font-semibold text-[#5C2D91] underline">
                    Crie uma
                  </button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  )
}
