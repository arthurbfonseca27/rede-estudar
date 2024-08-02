'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Button,
  Textarea,
} from '@chakra-ui/react'
import { FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import Rede from '../../../public/Rede.svg'
import Placeholder from '../../../public/Placeholder.svg'
import ProfileCard from '../../components/ProfileCard'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { RegistrationSchema } from '@/validation/RegistrationSchema'
import { useRouter } from 'next/navigation'
import { finalFormStore } from '../../store/FinalForm/index'
import { initialFormStore } from '@/store/InitialForm'

interface State {
  id: number
  sigla: string
  nome: string
}

interface City {
  id: number
  nome: string
}

interface FormValues {
  name: string
  occupation: string
  state: string
  city: string
  university: string
  course: string
  linkedin: string
  sendEmail: string
  bio: string
}

export default function Home() {
  const [nameLocal, setNameLocal] = useState('')
  const [occupationLocal, setOccupationLocal] = useState('')
  const [stateLocal, setStateLocal] = useState('')
  const [cityLocal, setCityLocal] = useState('')
  const [universityLocal, setUniversityLocal] = useState('')
  const [courseLocal, setCourseLocal] = useState('')
  const [linkedinLocal, setLinkedinLocal] = useState('')
  const [emailLocal, setEmailLocal] = useState('')
  const [bioLocal, setBioLocal] = useState('')

  const [statesAPI, setStatesAPI] = useState<State[]>([])
  const [citiesAPI, setCitiesAPI] = useState<City[]>([])
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const {
    name,
    occupation,
    state,
    city,
    university,
    course,
    linkedin,
    sendEmail,
    bio,
    setName,
    setOccupation,
    setState,
    setCity,
    setUniversity,
    setCourse,
    setLinkedin,
    setSendEmail,
    setBio,
  } = finalFormStore()

  const { email, password } = initialFormStore()

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePlaceholderClick = () => {
    fileInputRef.current?.click()
  }

  useEffect(() => {
    async function getStates() {
      const response = await fetch(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
        {
          method: 'GET',
        },
      )
      const data = await response.json()
      setStatesAPI(data)
    }

    getStates()
  }, [])

  useEffect(() => {
    async function getCities(selectedState: string) {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`,
        {
          method: 'GET',
        },
      )
      const data = await response.json()
      setCitiesAPI(data)
    }

    if (stateLocal) {
      getCities(stateLocal)
    }
  }, [stateLocal])

  const initialValues: FormValues = {
    name,
    occupation,
    state,
    city,
    university,
    course,
    linkedin,
    sendEmail,
    bio,
  }

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      setName(values.name)
      setOccupation(values.occupation)
      setState(values.state)
      setCity(values.city)
      setUniversity(values.university)
      setCourse(values.course)
      setLinkedin(values.linkedin)
      setSendEmail(values.sendEmail)
      setBio(values.bio)

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name: values.name,
          occupation: values.occupation,
          state: values.state,
          city: values.city,
          university: values.university,
          course: values.course,
          linkedin: values.linkedin,
          sendEmail: values.sendEmail,
          bio: values.bio,
        }),
      })
      console.log('Submitting values:', {
        email,
        password,
        name: values.name,
        occupation: values.occupation,
        state: values.state,
        city: values.city,
        university: values.university,
        course: values.course,
        linkedin: values.linkedin,
        sendEmail: values.sendEmail,
        bio: values.bio,
      })
      if (response.ok) {
        router.push('/')
      } else {
        console.error('Cadastro não realizado com sucesso')
      }
    } catch (error) {
      console.error('Failed to submit form', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="flex flex-row items-center justify-center pb-24 pt-8">
      <div className="h-screen px-24">
        <div className="relative right-5">
          <Image
            src={Rede}
            alt="Descrição da imagem"
            width={200}
            height={100}
          />
        </div>
        <div className="relative bottom-8 flex flex-col gap-3 py-4">
          <p className="text-4xl font-bold">Informações</p>
          <p className="text-base text-[#969696]">
            Crie o seu card na maior comunidade de líderes!
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={RegistrationSchema}
          onSubmit={onSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col gap-4 bg-white">
              <div className="flex flex-col justify-between gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex w-full flex-col">
                    <p className="relative left-4 top-2.5 z-10 w-fit bg-[#FFFFFF] px-1 text-sm">
                      Nome completo
                    </p>
                    <Field
                      name="name"
                      as={Input}
                      borderRadius="4px"
                      width="full"
                      placeholder="Seu nome completo"
                      size="lg"
                      fontSize="16px"
                      _focus={{
                        borderColor: '#5C2D91',
                        boxShadow: '0 0 0 1px #5C2D91',
                        outline: 'none',
                      }}
                      _active={{
                        borderColor: '#5C2D91',
                        boxShadow: '0 0 0 1px #5C2D91',
                        outline: 'none',
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNameLocal(e.target.value)
                        setFieldValue('name', e.target.value)
                      }}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <p className="relative left-4 top-2.5 z-10 w-fit bg-[#FFFFFF] px-1 text-sm">
                      Área de atuação
                    </p>
                    <Field
                      name="occupation"
                      as={Input}
                      borderRadius="4px"
                      width="full"
                      placeholder="Ex: Engenheiro de Software"
                      size="lg"
                      fontSize="16px"
                      _focus={{
                        borderColor: '#5C2D91',
                        boxShadow: '0 0 0 1px #5C2D91',
                        outline: 'none',
                      }}
                      _active={{
                        borderColor: '#5C2D91',
                        boxShadow: '0 0 0 1px #5C2D91',
                        outline: 'none',
                      }}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setOccupationLocal(e.target.value)
                        setFieldValue('occupation', e.target.value)
                      }}
                    />
                    <ErrorMessage
                      name="occupation"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex w-full flex-col gap-0">
                  <p className="relative left-4 top-2.5 z-10 w-fit bg-[#FFFFFF] px-1 text-sm">
                    Estado
                  </p>
                  <Field
                    name="state"
                    as={Select}
                    width="full"
                    placeholder="Estado"
                    size="lg"
                    color={values.state ? '#000000' : '#9ca3af'}
                    fontSize="16px"
                    borderRadius="4px"
                    _focus={{
                      borderColor: '#5C2D91',
                      boxShadow: '0 0 0 1px #5C2D91',
                      outline: 'none',
                    }}
                    _active={{
                      borderColor: '#5C2D91',
                      boxShadow: '0 0 0 1px #5C2D91',
                      outline: 'none',
                    }}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setFieldValue('state', e.target.value)
                      setFieldValue('city', '')
                      setStateLocal(e.target.value)
                    }}
                  >
                    {statesAPI.map((state) => (
                      <option key={state.id} value={state.sigla}>
                        {state.sigla}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                <div className="flex w-full flex-col">
                  <p className="relative left-4 top-2.5 z-10 h-fit w-fit bg-[#FFFFFF] px-1 text-sm">
                    Cidade
                  </p>
                  <Field
                    name="city"
                    as={Select}
                    width="full"
                    placeholder="Cidade"
                    color={values.city ? '#000000' : '#9ca3af'}
                    size="lg"
                    fontSize="16px"
                    borderRadius="4px"
                    _focus={{
                      borderColor: '#5C2D91',
                      boxShadow: '0 0 0 1px #5C2D91',
                      outline: 'none',
                    }}
                    _active={{
                      borderColor: '#5C2D91',
                      boxShadow: '0 0 0 1px #5C2D91',
                      outline: 'none',
                    }}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setCityLocal(e.target.value)
                      setFieldValue('city', e.target.value)
                    }}
                  >
                    {citiesAPI.map((city) => (
                      <option key={city.id}>{city.nome}</option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex w-full flex-col">
                  <div className="mb-2 flex flex-col">
                    <div className="flex flex-row items-center gap-4">
                      <div className="flex w-full flex-col">
                        <p className="relative left-4 top-2.5 z-10 w-fit bg-[#FFFFFF] px-1 text-sm">
                          Universidade
                        </p>
                        <Field
                          name="university"
                          as={Input}
                          borderRadius="4px"
                          width="full"
                          placeholder="Sua universidade"
                          size="lg"
                          fontSize="16px"
                          _focus={{
                            borderColor: '#5C2D91',
                            boxShadow: '0 0 0 1px #5C2D91',
                            outline: 'none',
                          }}
                          _active={{
                            borderColor: '#5C2D91',
                            boxShadow: '0 0 0 1px #5C2D91',
                            outline: 'none',
                          }}
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>,
                          ) => {
                            setUniversityLocal(e.target.value)
                            setFieldValue('university', e.target.value)
                          }}
                        />
                        <div className="min-h-[20px]">
                          <ErrorMessage
                            name="university"
                            component="div"
                            className="text-sm text-red-500"
                          />
                        </div>
                      </div>
                      <div className="flex h-fit w-full flex-col">
                        <p className="relative left-4 top-2.5 z-10 h-fit w-fit bg-[#FFFFFF] px-1 text-sm">
                          Curso
                        </p>
                        <Field
                          name="course"
                          as={Input}
                          borderRadius="4px"
                          width="full"
                          placeholder="Seu curso"
                          size="lg"
                          fontSize="16px"
                          _focus={{
                            borderColor: '#5C2D91',
                            boxShadow: '0 0 0 1px #5C2D91',
                            outline: 'none',
                          }}
                          _active={{
                            borderColor: '#5C2D91',
                            boxShadow: '0 0 0 1px #5C2D91',
                            outline: 'none',
                          }}
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>,
                          ) => {
                            setCourseLocal(e.target.value)
                            setFieldValue('course', e.target.value)
                          }}
                        />
                        <div className="min-h-[20px]">
                          <ErrorMessage
                            name="course"
                            component="div"
                            className="text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="relative bottom-6 flex flex-row gap-4">
                  <div>
                    <p className="relative left-4 top-2.5 z-10 w-fit bg-[#FFFFFF] px-1 text-sm">
                      LinkedIn (Opcional)
                    </p>
                    <InputGroup size="lg">
                      <InputLeftAddon bgColor="#FFFFFF">
                        <FaLinkedin />
                      </InputLeftAddon>
                      <Field
                        name="linkedin"
                        as={Input}
                        placeholder="https://www.linkedin.com"
                        fontSize="14px"
                        borderRadius="4px"
                        width="full"
                        size="lg"
                        _focus={{
                          borderColor: '#5C2D91',
                          boxShadow: '0 0 0 1px #5C2D91',
                          outline: 'none',
                        }}
                        _active={{
                          borderColor: '#5C2D91',
                          boxShadow: '0 0 0 1px #5C2D91',
                          outline: 'none',
                        }}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setLinkedinLocal(e.target.value)
                          setFieldValue('linkedin', e.target.value)
                        }}
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="linkedin"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                  <div>
                    <p className="relative left-4 top-2.5 z-10 w-fit bg-[#FFFFFF] px-1 text-sm">
                      E-mail (Opcional)
                    </p>
                    <InputGroup size="lg">
                      <InputLeftAddon bgColor="#FFFFFF">
                        <MdEmail />
                      </InputLeftAddon>
                      <Field
                        name="sendEmail"
                        as={Input}
                        placeholder="exemplo@exemplo.com"
                        fontSize="14px"
                        borderRadius="4px"
                        width="full"
                        size="lg"
                        _focus={{
                          borderColor: '#5C2D91',
                          boxShadow: '0 0 0 1px #5C2D91',
                          outline: 'none',
                        }}
                        _active={{
                          borderColor: '#5C2D91',
                          boxShadow: '0 0 0 1px #5C2D91',
                          outline: 'none',
                        }}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setEmailLocal(e.target.value)
                          setFieldValue('sendEmail', e.target.value)
                        }}
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>
                <div className="flex flex-row"></div>
              </div>
              <div className="relative bottom-6 flex flex-col">
                <p className="relative left-4 top-2.5 z-10 w-fit bg-[#FFFFFF] px-1 text-sm">
                  Bio
                </p>
                <Field
                  name="bio"
                  as={Textarea}
                  placeholder="Fale mais sobre você"
                  fontSize="16px"
                  _focus={{
                    borderColor: '#5C2D91',
                    boxShadow: '0 0 0 1px #5C2D91',
                    outline: 'none',
                  }}
                  _active={{
                    borderColor: '#5C2D91',
                    boxShadow: '0 0 0 1px #5C2D91',
                    outline: 'none',
                  }}
                  maxLength={350}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setBioLocal(e.target.value)
                    setFieldValue('bio', e.target.value)
                  }}
                />
                <div className="flex flex-row justify-between">
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="text-sm text-red-500"
                  />
                  <p className="text-right text-sm text-gray-500">
                    {values.bio.length}/350
                  </p>
                </div>
              </div>
              <div className="relative bottom-6 flex flex-col gap-2">
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
                  Cadastrar
                </Button>
                <div className="flex flex-row items-center justify-center gap-1 pb-8">
                  <span>Já tem uma conta?</span>
                  <Link href="/">
                    <button className="font-semibold text-[#5C2D91] underline">
                      Entrar
                    </button>
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="pb-8">
        <p className="text-base text-xl font-medium">
          Como as pessoas irão te encontrar
        </p>
        <ProfileCard
          handleImageChange={handleImageChange}
          fileInputRef={fileInputRef}
          imageSrc={imageSrc}
          handlePlaceholderClick={handlePlaceholderClick}
          Placeholder={Placeholder.src}
          name={nameLocal}
          occupation={occupationLocal}
          selectedCity={cityLocal}
          selectedState={stateLocal}
          course={courseLocal}
          university={universityLocal}
          linkedin={linkedinLocal}
          email={emailLocal}
          bio={bioLocal}
        />
      </div>
    </main>
  )
}
