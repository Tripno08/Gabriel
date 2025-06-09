import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface ServiceForm {
  title: string
  description: string
  category: string
  price: string
}

export default function ServiceNewPage() {
  const navigate = useNavigate()
  const [service, setService] = useState<ServiceForm>({
    title: '',
    description: '',
    category: '',
    price: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  
  const categories = [
    'Tecnologia',
    'Design',
    'Marketing',
    'Desenvolvimento Web',
    'E-commerce',
    'Consultoria',
    'Educação',
    'Saúde',
    'Bem-estar',
    'Serviços Domésticos',
    'Manutenção',
    'Jurídico',
    'Financeiro',
    'Outros'
  ]
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setService(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpar erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!service.title.trim()) {
      newErrors.title = 'O título é obrigatório'
    }
    
    if (!service.description.trim()) {
      newErrors.description = 'A descrição é obrigatória'
    } else if (service.description.length < 20) {
      newErrors.description = 'A descrição deve ter pelo menos 20 caracteres'
    }
    
    if (!service.category) {
      newErrors.category = 'A categoria é obrigatória'
    }
    
    if (!service.price) {
      newErrors.price = 'O preço é obrigatório'
    } else if (isNaN(parseFloat(service.price)) || parseFloat(service.price) <= 0) {
      newErrors.price = 'O preço deve ser um número válido maior que zero'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      // Em um cenário real, chamaríamos a API
      // const response = await axios.post('http://localhost:3000/api/provider/services', {
      //   ...service,
      //   price: parseFloat(service.price)
      // })
      
      // Para o MVP, simulamos um delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirecionamos para a página de serviços
      navigate('/provider/services')
    } catch (err) {
      console.error('Erro ao criar serviço:', err)
      setSubmitError('Não foi possível criar o serviço. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Adicionar Novo Serviço</h1>
        <p className="text-gray-600 mt-2">
          Cadastre um novo serviço que você oferece na plataforma.
        </p>
      </div>
      
      {submitError && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{submitError}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título do Serviço*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={service.title}
                onChange={handleInputChange}
                placeholder="Ex: Desenvolvimento de Website"
                className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição*
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={service.description}
                onChange={handleInputChange}
                placeholder="Descreva detalhadamente o serviço que você oferece..."
                className={`w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Categoria*
              </label>
              <select
                id="category"
                name="category"
                value={service.category}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Preço (R$)*
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={service.price}
                onChange={handleInputChange}
                placeholder="100.00"
                className={`w-full px-3 py-2 border rounded-md ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6 flex justify-between">
          <Link
            to="/provider/services"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </Link>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Serviço'}
          </button>
        </div>
      </form>
    </div>
  )
} 