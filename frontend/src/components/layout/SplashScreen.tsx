import { useEffect, useState } from 'react'
import { Sparkles, Heart } from 'lucide-react'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 300) // Aguarda a animação de saída
    }, 2500)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 flex items-center justify-center z-50 splash-screen">
      <div className="text-center">
        {/* Logo animado */}
        <div className="relative mb-8 animate-bounce">
          <div className="w-20 h-20 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-2xl">
            <Sparkles className="w-10 h-10 text-primary-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center animate-pulse">
            <Heart className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Nome do app */}
        <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
          Gabriel
        </h1>
        <p className="text-primary-100 text-lg mb-8 animate-fade-in-delay">
          Conectando pessoas e serviços
        </p>

        {/* Loading indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
} 