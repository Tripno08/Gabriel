import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Request {
  id: string
  clientId: string
  clientName: string
  serviceId: string
  serviceName: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  date: string
  price: number
  notes?: string
}

export default function ProviderRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<Request['status'] | 'ALL'>('ALL')

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true)
      try {
        // Em um cenário real, chamaríamos a API
        // const response = await axios.get('http://localhost:3000/api/provider/requests')
        
        // Para o MVP, usamos dados simulados
        const mockRequests: Request[] = [
          {
            id: '1',
            clientId: '101',
            clientName: 'Maria Oliveira',
            serviceId: '201',
            serviceName: 'Desenvolvimento de Site',
            status: 'CONFIRMED',
            date: '2023-06-05T14:30:00Z',
            price: 1500,
            notes: 'Preciso de um site para minha loja de roupas com sistema de e-commerce integrado.'
          },
          {
            id: '2',
            clientId: '102',
            clientName: 'Carlos Souza',
            serviceId: '202',
            serviceName: 'Criação de Loja Virtual',
            status: 'PENDING',
            date: '2023-06-01T10:15:00Z',
            price: 2800,
            notes: 'Quero uma loja virtual completa com sistema de pagamento e integração com marketplaces.'
          },
          {
            id: '3',
            clientId: '103',
            clientName: 'Ana Ferreira',
            serviceId: '201',
            serviceName: 'Desenvolvimento de Site',
            status: 'COMPLETED',
            date: '2023-05-20T16:45:00Z',
            price: 1500,
            notes: 'Site institucional para minha clínica de fisioterapia.'
          },
          {
            id: '4',
            clientId: '104',
            clientName: 'João Silva',
            serviceId: '203',
            serviceName: 'Manutenção de WordPress',
            status: 'CANCELLED',
            date: '2023-05-15T09:00:00Z',
            price: 350
          },
          {
            id: '5',
            clientId: '105',
            clientName: 'Fernanda Lima',
            serviceId: '203',
            serviceName: 'Manutenção de WordPress',
            status: 'PENDING',
            date: '2023-06-08T13:30:00Z',
            price: 350,
            notes: 'Preciso atualizar plugins e melhorar a performance do meu blog.'
          }
        ]
        
        setRequests(mockRequests)
      } catch (err) {
        console.error('Erro ao buscar solicitações:', err)
        setError('Não foi possível carregar as solicitações.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchRequests()
  }, [])

  const handleStatusChange = async (requestId: string, newStatus: Request['status']) => {
    // Em um cenário real, chamaríamos a API
    // await axios.patch(`http://localhost:3000/api/provider/requests/${requestId}`, { status: newStatus })
    
    // Para o MVP, atualizamos localmente
    setRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    )
  }

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
        <h1 className="text-3xl font-bold text-gray-800">Solicitações de Serviços</h1>
        <p className="text-gray-600 mt-2">
          Gerencie e responda às solicitações de seus serviços.
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
                    Cliente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serviço
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
                          {request.clientName}
                        </div>
                      </td>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(request.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(request.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          {request.status === 'PENDING' && (
                            <>
                              <button 
                                onClick={() => handleStatusChange(request.id, 'CONFIRMED')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Confirmar
                              </button>
                              <button 
                                onClick={() => handleStatusChange(request.id, 'CANCELLED')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Recusar
                              </button>
                            </>
                          )}
                          
                          {request.status === 'CONFIRMED' && (
                            <button 
                              onClick={() => handleStatusChange(request.id, 'COMPLETED')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Concluir
                            </button>
                          )}
                          
                          <Link 
                            to={`/provider/requests/${request.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
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
      
      <div className="mt-6">
        <Link 
          to="/provider/dashboard" 
          className="text-indigo-600 hover:underline flex items-center"
        >
          <svg 
            className="w-4 h-4 mr-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar para o Dashboard
        </Link>
      </div>
    </div>
  )
} 