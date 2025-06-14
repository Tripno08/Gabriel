import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'
import { 
  TrendingUp, 
  Clock, 
  DollarSign,
  Briefcase,
  Plus,
  Eye
} from 'lucide-react'

interface Service {
  id: string
  title: string
  category: string
  price: number
  views: number
}

interface RequestSummary {
  id: string
  clientName: string
  serviceId: string
  serviceName: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  date: string
  price: number
}

export default function ProviderDashboardPage() {
  const { user } = useAuth()
  const [services, setServices] = useState<Service[]>([])
  const [recentRequests, setRecentRequests] = useState<RequestSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [stats, setStats] = useState({
    totalServices: 0,
    pendingRequests: 0,
    totalEarnings: 0,
    averageRating: 0
  })

  useEffect(() => {
    const checkMobile = () => {
      const isCapacitor = !!(window as any).Capacitor
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isSmallScreen = window.innerWidth <= 768
      
      return isCapacitor || (isMobileUserAgent && isSmallScreen)
    }

    setIsMobile(checkMobile())

    const handleResize = () => {
      setIsMobile(checkMobile())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // Em um cenário real, chamaríamos a API
        // const response = await axios.get('http://localhost:3000/api/provider/dashboard')
        
        // Para o MVP, usamos dados simulados
        // Simular serviços
        const mockServices: Service[] = [
          {
            id: '1',
            title: 'Desenvolvimento de Site',
            category: 'Tecnologia',
            price: 1500,
            views: 245
          },
          {
            id: '2',
            title: 'Criação de Loja Virtual',
            category: 'E-commerce',
            price: 2800,
            views: 178
          },
          {
            id: '3',
            title: 'Manutenção de WordPress',
            category: 'WordPress',
            price: 350,
            views: 92
          }
        ]
        
        // Simular solicitações recentes
        const mockRequests: RequestSummary[] = [
          {
            id: '1',
            clientName: 'Maria Oliveira',
            serviceId: '1',
            serviceName: 'Desenvolvimento de Site',
            status: 'CONFIRMED',
            date: '2023-06-05T14:30:00Z',
            price: 1500
          },
          {
            id: '2',
            clientName: 'Carlos Souza',
            serviceId: '2',
            serviceName: 'Criação de Loja Virtual',
            status: 'PENDING',
            date: '2023-06-01T10:15:00Z',
            price: 2800
          },
          {
            id: '3',
            clientName: 'Ana Ferreira',
            serviceId: '1',
            serviceName: 'Desenvolvimento de Site',
            status: 'COMPLETED',
            date: '2023-05-20T16:45:00Z',
            price: 1500
          }
        ]
        
        // Simular estatísticas
        const mockStats = {
          totalServices: 3,
          pendingRequests: 2,
          totalEarnings: 5000,
          averageRating: 4.8
        }
        
        setServices(mockServices)
        setRecentRequests(mockRequests)
        setStats(mockStats)
        
      } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getStatusLabel = (status: RequestSummary['status']) => {
    const statusMap = {
      PENDING: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
      CONFIRMED: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800' },
      COMPLETED: { label: 'Concluído', color: 'bg-green-100 text-green-800' },
      CANCELLED: { label: 'Cancelado', color: 'bg-red-100 text-red-800' }
    }
    
    return statusMap[status]
  }

  if (isLoading) {
    return (
      <div className={isMobile ? "flex-1 flex items-center justify-center px-4" : "container mx-auto py-8 px-4"}>
        <div className="text-center">
          <p className="text-lg">Carregando dados do dashboard...</p>
        </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="space-y-6 p-4">
        {/* Estatísticas em grid 3 colunas */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.totalServices}</p>
              <p className="text-xs text-gray-500 mt-1">Serviços</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-center">
              <Clock className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
              <p className="text-xs text-gray-500 mt-1">Pendentes</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-center">
              <DollarSign className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.totalEarnings).replace('R$', 'R$').replace('.', 'k')}</p>
              <p className="text-xs text-gray-500 mt-1">Faturamento</p>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to="/provider/services/new"
              className="bg-primary-500 text-white rounded-lg p-4 text-center hover:bg-primary-600 transition-colors"
            >
              <Plus className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Criar Serviço</span>
            </Link>
            
            <Link 
              to="/provider/requests"
              className="bg-gray-100 text-gray-700 rounded-lg p-4 text-center hover:bg-gray-200 transition-colors"
            >
              <Briefcase className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Ver Solicitações</span>
            </Link>
          </div>
        </div>

        {/* Meus Serviços */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Meus Serviços</h3>
              <Link to="/provider/services" className="text-primary-600 text-sm font-medium">
                Ver todos
              </Link>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            {services.length > 0 ? (
              services.slice(0, 3).map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm truncate">{service.title}</h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-gray-500">{service.category}</span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Eye className="h-3 w-3 mr-1" />
                        {service.views}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary-600 text-sm">{formatCurrency(service.price)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p className="text-sm">Você ainda não oferece nenhum serviço.</p>
                <Link to="/provider/services/new" className="text-primary-600 text-sm mt-2 inline-block">
                  Criar primeiro serviço
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Solicitações Recentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Solicitações Recentes</h3>
              <Link to="/provider/requests" className="text-primary-600 text-sm font-medium">
                Ver todas
              </Link>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            {recentRequests.length > 0 ? (
              recentRequests.slice(0, 3).map((request) => {
                const status = getStatusLabel(request.status)
                return (
                  <Link 
                    key={request.id}
                    to={`/provider/requests/${request.id}`}
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{request.clientName}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1 truncate">{request.serviceName}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{formatDate(request.date)}</span>
                      <span className="font-semibold text-primary-600 text-sm">{formatCurrency(request.price)}</span>
                    </div>
                  </Link>
                )
              })
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p className="text-sm">Nenhuma solicitação recente.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Layout desktop (original)
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Olá, {user?.name || 'Prestador'}!
        </h1>
        <p className="text-gray-600 mt-2">
          Bem-vindo ao seu painel de controle. Aqui você pode gerenciar seus serviços e solicitações.
        </p>
      </div>
      
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">Serviços</h2>
              <p className="mt-2 text-3xl font-bold text-gray-800">{stats.totalServices}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">Pendentes</h2>
              <p className="mt-2 text-3xl font-bold text-gray-800">{stats.pendingRequests}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">Faturamento</h2>
              <p className="mt-2 text-3xl font-bold text-gray-800">{formatCurrency(stats.totalEarnings)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">Avaliação</h2>
              <p className="mt-2 text-3xl font-bold text-gray-800">{stats.averageRating.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Serviços Oferecidos */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Meus Serviços</h2>
            <Link to="/provider/services" className="text-indigo-600 hover:text-indigo-800">
              Ver todos
            </Link>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {services.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serviço
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visualizações
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/services/${service.id}`} className="text-indigo-600 hover:text-indigo-900">
                        {service.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(service.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link to={`/provider/services/edit/${service.id}`} className="text-primary-600 hover:text-primary-900 mr-4">
                            Editar
                          </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center text-gray-500">
              Você ainda não oferece nenhum serviço.
            </div>
          )}
        </div>
      </div>
      
      {/* Solicitações Recentes */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Solicitações Recentes</h2>
            <Link to="/provider/requests" className="text-indigo-600 hover:text-indigo-800">
              Ver todas
            </Link>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {recentRequests.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serviço
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentRequests.map((request) => {
                  const status = getStatusLabel(request.status)
                  return (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.clientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.serviceName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(request.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(request.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/provider/requests/${request.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Ver
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center text-gray-500">
              Nenhuma solicitação recente.
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 