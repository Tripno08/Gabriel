import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

interface Request {
  id: string
  clientId: string
  clientName: string
  clientEmail: string
  clientPhone: string
  serviceId: string
  serviceName: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  date: string
  description: string
  price: number
  paymentStatus: 'PENDING' | 'PAID'
  messages: {
    id: string
    sender: 'CLIENT' | 'PROVIDER'
    content: string
    timestamp: string
  }[]
}

export default function ProviderRequestDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [request, setRequest] = useState<Request | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  
  useEffect(() => {
    const fetchRequestDetails = async () => {
      setIsLoading(true)
      try {
        // Em um cenário real, chamaríamos a API
        // const response = await axios.get(`http://localhost:3000/api/provider/requests/${id}`)
        
        // Para o MVP, simulamos dados
        setTimeout(() => {
          if (id === '1' || id === '2' || id === '3' || id === '4' || id === '5') {
            const mockRequest: Request = {
              id,
              clientId: '101',
              clientName: 'Maria Santos',
              clientEmail: 'maria@example.com',
              clientPhone: '(11) 98765-4321',
              serviceId: '201',
              serviceName: 'Desenvolvimento de Website',
              status: 'CONFIRMED',
              date: '2025-06-05T15:00:00Z',
              description: 'Criação de site institucional com 5 páginas e formulário de contato.',
              price: 1500,
              paymentStatus: 'PENDING',
              messages: [
                {
                  id: '1',
                  sender: 'CLIENT',
                  content: 'Olá, gostaria de saber quando podemos começar o projeto.',
                  timestamp: '2025-06-01T10:30:00Z'
                },
                {
                  id: '2',
                  sender: 'PROVIDER',
                  content: 'Olá! Podemos começar na próxima semana. Você já tem algum material pronto?',
                  timestamp: '2025-06-01T14:15:00Z'
                },
                {
                  id: '3',
                  sender: 'CLIENT',
                  content: 'Sim, tenho o logo e algumas imagens. Podemos marcar uma reunião?',
                  timestamp: '2025-06-02T09:45:00Z'
                }
              ]
            }
            setRequest(mockRequest)
          } else {
            setError('Solicitação não encontrada')
          }
          setIsLoading(false)
        }, 1000)
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
      CONFIRMED: { label: 'Confirmado', color: 'bg-green-100 text-green-800' },
      CANCELLED: { label: 'Cancelado', color: 'bg-red-100 text-red-800' },
      COMPLETED: { label: 'Concluído', color: 'bg-blue-100 text-blue-800' }
    }
    
    return statusMap[status]
  }
  
  const getPaymentStatusLabel = (status: Request['paymentStatus']) => {
    const statusMap = {
      PENDING: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
      PAID: { label: 'Pago', color: 'bg-green-100 text-green-800' }
    }
    
    return statusMap[status]
  }
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim()) {
      return
    }
    
    setIsSending(true)
    
    try {
      // Em um cenário real, chamaríamos a API
      // await axios.post(`http://localhost:3000/api/provider/requests/${id}/messages`, { content: newMessage })
      
      // Para o MVP, simulamos o envio
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Atualizamos localmente
      if (request) {
        const newMessageObj = {
          id: `temp-${Date.now()}`,
          sender: 'PROVIDER' as const,
          content: newMessage,
          timestamp: new Date().toISOString()
        }
        
        setRequest({
          ...request,
          messages: [...request.messages, newMessageObj]
        })
        
        setNewMessage('')
      }
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err)
      alert('Não foi possível enviar a mensagem. Tente novamente.')
    } finally {
      setIsSending(false)
    }
  }
  
  const handleUpdateStatus = async (newStatus: Request['status']) => {
    if (newStatus === 'CANCELLED' && !confirm('Tem certeza que deseja cancelar esta solicitação?')) {
      return
    }
    
    try {
      // Em um cenário real, chamaríamos a API
      // await axios.patch(`http://localhost:3000/api/provider/requests/${id}`, { status: newStatus })
      
      // Para o MVP, simulamos a atualização
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Atualizamos localmente
      if (request) {
        setRequest({
          ...request,
          status: newStatus
        })
      }
      
      alert(`Status atualizado com sucesso para ${getStatusLabel(newStatus).label}!`)
    } catch (err) {
      console.error('Erro ao atualizar status:', err)
      alert('Não foi possível atualizar o status. Tente novamente.')
    }
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-lg">Carregando detalhes da solicitação...</p>
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
            to="/provider/requests" 
            className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
          >
            Voltar para solicitações
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Detalhes da Solicitação</h1>
          <p className="text-gray-600 mt-1">
            Gerencie a solicitação e comunique-se com o cliente
          </p>
        </div>
        
        <Link 
          to="/provider/requests" 
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Cabeçalho */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{request.serviceName}</h2>
              <p className="text-gray-500 mt-1">Solicitação #{request.id}</p>
            </div>
            
            <div className="mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusLabel(request.status).color}`}>
                {getStatusLabel(request.status).label}
              </span>
              
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusLabel(request.paymentStatus).color}`}>
                Pagamento: {getPaymentStatusLabel(request.paymentStatus).label}
              </span>
            </div>
          </div>
        </div>
        
        {/* Detalhes */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Informações do Serviço</h3>
              
              <div className="space-y-2">
                <div>
                  <span className="text-gray-500">Data:</span>
                  <span className="ml-2">{formatDate(request.date)}</span>
                </div>
                
                <div>
                  <span className="text-gray-500">Valor:</span>
                  <span className="ml-2 font-semibold">{formatCurrency(request.price)}</span>
                </div>
                
                <div>
                  <span className="text-gray-500">Descrição:</span>
                  <p className="mt-1">{request.description}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Informações do Cliente</h3>
              
              <div className="space-y-2">
                <div>
                  <span className="text-gray-500">Nome:</span>
                  <span className="ml-2">{request.clientName}</span>
                </div>
                
                <div>
                  <span className="text-gray-500">Email:</span>
                  <span className="ml-2">{request.clientEmail}</span>
                </div>
                
                <div>
                  <span className="text-gray-500">Telefone:</span>
                  <span className="ml-2">{request.clientPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ações */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Ações</h3>
          
          <div className="flex flex-wrap gap-3">
            {request.status === 'PENDING' && (
              <>
                <button
                  onClick={() => handleUpdateStatus('CONFIRMED')}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Confirmar Solicitação
                </button>
                
                <button
                  onClick={() => handleUpdateStatus('CANCELLED')}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Recusar Solicitação
                </button>
              </>
            )}
            
            {request.status === 'CONFIRMED' && (
              <>
                <button
                  onClick={() => handleUpdateStatus('COMPLETED')}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Marcar como Concluído
                </button>
                
                <button
                  onClick={() => handleUpdateStatus('CANCELLED')}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Cancelar Solicitação
                </button>
              </>
            )}
            
            <Link
              to={`/provider/services/${request.serviceId}`}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Ver Serviço
            </Link>
          </div>
        </div>
        
        {/* Mensagens */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Mensagens</h3>
          
          <div className="space-y-4 mb-6 max-h-80 overflow-y-auto p-2">
            {request.messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-3 rounded-lg ${
                  message.sender === 'PROVIDER' 
                    ? 'bg-primary-50 ml-8' 
                    : 'bg-gray-100 mr-8'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium">
                    {message.sender === 'PROVIDER' ? 'Você' : request.clientName}
                  </span>
                  <span className="text-xs text-gray-500">{formatDate(message.timestamp)}</span>
                </div>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="mt-4">
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isSending}
              />
              <button
                type="submit"
                disabled={isSending || !newMessage.trim()}
                className={`px-4 py-2 bg-primary-600 text-white rounded-r-md ${
                  isSending || !newMessage.trim() ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-700'
                }`}
              >
                {isSending ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 