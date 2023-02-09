import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

import { apiStates } from '../libs/axios'
import { db } from '../services/firebase'

interface ProjectsContextType {
  states: IStates[]
  projects: IProjects[] | null
  formData: IProjects | undefined
  isCreated: boolean
  isFetched: boolean
  isEmpty: boolean
  setFormData: Dispatch<SetStateAction<IProjects | undefined>>
  getProjects: () => void
  createProject: (data: IProjects) => void
  deleteProject: (projectId: string) => void
  updateProject: (data: IProjects, userId: string) => void
  orderProjectByState: (stateName: string) => void
  getFormDataForUpdate: (projectId: string) => void
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
  const [projects, setProjects] = useState<IProjects[] | null>([])
  const [isCreated, setIsCreated] = useState(false)
  const [isFetched, setIsFetched] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [formData, setFormData] = useState<IProjects>()

  function getFormDataForUpdate(userId: string) {
    if (projects) {
      const projectData = projects.find((project) => project.id === userId)
      setFormData(projectData)
    }
  }

  function getProjects() {
    try {
      const q = query(collection(db, 'projects'), orderBy('created_at', 'desc'))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updatedProjects = querySnapshot.docs.map((doc) => {
          const data = { ...doc.data(), id: doc.id } as IProjects

          return data
        })

        if (updatedProjects.length === 0) {
          setIsEmpty(true)
          return
        }

        setProjects(updatedProjects)

        setIsEmpty(false)
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

  async function updateProject(data: IProjects, userId: string) {
    try {
      const userToUpdate = doc(db, 'projects', userId)
      await updateDoc(userToUpdate, { ...data })
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

      if (updatedProjectsOrdered.length === 0) {
        setProjects(null)
        return
      }

      setProjects(updatedProjectsOrdered)
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
        formData,
        isCreated,
        isFetched,
        isEmpty,
        setFormData,
        createProject,
        deleteProject,
        getProjects,
        orderProjectByState,
        updateProject,
        getFormDataForUpdate,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}
