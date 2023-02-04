import { Outlet } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { SignIn } from '../pages/SignIn'

export function PrivateRoutes() {
  const { user } = useAuth()

  return user?.uid ? <Outlet /> : <SignIn />
}
