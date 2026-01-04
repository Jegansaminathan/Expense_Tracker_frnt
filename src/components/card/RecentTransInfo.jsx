import { BsCashCoin } from "react-icons/bs";
import { MdOutlineSavings } from "react-icons/md";
import { FaArrowTrendDown,FaArrowTrendUp } from "react-icons/fa6";
import { addThousand } from "../../utils/helper";
import moment from "moment"
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";

export const RecentTransInfo = ({ obj,onDelete,overviewtrans }) => {
  const [isopentrash,setOt]=useState(false)  
  if (obj.type === "expense") {
      return (
        <div className={`transitem expred ${overviewtrans?'adjustwidth':''}`} style={(overviewtrans?{height:'12vh',padding:'10px'}:{height:'8vh'})}  onMouseEnter={()=>setOt(true)} onMouseLeave={()=>setOt(false)}>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'40px',height:'40px',fontSize:'20px',borderRadius:'8px',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'rgba(238, 236, 236, 0.62)',}}>
            {obj.icon ?<img width={'30px'} src={obj.icon} alt='icon'/>: <BsCashCoin />}</div>
          <div>
          <p style={{fontSize:'0.9rem',lineHeight:'0.9rem'}}>{obj.category}</p>
            <div style={{fontSize:'0.5rem'}}>{moment(obj.date).format('Do MMM YYYY')}</div>
          </div>
          </div>
           {isopentrash && onDelete && <FiTrash2 className="trash" onClick={()=>onDelete(obj._id)}/>}
          <div style={{display:'flex',alignItems:'center',gap:'10px',backgroundColor:'#c8c6c677',padding:'7px',borderRadius:'10px'}}>
          <p style={{fontWeight:'bold',fontSize:'65%'}}>{'Rs: '+addThousand(obj.amount)}</p>
          <div style={{height:'25px',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'50%',width:'25px',fontSize:'15px',backgroundColor:'rgba(255, 8, 8, 0.84)'}}><FaArrowTrendDown /></div>
          </div>
        </div>
      );
    }
    if (obj.type === "income") {
      return (
        <div className={`transitem expgreen ${overviewtrans?'adjustwidth':''}`} style={(overviewtrans?{height:'12vh',padding:'10px'}:{height:'8vh'})} onMouseEnter={()=>setOt(true)} onMouseLeave={()=>setOt(false)}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div  style={{width:'40px',height:'40px',fontSize:'20px',borderRadius:'8px',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'rgba(238, 236, 236, 0.62)'}}>
            {obj.icon ? <img width={'30px'} src={obj.icon} 
            alt='icon'/> : <MdOutlineSavings />}
          </div>
          <div>
            <p style={{fontSize:'0.9rem',lineHeight:'0.9rem'}}>{obj.source}</p>
            <div style={{fontSize:'0.5rem'}}>{moment(obj.date).format('Do MMM YYYY')}</div>
          </div>
          </div>
          {isopentrash && onDelete && <FiTrash2 className="trash" onClick={()=>onDelete(obj._id)}/>}
          <div style={{display:'flex',alignItems:'center',gap:'10px',backgroundColor:'#c8c6c677',padding:'7px',borderRadius:'10px'}}>
          <p style={{fontWeight:'bold',fontSize:'65%'}}>{'Rs: '+addThousand(obj.amount)}</p>
          <div style={{height:'25px',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'50%',width:'25px',fontSize:'15px',backgroundColor:'rgba(51, 155, 9, 0.92)'}}><FaArrowTrendUp /></div>
          </div>
        </div>
      );
    }
};
