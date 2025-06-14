import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Service {
  id: string
  title: string
  description: string
  price: number
  imageUrl?: string
  category: string
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT'
  views: number
  requestsCount: number
}

export default function ProviderServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<Service['status'] | 'ALL'>('ALL')

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true)
      try {
        // Em um cenário real, chamaríamos a API
        // const response = await axios.get('http://localhost:3000/api/provider/services')
        
        // Para o MVP, usamos dados simulados
        const mockServices: Service[] = [
          {
            id: '1',
            title: 'Desenvolvimento de Site',
            description: 'Criação de sites responsivos com as últimas tecnologias.',
            price: 1500,
            imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
            category: 'Tecnologia',
            status: 'ACTIVE',
            views: 245,
            requestsCount: 5
          },
          {
            id: '2',
            title: 'Criação de Loja Virtual',
            description: 'Desenvolvimento de e-commerce completo com gestão de produtos e pagamentos.',
            price: 2800,
            imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
            category: 'E-commerce',
            status: 'ACTIVE',
            views: 178,
            requestsCount: 3
          },
          {
            id: '3',
            title: 'Manutenção de WordPress',
            description: 'Serviço mensal de manutenção, atualizações e backup para sites WordPress.',
            price: 350,
            imageUrl: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7',
            category: 'WordPress',
            status: 'ACTIVE',
            views: 92,
            requestsCount: 8
          },
          {
            id: '4',
            title: 'Design de Email Marketing',
            description: 'Criação de templates responsivos para email marketing.',
            price: 200,
            category: 'Marketing',
            status: 'DRAFT',
            views: 0,
            requestsCount: 0
          },
          {
            id: '5',
            title: 'Consultoria SEO',
            description: 'Análise e otimização de sites para mecanismos de busca.',
            price: 800,
            category: 'Marketing',
            status: 'INACTIVE',
            views: 47,
            requestsCount: 0
          }
        ]
        
        setServices(mockServices)
      } catch (err) {
        console.error('Erro ao buscar serviços:', err)
        setError('Não foi possível carregar seus serviços.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchServices()
  }, [])

  const handleStatusChange = async (serviceId: string, newStatus: Service['status']) => {
    // Em um cenário real, chamaríamos a API
    // await axios.patch(`http://localhost:3000/api/provider/services/${serviceId}`, { status: newStatus })
    
    // Para o MVP, atualizamos localmente
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === serviceId ? { ...service, status: newStatus } : service
      )
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getStatusLabel = (status: Service['status']) => {
    const statusMap = {
      ACTIVE: { label: 'Ativo', color: 'bg-green-100 text-green-800' },
      INACTIVE: { label: 'Inativo', color: 'bg-red-100 text-red-800' },
      DRAFT: { label: 'Rascunho', color: 'bg-gray-100 text-gray-800' }
    }
    
    return statusMap[status]
  }

  // Filtrar serviços com base no filtro selecionado
  const filteredServices = services.filter(service => 
    filter === 'ALL' ? true : service.status === filter
  )

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-lg">Carregando serviços...</p>
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Meus Serviços</h1>
          <p className="text-gray-600 mt-2">
            Gerencie os serviços que você oferece na plataforma.
          </p>
        </div>
        <Link
          to="/provider/services/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-flex items-center"
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
          Novo Serviço
        </Link>
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
              onClick={() => setFilter('ACTIVE')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'ACTIVE' 
                ? 'bg-green-600 text-white' 
                : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              Ativos
            </button>
            <button
              onClick={() => setFilter('INACTIVE')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'INACTIVE' 
                ? 'bg-red-600 text-white' 
                : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              Inativos
            </button>
            <button
              onClick={() => setFilter('DRAFT')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'DRAFT' 
                ? 'bg-gray-600 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Rascunhos
            </button>
          </div>
        </div>
      </div>
      
      {/* Lista de Serviços */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredServices.length > 0 ? (
          <div className="overflow-x-auto">
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
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visualizações
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Solicitações
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredServices.map((service) => {
                  const statusInfo = getStatusLabel(service.status)
                  
                  return (
                    <tr key={service.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 mr-3 bg-gray-200 rounded">
                            {service.imageUrl ? (
                              <img 
                                src={service.imageUrl} 
                                alt={service.title} 
                                className="h-10 w-10 rounded object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded flex items-center justify-center text-gray-500">
                                <svg 
                                  className="w-6 h-6" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24" 
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              <Link to={`/services/${service.id}`} className="hover:text-indigo-600">
                                {service.title}
                              </Link>
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {service.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(service.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.requestsCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          {service.status === 'DRAFT' && (
                            <button 
                              onClick={() => handleStatusChange(service.id, 'ACTIVE')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Publicar
                            </button>
                          )}
                          
                          {service.status === 'ACTIVE' && (
                            <button 
                              onClick={() => handleStatusChange(service.id, 'INACTIVE')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Desativar
                            </button>
                          )}
                          
                          {service.status === 'INACTIVE' && (
                            <button 
                              onClick={() => handleStatusChange(service.id, 'ACTIVE')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Ativar
                            </button>
                          )}
                          
                                                  <Link
                          to={`/provider/services/edit/${service.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Editar
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
            <p className="text-gray-500 mb-4">Nenhum serviço encontrado com os filtros aplicados.</p>
            <button
              onClick={() => setFilter('ALL')}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Ver Todos os Serviços
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 