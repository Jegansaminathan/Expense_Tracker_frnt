import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Inputfld = ({value,onChange,type,placeholder,lable}) => {
    let [showpwd,setP]=useState(false)
    let togglepws=()=>{
        setP(!showpwd)
    }
  return (
    <div style={{width:'100%',height:'11.5vh',display:'flex',flexDirection:'column',gap:'5px'}}>
        <div>{lable}</div>
        <div className='inpsty'>
            <input type={type=='password'?showpwd?'text':'password':type}
            placeholder={placeholder}
            className='input'
            value={value}
            onChange={(e)=>onChange(e)}/>
           {type=='password'&&
           <>
           {showpwd?<FaEye style={{fontSize:'20px',margin:'10px'}} onClick={togglepws}/>:<FaEyeSlash style={{fontSize:'20',margin:'10px'}} onClick={togglepws} />}
           </>}
        </div>
        
    </div>
  )
}

export default Inputfld