import { BrowserRouter } from 'react-router-dom'

import { Routes } from './routes'

import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}
