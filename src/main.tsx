import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'
import { AuthProvider } from './contexts/AuthContext'
import { UsersProvider } from './contexts/UsersContext'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <UsersProvider>
        <App />
      </UsersProvider>
    </AuthProvider>
  </React.StrictMode>
)
