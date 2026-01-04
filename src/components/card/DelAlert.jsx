import React, { useState } from 'react'

const DelAlert = ({onDel}) => {
    const [hoverdel,setHd]=useState(false)
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
        <p>sure you want to <span style={{color:'red',fontWeight:'bold'}}>permanently delete</span>  the item </p>
        <div style={{display:'flex'}}>
        <div style={{width:'50%'}}></div>
        <button style={{borderRadius:'10px',width:'50%',padding:'10px',fontSize:'15px',fontWeight:'bolder',backgroundColor:hoverdel?"red":'transparent',color:hoverdel?'white':'black'}} onMouseEnter={()=>setHd(true)} onMouseLeave={()=>setHd(false)} onClick={onDel}>Delete</button>
        </div>
    </div>
  )
}

export default DelAlert