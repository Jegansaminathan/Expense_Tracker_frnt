import React from 'react'
import Authpage from '../../components/layout/Authpage'
import Inputfld from '../../components/input/Inputfld'
import { useState,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import validmail from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'
import {apipath} from '../../utils/apipaths'
import {Ct} from '../../context/UserContext'


const Login = () => {
  let [email,setE]=useState('')
  let [pwd,SetP]=useState('')
  let [err,setEr]=useState(null)
  let navigate=useNavigate()
  let {upduser}=useContext(Ct)
  let handlelogin=async(e)=>{
    e.preventDefault();
    if (!validmail(email)){
      setEr("please eneter valid email")
      return;
    }
    if(!pwd){
      setEr('please eneter password')
      return
    }
    setEr('')
    try{
      const reslogin=await axiosInstance.post(apipath.auth.loginapi,{email,pwd})
      const {token, userobj}=reslogin.data
      if(token){
        localStorage.setItem("token",token)
        upduser(userobj)
        navigate('/home')
      }
    }
    catch(error){
      if(error.response && error.response.data.msg){
        setEr(error.response.data.msg)
      }
      else{
        setEr("Somthing went wrong try later")
      }
    }
  }
  return (
    <Authpage>
        <div className='logincon'>
            <h3>Welcome Back</h3>
            <p>Please enter your details to log in</p>
            <div className='formbox loginf'>
              <form onSubmit={handlelogin} className='formsty'>
                <Inputfld 
                value={email} 
                type='text' 
                placeholder='Demo123@gmail.com' 
                lable="Email" 
                onChange={({target})=>setE(target.value)}/>
                <Inputfld 
                value={pwd} 
                type='password'  
                lable="Password" 
                onChange={({target})=>SetP(target.value)}/>
                {err&&<p style={{color:'red'}}>{err}</p>}
                <button type='Submit' className='button'>LOGIN</button>
              </form>
            </div>
            {<p>Don't have an account? <Link to='/signup'>SignUp</Link></p>}
        </div>
    </Authpage>
  )
}

export default Login