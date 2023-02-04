import { Outlet } from 'react-router-dom'

import { TopBar } from '../components/TopBar'

export function DefaultLayout() {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  )
}
