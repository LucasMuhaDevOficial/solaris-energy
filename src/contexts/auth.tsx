import { createContext, ReactNode, useState } from 'react'
import { toast } from 'react-toastify'

import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../services/firebase'

interface AuthContextType {
  isLogging: boolean
  signIn: (email: string, password: string) => void
}

export const AuthContext = createContext({} as AuthContextType)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false)
  // const [users, setUsers] = useState<FireBaseUser | null>([])

  function signIn(email: string, password: string) {
    setIsLogging(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((account) => {
        return account
      })
      .catch((error) => {
        const codeError = error.code
        console.log(error)
      })
      .finally(() => setIsLogging(false))
  }

  return (
    <AuthContext.Provider value={{ signIn, isLogging }}>
      {children}
    </AuthContext.Provider>
  )
}
