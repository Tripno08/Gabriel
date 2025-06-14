import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-secondary-200">
      <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-secondary-900">Wyn</h3>
            <p className="mt-2 text-secondary-600">
              Conectando clientes a prestadores de serviços de qualidade.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 uppercase tracking-wider">Links Rápidos</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-secondary-600 hover:text-primary-600">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-secondary-600 hover:text-primary-600">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-secondary-600 hover:text-primary-600">
                  Suporte
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-secondary-600 hover:text-primary-600">
                  Cadastre-se
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-secondary-600 hover:text-primary-600">
                  Entrar
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 uppercase tracking-wider">Contato</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-secondary-600">
                <span className="font-medium">E-mail:</span> contato@wyn.com.br
              </li>
              <li className="text-secondary-600">
                <span className="font-medium">Telefone:</span> (11) 9999-9999
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-secondary-200 pt-8">
          <p className="text-center text-sm text-secondary-500">
            &copy; {new Date().getFullYear()} Wyn. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
} 