import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth, AuthProvider } from './context/auth/AuthContext'

// Componentes de layout
import MainLayout from './components/layout/MainLayout'
import AuthLayout from './components/layout/AuthLayout'
import SplashScreen from './components/layout/SplashScreen'

// Páginas comuns
import HomePage from './pages/common/HomePage'
import NotFoundPage from './pages/common/NotFoundPage'
import ServicesPage from './pages/common/ServicesPage'
import ServiceDetailPage from './pages/common/ServiceDetailPage'
import ProviderProfilePage from './pages/common/ProviderProfilePage'

// Páginas de autenticação
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// Páginas do cliente
import ClientDashboardPage from './pages/client/DashboardPage'
import ClientProfileEditPage from './pages/client/ProfileEditPage'
import ClientRequestsPage from './pages/client/RequestsPage'
import ClientRequestDetailPage from './pages/client/RequestDetailPage'
import ClientReviewsPage from './pages/client/ReviewsPage'
import ClientReviewAddPage from './pages/client/ReviewAddPage'

// Páginas do prestador
import ProviderDashboardPage from './pages/provider/DashboardPage'
import ProviderProfileEditPage from './pages/provider/ProfileEditPage'
import ProviderServicesPage from './pages/provider/ServicesPage'
import ProviderServiceNewPage from './pages/provider/ServiceNewPage'
import ProviderRequestsPage from './pages/provider/RequestsPage'
import ProviderRequestDetailPage from './pages/provider/RequestDetailPage'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <AuthProvider>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <AppRoutes />
      )}
    </AuthProvider>
  )
}

function AppRoutes() {
  const { user } = useAuth()
  const isClient = user?.type === 'CLIENT'
  const isProvider = user?.type === 'PROVIDER'

  return (
    <Router>
      <Routes>
        {/* Rotas de autenticação com layout próprio */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
        </Route>
        
        {/* Rotas principais com layout principal */}
        <Route path="/" element={<MainLayout />}>
          {/* Rotas públicas */}
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:id" element={<ServiceDetailPage />} />
          <Route path="providers/:id" element={<ProviderProfilePage />} />
          
          {/* Rotas do cliente */}
          <Route path="client/dashboard" element={isClient ? <ClientDashboardPage /> : <Navigate to="/login" />} />
          <Route path="client/profile/edit" element={isClient ? <ClientProfileEditPage /> : <Navigate to="/login" />} />
          <Route path="client/requests" element={isClient ? <ClientRequestsPage /> : <Navigate to="/login" />} />
          <Route path="client/requests/:id" element={isClient ? <ClientRequestDetailPage /> : <Navigate to="/login" />} />
          <Route path="client/reviews" element={isClient ? <ClientReviewsPage /> : <Navigate to="/login" />} />
          <Route path="client/reviews/add/:id" element={isClient ? <ClientReviewAddPage /> : <Navigate to="/login" />} />
          
          {/* Rotas do prestador */}
          <Route path="provider/dashboard" element={isProvider ? <ProviderDashboardPage /> : <Navigate to="/login" />} />
          <Route path="provider/profile/edit" element={isProvider ? <ProviderProfileEditPage /> : <Navigate to="/login" />} />
          <Route path="provider/services" element={isProvider ? <ProviderServicesPage /> : <Navigate to="/login" />} />
          <Route path="provider/services/new" element={isProvider ? <ProviderServiceNewPage /> : <Navigate to="/login" />} />
          <Route path="provider/requests" element={isProvider ? <ProviderRequestsPage /> : <Navigate to="/login" />} />
          <Route path="provider/requests/:id" element={isProvider ? <ProviderRequestDetailPage /> : <Navigate to="/login" />} />
          
          {/* Rota para página não encontrada */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
