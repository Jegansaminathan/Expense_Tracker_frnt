import React from 'react'

const InfoCard = ({icon,lable,value,color}) => {
    const cl=color=='blue'?'#cdd028da':color=='red'?'#dc0000d6':'#279123d6';
    const cl2=color=='blue'?'#f4eba9ff':color=='red'?'#FFCDC9':'#f4edd3ff';
  return (<div className='infocard'style={{background: cl}}>
    <div style={{minWidth:'50px',maxHeight:'50px',fontSize:'x-large',height:'100%',display:'flex',justifyContent:'center',alignItems:'center', background:cl2,borderRadius:'50%'}}>{icon}</div>
    <div ><h5 style={{fontSize:'17px'}}>{lable}</h5><h3>{value}</h3></div>
  </div>
  )
}

export default InfoCard