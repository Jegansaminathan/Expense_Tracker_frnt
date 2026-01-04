import React, { useEffect, useState } from 'react'
import DashboardLayout from "../../components/layout/DashboardLayout";
import IncomeOverview from '../../components/income/IncomeOverview';
import axiosInstance from '../../utils/axiosinstance';
import { apipath } from '../../utils/apipaths';
import TrakerForm from '../../components/card/TrakerForm';
import IncomeForm from '../../components/income/IncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/income/IncomeList';
import DelAlert from '../../components/card/DelAlert';

const Income = () => {
  const[incomeData,setIdata]=useState([])
  const[loading,setLd]=useState(false)
  const[openDelAlert,setODA]=useState({
    show:false,
    data:null
  })
  const[AddopenIncome,setAoi]=useState(false)
  //get fetch income
  const fetchincome=async()=>{
    if(loading)return;
    setLd(true)
    try{
      const Incdata=await axiosInstance.get(apipath.income.getapi);
      if(Incdata?.data){
        setIdata(Incdata?.data)
      }
    }
    catch(error){
      console.log('something went wrong',error)
    }
    finally{
      setLd(false)
    }
  }
  //handle add income
  const addincome=async(income)=>{
    const {source,amount,date,icon}=income
    if(!source.trim()){
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
      await axiosInstance.post(apipath.income.addapi,{source,amount,date,icon})
      setAoi(false)
      toast.success('Income Added')
      fetchincome()
    }
    catch(error){
      console.error('error in add income',(error.response?.data?.msg||error.message))
    }
  }
  //handle delete income
  const delincome=async(id)=>{
    try{
      await axiosInstance.get(apipath.income.delapi(id))
    setODA({show:false,data:null})
    toast.success('Item sucessfully Deleted')
    fetchincome()
    }
    catch(error){
      console.error('error in deleting income',(error.response?.data?.msg||error.message))
    }
    
  }
  //handle download income
  const downloadincome=async()=>{
    try{
      const result=await axiosInstance.get(apipath.income.dnxlapi,{responseType:'blob'})
      const url=window.URL.createObjectURL(new Blob([result.data]))
      const link=document.createElement('a')
      link.href=url
      link.setAttribute('download', `Income_${new Date().toISOString().slice(0,10)}.xlsx`)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url)
      toast.success('Income_detail xlsl is downloaded')
    }
    catch (error) {
    console.error("Error downloading income details:", error);
    toast.error("Failed to download income details. Please try again");
    }
  }
  useEffect(()=>{
    fetchincome()
  },[])
  return (
    <DashboardLayout activemain='Income'>
      <IncomeOverview Incometrans={incomeData||[]}
      onAddincome={()=>setAoi(true)}/>

      <TrakerForm lable='Add Income' isopen={AddopenIncome} isclose={()=>setAoi(false)}>
        <IncomeForm onAdd={addincome}/>
      </TrakerForm>

      <IncomeList Incomehis={incomeData||[]} 
      ondelete={(id)=>setODA({ show:true,data:id})}
      ondownload={downloadincome}
      />
      <TrakerForm lable='Confirm Income Delete' isopen={openDelAlert.show}
       isclose={()=>setODA({show:false,data:null})}>
        <DelAlert 
        onDel={()=>delincome(openDelAlert.data)}/>
      </TrakerForm>
    </DashboardLayout>
  )
}

export default Income