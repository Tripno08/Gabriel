import { Link, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <h1 className="text-3xl font-bold text-primary-600">Gabriel</h1>
        </Link>
        <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">
          Bem-vindo(a) de volta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium">
            Voltar para a página inicial
          </Link>
        </p>
      </div>
    </div>
  )
} 