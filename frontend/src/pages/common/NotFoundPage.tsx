import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-bold tracking-tight text-primary-600 sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Página não encontrada
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Verifique o URL ou tente usar a navegação.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                to="/"
                className="btn btn-primary"
              >
                Voltar para a página inicial
              </Link>
              <Link
                to="/services"
                className="btn btn-outline"
              >
                Explorar serviços
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 