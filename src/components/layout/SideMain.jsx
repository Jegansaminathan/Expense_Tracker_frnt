import React, { useContext, useState } from 'react'
import SideBarData from '../../utils/data'
import { Ct } from '../../context/UserContext'
import {useNavigate} from 'react-router-dom'
import ProfileAvatar from '../card/Avatar'
const SideMain = ({activemain}) => {
    const {user,deluser}=useContext(Ct);
    const navigate=useNavigate()
    const handlelogout=()=>{
        localStorage.clear();
        deluser();
        navigate("/login")
    }
    const handleClikc=(route)=>{
        if(route=='logout'){
            handlelogout()
            return;
        }
        navigate(route)
    }

  return (<div className='sidemain'>
    <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
    <ProfileAvatar name={user?.name}/>
    <h5 style={{fontSize:"20px"}}>{user&&user.name}</h5>
    </div>
    <div className='sidemainnav'>
    {SideBarData.map((items)=>{
        return <div className={`items ${activemain===items.lable?'active':''}`} key={`menu_${items.id}`} onClick={()=>{handleClikc(items.path)}}>
            {<items.icon style={{fontSize:'20px'}}/>}
            {items.lable}
        </div>
    })}
    </div>
  </div>
  )
}

export default SideMain