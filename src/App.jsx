import React from 'react'
import {BrowserRouter, Route, Routes,Navigate} from 'react-router-dom'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Home from './pages/dashboard/Home'
import Logout from './pages/dashboard/Logout'
import Expense from './pages/dashboard/Expense'
import Income from './pages/dashboard/Income'
import UserContext from './context/UserContext'
import {Toaster} from 'react-hot-toast'
import './App.css'
import ForgotPass from './pages/auth/ForgotPass'

const App = () => {
  return (<div>
  
   <BrowserRouter>
    <UserContext>
   <Routes>
    <Route path='/' element={< Root />}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/forgotpass' element={<ForgotPass/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/expense' element={<Expense/>}/>
    <Route path='/income' element={<Income/>}/>
    <Route path='logout' element={<Logout/>}/>
   </Routes>
   <Toaster toastOptions={{
    className:'',
    style:{fontSize:'13px'}
   }}/>
   </UserContext>
   </BrowserRouter>
   
   </div>
  )
}

export default App
const Root=()=>{
  const isauth=!!localStorage.getItem("token")
  return isauth ? <Navigate to={'/home'}/> : <Navigate to={'/login'}/>
}