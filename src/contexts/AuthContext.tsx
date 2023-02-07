import { createContext, ReactNode, useEffect, useState } from 'react'

import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth'

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
    try {
      const storedUser = localStorage.getItem(USERS_COLLECTION)

      if (storedUser) {
        const userData = JSON.parse(storedUser) as User
        setUser(userData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function signIn(email: string, password: string) {
    setIsLogging(true)

    const account = await signInWithEmailAndPassword(auth, email, password)

    try {
      const { uid, email } = account.user

      const userData = {
        uid: uid,
        email: email,
      }

      setUser(userData)
      localStorage.setItem(USERS_COLLECTION, JSON.stringify(userData))
    } catch (error) {
      console.log(error)
    }
  }

  async function signOut() {
    try {
      setIsLogging(false)

      await auth.signOut()

      localStorage.removeItem(USERS_COLLECTION)
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserFromStorage()
  }, [])

  return (
    <AuthContext.Provider
      value={{ signIn, isLogging, user, signOut, getUserFromStorage }}
    >
      {children}
    </AuthContext.Provider>
  )
}
