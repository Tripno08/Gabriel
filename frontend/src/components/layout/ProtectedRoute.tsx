import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'
import type { Role } from '../../context/auth/AuthContext'

interface ProtectedRouteProps {
  allowedRoles: Role[]
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth()

  // Se estiver carregando, mostra uma mensagem de carregamento
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Se o usuário não tiver permissão para acessar a rota
  if (user && !allowedRoles.includes(user.role)) {
    // Redireciona para o dashboard apropriado ao perfil
    const redirectPath = user.role === 'CLIENT' ? '/client/dashboard' : '/provider/dashboard'
    return <Navigate to={redirectPath} replace />
  }

  // Se tudo estiver ok, renderiza o conteúdo
  return <Outlet />
} 