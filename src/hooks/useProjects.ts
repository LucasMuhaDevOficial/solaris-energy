import { useContext } from 'react'

import { ProjectsContext } from '../contexts/ProjectsContext'

export function useProjects() {
  const context = useContext(ProjectsContext)

  return context
}
