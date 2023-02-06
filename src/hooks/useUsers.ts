import { useContext } from 'react'

import { UsersContext } from '../contexts/Users.context'

export function useUsers() {
  const context = useContext(UsersContext)

  return context
}
