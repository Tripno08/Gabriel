import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Review {
  id: string
  serviceId: string
  serviceName: string
  providerId: string
  providerName: string
  rating: number
  comment: string
  date: string
}

export default function ClientReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [pendingReviews, setPendingReviews] = useState<{
    requestId: string
    serviceId: string
    serviceName: string
    providerId: string
    providerName: string
  }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true)
      try {
        // Em um cenário real, chamaríamos a API
        // const response = await axios.get('http://localhost:3000/api/client/reviews')
        
        // Para o MVP, usamos dados simulados
        const mockReviews: Review[] = [
          {
            id: '1',
            serviceId: '101',
            serviceName: 'Consultoria Jurídica',
            providerId: '201',
            providerName: 'Carlos Mendes',
            rating: 5,
            comment: 'Excelente profissional, muito atencioso e competente. Resolveu meu problema rapidamente.',
            date: '2023-05-22T09:30:00Z'
          },
          {
            id: '2',
            serviceId: '102',
            serviceName: 'Aulas de Inglês',
            providerId: '202',
            providerName: 'Pedro Santos',
            rating: 4,
            comment: 'Ótimas aulas, didática muito boa. Recomendo!',
            date: '2023-05-10T14:00:00Z'
          },
          {
            id: '3',
            serviceId: '103',
            serviceName: 'Manutenção de Ar Condicionado',
            providerId: '203',
            providerName: 'Roberto Alves',
            rating: 5,
            comment: 'Serviço rápido e bem feito. Preço justo.',
            date: '2023-04-15T11:20:00Z'
          }
        ]
        
        // Simular serviços que precisam de avaliação
        const mockPendingReviews = [
          {
            requestId: '301',
            serviceId: '104',
            serviceName: 'Design de Interiores',
            providerId: '204',
            providerName: 'Ana Costa'
          },
          {
            requestId: '302',
            serviceId: '105',
            serviceName: 'Marketing Digital',
            providerId: '205',
            providerName: 'Fernanda Lima'
          }
        ]
        
        setReviews(mockReviews)
        setPendingReviews(mockPendingReviews)
      } catch (err) {
        console.error('Erro ao buscar avaliações:', err)
        setError('Não foi possível carregar suas avaliações.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchReviews()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-lg">Carregando avaliações...</p>
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
        <h1 className="text-3xl font-bold text-gray-800">Minhas Avaliações</h1>
        <p className="text-gray-600 mt-2">
          Veja e gerencie as avaliações que você fez para os serviços contratados.
        </p>
      </div>
      
      {/* Serviços Pendentes de Avaliação */}
      {pendingReviews.length > 0 && (
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Pendentes de Avaliação</h2>
            <p className="text-gray-600 mt-1">
              Compartilhe sua experiência sobre estes serviços que você utilizou recentemente.
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {pendingReviews.map((item) => (
              <div key={item.requestId} className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    <Link to={`/services/${item.serviceId}`} className="hover:text-indigo-600">
                      {item.serviceName}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Prestador: {' '}
                    <Link to={`/providers/${item.providerId}`} className="hover:text-indigo-600">
                      {item.providerName}
                    </Link>
                  </p>
                </div>
                <Link 
                  to={`/client/reviews/add/${item.requestId}`}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Avaliar Agora
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Avaliações Feitas */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Avaliações Realizadas</h2>
        </div>
        
        {reviews.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <div key={review.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link to={`/services/${review.serviceId}`} className="hover:text-indigo-600">
                        {review.serviceName}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Prestador: {' '}
                      <Link to={`/providers/${review.providerId}`} className="hover:text-indigo-600">
                        {review.providerName}
                      </Link>
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                </div>
                
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      className={`w-5 h-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="mt-3 text-gray-700">
                  {review.comment}
                </p>
                
                <div className="mt-4 flex gap-4">
                  <Link 
                    to={`/client/reviews/edit/${review.id}`}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    Editar
                  </Link>
                  <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            Você ainda não fez nenhuma avaliação.
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <Link 
          to="/client/dashboard" 
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