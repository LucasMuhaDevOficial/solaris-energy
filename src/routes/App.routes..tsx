import { Routes, Route } from 'react-router-dom'

import { Home } from '../pages/Home'
import { SignIn } from '../pages/SignIn'
import { Users } from '../pages/Users'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  )
}
