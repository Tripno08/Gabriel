import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'

interface Client {
  name: string
  email: string
  phone: string
  cpfCnpj: string
  address: {
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}

export default function ClientProfileEditPage() {
  const { user } = useAuth()
  const [client, setClient] = useState<Client>({
    name: '',
    email: '',
    phone: '',
    cpfCnpj: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
    }
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  
  // Simulando carregamento dos dados do cliente
  useEffect(() => {
    const fetchClientData = async () => {
      setIsLoading(true)
      try {
        // Em um cenário real, chamaríamos a API
        // const response = await axios.get('http://localhost:3000/api/client/profile')
        
        // Para o MVP, usamos dados simulados
        setTimeout(() => {
          setClient({
            name: user?.name || 'Maria Silva',
            email: user?.email || 'maria.silva@email.com',
            phone: '11988887777',
            cpfCnpj: '98765432100',
            address: {
              street: 'Avenida Paulista',
              number: '1000',
              complement: 'Sala 110',
              neighborhood: 'Bela Vista',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01310100',
            }
          })
          setIsLoading(false)
        }, 1000)
      } catch (err) {
        console.error('Erro ao carregar dados do perfil:', err)
        setLoadError('Não foi possível carregar os dados do seu perfil.')
        setIsLoading(false)
      }
    }
    
    fetchClientData()
  }, [user])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Lidar com campos aninhados (ex: address.street)
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      if (parent === 'address') {
        setClient(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [child]: value
          }
        }))
      }
    } else {
      setClient(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Limpar erro do campo se existir
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
    
    // Validação de campos obrigatórios
    if (!client.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }
    
    if (!client.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(client.email)) {
      newErrors.email = 'Email inválido'
    }
    
    if (!client.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório'
    } else if (!/^\d{10,11}$/.test(client.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Telefone inválido'
    }
    
    if (!client.cpfCnpj.trim()) {
      newErrors.cpfCnpj = 'CPF é obrigatório'
    } else if (!/^\d{11}$/.test(client.cpfCnpj.replace(/\D/g, ''))) {
      newErrors.cpfCnpj = 'CPF inválido'
    }
    
    // Validação de endereço
    if (!client.address.street.trim()) {
      newErrors['address.street'] = 'Rua é obrigatória'
    }
    
    if (!client.address.number.trim()) {
      newErrors['address.number'] = 'Número é obrigatório'
    }
    
    if (!client.address.neighborhood.trim()) {
      newErrors['address.neighborhood'] = 'Bairro é obrigatório'
    }
    
    if (!client.address.city.trim()) {
      newErrors['address.city'] = 'Cidade é obrigatória'
    }
    
    if (!client.address.state.trim()) {
      newErrors['address.state'] = 'Estado é obrigatório'
    }
    
    if (!client.address.zipCode.trim()) {
      newErrors['address.zipCode'] = 'CEP é obrigatório'
    } else if (!/^\d{8}$/.test(client.address.zipCode.replace(/\D/g, ''))) {
      newErrors['address.zipCode'] = 'CEP inválido'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
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
      // await axios.put('http://localhost:3000/api/client/profile', client)
      
      // Para o MVP, simulamos um delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err)
      setSubmitError('Não foi possível atualizar seu perfil. Tente novamente.')
    }
  }
  
  const formatCPF = (value: string) => {
    // Remove caracteres não numéricos
    const numbers = value.replace(/\D/g, '')
    
    // Formato CPF: XXX.XXX.XXX-XX
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
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
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
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
          Atualize seus dados pessoais na plataforma.
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
                value={client.name}
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
                value={client.email}
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
                value={formatPhone(client.phone)}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="cpfCnpj" className="block text-sm font-medium text-gray-700 mb-1">
                CPF*
              </label>
              <input
                type="text"
                id="cpfCnpj"
                name="cpfCnpj"
                value={formatCPF(client.cpfCnpj)}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.cpfCnpj ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.cpfCnpj && (
                <p className="mt-1 text-sm text-red-600">{errors.cpfCnpj}</p>
              )}
            </div>
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
                value={client.address.street}
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
                  value={client.address.number}
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
                  value={client.address.complement}
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
                value={client.address.neighborhood}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors['address.neighborhood'] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors['address.neighborhood'] && (
                <p className="mt-1 text-sm text-red-600">{errors['address.neighborhood']}</p>
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
                value={client.address.city}
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
                value={client.address.state}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors['address.state'] ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Selecione...</option>
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
            
            <div>
              <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                CEP*
              </label>
              <input
                type="text"
                id="address.zipCode"
                name="address.zipCode"
                value={formatZipCode(client.address.zipCode)}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors['address.zipCode'] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors['address.zipCode'] && (
                <p className="mt-1 text-sm text-red-600">{errors['address.zipCode']}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6 flex justify-between">
          <Link
            to="/client/dashboard"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </Link>
          
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  )
} 