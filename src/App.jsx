import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Vestibulares from './pages/Vestibulares'
import Cronograma from './pages/Cronograma'
import Simulados from './pages/Simulados'
import Cursos from './pages/Cursos'
import Login from './pages/Login'
import Register from './pages/Register'

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function ProtectedLayout() {
  const { user, loading } = useAuth()
  if (loading) return <Spinner />
  if (!user) return <Navigate to="/login" replace />
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
      <div className="flex-1 overflow-y-auto pb-16">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}

function AuthLayout() {
  const { user, loading } = useAuth()
  if (loading) return <Spinner />
  if (user) return <Navigate to="/home" replace />
  return <Outlet />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/vestibulares" element={<Vestibulares />} />
            <Route path="/cronograma" element={<Cronograma />} />
            <Route path="/simulados" element={<Simulados />} />
            <Route path="/cursos" element={<Cursos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
