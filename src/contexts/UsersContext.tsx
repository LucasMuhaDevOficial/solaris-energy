import { createContext, Dispatch, ReactNode, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'

import { apiStates } from '../libs/axios'
import { db } from '../services/firebase'

interface UsersContextType {
  states: IStates[]
  users: IUsers[]
  setUsers: Dispatch<SetStateAction<IUsers[]>>
  isFetched: boolean
  isCreated: boolean
  formData: IUsers | undefined
  getUsers: () => void
  deleteUser: (userId: string) => void
  createUsers: (data: IUsers) => Promise<void>
  getFormDataForUpdate: (userId: string) => void
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
  created_at: string
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
  const [isCreated, setIsCreated] = useState(false)
  const [formData, setFormData] = useState<IUsers>()

  function getFormDataForUpdate(userId: string) {
    const userData = users.find((user) => user.id === userId)

    setFormData(userData)
  }

  async function createUsers(data: IUsers) {
    try {
      setIsCreated(true)

      const userCollectionRef = collection(db, 'users')
      await addDoc(userCollectionRef, data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsCreated(false)
    }
  }

  async function deleteUser(userId: string) {
    try {
      const userToDeleted = doc(db, 'users', userId)

      await deleteDoc(userToDeleted)
    } catch (error) {
      console.log(error)
    }
  }

  function getUsers() {
    const q = query(collection(db, 'users'), orderBy('created_at', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedUsers = querySnapshot.docs.map((doc) => {
        const data = { ...doc.data(), id: doc.id } as IUsers

        return data
      })

      setIsFetched(false)

      if (updatedUsers !== null) {
        setUsers(updatedUsers)
      } else {
        setUsers([])
      }
    })
  }

  async function handleStatesApi() {
    const response = await apiStates.get('/estados')

    setStates(response.data)
  }

  useEffect(() => {
    handleStatesApi()
    getUsers()
  }, [])

  return (
    <UsersContext.Provider
      value={{
        states,
        users,
        setUsers,
        formData,
        isFetched,
        isCreated,
        getUsers,
        deleteUser,
        createUsers,
        getFormDataForUpdate,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
