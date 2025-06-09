import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const providerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  cpfCnpj: z.string().min(11, 'CPF/CNPJ deve ter pelo menos 11 dígitos'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  address: z.object({
    street: z.string().min(3, 'Rua deve ter pelo menos 3 caracteres'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(2, 'Bairro deve ter pelo menos 2 caracteres'),
    city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
    state: z.string().length(2, 'Estado deve ter 2 caracteres'),
    zipCode: z.string().length(8, 'CEP deve ter 8 dígitos'),
  }),
  categories: z.array(z.string()).min(1, 'Selecione pelo menos uma categoria'),
  bankInfo: z.object({
    bankName: z.string().min(1, 'Nome do banco é obrigatório'),
    accountType: z.enum(['CHECKING', 'SAVINGS']),
    accountNumber: z.string().min(1, 'Número da conta é obrigatório'),
    agency: z.string().min(1, 'Agência é obrigatória'),
  }),
  pixKey: z.string().optional(),
})

type Provider = z.infer<typeof providerSchema>

const CATEGORIES = [
  'Tecnologia',
  'Design',
  'Marketing',
  'E-commerce',
  'Desenvolvimento Web',
  'Redes Sociais',
  'SEO',
  'Redação',
  'Tradução',
  'Consultoria',
  'Educação',
  'Saúde',
  'Bem-estar',
  'Serviços Domésticos',
  'Serviços Empresariais',
  'Fotografia',
  'Vídeo',
  'Áudio',
  'Música',
  'Outros'
]

