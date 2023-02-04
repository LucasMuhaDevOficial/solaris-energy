import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowPathIcon } from '@heroicons/react/24/outline'

import logoImage from '../assets/logoImage.svg'
import { useAuth } from '../hooks/useAuth'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, isLogging } = useAuth()

  const navigate = useNavigate()

  async function handleSignIn(e: FormEvent) {
    e.preventDefault()
    signIn(email, password)
  }

  useEffect(() => {
    if (isLogging) {
      navigate('/projects')
    }
  }, [isLogging, navigate])

  return (
    <>
      <div className="w-full h-screen bg-center bg-no-repeat bg-cover bg-signin-pattern bg-zinc-100">
        <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="w-auto h-20 mx-auto"
                src={logoImage}
                alt="Solaris Energy"
              />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
                Painel do Usuário
              </h2>
              <p className="mt-2 text-sm text-center text-gray-600">
                Realize login para acompanhar o processo de seus projetos
                cadastrados
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Senha
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                    placeholder="Senha"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="block ml-2 text-sm text-gray-900"
                  >
                    Lembrar-me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-orange-600 hover:text-orange-500"
                    rel="noreferrer"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-orange-600 border border-transparent rounded-md group hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                  {isLogging ? (
                    <ArrowPathIcon
                      color="#fff"
                      className="h-5 animate-spin w-h-5"
                    />
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
