import React, { RefObject } from 'react'
import Image from 'next/image'
import { IoLocationOutline } from 'react-icons/io5'
import { FaGraduationCap, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Link from 'next/link'

interface ProfileCardProps {
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  fileInputRef: RefObject<HTMLInputElement>
  imageSrc: string | null
  handlePlaceholderClick: () => void
  Placeholder: string
  name: string
  occupation: string
  selectedCity?: string
  selectedState?: string
  course?: string
  university?: string
  linkedin?: string
  email?: string
  bio: string
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  handleImageChange,
  fileInputRef,
  imageSrc,
  handlePlaceholderClick,
  Placeholder,
  name,
  occupation,
  selectedCity,
  selectedState,
  course,
  university,
  linkedin,
  email,
  bio,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-base text-xl font-medium">
        Como as pessoas irão te encontrar
      </p>
      <div className="w-[800px] rounded border border-[#141414] border-opacity-10 p-6">
        <div className="flex flex-row gap-6">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            {imageSrc ? (
              <div
                className="h-[100px] w-[100px] cursor-pointer overflow-hidden rounded-full"
                onClick={handlePlaceholderClick}
              >
                <Image
                  alt="Descrição da imagem"
                  width={200}
                  height={200}
                  src={imageSrc}
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                onClick={handlePlaceholderClick}
                className="flex h-[100px] w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200"
              >
                <Image
                  alt="Placeholder"
                  width={50}
                  height={50}
                  src={Placeholder}
                  className="object-contain"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="gap-2">
              <p>{name}</p>
              <p className="text-2xl font-medium">{occupation}</p>
            </div>
            <div className="flex flex-row items-center gap-4 text-sm">
              {(selectedCity || selectedState) && (
                <div className="flex flex-row items-center gap-1">
                  <IoLocationOutline />
                  <p>
                    {selectedCity} - {selectedState}
                  </p>
                </div>
              )}
              {(course || university) && (
                <div className="flex flex-row items-center gap-1">
                  <FaGraduationCap />
                  <p>
                    {university} - {course}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-row gap-4 pt-2">
              {linkedin && (
                <Link href={linkedin}>
                  <FaLinkedin size={20} />
                </Link>
              )}
              {email && (
                <Link href={`mailto:${email}`}>
                  <MdEmail size={22} />
                </Link>
              )}
            </div>
            <div className="max-w-[500px] pt-2">
              <p>{bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