export default function ProviderProfileEditPage() {
  const [provider, setProvider] = useState<Provider>({
    name: 'Rafael Santos',
    email: 'rafael.santos@email.com',
    phone: '11999998888',
    cpfCnpj: '12345678900',
    description: 'Desenvolvedor web com mais de 10 anos de experiência em criação de sites, lojas virtuais e aplicações web.',
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Jardim Primavera',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234567',
    },
    categories: ['Tecnologia', 'Desenvolvimento Web', 'E-commerce'],
    bankInfo: {
      bankName: 'Banco Brasil',
      accountType: 'CHECKING',
      accountNumber: '12345-6',
      agency: '1234',
    },
    pixKey: 'rafael.santos@email.com',
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  
  // Simulando carregamento dos dados do prestador
  useEffect(() => {
    const fetchProviderData = async () => {
      setIsLoading(true)
      try {
        // Em um cenário real, chamaríamos a API
        // const response = await axios.get('http://localhost:3000/api/provider/profile')
        
        // Para o MVP, usamos dados simulados
        setTimeout(() => {
          setProvider({
            name: 'Rafael Santos',
            email: 'rafael.santos@email.com',
            phone: '11999998888',
            cpfCnpj: '12345678900',
            description: 'Desenvolvedor web com mais de 10 anos de experiência em criação de sites, lojas virtuais e aplicações web.',
            address: {
              street: 'Rua das Flores',
              number: '123',
              complement: 'Apto 45',
              neighborhood: 'Jardim Primavera',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01234567',
            },
            categories: ['Tecnologia', 'Desenvolvimento Web', 'E-commerce'],
            bankInfo: {
              bankName: 'Banco Brasil',
              accountType: 'CHECKING',
              accountNumber: '12345-6',
              agency: '1234',
            },
            pixKey: 'rafael.santos@email.com',
          })
          setIsLoading(false)
        }, 1000)
      } catch (err) {
        console.error('Erro ao carregar dados do perfil:', err)
        setLoadError('Não foi possível carregar os dados do seu perfil.')
        setIsLoading(false)
      }
    }
    
    fetchProviderData()
  }, [])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setProvider(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Provider] as Record<string, any>),
          [child]: value
        }
      }))
    } else {
      setProvider(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Limpar erro ao editar campo
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  const handleCategoryChange = (category: string) => {
    setProvider(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
      
      return { ...prev, categories }
    })
    
    // Limpar erro de categorias
    if (errors['categories']) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors['categories']
        return newErrors
      })
    }
  }
  
  const validateForm = () => {
    try {
      providerSchema.parse(provider)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {}
        
        error.errors.forEach(err => {
          const path = err.path.join('.')
          formattedErrors[path] = err.message
        })
        
        setErrors(formattedErrors)
      }
      return false
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(false)
    setSubmitError('')
    
    if (!validateForm()) {
      return
    }
    
    try {
      // Em um cenário real, chamaríamos a API
      // await axios.put('http://localhost:3000/api/provider/profile', provider)
      
      // Para o MVP, simulamos um delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err)
      setSubmitError('Não foi possível atualizar seu perfil. Tente novamente.')
    }
  }
  
  const formatCPFCNPJ = (value: string) => {
    // Remove caracteres não numéricos
    const numbers = value.replace(/\D/g, '')
    
    // Se for CPF (11 dígitos)
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
    
    // Se for CNPJ (14 dígitos)
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }
  
  const formatPhone = (value: string) => {
    // Remove caracteres não numéricos
    const numbers = value.replace(/\D/g, '')
    
    // Formato para telefones celulares
    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    
    // Formato para telefones fixos
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  
  const formatZipCode = (value: string) => {
    // Remove caracteres não numéricos
    const numbers = value.replace(/\D/g, '')
    
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2')
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-lg">Carregando dados do perfil...</p>
        </div>
      </div>
    )
  }
  
  if (loadError) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-lg text-red-600">{loadError}</p>
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
        <h1 className="text-3xl font-bold text-gray-800">Editar Perfil</h1>
        <p className="text-gray-600 mt-2">
          Atualize seus dados de prestador de serviços na plataforma.
        </p>
      </div>
      
      {success && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">Perfil atualizado com sucesso!</span>
        </div>
      )}
      
      {submitError && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{submitError}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={provider.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={provider.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone*
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formatPhone(provider.phone)}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="cpfCnpj" className="block text-sm font-medium text-gray-700 mb-1">
                CPF/CNPJ*
              </label>
              <input
                type="text"
                id="cpfCnpj"
                name="cpfCnpj"
                value={formatCPFCNPJ(provider.cpfCnpj)}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.cpfCnpj ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.cpfCnpj && (
                <p className="mt-1 text-sm text-red-600">{errors.cpfCnpj}</p>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição Profissional*
            </label>
            <textarea
              id="description"
              name="description"
              value={provider.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Endereço</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-1">
                Rua*
              </label>
              <input
                type="text"
                id="address.street"
                name="address.street"
                value={provider.address.street}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors['address.street'] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors['address.street'] && (
                <p className="mt-1 text-sm text-red-600">{errors['address.street']}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="address.number" className="block text-sm font-medium text-gray-700 mb-1">
                  Número*
                </label>
                <input
                  type="text"
                  id="address.number"
                  name="address.number"
                  value={provider.address.number}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors['address.number'] ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors['address.number'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['address.number']}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="address.complement" className="block text-sm font-medium text-gray-700 mb-1">
                  Complemento
                </label>
                <input
                  type="text"
                  id="address.complement"
                  name="address.complement"
                  value={provider.address.complement}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="address.neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
                Bairro*
              </label>
              <input
                type="text"
                id="address.neighborhood"
                name="address.neighborhood"
                value={provider.address.neighborhood}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors['address.neighborhood'] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors['address.neighborhood'] && (
                <p className="mt-1 text-sm text-red-600">{errors['address.neighborhood']}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                CEP*
              </label>
              <input
                type="text"
                id="address.zipCode"
                name="address.zipCode"
                value={formatZipCode(provider.address.zipCode)}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors['address.zipCode'] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors['address.zipCode'] && (
                <p className="mt-1 text-sm text-red-600">{errors['address.zipCode']}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-1">
                Cidade*
              </label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                value={provider.address.city}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors['address.city'] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors['address.city'] && (
                <p className="mt-1 text-sm text-red-600">{errors['address.city']}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 mb-1">
                Estado*
              </label>
              <select
                id="address.state"
                name="address.state"
                value={provider.address.state}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors['address.state'] ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Selecione</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
              {errors['address.state'] && (
                <p className="mt-1 text-sm text-red-600">{errors['address.state']}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Categorias de Serviços</h2>
          
          <div>
            <p className="mb-2 text-sm text-gray-700">Selecione as categorias em que você oferece serviços*</p>
            
            {errors.categories && (
              <p className="mb-3 text-sm text-red-600">{errors.categories}</p>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {CATEGORIES.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    checked={provider.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Informações Bancárias</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="bankInfo.bankName" className="block text-sm font-medium text-gray-700 mb-1">
                Banco*
              </label>
              <input
                type="text"
                id="bankInfo.bankName"
                name="bankInfo.bankName"
                value={provider.bankInfo.bankName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors['bankInfo.bankName'] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors['bankInfo.bankName'] && (
                <p className="mt-1 text-sm text-red-600">{errors['bankInfo.bankName']}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="bankInfo.accountType" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Conta*
              </label>
              <select
                id="bankInfo.accountType"
                name="bankInfo.accountType"
                value={provider.bankInfo.accountType}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors['bankInfo.accountType'] ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="CHECKING">Conta Corrente</option>
                <option value="SAVINGS">Conta Poupança</option>
              </select>
              {errors['bankInfo.accountType'] && (
                <p className="mt-1 text-sm text-red-600">{errors['bankInfo.accountType']}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="bankInfo.accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Número da Conta*
              </label>
              <input
                type="text"
                id="bankInfo.accountNumber"
                name="bankInfo.accountNumber"
                value={provider.bankInfo.accountNumber}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors['bankInfo.accountNumber'] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors['bankInfo.accountNumber'] && (
                <p className="mt-1 text-sm text-red-600">{errors['bankInfo.accountNumber']}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="bankInfo.agency" className="block text-sm font-medium text-gray-700 mb-1">
                Agência*
              </label>
              <input
                type="text"
                id="bankInfo.agency"
                name="bankInfo.agency"
                value={provider.bankInfo.agency}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors['bankInfo.agency'] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors['bankInfo.agency'] && (
                <p className="mt-1 text-sm text-red-600">{errors['bankInfo.agency']}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="pixKey" className="block text-sm font-medium text-gray-700 mb-1">
                Chave PIX (opcional)
              </label>
              <input
                type="text"
                id="pixKey"
                name="pixKey"
                value={provider.pixKey}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p className="mt-1 text-xs text-gray-500">
                Pode ser CPF, CNPJ, Email, Telefone ou Chave aleatória
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6 flex justify-between">
          <Link
            to="/provider/profile"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </Link>
          
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  )
} 