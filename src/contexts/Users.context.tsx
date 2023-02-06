import { createContext, ReactNode } from 'react'
import { useEffect, useState } from 'react'

import { apiStates } from '../libs/axios'

interface UsersContextType {
  states: IStates[]
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

export function UsersProvider({ children }: UsersProviderProps) {
  const [states, setStates] = useState<IStates[]>([])
  // const [newUser, setNewUser] = useState([])

  useEffect(() => {
    async function handleStatesApi() {
      const response = await apiStates.get('/estados')

      setStates(response.data)
    }

    handleStatesApi()
  }, [])

  return (
    <UsersContext.Provider value={{ states }}>{children}</UsersContext.Provider>
  )
}
