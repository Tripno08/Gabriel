import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Request {
  id: string
  serviceId: string
  serviceName: string
  providerName: string
  providerId: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  date: string
  price: number
  notes?: string
}

export default function ClientRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<Request['status'] | 'ALL'>('ALL')

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true)
      try {
        // Em um cenário real, chamaríamos a API
        // const response = await axios.get('http://localhost:3000/api/client/requests')
        
        // Para o MVP, usamos dados simulados
        const mockRequests: Request[] = [
          {
            id: '1',
            serviceId: '101',
            serviceName: 'Desenvolvimento de Site',
            providerId: '201',
            providerName: 'João Silva',
            status: 'CONFIRMED',
            date: '2023-06-05T14:30:00Z',
            price: 1500,
            notes: 'Preciso de um site para minha loja de roupas'
          },
          {
            id: '2',
            serviceId: '102',
            serviceName: 'Design de Interiores',
            providerId: '202',
            providerName: 'Ana Costa',
            status: 'PENDING',
            date: '2023-06-01T10:15:00Z',
            price: 2000,
            notes: 'Reforma da sala de estar'
          },
          {
            id: '3',
            serviceId: '103',
            serviceName: 'Consultoria Jurídica',
            providerId: '203',
            providerName: 'Carlos Mendes',
            status: 'COMPLETED',
            date: '2023-05-20T16:45:00Z',
            price: 250,
            notes: 'Revisão de contrato de aluguel'
          },
          {
            id: '4',
            serviceId: '104',
            serviceName: 'Aulas de Inglês',
            providerId: '204',
            providerName: 'Pedro Santos',
            status: 'CANCELLED',
            date: '2023-05-15T09:00:00Z',
            price: 80
          },
          {
            id: '5',
            serviceId: '105',
            serviceName: 'Manutenção de Ar Condicionado',
            providerId: '205',
            providerName: 'Roberto Alves',
            status: 'COMPLETED',
            date: '2023-05-10T13:30:00Z',
            price: 180
          }
        ]
        
        setRequests(mockRequests)
      } catch (err) {
        console.error('Erro ao buscar solicitações:', err)
        setError('Não foi possível carregar suas solicitações.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchRequests()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }

  const getStatusLabel = (status: Request['status']) => {
    const statusMap = {
      PENDING: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
      CONFIRMED: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800' },
      COMPLETED: { label: 'Concluído', color: 'bg-green-100 text-green-800' },
      CANCELLED: { label: 'Cancelado', color: 'bg-red-100 text-red-800' }
    }
    
    return statusMap[status]
  }

  // Filtrar solicitações com base no filtro selecionado
  const filteredRequests = requests.filter(request => 
    filter === 'ALL' ? true : request.status === filter
  )

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-lg">Carregando solicitações...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Minhas Solicitações</h1>
        <p className="text-gray-600 mt-2">
          Gerencie e acompanhe o status de todas as suas solicitações de serviços.
        </p>
      </div>
      
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Filtrar por Status</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'ALL' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('PENDING')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'PENDING' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              }`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setFilter('CONFIRMED')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'CONFIRMED' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              Confirmados
            </button>
            <button
              onClick={() => setFilter('COMPLETED')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'COMPLETED' 
                ? 'bg-green-600 text-white' 
                : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              Concluídos
            </button>
            <button
              onClick={() => setFilter('CANCELLED')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'CANCELLED' 
                ? 'bg-red-600 text-white' 
                : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              Cancelados
            </button>
          </div>
        </div>
      </div>
      
      {/* Lista de Solicitações */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serviço
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prestador
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => {
                  const status = getStatusLabel(request.status)
                  
                  return (
                    <tr key={request.id}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          <Link to={`/services/${request.serviceId}`} className="text-indigo-600 hover:text-indigo-900">
                            {request.serviceName}
                          </Link>
                        </div>
                        {request.notes && (
                          <div className="text-sm text-gray-500 mt-1 truncate max-w-xs">
                            {request.notes}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <Link to={`/providers/${request.providerId}`} className="hover:text-indigo-600">
                            {request.providerName}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(request.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        R$ {request.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          {request.status === 'COMPLETED' && (
                            <Link to={`/client/reviews/add/${request.id}`} className="text-indigo-600 hover:text-indigo-900">
                              Avaliar
                            </Link>
                          )}
                          {request.status === 'PENDING' && (
                            <button className="text-red-600 hover:text-red-900">
                              Cancelar
                            </button>
                          )}
                          <Link to={`/client/requests/${request.id}`} className="text-indigo-600 hover:text-indigo-900 ml-4">
                            Detalhes
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">Nenhuma solicitação encontrada com os filtros aplicados.</p>
            <button
              onClick={() => setFilter('ALL')}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Ver Todas as Solicitações
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <Link
          to="/services"
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-flex items-center"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Solicitar Novo Serviço
        </Link>
      </div>
    </div>
  )
} 