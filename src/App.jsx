import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Community from './pages/Community'
import CommunityFeed from './pages/CommunityFeed'
import Profile from './pages/Profile'
import Admin from './pages/Admin'

const noNavPages = ['/', '/login', '/signup', '/onboarding', '/forgot-password', '/reset-password', '/admin']

function Layout() {
  const location = useLocation()
  const showNav = !noNavPages.includes(location.pathname)

  return (
    <>
      {showNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/feed" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:level" element={<CommunityFeed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />a
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App