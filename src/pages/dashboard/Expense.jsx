import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import axiosInstance from '../../utils/axiosinstance'
import { apipath } from '../../utils/apipaths'
import toast from 'react-hot-toast'
import ExpenseOverview from '../../components/expense/ExpenseOverview'
import TrakerForm from '../../components/card/TrakerForm'
import ExpenseForm from '../../components/expense/ExpenseForm'
import ExpenseList from '../../components/expense/ExpenseList'
import DelAlert from '../../components/card/DelAlert'

const Expense = () => {
  const[ExpenseData,setEdata]=useState([])
    const[loading,setLd]=useState(false)
    const[openDelAlert,setODA]=useState({
      show:false,
      data:null
    })
    const[AddopenExpense,setAoe]=useState(false)
      //get fetch Expense
  const fetchexpense=async()=>{
    if(loading)return;
    setLd(true)
    try{
      const Incdata=await axiosInstance.get(apipath.expense.getapi);
      if(Incdata?.data){
        setEdata(Incdata?.data)
      }
    }
    catch(error){
      console.log('something went wrong',error)
    }
    finally{
      setLd(false)
    }
  }

  //handle add expense
  const addexpense=async(expense)=>{
    const {category,amount,date,icon}=expense
    if(!category.trim()){
      toast.error('Source is required')
      return
    }
    if(!amount||Number(amount)<=0){
      toast.error('Amount required greater then 0')
      return
    }
    if(!date){
      toast.error('Date is required');
      return
    }
    try{
      await axiosInstance.post(apipath.expense.addapi,{category,amount,date,icon})
      setAoe(false)
      toast.success('Expense Added')
      fetchexpense()
    }
    catch(error){
      console.error('error in add expense',(error.response?.data?.msg||error.message))
    }
  }

  //handle delete income
  const delexpense=async(id)=>{
    try{
      await axiosInstance.get(apipath.expense.delapi(id))
    setODA({show:false,data:null})
    toast.success('Item sucessfully Deleted')
    fetchexpense()
    }
    catch(error){
      console.error('error in deleting expense',(error.response?.data?.msg||error.message))
    }
    
  }

   //handle download income
  const downloadexpense=async()=>{
     try{
          const result=await axiosInstance.get(apipath.expense.dnxlapi,{responseType:'blob'})
          const url=window.URL.createObjectURL(new Blob([result.data]))
          const link=document.createElement('a')
          link.href=url
          link.setAttribute('download', `Expense_${new Date().toISOString().slice(0,10)}.xlsx`)
          document.body.appendChild(link)
          link.click()
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url)
          toast.success('Expense_detail xlsl is downloaded')
        }
        catch (error) {
        console.error("Error downloading expense details:", error);
        toast.error("Failed to download expense details. Please try again");}
  }
  useEffect(()=>{
    fetchexpense()
  },[])
  return (
    <DashboardLayout activemain='Expense'>
      <ExpenseOverview expensetrans={ExpenseData||[]}
      onAddexpense={()=>setAoe(true)}/>

      <TrakerForm lable='Add Income' isopen={AddopenExpense} isclose={()=>setAoe(false)}>
        <ExpenseForm onAdd={addexpense}/>
      </TrakerForm>

      <ExpenseList expensehis={ExpenseData||[]} 
      ondelete={(id)=>setODA({ show:true,data:id})}
      ondownload={downloadexpense}
      />

      <TrakerForm lable='Confirm Expense Delete' isopen={openDelAlert.show}
       isclose={()=>setODA({show:false,data:null})}>
        <DelAlert
        onDel={()=>delexpense(openDelAlert.data)}/>
      </TrakerForm>

    </DashboardLayout>

  )
}

export default Expense