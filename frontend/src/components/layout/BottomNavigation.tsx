import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'
import { 
  Home, 
  Search, 
  Plus, 
  MessageCircle, 
  User,
  Briefcase,
  Settings,
  Star
} from 'lucide-react'

export default function BottomNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const isActive = (path: string) => location.pathname === path

  const clientTabs = [
    {
      id: 'home',
      label: 'Início',
      icon: Home,
      path: '/client/dashboard'
    },
    {
      id: 'services',
      label: 'Serviços',
      icon: Search,
      path: '/services'
    },
    {
      id: 'requests',
      label: 'Pedidos',
      icon: MessageCircle,
      path: '/client/requests'
    },
    {
      id: 'reviews',
      label: 'Avaliações',
      icon: Star,
      path: '/client/reviews'
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: User,
      path: '/client/profile/edit'
    }
  ]

  const providerTabs = [
    {
      id: 'home',
      label: 'Início',
      icon: Home,
      path: '/provider/dashboard'
    },
    {
      id: 'services',
      label: 'Serviços',
      icon: Briefcase,
      path: '/provider/services'
    },
    {
      id: 'add',
      label: 'Criar',
      icon: Plus,
      path: '/provider/services/new'
    },
    {
      id: 'requests',
      label: 'Pedidos',
      icon: MessageCircle,
      path: '/provider/requests'
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: Settings,
      path: '/provider/profile/edit'
    }
  ]

  const tabs = user?.role === 'PROVIDER' ? providerTabs : clientTabs

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-200 safe-area-bottom z-40 shadow-soft">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = isActive(tab.path)
          
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center p-2 min-w-0 flex-1 ${
                active 
                  ? 'text-primary-600' 
                  : 'text-secondary-400 hover:text-secondary-600'
              } transition-colors duration-200`}
            >
              <div className={`relative ${tab.id === 'add' ? 'p-2 rounded-full' : ''} ${
                tab.id === 'add' && active ? 'bg-primary-600' : ''
              } ${tab.id === 'add' && !active ? 'bg-primary-500' : ''}`}>
                <Icon 
                  className={`w-6 h-6 ${
                    tab.id === 'add' ? 'text-white' : ''
                  } ${active && tab.id !== 'add' ? 'text-primary-600' : ''}`} 
                />
                {active && tab.id !== 'add' && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></div>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium truncate ${
                active ? 'text-primary-600' : 'text-secondary-400'
              } ${tab.id === 'add' ? 'text-secondary-600' : ''}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
} 