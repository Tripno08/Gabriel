import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'
import MobileLayout from '../../components/layout/MobileLayout'
import { Clock, CheckCircle, XCircle, TrendingUp, Star, ArrowRight, Search } from 'lucide-react'

interface RequestSummary {
  id: string
  serviceId: string
  serviceName: string
  providerName: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  date: string
  price: number
}

interface ReviewSummary {
  id: string
  serviceId: string
  serviceName: string
  providerName: string
  rating: number
  date: string
}

export default function ClientDashboardPage() {
  const { } = useAuth()
  const [recentRequests, setRecentRequests] = useState<RequestSummary[]>([])
  const [recentReviews, setRecentReviews] = useState<ReviewSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // Em um cenário real, chamaríamos a API
        // const response = await axios.get('http://localhost:3000/api/client/dashboard')
        
        // Para o MVP, usamos dados simulados
        // Simular requisições recentes
        const mockRequests: RequestSummary[] = [
          {
            id: '1',
            serviceId: '101',
            serviceName: 'Desenvolvimento de Site',
            providerName: 'João Silva',
            status: 'CONFIRMED',
            date: '2023-06-05T14:30:00Z',
            price: 1500
          },
          {
            id: '2',
            serviceId: '102',
            serviceName: 'Design de Interiores',
            providerName: 'Ana Costa',
            status: 'PENDING',
            date: '2023-06-01T10:15:00Z',
            price: 2000
          },
          {
            id: '3',
            serviceId: '103',
            serviceName: 'Consultoria Jurídica',
            providerName: 'Carlos Mendes',
            status: 'COMPLETED',
            date: '2023-05-20T16:45:00Z',
            price: 250
          }
        ]
        
        // Simular avaliações recentes
        const mockReviews: ReviewSummary[] = [
          {
            id: '1',
            serviceId: '103',
            serviceName: 'Consultoria Jurídica',
            providerName: 'Carlos Mendes',
            rating: 5,
            date: '2023-05-22T09:30:00Z'
          },
          {
            id: '2',
            serviceId: '104',
            serviceName: 'Aulas de Inglês',
            providerName: 'Pedro Santos',
            rating: 4,
            date: '2023-05-10T14:00:00Z'
          }
        ]
        
        // Simular estatísticas
        const mockStats = {
          totalRequests: 8,
          pendingRequests: 2,
          completedRequests: 5
        }
        
        setRecentRequests(mockRequests)
        setRecentReviews(mockReviews)
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
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-lg">Carregando dados do dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <MobileLayout>
      {/* Quick Stats Cards */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg mb-2 mx-auto">
              <TrendingUp className="w-5 h-5 text-primary-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 text-center">{stats.totalRequests}</p>
            <p className="text-xs text-gray-500 text-center">Total</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg mb-2 mx-auto">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 text-center">{stats.pendingRequests}</p>
            <p className="text-xs text-gray-500 text-center">Pendentes</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mb-2 mx-auto">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 text-center">{stats.completedRequests}</p>
            <p className="text-xs text-gray-500 text-center">Concluídas</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Ações Rápidas</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to="/services" 
              className="flex items-center p-3 bg-primary-50 rounded-lg border border-primary-100 hover:bg-primary-100 transition-colors"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                <Search className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-primary-700">Buscar Serviços</span>
            </Link>
            <Link 
              to="/client/reviews" 
              className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100 hover:bg-yellow-100 transition-colors"
            >
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                <Star className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-yellow-700">Avaliar</span>
            </Link>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Solicitações Recentes</h2>
              <Link to="/client/requests" className="flex items-center text-primary-600 text-sm font-medium">
                Ver todas
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recentRequests.length > 0 ? (
              recentRequests.slice(0, 3).map((request) => {
                const status = getStatusLabel(request.status)
                const statusIcons = {
                  PENDING: Clock,
                  CONFIRMED: CheckCircle,
                  COMPLETED: CheckCircle,
                  CANCELLED: XCircle
                }
                const StatusIcon = statusIcons[request.status]
                
                return (
                  <Link 
                    key={request.id} 
                    to={`/client/requests/${request.id}`}
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {request.serviceName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {request.providerName} • {formatDate(request.date)}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          R$ {request.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center ml-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })
            ) : (
              <div className="p-6 text-center">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Nenhuma solicitação ainda</p>
                <Link to="/services" className="text-primary-600 text-sm font-medium">
                  Encontrar serviços
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Avaliações Recentes</h2>
              <Link to="/client/reviews" className="flex items-center text-primary-600 text-sm font-medium">
                Ver todas
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recentReviews.length > 0 ? (
              recentReviews.slice(0, 3).map((review) => (
                <Link 
                  key={review.id} 
                  to={`/services/${review.serviceId}`}
                  className="block p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {review.serviceName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {review.providerName} • {formatDate(review.date)}
                      </p>
                      <div className="flex items-center mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-6 text-center">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Nenhuma avaliação ainda</p>
                <p className="text-xs text-gray-400 mt-1">Complete um serviço para avaliar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  )
} 