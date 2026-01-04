import { useContext, useEffect } from "react";
import { Ct } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance";
import { apipath } from "../utils/apipaths";

const useUserAuth = () => {
  const { user, upduser, deluser } = useContext(Ct);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) return;
    let isMount = true;
    const fetchUserInfo = async (req, res) => {
      try {
        const respon = await axiosInstance.get(apipath.auth.getuserapi);
        if (isMount && respon.data) {
          const {usr}=respon.data
          upduser(usr);
        }
      } catch (error) {
        console.error("error in getting userinfo", error);
        if (isMount) {
          deluser();
          navigate("/login");
        }
      }
    };
    fetchUserInfo();
    return () => {
      isMount = false;
    };
  }, [upduser, deluser, navigate]);
};
export default useUserAuth;
