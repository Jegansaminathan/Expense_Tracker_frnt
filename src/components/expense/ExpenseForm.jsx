import React, { useState } from 'react'
import Inputfld from '../input/Inputfld'
import EmojiPickerUp from '../card/EmojiPicker'

const ExpenseForm = ({onAdd}) => {
  const [data,setD]=useState({
    category:'',amount:'',date:'',icon:''
  })
  const handler=(key,value)=>{
    setD({...data,[key]:value})
  }
  return (
    <>
      <EmojiPickerUp
      icon={data.icon}
      onSelect={(selectedIcon)=>{handler('icon',selectedIcon)}}
      />
      <Inputfld type='text' 
      placeholder='freelance,salary,etc'
      value={data.source}
      onChange={({target})=>handler('category',target.value)}
      lable='category'/>
      <Inputfld type='number' 
      value={data.amount}
      onChange={({target})=>handler('amount',target.value)}
      lable='Amount'/>
      <Inputfld type='date' 
      value={data.date}
      onChange={({target})=>handler('date',target.value)}
      lable='Date'/>
      <button className="button" onClick={()=>onAdd(data)}>Add Expense</button>
    </>
  )
}

export default ExpenseForm