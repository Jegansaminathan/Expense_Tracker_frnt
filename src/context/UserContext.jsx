import { createContext, useState } from "react";

export let Ct = createContext({});

let UserContext = ({ children }) => {
  let [user, setUser] = useState();

  let upduser = (userData) => {
    setUser(userData);
  };

  let deluser = () => {
    setUser(null);
  };
  return (
    <Ct.Provider value={{ user, upduser, deluser }}>{children}</Ct.Provider>
  );
};

export default UserContext;
