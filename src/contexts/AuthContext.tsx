import { createContext, ReactNode, useState } from 'react'

import { signInWithEmailAndPassword } from 'firebase/auth'

import { USERS_COLLECTION } from '../constants/storage'
import { auth } from '../services/firebase'

interface User {
  uid: string
  email: string | null
}

interface AuthContextType {
  user: User | null | undefined
  isLogging: boolean
  signIn: (email: string, password: string) => void
  signOut: () => void
  getUserFromStorage: () => void
}

export const AuthContext = createContext({} as AuthContextType)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false)
  const [user, setUser] = useState<User | null>()

  function getUserFromStorage() {
    setIsLogging(true)

    const storedUser = localStorage.getItem(USERS_COLLECTION)

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User
      setUser(userData)
    }

    setIsLogging(false)
  }

  function signIn(email: string, password: string) {
    setIsLogging(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((account) => {
        const { uid, email } = account.user

        const userData = {
          uid: uid,
          email: email,
        }

        setUser(userData)
        localStorage.setItem(USERS_COLLECTION, JSON.stringify(userData))
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setIsLogging(false))
  }

  async function signOut() {
    await auth.signOut()

    localStorage.removeItem(USERS_COLLECTION)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ signIn, isLogging, user, signOut, getUserFromStorage }}
    >
      {children}
    </AuthContext.Provider>
  )
}
