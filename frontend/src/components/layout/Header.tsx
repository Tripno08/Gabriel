import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../context/auth/AuthContext'

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Define links baseados no perfil do usuário
  const getProfileLinks = () => {
    if (!isAuthenticated) return []

    return user?.role === 'CLIENT'
      ? [
          { name: 'Meu Dashboard', href: '/client/dashboard' },
          { name: 'Meus Pedidos', href: '/client/requests' },
          { name: 'Minhas Avaliações', href: '/client/reviews' },
          { name: 'Meu Perfil', href: '/client/profile/edit' }
        ]
      : [
          { name: 'Dashboard', href: '/provider/dashboard' },
          { name: 'Meus Serviços', href: '/provider/services' },
          { name: 'Solicitações', href: '/provider/requests' },
          { name: 'Meu Perfil', href: '/provider/profile/edit' }
        ]
  }

  const profileLinks = getProfileLinks()

  // Links de navegação principal
  const navigationLinks = [
    { name: 'Início', href: '/' },
    { name: 'Serviços', href: '/services' },
    { name: 'Suporte', href: '/support' }
  ]

  return (
    <Disclosure as="nav" className="bg-white shadow-soft">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="text-xl font-bold text-primary-600">
                    Wyn
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Links de navegação para desktop */}
                  {navigationLinks.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        isActive
                          ? 'inline-flex items-center border-b-2 border-primary-500 px-1 pt-1 text-sm font-medium text-secondary-900'
                          : 'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-secondary-500 hover:border-secondary-300 hover:text-secondary-700'
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Ações do usuário para desktop */}
                {isAuthenticated ? (
                  <div className="relative ml-3">
                    <div>
                      <button
                        onClick={toggleDropdown}
                        className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">Abrir menu do usuário</span>
                        <UserCircleIcon className="h-8 w-8 text-secondary-400" aria-hidden="true" />
                      </button>
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-soft ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-4 py-2 text-sm text-secondary-700 border-b border-secondary-100">
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-xs text-secondary-500">{user?.email}</p>
                        </div>
                        {profileLinks.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                        <button
                          onClick={() => {
                            logout()
                            setIsDropdownOpen(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-secondary-50"
                        >
                          Sair
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/login"
                      className="text-secondary-600 hover:text-secondary-900 font-medium"
                    >
                      Entrar
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary"
                    >
                      Registrar
                    </Link>
                  </div>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Botão do menu mobile */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-secondary-400 hover:bg-secondary-50 hover:text-secondary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                  <span className="sr-only">Abrir menu principal</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Menu mobile */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigationLinks.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={NavLink}
                  to={item.href}
                  className={({ isActive }: { isActive: boolean }) =>
                    isActive
                      ? 'block border-l-4 border-primary-500 bg-primary-50 py-2 pl-3 pr-4 text-base font-medium text-primary-700'
                      : 'block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-secondary-500 hover:border-secondary-300 hover:bg-secondary-50 hover:text-secondary-700'
                  }
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {isAuthenticated ? (
              <div className="border-t border-secondary-200 pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <UserCircleIcon className="h-10 w-10 text-secondary-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-secondary-800">{user?.name}</div>
                    <div className="text-sm font-medium text-secondary-500">{user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {profileLinks.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      to={item.href}
                      className="block px-4 py-2 text-base font-medium text-secondary-500 hover:bg-secondary-50 hover:text-secondary-800"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                  <Disclosure.Button
                    as="button"
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-secondary-50"
                  >
                    Sair
                  </Disclosure.Button>
                </div>
              </div>
            ) : (
              <div className="border-t border-secondary-200 pt-4 pb-3">
                <div className="flex flex-col space-y-3 px-4">
                  <Link
                    to="/login"
                    className="block text-base font-medium text-secondary-500 hover:text-secondary-800"
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary inline-block text-center"
                  >
                    Registrar
                  </Link>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
} 