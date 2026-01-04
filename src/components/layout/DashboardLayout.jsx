import { useContext } from 'react'
import { Ct } from '../../context/UserContext'
import useUserAuth from "../../hookes/useUserAuth";
import Navbar from './Navbar'
import SideMain from './SideMain'
import './Dashboard.css'

const DashboardLayout = ({children,activemain}) => {
    const {user}=useContext(Ct)
    useUserAuth();
  return (<>
    <div className='horizontalnav'>
            <Navbar activemain={activemain}/>
        </div>
        
    {user&&<div className='dashmain'>
        <div className='desktop-sidebar'>
        <SideMain activemain={activemain}/>
        </div>
        <div className='dashhome'>
            {children}
        </div>
    </div>}
    </>
  )
}

export default DashboardLayout