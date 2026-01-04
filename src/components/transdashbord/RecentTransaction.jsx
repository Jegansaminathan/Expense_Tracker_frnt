import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { RecentTransInfo } from "../card/RecentTransInfo";

const RecentTransaction = ({ transaction, seemore }) => {
  return (
    <div className="recent-trans">
      <div className="head">
        <h4>Recent Transaction</h4>
        <button onClick={seemore}>
          See More <FaArrowRight />
        </button>
      </div>
      <div className="body">
        {transaction.length === 0 ? (
          <p>No recent transactions</p>
        ) : (
          transaction.slice(0, 5).map((obj) => <RecentTransInfo obj={obj} key={obj._id} />)
        )}
      </div>
    </div>
  );
};
export default RecentTransaction;
