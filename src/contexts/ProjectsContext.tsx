import { createContext, ReactNode, useEffect, useState } from 'react'

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'

import { apiStates } from '../libs/axios'
import { db } from '../services/firebase'

interface ProjectsContextType {
  states: IStates[]
  projects: IProjects[]
  isCreated: boolean
  isFetched: boolean
  isEmpty: boolean
  getProjects: () => void
  createProject: (data: IProjects) => void
  deleteProject: (projectId: string) => void
  orderProjectByState: (stateName: string) => void
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
  const [isCreated, setIsCreated] = useState(false)
  const [isFetched, setIsFetched] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  function getProjects() {
    try {
      const q = query(collection(db, 'projects'), orderBy('created_at', 'desc'))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updatedProjects = querySnapshot.docs.map((doc) => {
          const data = { ...doc.data(), id: doc.id } as IProjects

          return data
        })

        if (updatedProjects.length === 0) {
          return setIsFetched(true)
        }

        setProjects(updatedProjects)

        setIsFetched(false)
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetched(false)
    }
  }

  async function createProject(data: IProjects) {
    try {
      setIsCreated(true)
      const userCollectionRef = collection(db, 'projects')
      await addDoc(userCollectionRef, data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsCreated(false)
    }
  }

  async function deleteProject(projectId: string) {
    try {
      const userToDeleted = doc(db, 'projects', projectId)

      await deleteDoc(userToDeleted)
    } catch (error) {
      console.log(error)
    }
  }

  async function orderProjectByState(stateName: string) {
    const q = query(collection(db, 'projects'), where('state', '==', stateName))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedProjectsOrdered = querySnapshot.docs.map((doc) => {
        const data = { ...doc.data(), id: doc.id } as IProjects

        return data
      })

      if (updatedProjectsOrdered) {
        setIsEmpty(true)
        setProjects([])
      }

      setProjects(updatedProjectsOrdered)
      setIsEmpty(false)
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
    <ProjectsContext.Provider
      value={{
        states,
        projects,
        createProject,
        deleteProject,
        getProjects,
        orderProjectByState,
        isCreated,
        isFetched,
        isEmpty,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}
