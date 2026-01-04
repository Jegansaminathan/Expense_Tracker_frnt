import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const TrakerForm = ({ children, lable, isopen, isclose }) => {
    if(!isopen) return null;
  return (
    <div className="form-platform">
    <div className="form">
      <div className="form-main">
        <div className="form-head">
            <h4>{lable}</h4>
            <button onClick={isclose}><IoCloseSharp /></button>
        </div>
        <div className="form-field-container">
            {children}
        </div>
      </div>
    </div>
    </div>
  );
};

export default TrakerForm;
