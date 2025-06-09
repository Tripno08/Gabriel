import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

interface Provider {
  id: string
  name: string
  imageUrl?: string
  bio: string
  location: string
  rating: number
  contactEmail: string
  specialties: string[]
  joinedDate: string
}

interface Service {
  id: string
  title: string
  description: string
  price: number
  imageUrl?: string
  category: string
}

interface Review {
  id: string
  userId: string
  userName: string
  serviceId: string
  serviceName: string
  rating: number
  comment: string
  createdAt: string
}

export default function ProviderProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [provider, setProvider] = useState<Provider | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProviderDetails = async () => {
      setIsLoading(true)
      try {
        // Em um cenário real, chamaríamos a API
        // const response = await axios.get(`http://localhost:3000/api/providers/${id}`)
        // setProvider(response.data)
        
        // Para o MVP, usamos dados simulados
        if (id) {
          // Simular busca pelo ID
          const mockProvider: Provider = {
            id,
            name: 'João Silva',
            imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
            bio: 'Desenvolvedor web com mais de 10 anos de experiência. Especializado em criação de sites e aplicativos web modernos, otimizados para SEO e com excelente experiência do usuário. Trabalho com as tecnologias mais recentes do mercado.',
            location: 'São Paulo, SP',
            rating: 4.8,
            contactEmail: 'joao.silva@example.com',
            specialties: ['Desenvolvimento Frontend', 'Design Responsivo', 'E-commerce', 'WordPress'],
            joinedDate: '2022-01-15T00:00:00Z'
          }
          
          setProvider(mockProvider)
          
          // Simular serviços do prestador
          const mockServices: Service[] = [
            {
              id: '1',
              title: 'Desenvolvimento de Site',
              description: 'Criação de sites responsivos com as últimas tecnologias.',
              price: 1500,
              imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
              category: 'Tecnologia'
            },
            {
              id: '2',
              title: 'Criação de Loja Virtual',
              description: 'Desenvolvimento de e-commerce completo com gestão de produtos e pagamentos.',
              price: 2800,
              imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
              category: 'E-commerce'
            },
            {
              id: '3',
              title: 'Manutenção de WordPress',
              description: 'Serviço mensal de manutenção, atualizações e backup para sites WordPress.',
              price: 350,
              imageUrl: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7',
              category: 'WordPress'
            }
          ]
          
          setServices(mockServices)
          
          // Simular avaliações
          const mockReviews: Review[] = [
            {
              id: '1',
              userId: '201',
              userName: 'Maria Oliveira',
              serviceId: '1',
              serviceName: 'Desenvolvimento de Site',
              rating: 5,
              comment: 'Excelente trabalho! O site ficou perfeito e foi entregue antes do prazo.',
              createdAt: '2023-05-15T14:30:00Z'
            },
            {
              id: '2',
              userId: '202',
              userName: 'Carlos Souza',
              serviceId: '2',
              serviceName: 'Criação de Loja Virtual',
              rating: 4,
              comment: 'Muito bom o resultado final. Apenas alguns pequenos ajustes foram necessários.',
              createdAt: '2023-04-22T10:15:00Z'
            },
            {
              id: '3',
              userId: '203',
              userName: 'Ana Ferreira',
              serviceId: '1',
              serviceName: 'Desenvolvimento de Site',
              rating: 5,
              comment: 'Profissional extremamente competente e atencioso. Recomendo!',
              createdAt: '2023-03-10T16:45:00Z'
            }
          ]
          
          setReviews(mockReviews)
        }
      } catch (err) {
        console.error('Erro ao buscar detalhes do prestador:', err)
        setError('Não foi possível carregar os detalhes do prestador.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProviderDetails()
  }, [id])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-lg">Carregando perfil do prestador...</p>
        </div>
      </div>
    )
  }

  if (error || !provider) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-lg text-red-600">{error || 'Prestador não encontrado.'}</p>
          <Link 
            to="/services" 
            className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Explorar serviços
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'long',
      year: 'numeric'
    }).format(date)
  }

  const formatReviewDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Perfil Principal */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          {/* Foto e Informações Básicas */}
          <div className="md:w-1/3 p-6 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
              {provider.imageUrl ? (
                <img 
                  src={provider.imageUrl} 
                  alt={provider.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                  <svg 
                    className="w-16 h-16" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-center">{provider.name}</h1>
            
            <div className="flex items-center mt-2 mb-4">
              <div className="flex items-center mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className={`w-5 h-5 ${star <= Math.round(provider.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">({provider.rating})</span>
            </div>
            
            <p className="text-gray-600 text-center mb-2">
              <svg 
                className="w-5 h-5 inline-block mr-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {provider.location}
            </p>
            
            <p className="text-gray-600 text-center mb-4">
              <svg 
                className="w-5 h-5 inline-block mr-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Membro desde {formatDate(provider.joinedDate)}
            </p>
            
            <a 
              href={`mailto:${provider.contactEmail}`}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full text-center"
            >
              Entrar em Contato
            </a>
          </div>
          
          {/* Bio e Especialidades */}
          <div className="md:w-2/3 p-6 border-t md:border-t-0 md:border-l border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Sobre</h2>
            <p className="text-gray-700 mb-6 whitespace-pre-line">{provider.bio}</p>
            
            <h2 className="text-xl font-semibold mb-4">Especialidades</h2>
            <div className="flex flex-wrap gap-2">
              {provider.specialties.map((specialty, index) => (
                <span 
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Serviços Oferecidos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Serviços Oferecidos</h2>
          
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-40 bg-gray-200">
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
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                        {service.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">
                        R$ {service.price.toFixed(2)}
                      </span>
                      <Link 
                        to={`/services/${service.id}`}
                        className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Este prestador ainda não oferece serviços.</p>
          )}
        </div>
      </div>
      
      {/* Avaliações */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Avaliações ({reviews.length})</h2>
          
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star} 
                            className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{formatReviewDate(review.createdAt)}</span>
                  </div>
                  
                  <p className="text-sm text-indigo-600 mb-2">
                    Serviço: <Link to={`/services/${review.serviceId}`}>{review.serviceName}</Link>
                  </p>
                  
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Este prestador ainda não possui avaliações.</p>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <Link 
          to="/services" 
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
          Voltar para lista de serviços
        </Link>
      </div>
    </div>
  )
} 