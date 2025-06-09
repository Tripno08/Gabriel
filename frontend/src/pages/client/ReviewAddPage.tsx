import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

interface Request {
  id: string
  serviceId: string
  serviceName: string
  providerId: string
  providerName: string
  date: string
  description: string
}

export default function ReviewAddPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const [request, setRequest] = useState<Request | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  useEffect(() => {
    const fetchRequestDetails = async () => {
      setIsLoading(true)
      try {
        // Em um cenário real, chamaríamos a API
        // const response = await axios.get(`http://localhost:3000/api/client/requests/${id}`)
        
        // Para o MVP, simulamos dados
        setTimeout(() => {
          if (id === '1' || id === '2' || id === '3' || id === '4' || id === '5') {
            const mockRequest: Request = {
              id,
              serviceId: '101',
              serviceName: 'Desenvolvimento de Website',
              providerId: '201',
              providerName: 'João Silva',
              date: '2025-06-05T15:00:00Z',
              description: 'Criação de site institucional com 5 páginas e formulário de contato.'
            }
            setRequest(mockRequest)
          } else {
            setError('Solicitação não encontrada')
          }
          setIsLoading(false)
        }, 800)
      } catch (err) {
        console.error('Erro ao buscar detalhes da solicitação:', err)
        setError('Não foi possível carregar os detalhes da solicitação.')
        setIsLoading(false)
      }
    }
    
    fetchRequestDetails()
  }, [id])
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }
  
  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }
  
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      alert('Por favor, selecione uma classificação de 1 a 5 estrelas.')
      return
    }
    
    if (!comment.trim()) {
      alert('Por favor, adicione um comentário sobre sua experiência.')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Em um cenário real, chamaríamos a API
      // await axios.post(`http://localhost:3000/api/client/reviews`, {
      //   requestId: id,
      //   serviceId: request?.serviceId,
      //   providerId: request?.providerId,
      //   rating,
      //   comment
      // })
      
      // Para o MVP, simulamos o envio
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Avaliação enviada com sucesso!')
      navigate('/client/reviews')
    } catch (err) {
      console.error('Erro ao enviar avaliação:', err)
      alert('Não foi possível enviar a avaliação. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
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
  
  if (error || !request) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-lg text-red-600">{error || 'Solicitação não encontrada.'}</p>
          <Link 
            to="/client/reviews" 
            className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
          >
            Voltar para minhas avaliações
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Avaliar Serviço</h1>
          <p className="text-gray-600 mt-1">
            Compartilhe sua experiência com este serviço
          </p>
        </div>
        
        <Link 
          to="/client/reviews" 
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Detalhes do serviço */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Detalhes do Serviço</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Serviço:</p>
              <p className="font-medium">{request.serviceName}</p>
            </div>
            
            <div>
              <p className="text-gray-500">Data:</p>
              <p className="font-medium">{formatDate(request.date)}</p>
            </div>
            
            <div>
              <p className="text-gray-500">Prestador:</p>
              <p className="font-medium">{request.providerName}</p>
            </div>
            
            <div>
              <p className="text-gray-500">Descrição:</p>
              <p className="font-medium">{request.description}</p>
            </div>
          </div>
        </div>
        
        {/* Formulário de avaliação */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Sua Avaliação
            </label>
            
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="text-3xl focus:outline-none"
                >
                  <span className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                </button>
              ))}
              
              <span className="ml-2 text-gray-600">
                {rating === 0 ? 'Selecione uma classificação' : `${rating} ${rating === 1 ? 'estrela' : 'estrelas'}`}
              </span>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="comment" className="block text-lg font-semibold text-gray-800 mb-2">
              Seu Comentário
            </label>
            
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Compartilhe detalhes sobre sua experiência com este serviço..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={6}
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || rating === 0 || !comment.trim()}
              className={`px-6 py-2 bg-primary-600 text-white rounded-md ${
                isSubmitting || rating === 0 || !comment.trim() ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-700'
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 