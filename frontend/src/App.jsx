import { Routes,Route } from "react-router-dom"
import Homepage from "./pages/home/Homepage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import Loginpage from "./pages/auth/login/Loginpage"


function App() {
  

  return (
    
    <div className='flex max-w-6xl mx-auto'>
        <Routes>

        <Route path='/' element={<Homepage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<Loginpage />} />
          
          </Routes>     
    </div>
  )
}

export default App
