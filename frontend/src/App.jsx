import { Routes,Route } from "react-router-dom"
import Homepage from "./pages/home/Homepage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import Loginpage from "./pages/auth/login/Loginpage"
import Sidebar from "./components/common/Sidebar"
import RightPanel from "./components/common/RightPanel"
import NotificationPage from "./pages/notification/NotificationPage"
import ProfilePage from "./pages/profile/ProfilePage"


function App() {
  

  return (

    <div className='flex max-w-6xl mx-auto'>
         
         <Sidebar/>

        <Routes>

        <Route path='/' element={<Homepage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<Loginpage />} />
        <Route path='/notifications' element={<NotificationPage />}/>
        <Route path='/profile/:username' element={<ProfilePage />} />

        </Routes> 

        <RightPanel/>

    </div>
  )
}

export default App
