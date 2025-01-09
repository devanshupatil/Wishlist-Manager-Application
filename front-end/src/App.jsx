
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login  from './components/Login'
import Home from './components/Home'
import Signup from './components/Signup'
import ForgotPass from './components/ForgotPass'


function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgot-password" element={<ForgotPass/>} />
      </Routes>

    </BrowserRouter>
  )
}

export default App