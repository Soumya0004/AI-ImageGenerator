import { Routes,Route } from 'react-router-dom'
import React, { useContext } from 'react'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCradit from './pages/BuyCradit'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Login from './components/Login'
import { Appcontext } from './Context/Appcontext'
import { Toaster } from 'react-hot-toast'
const App = () => {
  const {showLogin}=useContext(Appcontext)

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-radial-at-b from-amber-200 via-violet-600 to-sky-900 '>
        <Nav/>
        { showLogin && <Login/>}
        <Toaster/>

   <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCradit />} />
        {/* <Route path="/login" element={<Login/>} /> */}
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App