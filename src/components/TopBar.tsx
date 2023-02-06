import { Fragment } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

import logoImage from '../assets/logoImage.svg'
import { useAuth } from '../hooks/useAuth'

export function TopBar() {
  const { pathname } = useLocation()
  const { signOut } = useAuth()

  const user = {
    name: 'Tony Stark',
    email: 'tony@example.com',
    imageUrl: 'https://avatars.githubusercontent.com/u/76168122?v=4',
  }

  const navigation = [
    {
      name: 'Projetos',
      href: '/projects',
      current: pathname === '/projects' ? true : false,
    },
    {
      name: 'Usuários',
      href: '/users',
      current: pathname === '/users' ? true : false,
    },
  ]

  const userNavigation = [
    { name: 'Seu perfil', href: '#' },
    { name: 'Configurações', href: '#' },
    { name: 'Sair', href: '/signin', onClick: () => signOut() },
  ]

  return (
    <>
      <Disclosure as="nav" className="bg-black">
        {({ open }) => (
          <>
            <div>
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8"
                        src={logoImage}
                        alt="Solaris Energy"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="flex items-baseline ml-10 space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.href}
                            to={item.href}
                            className={clsx(
                              'text-white  hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium',
                              {
                                ['bg-orange-500 text-white']: item.current,
                                ['hover:bg-orange-700']: !item.current,
                              }
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center ml-4 md:ml-6">
                      <button
                        type="button"
                        className="p-1 text-white bg-orange-500 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon
                          className="w-6 h-6 text-orange"
                          aria-hidden="true"
                        />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-700">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="object-cover w-8 h-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <NavLink
                                    to={item.href}
                                    className={clsx(
                                      'block px-4 py-2 text-sm text-gray-700',
                                      {
                                        ['bg-orange-100']: active,
                                      }
                                    )}
                                    onClick={item.onClick}
                                  >
                                    {item.name}
                                  </NavLink>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="flex -mr-2 md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 text-black bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block w-6 h-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block w-6 h-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={clsx(
                      'text-white  hover:text-white block px-3 py-2 rounded-md text-base font-medium',
                      {
                        ['bg-orange-500 text-white']: item.current,
                        ['hover:bg-orange-700']: !item.current,
                      }
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex-shrink-0 p-1 ml-auto text-white bg-orange-500 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-700"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="px-2 mt-3 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-orange-500 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}
