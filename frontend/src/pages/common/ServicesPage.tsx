import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  price: number
  imageUrl?: string
  category: string
  providerId: string
  providerName: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobile, setIsMobile] = useState(false)

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
    const fetchServices = async () => {
      setIsLoading(true)
      try {
        // Em um cenário real, chamaríamos a API
        // const response = await axios.get('http://localhost:3000/api/services')
        // setServices(response.data)
        
        // Para o MVP, usamos dados simulados
        const mockServices: Service[] = [
          {
            id: '1',
            title: 'Desenvolvimento de Site',
            description: 'Criação de sites responsivos com as últimas tecnologias.',
            price: 1500,
            imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
            category: 'Tecnologia',
            providerId: '101',
            providerName: 'João Silva'
          },
          {
            id: '2',
            title: 'Design de Interiores',
            description: 'Transforme sua casa com projetos personalizados de design.',
            price: 2000,
            imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6',
            category: 'Design',
            providerId: '102',
            providerName: 'Ana Costa'
          },
          {
            id: '3',
            title: 'Aulas de Inglês',
            description: 'Aulas particulares para todos os níveis com professor nativo.',
            price: 80,
            imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
            category: 'Educação',
            providerId: '103',
            providerName: 'Pedro Santos'
          },
          {
            id: '4',
            title: 'Consultoria Jurídica',
            description: 'Assessoria jurídica especializada para empresas e pessoas físicas.',
            price: 250,
            imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
            category: 'Jurídico',
            providerId: '104',
            providerName: 'Carla Mendes'
          },
          {
            id: '5',
            title: 'Manutenção de Ar Condicionado',
            description: 'Serviços de instalação, limpeza e manutenção de sistemas de ar condicionado.',
            price: 180,
            imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200',
            category: 'Manutenção',
            providerId: '105',
            providerName: 'Roberto Alves'
          },
          {
            id: '6',
            title: 'Marketing Digital',
            description: 'Estratégias completas de marketing digital para sua empresa.',
            price: 1200,
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
            category: 'Marketing',
            providerId: '106',
            providerName: 'Fernanda Lima'
          },
        ]
        
        setServices(mockServices)
        
        // Extrair categorias únicas
        const uniqueCategories = Array.from(new Set(mockServices.map(service => service.category)))
        setCategories(uniqueCategories)
        
      } catch (err) {
        console.error('Erro ao buscar serviços:', err)
        setError('Não foi possível carregar os serviços.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchServices()
  }, [])

  // Filtrar serviços por categoria e termo de busca
  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory ? service.category === selectedCategory : true
    const matchesSearch = searchTerm 
      ? service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    
    return matchesCategory && matchesSearch
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  if (isLoading) {
    return (
      <div className={isMobile ? "flex-1 flex items-center justify-center px-4" : "container mx-auto py-8 px-4"}>
        <div className="text-center">
          <p className="text-lg">Carregando serviços...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={isMobile ? "flex-1 flex items-center justify-center px-4" : "container mx-auto py-8 px-4"}>
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="space-y-4 p-4">
        {/* Filtros Mobile */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar serviços..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de Serviços Mobile */}
        {filteredServices.length > 0 ? (
          <div className="space-y-4">
            {filteredServices.map((service) => (
              <Link 
                key={service.id}
                to={`/services/${service.id}`}
                className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex">
                  <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                    {service.imageUrl ? (
                      <img 
                        src={service.imageUrl} 
                        alt={service.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        Sem imagem
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{service.title}</h3>
                      <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium ml-2 whitespace-nowrap">
                        {service.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-xs line-clamp-2 mb-2">{service.description}</p>
                    
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-gray-500">Por {service.providerName}</span>
                      <span className="font-bold text-primary-600 text-sm">{formatCurrency(service.price)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-4">Nenhum serviço encontrado.</p>
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('')
              }}
              className="text-primary-600 text-sm font-medium"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    )
  }

  // Layout desktop (original)
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Serviços Disponíveis</h1>
      
      {/* Filtros */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Buscar serviços..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-1/3">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Lista de serviços */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                {service.imageUrl ? (
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Sem imagem
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold">{service.title}</h2>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {service.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Por {service.providerName}</p>
                    <p className="text-2xl font-bold text-indigo-600">{formatCurrency(service.price)}</p>
                  </div>
                  
                  <Link 
                    to={`/services/${service.id}`}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">Nenhum serviço encontrado.</p>
          <button 
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('')
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  )
} 