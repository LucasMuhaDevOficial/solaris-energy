import React, { createContext, ReactNode, useEffect, useState } from 'react'

import { apiStates } from '../libs/axios'

interface ProjectsContextType {
  states: IStates[]
}

export const ProjectsContext = createContext({} as ProjectsContextType)

interface ProjectsProviderProps {
  children: ReactNode
}

interface IStates {
  id: string
  sigla: string
  nome: string
}

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const [states, setStates] = useState<IStates[]>([])

  async function fetchStates() {
    const response = await apiStates.get('/estados')

    setStates(response.data)
  }

  useEffect(() => {
    fetchStates()
  }, [])

  return (
    <ProjectsContext.Provider value={{ states }}>
      {children}
    </ProjectsContext.Provider>
  )
}
