// store.ts
import create from 'zustand'

interface FormState {
  name: string
  occupation: string
  state: string
  city: string
  university: string
  course: string
  linkedin: string
  sendEmail: string
  bio: string
  setName: (name: string) => void
  setOccupation: (occupation: string) => void
  setState: (state: string) => void
  setCity: (city: string) => void
  setUniversity: (university: string) => void
  setCourse: (course: string) => void
  setLinkedin: (linkedin: string) => void
  setSendEmail: (sendEmail: string) => void
  setBio: (bio: string) => void
}

export const finalFormStore = create<FormState>((set) => ({
  name: '',
  occupation: '',
  state: '',
  city: '',
  university: '',
  course: '',
  linkedin: '',
  sendEmail: '',
  bio: '',
  setName: (name) => set({ name }),
  setOccupation: (occupation) => set({ occupation }),
  setState: (state) => set({ state }),
  setCity: (city) => set({ city }),
  setUniversity: (university) => set({ university }),
  setCourse: (course) => set({ course }),
  setLinkedin: (linkedin) => set({ linkedin }),
  setSendEmail: (sendEmail) => set({ sendEmail }),
  setBio: (bio) => set({ bio }),
}))
