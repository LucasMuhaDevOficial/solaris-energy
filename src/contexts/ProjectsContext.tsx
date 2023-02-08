import React, { Children, createContext, ReactNode } from 'react'

interface ProjectsContextType {}

export const ProjectsContext = createContext({} as ProjectsContextType)

interface ProjectsProviderProps {
  children: ReactNode
}

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  return (
    <ProjectsContext.Provider value={{}}>{children}</ProjectsContext.Provider>
  )
}
