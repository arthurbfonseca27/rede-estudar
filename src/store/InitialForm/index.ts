import create from 'zustand'

interface FormState {
  email: string
  password: string
  setEmail: (email: string) => void
  setPassword: (password: string) => void
}

export const initialFormStore = create<FormState>((set) => ({
  email: '',
  password: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
}))
