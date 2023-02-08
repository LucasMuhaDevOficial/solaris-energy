import React, { createContext, ReactNode, useEffect, useState } from 'react'

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

import { apiStates } from '../libs/axios'
import { db } from '../services/firebase'

interface ProjectsContextType {
  states: IStates[]
  projects: IProjects[]
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

interface IProjects {
  id: string
  client_name: string
  created_at: string
  phone: string
  zipcode: string
  state: string
  city: string
  street: string
  neighborhood: string
  number: number
  complement: string
  concessionaire: string
  power: number
}

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const [states, setStates] = useState<IStates[]>([])
  const [projects, setProjects] = useState<IProjects[]>([])

  function getProjects() {
    const q = query(collection(db, 'projects'), orderBy('created_at', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedProjects = querySnapshot.docs.map((doc) => {
        const data = { ...doc.data(), id: doc.id } as IProjects

        return data
      })

      setProjects(updatedProjects)
    })
  }

  async function fetchStates() {
    const response = await apiStates.get('/estados')

    setStates(response.data)
  }

  useEffect(() => {
    fetchStates()
    getProjects()
  }, [])

  return (
    <ProjectsContext.Provider value={{ states, projects }}>
      {children}
    </ProjectsContext.Provider>
  )
}
