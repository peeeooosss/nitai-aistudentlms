import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import AuthCallback from './pages/AuthCallback'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardHome from './pages/DashboardHome'
import LiveSessionsPage from './pages/LiveSessionsPage'
import ModulesIndex from './pages/ModulesIndex'
import ModulePlayer from './pages/ModulePlayer'
import ResourcesPage from './pages/ResourcesPage'
import AdminLayout from './pages/admin/AdminLayout'
import AdminOverview from './pages/admin/AdminOverview'
import AdminModules from './pages/admin/AdminModules'
import AdminEvaluations from './pages/admin/AdminEvaluations'
import AdminNotifications from './pages/admin/AdminNotifications'
import AdminEconomy from './pages/admin/AdminEconomy'
import AdminLiveSessions from './pages/admin/AdminLiveSessions'
import AdminResources from './pages/admin/AdminResources'

function App() {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<SignIn />} />
          <Route path="/auth/register" element={<SignUp />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/dashboard/student" element={
            <ProtectedRoute><DashboardLayout /></ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="live" element={<LiveSessionsPage />} />
            <Route path="live/upcoming" element={<LiveSessionsPage initialTab="upcoming" />} />
            <Route path="live/recordings" element={<LiveSessionsPage initialTab="recordings" />} />
            <Route path="modules" element={<ModulesIndex />} />
            <Route path="module/:dayNumber" element={<ModulePlayer />} />
            <Route path="resources" element={<ResourcesPage />} />
          </Route>
          <Route path="/admin" element={
            <ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/overview" replace />} />
            <Route path="overview" element={<AdminOverview />} />
            <Route path="modules" element={<AdminModules />} />
            <Route path="live-sessions" element={<AdminLiveSessions />} />
            <Route path="resources" element={<AdminResources />} />
            <Route path="evaluations" element={<AdminEvaluations />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="economy" element={<AdminEconomy />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  )
}

export default App