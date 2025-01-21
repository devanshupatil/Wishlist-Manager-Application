import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Signup from './components/Signup'
import ForgotPass from './components/ForgotPass'
import { AuthProvider } from './contexts/AuthContext'
import ResetPassword from './components/ResetPassword'
import Navbar from './components/Navbar'
import Lists from './components/Lists'
import UpdateItem from './components/UpdateItem'



function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/reset-password" element={<ResetPassword />} />
         

          <Route
            path="/Home"
            element={
              <div className="w-full h-full flex flex-col">
                <Navbar />
                <Home />
              </div>
            }
          />
          <Route
            path="/lists"
            element={
              <div className="w-full h-full flex flex-col">
                <Navbar />
                <Lists />
              </div>
            }
          />
          <Route
            path="/update-item/:id"
            element={
              <div className="w-full h-full flex flex-col">
                <Navbar />
                <UpdateItem />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App