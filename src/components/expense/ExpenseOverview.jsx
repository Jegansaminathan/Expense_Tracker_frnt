import React from 'react'
import { MdAdd } from 'react-icons/md'
import ExpenseLineChart from '../charts/ExpenseLineChart'

const ExpenseOverview = ({expensetrans=[],onAddexpense}) => {
    return (
    <div className='overview'>
      <div className='head'>
        <div>
          <h4>Expense Overview</h4>
          <p>Track your sepndings over time and analyze your expense trends.</p>
        </div>
        <button onClick={onAddexpense}>
          <MdAdd style={{fontSize:'20px'}} /> Add Expense
        </button>
      </div>
      <ExpenseLineChart data={expensetrans}/>
    </div>
   
  )
}

export default ExpenseOverview