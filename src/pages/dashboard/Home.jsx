import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosinstance";
import { apipath } from "../../utils/apipaths";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { addThousand } from "../../utils/helper";
import InfoCard from "../../components/card/InfoCard";
import { useNavigate } from "react-router-dom";
import RecentTransaction from "../../components/transdashbord/RecentTransaction";
import FinanceOverView from "../../components/transdashbord/FinanceOverView";
import ExpenseTrans from "../../components/transdashbord/ExpenseTrans";
import ExpenseChart from "../../components/transdashbord/ExpenseChart";
import IncomeTrans from "../../components/transdashbord/IncomeTrans";
import IncomeChart from "../../components/transdashbord/IncomeChart";

const Home = () => {
  const [dashdata, setDd] = useState({});
  //   User clicks refresh 5 times
  // 5 API calls fire → backend + frontend chaos
  const [loading, setLd] = useState(false);
  let navigate=useNavigate()
  const fetchDashboard = async () => {
    if (loading) return;
    setLd(true);
    try {
      const resp = await axiosInstance.get(apipath.getdash.getdashapi);
      if (resp.data) {
        setDd(resp.data);
      }
    } catch (error) {
      console.log("somthing went wrong", error);
    } finally {
      setLd(false);
    }
  };
  useEffect(() => {
    fetchDashboard();
    return () => {};
  }, []);
  return (
    <DashboardLayout activemain="DashBoard">
      <>
        <div className="transbar">
          <InfoCard
            icon={<IoMdCard />}
            lable="Total Balance"
            value={addThousand(dashdata?.totalBalance || 0)}
            color="blue"
          />
          <InfoCard
            icon={<LuWalletMinimal/>}
            lable="Total Income"
            value={addThousand(dashdata?.totalIncome || 0)}
            color="yellow"
          />
          <InfoCard
            icon={<LuHandCoins />}
            lable="Total Expense"
            value={addThousand(dashdata?.totalExpense || 0)}
            color="red"
          />
        </div>
        <div className="transdasbboard">
        <div className="res-trans-his">
          <FinanceOverView
        tb={dashdata?.totalBalance||0}
        te={dashdata?.totalExpense||0}
        ti={dashdata?.totalIncome||0}
        />
          <RecentTransaction 
          transaction={dashdata?.recenttrans||[]}
          seemore={()=>{navigate('/expense')}}/>
        </div>
        <div className="res-trans-his">
          <ExpenseTrans hisexp={dashdata?.last30daysexpense?.last30days||[]}
          seemore={()=>navigate('/expense')}
          />
          <ExpenseChart hisexp={dashdata?.last30daysexpense?.last30days||[]}/>
        </div>

        <div className="res-trans-his">
          <IncomeChart hisinc={dashdata?.last60daysincome?.last60days||[]}/>
          <IncomeTrans hisinc={dashdata?.last60daysincome?.last60days||[]}
          seemore={()=>navigate('/expense')}
          />
        </div>
        </div>
      </>
    </DashboardLayout>
  );
};

export default Home;
// <LuHandCoins />
