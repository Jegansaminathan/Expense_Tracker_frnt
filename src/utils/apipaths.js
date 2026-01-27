const baseurl="https://expense-tracker-5grc.onrender.com"
let apipath={
    "auth":{
        "loginapi":"/api/v1/auth/login",
        "resetpass":(user)=>`/api/v1/auth/forgotPass/${user}`,
        'resetpasscheckotp':'/api/v1/auth/forgotPassOtp',
        "resetUpdpass":"/api/v1/auth/updateForgotPass",
        "regapi":"/api/v1/auth/reg",
        "getuserapi":"/api/v1/auth/getUserInfo",
    },
    "getdash":{
        "getdashapi":"/api/v1/dashboard/getdetails"
    },
    "income":{
        "addapi":"/api/v1/income/add",
        "getapi":"/api/v1/income/get",
        "dnxlapi":"/api/v1/income/downloadexcel",
        "delapi":(did)=>`/api/v1/income/delete/${did}`
    },
    "expense":{
        "addapi":"/api/v1/expense/add",
        "getapi":"/api/v1/expense/get",
        "dnxlapi":"/api/v1/expense/downloadexcel",
        "delapi":(did)=>`/api/v1/expense/delete/${did}`
    }
}
export {baseurl, apipath}