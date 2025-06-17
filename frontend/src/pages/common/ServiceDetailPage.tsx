import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'

interface Service {
  id: string
  title: string
  description: string
  price: number
  imageUrl?: string
  category: string
  providerId: string
  providerName: string
  providerRating: number
  location: string
  availability: string[]
}

interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [service, setService] = useState<Service | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchServiceDetails = async () => {
      setIsLoading(true)
      try {
        // Em um cenário real, chamaríamos a API
        // const response = await axios.get(`http://localhost:3000/api/services/${id}`)
        // setService(response.data)
        
        // Para o MVP, usamos dados simulados
        if (id) {
          // Simular busca pelo ID
          const mockService: Service = {
            id,
            title: 'Desenvolvimento de Site',
            description: 'Criação de sites responsivos com as últimas tecnologias. Inclui design personalizado, integração com sistemas de gerenciamento de conteúdo, otimização para SEO e compatibilidade com dispositivos móveis. Nosso processo inclui reuniões de alinhamento, wireframes, protótipos interativos e implementação.',
            price: 1500,
            imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
            category: 'Tecnologia',
            providerId: '101',
            providerName: 'João Silva',
            providerRating: 4.8,
            location: 'São Paulo, SP',
            availability: ['Segunda a Sexta', '9h às 18h']
          }
          
          setService(mockService)
          
          // Simular reviews
          const mockReviews: Review[] = [
            {
              id: '1',
              userId: '201',
              userName: 'Maria Oliveira',
              rating: 5,
              comment: 'Excelente trabalho! O site ficou perfeito e foi entregue antes do prazo.',
              createdAt: '2023-05-15T14:30:00Z'
            },
            {
              id: '2',
              userId: '202',
              userName: 'Carlos Souza',
              rating: 4,
              comment: 'Muito bom o resultado final. Apenas alguns pequenos ajustes foram necessários.',
              createdAt: '2023-04-22T10:15:00Z'
            },
            {
              id: '3',
              userId: '203',
              userName: 'Ana Ferreira',
              rating: 5,
              comment: 'Profissional extremamente competente e atencioso. Recomendo!',
              createdAt: '2023-03-10T16:45:00Z'
            }
          ]
          
          setReviews(mockReviews)
        }
      } catch (err) {
        console.error('Erro ao buscar detalhes do serviço:', err)
        setError('Não foi possível carregar os detalhes do serviço.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchServiceDetails()
  }, [id])

  const handleRequestService = () => {
    if (!user) {
      // Redirecionar para login se não estiver autenticado
      navigate('/login', { state: { redirect: `/services/${id}` } })
      return
    }
    
    // TODO: Implementar modal ou página de confirmação de solicitação
    // Por enquanto, apenas mostrar um alerta e redirecionar
    alert('Serviço solicitado com sucesso! O prestador entrará em contato em breve.')
    navigate('/client/requests')
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-lg">Carregando detalhes do serviço...</p>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-lg text-red-600">{error || 'Serviço não encontrado.'}</p>
          <Link 
            to="/services" 
            className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Voltar para lista de serviços
          </Link>
        </div>
      </div>
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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Imagem e informações principais */}
        <div className="md:flex">
          <div className="md:w-1/2 h-64 md:h-auto">
            {service.imageUrl ? (
              <img 
                src={service.imageUrl} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                Sem imagem
              </div>
            )}
          </div>
          
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{service.title}</h1>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                {service.category}
              </span>
            </div>
            
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-800 mb-4">
                R$ {service.price.toFixed(2)}
              </p>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      className={`w-5 h-5 ${star <= Math.round(service.providerRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">({service.providerRating})</span>
              </div>
              
              <p className="text-gray-600 mb-4">
                <strong>Prestador:</strong>{' '}
                <Link 
                  to={`/providers/${service.providerId}`}
                  className="text-indigo-600 hover:underline"
                >
                  {service.providerName}
                </Link>
              </p>
              
              <p className="text-gray-600 mb-4">
                <strong>Localização:</strong> {service.location}
              </p>
              
              <p className="text-gray-600 mb-4">
                <strong>Disponibilidade:</strong> {service.availability.join(' • ')}
              </p>
              
              <button
                onClick={handleRequestService}
                className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Solicitar Serviço
              </button>
            </div>
          </div>
        </div>
        
        {/* Descrição */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Descrição</h2>
          <p className="text-gray-700 whitespace-pre-line">{service.description}</p>
        </div>
        
        {/* Avaliações */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Avaliações ({reviews.length})</h2>
          
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start">
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
                    <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Este serviço ainda não possui avaliações.</p>
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