import CustomPieChart from "../charts/CustomPieChart"
const FinanceOverView=({tb,te,ti})=>{
    const color=['#cdd028da','#dc0000d6','#279123d6']
    let overalldata=[
        {name:'Balance',amount:tb},
        {name:'Total Expenses',amount:te},
        {name:'Total Income',amount:ti}
    ]
    return(<div className="transpie">
        <h4 style={{height:'10%',display:'flex',alignItems:'center',alignSelf:'flex-start',paddingLeft:'20px'}}>Financial Overview</h4>
        <CustomPieChart data={overalldata} lable='OVER VIEW' totalamt={`$${tb}`} colors={color} />
    </div>)
}
export default FinanceOverView