import React, { useEffect, useState } from 'react'
import { preparePieChartData } from '../../utils/helper'
import IncomePieChart from '../charts/IncomePieChart '

const IncomeChart = ({hisinc}) => {
    const [incchartdata,setIcd]=useState([])
    useEffect(()=>{
        const data=preparePieChartData(hisinc)
        setIcd(data)
        return()=>{};
    },[hisinc])
  return (
    <div  className="transpie" style={{gap:'10px'}}>
        <h4>Income Chart</h4>
        <IncomePieChart data={incchartdata} />

    </div>
  )
}

export default IncomeChart