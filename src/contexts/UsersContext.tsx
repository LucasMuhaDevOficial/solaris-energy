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
  updateDoc,
} from 'firebase/firestore'

import { apiStates } from '../libs/axios'
import { db } from '../services/firebase'

interface UsersContextType {
  states: IStates[]
  users: IUsers[]
  formData: IUsers | undefined
  setFormData: Dispatch<SetStateAction<IUsers | undefined>>
  isCreated: boolean
  isUpdate: boolean
  isEmpty: boolean
  getUsers: () => void
  deleteUser: (userId: string) => void
  createUser: (data: IUsers) => Promise<void>
  updateUser: (modifiedObject: IUsers, userId: string) => void
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
  const [isCreated, setIsCreated] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [formData, setFormData] = useState<IUsers>()

  function getFormDataForUpdate(userId: string) {
    setIsUpdate(true)

    const userData = users.find((user) => user.id === userId)

    setFormData(userData)
  }

  function getUsers() {
    const q = query(collection(db, 'users'), orderBy('created_at', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedUsers = querySnapshot.docs.map((doc) => {
        const data = { ...doc.data(), id: doc.id } as IUsers

        return data
      })

      if (updatedUsers.length === 0) {
        setIsEmpty(true)
        return
      }

      setUsers(updatedUsers)
      setIsEmpty(false)
    })
  }

  async function createUser(data: IUsers) {
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

  async function updateUser(modifiedObject: IUsers, userId: string) {
    try {
      const userToUpdate = doc(db, 'users', userId)
      await updateDoc(userToUpdate, { ...modifiedObject })
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchStates() {
    const response = await apiStates.get('/estados')

    setStates(response.data)
  }

  useEffect(() => {
    fetchStates()
    getUsers()
  }, [])

  return (
    <UsersContext.Provider
      value={{
        states,
        users,
        formData,
        setFormData,
        isCreated,
        isUpdate,
        isEmpty,
        getUsers,
        deleteUser,
        createUser,
        updateUser,
        getFormDataForUpdate,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
