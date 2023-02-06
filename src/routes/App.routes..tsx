import { Routes, Route, Navigate } from 'react-router-dom'

import { DefaultLayout } from '../layouts/DefaultLayout'
import { Projects } from '../pages/Projects'
import { SignIn } from '../pages/SignIn'
import { Users } from '../pages/Users'

import { PrivateRoutes } from './Private.routes'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  )
}
