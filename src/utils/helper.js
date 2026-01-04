import moment from "moment";

let validmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
export default validmail;

export let addThousand = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareBarChartData=(data=[])=>{
  const Bchart=data.map((obj)=>({
    category:obj.category,
    amount:obj.amount
  }))
  return Bchart
}

export const preparePieChartData=(data=[])=>{
  const Pchart=data.map((obj)=>({
    source:obj.source,
    amount:obj.amount
  }))
  return Pchart
}

export const prepareStackedIncomeData = (data = []) => {
  const grouped = {};

  const sorteddate=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date));
  sorteddate.forEach(item => {
    const day = moment(item.date).format("Do MMM");

    if (!grouped[day]) {
      grouped[day] = { date: day };
    }

    grouped[day][item.source] =
      (grouped[day][item.source] || 0) + item.amount;
  });

  return Object.values(grouped);
};

export const getColorFromSource = (source = "") => {
  let hash = 0;
  for (let i = 0; i < source.length; i++) {
    hash = source.charCodeAt(i) + ((hash << 30) - hash*3);
  }
  return `hsl(${Math.abs(hash) % 360}, 70%, 50%)`;
};
 

export const prepareExpenseLineData = (data = []) => {
  const grouped = {};

  data.forEach(item => {
    const day = moment(item.date).format("DD MMM");

    if (!grouped[day]) {
      grouped[day] = {
        date: day,
        amount: 0
      };
    }

    grouped[day].amount += item.amount;
  });

  // sort by actual date order
  return Object.values(grouped).sort(
    (a, b) =>
      moment(a.date, "DD MMM").toDate() -
      moment(b.date, "DD MMM").toDate()
  );
};