import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { 
  QuestionMarkCircleIcon, 
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon 
} from '@heroicons/react/24/outline'

interface FAQItem {
  id: number
  question: string
  answer: string
  category: 'geral' | 'cliente' | 'prestador' | 'pagamento' | 'seguranca'
}

const faqItems: FAQItem[] = [
  // Perguntas Gerais
  {
    id: 1,
    question: 'O que é o Wyn?',
    answer: 'O Wyn é uma plataforma que conecta clientes a prestadores de serviços qualificados. Nosso objetivo é facilitar a contratação de serviços com segurança, praticidade e qualidade.',
    category: 'geral'
  },
  {
    id: 2,
    question: 'Como funciona a plataforma?',
    answer: 'É simples! Clientes podem buscar por serviços, visualizar perfis de prestadores, solicitar orçamentos e agendar serviços. Prestadores podem criar perfis, listar seus serviços e receber solicitações de clientes interessados.',
    category: 'geral'
  },
  {
    id: 3,
    question: 'O Wyn é gratuito?',
    answer: 'O cadastro e navegação na plataforma são totalmente gratuitos para clientes. Para prestadores, oferecemos planos com diferentes benefícios. Consulte nossa página de planos para mais informações.',
    category: 'geral'
  },

  // Perguntas para Clientes
  {
    id: 4,
    question: 'Como encontro um prestador de serviços?',
    answer: 'Você pode usar nossa busca para encontrar serviços por categoria, localização ou nome. Cada prestador tem um perfil detalhado com avaliações de outros clientes, portfólio e informações sobre os serviços oferecidos.',
    category: 'cliente'
  },
  {
    id: 5,
    question: 'Como solicito um orçamento?',
    answer: 'Ao encontrar um serviço do seu interesse, clique em "Solicitar Orçamento". Preencha os detalhes do que precisa e o prestador entrará em contato com você através da plataforma.',
    category: 'cliente'
  },
  {
    id: 6,
    question: 'Posso cancelar uma solicitação?',
    answer: 'Sim, você pode cancelar uma solicitação a qualquer momento antes do serviço ser iniciado. Acesse "Meus Pedidos" e selecione a opção de cancelamento.',
    category: 'cliente'
  },

  // Perguntas para Prestadores
  {
    id: 7,
    question: 'Como me cadastro como prestador?',
    answer: 'Clique em "Registrar" e selecione "Sou um Prestador". Preencha suas informações profissionais, adicione seus serviços e documentos necessários. Após a verificação, seu perfil estará ativo.',
    category: 'prestador'
  },
  {
    id: 8,
    question: 'Como recebo pagamentos?',
    answer: 'Os pagamentos são processados através da plataforma para garantir segurança. Você pode configurar sua conta bancária no perfil e solicitar transferências após a conclusão dos serviços.',
    category: 'prestador'
  },
  {
    id: 9,
    question: 'Posso definir minha área de atendimento?',
    answer: 'Sim! No seu perfil, você pode definir as regiões onde atende, seja por bairros, cidades ou raio de distância. Isso ajuda a receber solicitações apenas de clientes na sua área.',
    category: 'prestador'
  },

  // Perguntas sobre Pagamento
  {
    id: 10,
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos cartões de crédito, débito, PIX e boleto bancário. O pagamento é processado de forma segura através da plataforma.',
    category: 'pagamento'
  },
  {
    id: 11,
    question: 'Quando devo pagar pelo serviço?',
    answer: 'O pagamento é feito após a confirmação do orçamento e antes do início do serviço. O valor fica retido pela plataforma e é liberado ao prestador após a conclusão satisfatória do serviço.',
    category: 'pagamento'
  },
  {
    id: 12,
    question: 'E se eu não ficar satisfeito com o serviço?',
    answer: 'Oferecemos um sistema de mediação para resolver disputas. Se houver problemas, abra uma reclamação em até 48 horas após o serviço e nossa equipe ajudará a encontrar uma solução justa.',
    category: 'pagamento'
  },

  // Perguntas sobre Segurança
  {
    id: 13,
    question: 'Os prestadores são verificados?',
    answer: 'Sim, todos os prestadores passam por um processo de verificação que inclui validação de documentos, antecedentes e qualificações profissionais quando aplicável.',
    category: 'seguranca'
  },
  {
    id: 14,
    question: 'Meus dados estão seguros?',
    answer: 'Absolutamente! Utilizamos criptografia de ponta e seguimos as melhores práticas de segurança. Seus dados pessoais e financeiros são protegidos e nunca compartilhados sem sua autorização.',
    category: 'seguranca'
  },
  {
    id: 15,
    question: 'Como funciona o sistema de avaliações?',
    answer: 'Após cada serviço, clientes podem avaliar prestadores com notas de 1 a 5 estrelas e comentários. Essas avaliações são públicas e ajudam outros usuários na escolha de profissionais.',
    category: 'seguranca'
  }
]

export default function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos')
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const categories = [
    { id: 'todos', name: 'Todas as Perguntas', icon: QuestionMarkCircleIcon },
    { id: 'geral', name: 'Geral', icon: QuestionMarkCircleIcon },
    { id: 'cliente', name: 'Para Clientes', icon: QuestionMarkCircleIcon },
    { id: 'prestador', name: 'Para Prestadores', icon: QuestionMarkCircleIcon },
    { id: 'pagamento', name: 'Pagamentos', icon: QuestionMarkCircleIcon },
    { id: 'seguranca', name: 'Segurança', icon: QuestionMarkCircleIcon }
  ]

  const filteredFAQs = selectedCategory === 'todos' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory)

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-secondary-900">Central de Suporte</h1>
          <p className="mt-2 text-secondary-600">
            Encontre respostas para suas dúvidas ou entre em contato conosco
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar com categorias */}
          <div className="lg:col-span-1">
            <div className="card p-4">
              <h2 className="font-semibold text-secondary-900 mb-4">Categorias</h2>
              <nav className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-secondary-600 hover:bg-secondary-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{category.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Contato */}
            <div className="card p-4 mt-6">
              <h2 className="font-semibold text-secondary-900 mb-4">Precisa de mais ajuda?</h2>
              <div className="space-y-3">
                <a
                  href="mailto:suporte@wyn.com"
                  className="flex items-center space-x-3 text-secondary-600 hover:text-primary-600"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  <span className="text-sm">suporte@wyn.com</span>
                </a>
                <a
                  href="tel:+5511999999999"
                  className="flex items-center space-x-3 text-secondary-600 hover:text-primary-600"
                >
                  <PhoneIcon className="w-5 h-5" />
                  <span className="text-sm">(11) 99999-9999</span>
                </a>
                <button className="flex items-center space-x-3 text-secondary-600 hover:text-primary-600">
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  <span className="text-sm">Chat ao vivo</span>
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredFAQs.map((item) => (
                <div key={item.id} className="card">
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary-50 transition-colors"
                  >
                    <h3 className="text-secondary-900 font-medium pr-4">{item.question}</h3>
                    {expandedItems.includes(item.id) ? (
                      <ChevronUpIcon className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedItems.includes(item.id) && (
                    <div className="px-6 pb-4">
                      <p className="text-secondary-600 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-secondary-500">Nenhuma pergunta encontrada nesta categoria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 