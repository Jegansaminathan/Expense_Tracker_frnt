import React from "react";
import Authpage from "../../components/layout/Authpage";
import Inputfld from "../../components/input/Inputfld";
import { useState } from "react";
import axiosInstance from "../../utils/axiosinstance";
import { apipath } from "../../utils/apipaths";
import {useNavigate} from 'react-router-dom'

const ForgotPass = () => {
  let [email, setE] = useState("");
  let [otp, setOtp] = useState("");
  let [msg, setM] = useState("");
  let [updpass,setUpd]=useState("");
  let [confirmpass,setCp]=useState("");
  let [flag, setF] = useState(0);
  let navigate=useNavigate()
  let sendotp = async () => {
    try {
      if (!email.trim()) {
        setM("Please enter your email");
        return;
      }

      const mailinfo = await axiosInstance.get(apipath.auth.resetpass(email));
      setM(mailinfo.data.msg);
      setF(1);
    } catch (err) {
      if (err.response) setM(err.response.data.msg);
      else setM("Server not responding");
    }
  };
  let checkotp = async () => {
    try {
      if (!otp.trim()) {
        setM("Please enter your otp");
        return;
      }
      const checkotpstatus = await axiosInstance.post(
        apipath.auth.resetpasscheckotp,
        { email, otp },
      );
      setM(checkotpstatus.data.msg);
      setF(2);
    } catch (err) {
      if (err.response) setM(err.response.data.msg);
      else setM("Server not responding");
    }
  };

  let updolpass=async()=>{
    try{

      if(!updpass.trim() || !confirmpass.trim()){
        setM("Please enter all field");
          return;
      }
      if(updpass !=confirmpass){
        setM("password mismatch")
        return;
      }
      let updinfo=await axiosInstance.post(apipath.auth.resetUpdpass,{email,pwd:updpass})
      setM(updinfo.data.msg)
      if (updinfo.data.msg === "successfully updated"){
        navigate('/login')
      }
    }
    catch (err) {
      if (err.response) setM(err.response.data.msg);
      else setM("Server not responding");
    }
  }
  return (
    <Authpage>
      <div className="logincon">
        <h3>Forgot Password</h3>
        <br />
        {flag == 0 && <><p>Please enter your email to send Otp to update password</p>
        <br />
          <div
            className="formbox loginf"
            style={{
              height: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Inputfld
              value={email}
              type="text"
              lable="Email"
              onChange={({ target }) => setE(target.value)}
            />
            <button
              className="button"
              style={{ width: "50%",minHeight:'6.5vh', alignSelf: "center" }}
              onClick={sendotp}
            >
              Send OTP
            </button>
            <p>{msg}</p>
          </div></>
        }
        {flag == 1 && <><p>Please enter your OTP to verify</p>
        <br />
          <div
            className="formbox loginf"
            style={{
              height: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Inputfld
              value={otp}
              type="text"
              lable="OTP"
              onChange={({ target }) => setOtp(target.value)}
            />
            <div style={{ display: "flex", gap: "50px" }}>
              <button
                className="button"
                onClick={() => {
                  setM("");
                  setF(0);
                }}
              >
                Back
              </button>

              <button className="button" onClick={checkotp}>
                Check OTP
              </button>
            </div>
            <p>{msg}</p>
          </div>
        </>}


       {flag == 2 && <><p>Please enter your new-password to update password</p>
          <div
            className="formbox loginf"
            style={{
              height: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Inputfld
              value={updpass}
              type="password"
              lable="New Password"
              onChange={({ target }) => setUpd(target.value)}
            />
            <Inputfld
              value={confirmpass}
              type="password"
              lable="Confirm password"
              onChange={({ target }) => setCp(target.value)}
            />
            <button
              className="button"
              style={{ width: "50%", alignSelf: "center" }}
              onClick={updolpass}
            >
              Confirm
            </button>
            <p>{msg}</p>
          </div>
        </>}
        
      </div>
    </Authpage>
  );
};

export default ForgotPass;
