import React, { useEffect, useState } from 'react'
import IncomeBarChart from '../charts/IncomeBarchart'
import { MdAdd } from "react-icons/md";

const IncomeOverview = ({Incometrans=[],onAddincome}) => {
  return (
    <div className='overview'>
      <div className='head'>
        <div>
          <h4>Income Overview</h4>
          <p>Track your earnings over time and analyze your income trends.</p>
        </div>
        <button onClick={onAddincome}>
          <MdAdd style={{fontSize:'20px'}} /> Add Income
        </button>
        
      </div>
       <IncomeBarChart data={Incometrans}/>
    </div>
   
  )
}

export default IncomeOverview