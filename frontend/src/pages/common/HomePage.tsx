import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'

export default function HomePage() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div 
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-secondary-300 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Conectamos talentos a quem precisa
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A plataforma que conecta clientes a prestadores de serviços de qualidade.
              Encontre o profissional ideal para suas necessidades ou ofereça seus serviços.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {isAuthenticated ? (
                <Link
                  to={user?.role === 'CLIENT' ? '/client/dashboard' : '/provider/dashboard'}
                  className="btn btn-primary px-6 py-3 text-base"
                >
                  Ir para meu Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn btn-primary px-6 py-3 text-base"
                  >
                    Começar agora
                  </Link>
                  <Link
                    to="/services"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Explorar serviços <span aria-hidden="true">→</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Como funciona</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simples, rápido e eficiente
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Nossa plataforma facilita a conexão entre quem precisa de serviços e quem os oferece.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
                  1
                </div>
                Cadastre-se
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Crie sua conta como cliente ou prestador de serviços em apenas alguns minutos.
                </p>
              </dd>
            </div>
            
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
                  2
                </div>
                {isAuthenticated && user?.role === 'PROVIDER' ? 'Crie seus serviços' : 'Encontre serviços'}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  {isAuthenticated && user?.role === 'PROVIDER' 
                    ? 'Publique seus serviços com descrições detalhadas para atrair clientes.'
                    : 'Navegue por nossa variedade de serviços ou busque por categoria ou palavra-chave.'}
                </p>
              </dd>
            </div>
            
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
                  3
                </div>
                {isAuthenticated && user?.role === 'PROVIDER' ? 'Receba solicitações' : 'Contrate o serviço'}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  {isAuthenticated && user?.role === 'PROVIDER'
                    ? 'Gerencie solicitações, interaja com clientes e receba avaliações positivas.'
                    : 'Entre em contato com o prestador, solicite o serviço e deixe sua avaliação.'}
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {isAuthenticated 
              ? 'Pronto para aproveitar ao máximo a plataforma?' 
              : 'Pronto para começar?'}
          </h2>
          <p className="mt-6 text-lg leading-8 text-primary-100">
            {isAuthenticated
              ? 'Acesse seu dashboard e comece a explorar todos os recursos.'
              : 'Cadastre-se hoje mesmo e descubra como podemos te ajudar.'}
          </p>
          <div className="mt-10">
            {isAuthenticated ? (
              <Link
                to={user?.role === 'CLIENT' ? '/client/dashboard' : '/provider/dashboard'}
                className="btn bg-white text-primary-600 hover:bg-primary-50 px-6 py-3"
              >
                Ir para o Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                className="btn bg-white text-primary-600 hover:bg-primary-50 px-6 py-3"
              >
                Criar conta gratuitamente
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 