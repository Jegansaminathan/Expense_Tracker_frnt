import React, { useState } from 'react'
import Inputfld from '../input/Inputfld'
import EmojiPickerUp from '../card/EmojiPicker'

const IncomeForm = ({onAdd}) => {
  const [data,setD]=useState({
    source:'',amount:'',date:'',icon:''
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
      onChange={({target})=>handler('source',target.value)}
      lable='Source'/>
      <Inputfld type='number' 
      value={data.amount}
      onChange={({target})=>handler('amount',target.value)}
      lable='Amount'/>
      <Inputfld type='date' 
      value={data.date}
      onChange={({target})=>handler('date',target.value)}
      lable='Date'/>
      <button className="button" onClick={()=>onAdd(data)}>Add Income</button>
    </>
  )
}

export default IncomeForm