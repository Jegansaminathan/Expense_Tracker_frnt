import React, { useContext, useEffect, useState } from "react";
import Authpage from "../../components/layout/Authpage";
import Inputfld from "../../components/input/Inputfld";
import validmail from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { apipath } from "../../utils/apipaths";
import {Ct} from '../../context/UserContext'
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let [profil, setPr] = useState(null);
  let [email, setE] = useState("");
  let [name, setN] = useState("");
  let [pwd, setP] = useState("");
  let [cpwd, setC] = useState("");
  let [err, setEr] = useState("");
  let {upduser}=useContext(Ct)
  let navigate=useNavigate()
  useEffect(() => {
  if (pwd !== "" && cpwd !== "") {
    if (pwd !== cpwd) {
      setEr("password not match");
    } else {
      setEr("");
    }
  }
  else{
    setEr("");
  }
}, [pwd, cpwd]);
  let handlesubmit = async(e) => {
    e.preventDefault()
    if(!name){
      setEr("enter the name")
      return;
    }
    if(!validmail(email)){
      setEr("enter valid email")
      return;
    }
    if(!pwd){
      setEr("enter password")
      return
    }
     if(!cpwd){
      setEr("enter confirm password")
      return
    }
    setEr("")
    try{
      let regres=await axiosInstance.post(apipath.auth.regapi,{email,name,pwd})
      let {token,userobj}=regres.data
      if(token){
        localStorage.setItem("token",token)
        upduser(userobj)
        navigate("/home")
      }
    }
    catch(error){
      if(error.response && error.response.data.msg){
        setEr(error.response.data.msg)
      }
      else{
        setEr("axios error")
      }
    }
  };
  return (
    <Authpage>
      <div className="logincon">
        <h3>Create an Account</h3>
        <p>Join us today by entering your details below.</p>
        <div className="formbox signupf">
          <form onSubmit={handlesubmit} className="formsty">
            <Inputfld/>
            <div style={{ display: "flex", gap: "5%" }}>
              <Inputfld
                type="text"
                value={email}
                lable="Email"
                placeholder="demo123@gmail.com"
                onChange={({ target }) => setE(target.value)}
              />
              <Inputfld
                type="text"
                value={name}
                lable="Name"
                placeholder="demo"
                onChange={({target}) => setN(target.value)}
              />
            </div>
            <Inputfld
              type="password"
              value={pwd}
              lable="password"
              placeholder="New password"
              onChange={({target}) => setP(target.value)}
            />
            <Inputfld
              type="password"
              value={cpwd}
              lable="Comfirm password"
              placeholder="Re-enter New password"
              onChange={({target}) => setC(target.value)}
            />
            {err && <p>{err}</p>}
            <br/>
            <button type="submit" className="button">
              SIGNUP
            </button>
          </form>
        </div>
      </div>
    </Authpage>
  );
};
export default Signup;
