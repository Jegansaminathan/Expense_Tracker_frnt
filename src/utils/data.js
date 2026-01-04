import { LuLayoutDashboard,LuHandCoins,LuWalletMinimal,LuLogOut  } from "react-icons/lu";

const SideBarData=[
    {
        id:"01",
        lable:"DashBoard",
        icon:LuLayoutDashboard,
        path:"/home"

    },
    {
        id:"02",
        lable:"Income",
        icon:LuHandCoins,
        path:"/income"

    },
    {
        id:"03",
        lable:"Expense",
        icon:LuWalletMinimal,
        path:"/expense"
    },
    {
        id:"04",
        lable:"Logout",
        icon:LuLogOut,
        path:"/logout"
    }
]
export default SideBarData