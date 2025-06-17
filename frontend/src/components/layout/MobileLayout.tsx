import type { ReactNode } from 'react'
import BottomNavigation from './BottomNavigation'
import { useAuth } from '../../context/auth/AuthContext'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface MobileLayoutProps {
  children: ReactNode
  showNavigation?: boolean
  title?: string
  showHeader?: boolean
}

export default function MobileLayout({ 
  children, 
  showNavigation = true, 
  title,
  showHeader = true 
}: MobileLayoutProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = (e?: any) => {
    e?.preventDefault()
    e?.stopPropagation()
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      {showHeader && (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                {title ? (
                  <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                ) : (
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">Gabriel</h1>
                    <p className="text-sm text-gray-500">
                      Olá, {user?.name?.split(' ')[0] || 'Usuário'}!
                    </p>
                  </div>
                )}
              </div>
              
              {/* Logout button with touch support */}
              <button
                onClick={handleLogout}
                onTouchEnd={handleLogout}
                className="relative z-50 p-3 -m-1 text-gray-600 active:text-red-600 active:bg-red-50 rounded-lg transition-colors duration-200 touch-manipulation"
                style={{ 
                  minWidth: '44px', 
                  minHeight: '44px',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none'
                }}
                type="button"
                aria-label="Sair da conta"
              >
                <LogOut className="w-5 h-5 pointer-events-none" />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main content */}
      <main className={`flex-1 ${showNavigation ? 'pb-20' : 'pb-4'}`}>
        {children}
      </main>

      {/* Bottom Navigation */}
      {showNavigation && <BottomNavigation />}
    </div>
  )
} 