import React from 'react'
import { RecentTransInfo } from '../card/RecentTransInfo'

const ExpenseList = ({expensehis,ondelete,ondownload}) => {
  return (
    <div className='recent-trans'>
        <div className='head'>
            <h4>Expense History</h4>
            <button onClick={ondownload}>
                Download
            </button>
        </div>
        <div className='body scrollpading'>
            {expensehis.map((obj)=>(<RecentTransInfo key={obj._id}
             overviewtrans={true} obj={{...obj,type:'expense'}}
            onDelete={(id)=>ondelete(id)}/>))}
        </div>
    </div>
  )
}

export default ExpenseList