import React from 'react'
import logsign from '../../assets/image/logsign-2.png'
import { LuTrendingUpDown } from "react-icons/lu";
const Authpage = ({children}) => {
  return (
    <div className='auth'>
        <div className='expfrom'>
            <h2>Expense Traker</h2>
            {children}
        </div>
        <div className='expright'>
          <div className='block top'></div>
          <div className='block down'></div>
          <div className='exprightsub'>
            <div className='topmsg'>
              <StatsInfoCard
                icon={<LuTrendingUpDown/>}
                label="Track Your Income And Expense"
                value="450,000"
                bC='#ffffff'
              />
            </div>
          
            <div className='blocksync'>
              <div className='mid'>
                <span style={{width:'80%',height:'80%',backgroundColor:'#f4f0ff',display:'block',borderRadius:'30px'}}></span>
              </div>
              <img src={logsign} />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Authpage

const StatsInfoCard=({icon,label,value,bC})=>{
  return <div style={{width:'90%',height:'10%',borderRadius:'20px',display:'flex', justifyContent:'space-around',alignItems:'center',backgroundColor:`${bC}`,position:'absolute',zIndex:'2',boxShadow:'5px 8px 15px 7px #515056bd'}}>
    <div style={{backgroundColor:'#8c0ffa',borderRadius:'50%',height:'50px',width:'50px', display:'flex',justifyContent:'center' ,alignItems:'center',fontSize:'30px'}}>{icon}</div>
    <div style={{width:'80%'}}>
      <div>{label}</div>
      <div style={{fontWeight:'bold'}}>${value}</div>
    </div>
   
  </div>
}