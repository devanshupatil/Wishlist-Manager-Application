import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Signup from './components/Signup'
import ForgotPass from './components/ForgotPass'
import { AuthProvider } from './contexts/AuthContex'
// import ProtectedRoute from './utils/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={
           
              <Home />
            
          } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App