import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { RecentTransInfo } from "../card/RecentTransInfo"

const IncomeTrans = ({hisinc,seemore}) => {
  return (
    <div className="recent-trans">
          <div className="head">
            <h4>Income Transaction</h4>
            <button onClick={seemore}>
              See More <FaArrowRight />
            </button>
          </div>
          <div className="body">
            {hisinc.length === 0 ? (
              <p>No recent transactions</p>
            ) : (
              hisinc
                .slice(0, 5)
                .map((obj) => {return <RecentTransInfo obj={{...obj,type:'income'}} key={obj._id} />})
            )}
          </div>
        </div>
  )
}

export default IncomeTrans