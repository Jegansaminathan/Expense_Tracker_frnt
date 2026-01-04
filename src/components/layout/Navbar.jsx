import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import SideMain from "./SideMain";

const Navbar = ({activemain}) => {
  const [issidemenu, updsidemenu] = useState(false);
  return (
    <>
      <div className="hnav">
        <button
          onClick={() => updsidemenu(prev=>!prev)}
          style={issidemenu ? { borderColor: "red" } : { borderColor: "green" }}
        >
          {issidemenu ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
        <h2>Expence Tacker</h2>
      </div>
      {<div className={`mobile-sidebar ${issidemenu ? "open" : ""}`}>
       <SideMain activemain={activemain}/>
       </div>}
    </>
  );
};

export default Navbar;
