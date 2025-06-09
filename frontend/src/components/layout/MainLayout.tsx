import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import BottomNavigation from './BottomNavigation'
import { useAuth } from '../../context/auth/AuthContext'
import { useState, useEffect } from 'react'

export default function MainLayout() {
  const { user } = useAuth()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detectar se estamos no ambiente mobile (Capacitor)
    const checkMobile = () => {
      const isCapacitor = !!(window as any).Capacitor
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isSmallScreen = window.innerWidth <= 768
      
      return isCapacitor || (isMobileUserAgent && isSmallScreen)
    }

    setIsMobile(checkMobile())

    // Listener para mudanças no tamanho da tela
    const handleResize = () => {
      setIsMobile(checkMobile())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {!isMobile && <Header />}
      
      {isMobile && user && (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-gray-900">Gabriel</h1>
                <p className="text-sm text-gray-500">
                  Olá, {user?.name?.split(' ')[0] || 'Usuário'}!
                </p>
              </div>
              
              {/* Notification indicator */}
              <div className="relative">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className={`flex-grow ${isMobile && user ? 'pb-20' : ''} ${isMobile ? 'bg-gray-50' : ''}`}>
        <Outlet />
      </main>
      
      {!isMobile && <Footer />}
      
      {isMobile && user && <BottomNavigation />}
    </div>
  )
} 