import React from 'react'
import { RecentTransInfo } from '../card/RecentTransInfo'

const IncomeList = ({Incomehis,ondelete,ondownload}) => {
  return (
    <div className='recent-trans'>
        <div className='head'>
            <h4>Income History</h4>
            <button onClick={ondownload}>
                Download
            </button>
        </div>
        <div className='body scrollpading'>
            {Incomehis.map((obj)=>(<RecentTransInfo key={obj._id}
             overviewtrans={true} obj={{...obj,type:'income'}}
            onDelete={(id)=>ondelete(id)}/>))}
        </div>
    </div>
  )
}

export default IncomeList