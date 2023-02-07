import { createContext, ReactNode } from 'react'
import { useEffect, useState } from 'react'

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
} from 'firebase/firestore'

import { apiStates } from '../libs/axios'
import { db } from '../services/firebase'

interface UsersContextType {
  states: IStates[]
  users: IUsers[]
  isFetched: boolean
  deleteUsersFromDB: (userCpf: string) => void
  createUsers: (data: IUsers) => void
}

export const UsersContext = createContext({} as UsersContextType)

interface UsersProviderProps {
  children: ReactNode
}

interface IStates {
  id: string
  sigla: string
  nome: string
}

interface IUsers {
  id: string
  name: string
  cpf: string
  phone: string
  email: string
  zipcode: string
  state: string
  city: string
  street: string
  neighborhood: string
  number: number
  complement: string
}

export function UsersProvider({ children }: UsersProviderProps) {
  const [states, setStates] = useState<IStates[]>([])
  const [users, setUsers] = useState<IUsers[]>([])
  const [isFetched, setIsFetched] = useState(false)

  async function createUsers(data: IUsers) {
    try {
      setIsFetched(true)

      const userCollectionRef = collection(db, 'users')
      const user = await addDoc(userCollectionRef, data)

      setUsers((prevState) => [...prevState, data])
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetched(false)
    }
  }

  async function deleteUsersFromDB(userId: string) {
    try {
      setIsFetched(true)

      const userToDeleted = doc(db, 'users', userId)

      await deleteDoc(userToDeleted)

      const usersWithoutOne = users.filter((user) => user.id !== userId)

      setUsers(usersWithoutOne)
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetched(false)
    }
  }

  async function fetchUsersFromDB() {
    try {
      setIsFetched(true)

      const userCollectionRef = collection(db, 'users')

      const data = await getDocs(userCollectionRef)

      setUsers(
        data.docs.map((doc) => {
          const usersFromDB = { ...doc.data(), id: doc.id } as IUsers

          return usersFromDB
        })
      )
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetched(false)
    }
  }

  async function handleStatesApi() {
    const response = await apiStates.get('/estados')

    setStates(response.data)
  }

  useEffect(() => {
    handleStatesApi()
    fetchUsersFromDB()
  }, [])

  return (
    <UsersContext.Provider
      value={{ states, users, isFetched, deleteUsersFromDB, createUsers }}
    >
      {children}
    </UsersContext.Provider>
  )
}
