import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeftIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/outline'

// Schema de validação
const serviceSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  category: z.string().min(1, 'Selecione uma categoria'),
  price: z.string().optional(),
  duration: z.string().optional(),
  location: z.string().optional(),
})

type ServiceFormData = z.infer<typeof serviceSchema>

// Categorias disponíveis
const categories = [
  'Tecnologia',
  'Design',
  'Marketing',
  'Educação',
  'Saúde',
  'Beleza',
  'Manutenção',
  'Consultoria',
  'Outros'
]

export default function ServiceEditPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [images, setImages] = useState<string[]>([])
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema)
  })

  useEffect(() => {
    loadService()
  }, [id])

  const loadService = async () => {
    try {
      // Simular carregamento do serviço
      // const response = await axios.get(`/api/provider/services/${id}`)
      
      // Dados mockados para demonstração
      const mockService = {
        id,
        name: 'Desenvolvimento de Sites',
        description: 'Criação de sites profissionais com design moderno e responsivo. Inclui otimização para SEO e integração com redes sociais.',
        category: 'Tecnologia',
        price: '1500.00',
        duration: '30 dias',
        location: 'Remoto',
        images: [
          'https://via.placeholder.com/400x300',
          'https://via.placeholder.com/400x300'
        ]
      }
      
      reset({
        name: mockService.name,
        description: mockService.description,
        category: mockService.category,
        price: mockService.price,
        duration: mockService.duration,
        location: mockService.location
      })
      
      setImages(mockService.images)
    } catch (error) {
      console.error('Erro ao carregar serviço:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: ServiceFormData) => {
    try {
      setIsSaving(true)
      
      // Simular atualização do serviço
      // await axios.put(`/api/provider/services/${id}`, {
      //   ...data,
      //   images
      // })
      
      console.log('Serviço atualizado:', { ...data, images })
      
      // Redirecionar para a lista de serviços
      navigate('/provider/services')
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // Simular upload de imagens
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner w-8 h-8"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/provider/services')}
            className="flex items-center text-secondary-600 hover:text-secondary-900 mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Voltar para serviços
          </button>
          <h1 className="text-3xl font-bold text-secondary-900">Editar Serviço</h1>
          <p className="mt-2 text-secondary-600">
            Atualize as informações do seu serviço
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">
              Informações Básicas
            </h2>
            
            {/* Nome do Serviço */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
                Nome do Serviço *
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="input"
                placeholder="Ex: Desenvolvimento de Sites"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Categoria */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-secondary-700 mb-1">
                Categoria *
              </label>
              <select
                {...register('category')}
                id="category"
                className="input"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            {/* Descrição */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-secondary-700 mb-1">
                Descrição *
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows={4}
                className="input"
                placeholder="Descreva seu serviço em detalhes..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Preço */}
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-secondary-700 mb-1">
                Preço (R$)
              </label>
              <input
                {...register('price')}
                type="text"
                id="price"
                className="input"
                placeholder="Ex: 1500.00"
              />
              <p className="mt-1 text-xs text-secondary-500">
                Deixe em branco para "Sob consulta"
              </p>
            </div>

            {/* Duração */}
            <div className="mb-4">
              <label htmlFor="duration" className="block text-sm font-medium text-secondary-700 mb-1">
                Duração Estimada
              </label>
              <input
                {...register('duration')}
                type="text"
                id="duration"
                className="input"
                placeholder="Ex: 30 dias, 2 horas"
              />
            </div>

            {/* Localização */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-secondary-700 mb-1">
                Local de Atendimento
              </label>
              <input
                {...register('location')}
                type="text"
                id="location"
                className="input"
                placeholder="Ex: São Paulo, Remoto"
              />
            </div>
          </div>

          {/* Imagens */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">
              Imagens do Serviço
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {/* Botão de adicionar imagem */}
              <label className="border-2 border-dashed border-secondary-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 transition-colors">
                <PhotoIcon className="w-8 h-8 text-secondary-400 mb-2" />
                <span className="text-sm text-secondary-600">Adicionar foto</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <p className="text-xs text-secondary-500">
              Adicione até 5 imagens do seu serviço. Formatos aceitos: JPG, PNG
            </p>
          </div>

          {/* Botões de ação */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/provider/services')}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-primary"
            >
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 