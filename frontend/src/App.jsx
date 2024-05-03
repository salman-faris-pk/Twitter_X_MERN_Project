import { Routes,Route } from "react-router-dom"
import Homepage from "./pages/home/Homepage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import Loginpage from "./pages/auth/login/Loginpage"
import Sidebar from "./components/common/Sidebar"
import RightPanel from "./components/common/RightPanel"


function App() {
  

  return (

    <div className='flex max-w-6xl mx-auto'>
         
         <Sidebar/>

        <Routes>

        <Route path='/' element={<Homepage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<Loginpage />} />
          
        </Routes> 

        <RightPanel/>

    </div>
  )
}

export default App
