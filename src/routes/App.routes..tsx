import { Routes, Route } from 'react-router-dom'

import { Projects } from '../pages/Projects'
import { SignIn } from '../pages/SignIn'
import { Users } from '../pages/Users'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  )
}
