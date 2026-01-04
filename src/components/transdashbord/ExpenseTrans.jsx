import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { RecentTransInfo } from "../card/RecentTransInfo"

const ExpenseTrans = ({ hisexp, seemore }) => {
  return (
    <div className="recent-trans">
      <div className="head">
        <h4>Expense Transaction</h4>
        <button onClick={seemore}>
          See More <FaArrowRight />
        </button>
      </div>
      <div className="body">
        {hisexp.length === 0 ? (
          <p>No recent transactions</p>
        ) : (
          hisexp
            .slice(0, 5)
            .map((obj) => {return <RecentTransInfo obj={{...obj,type:'expense'}} key={obj._id} />})
        )}
      </div>
    </div>
  );
};

export default ExpenseTrans;
