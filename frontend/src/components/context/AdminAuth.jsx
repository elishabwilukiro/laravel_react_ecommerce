import { createContext, useState } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({children}) => {
     const adminInfo = localStorage.getItem('adminInfo');
     const [user, setUser] = useState(adminInfo);

    //  const login = (user) => {
    //       setUser(user)
    //  }

    //  const logout = () => {
    //       localStorage.removeItem('adminInfo');
    //       setUser(null)
    //  }

     
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("adminInfo"))
  );
     const login = (adminInfo) => {
    setAdmin(adminInfo);
  };

  const logout = () => {
    localStorage.removeItem("adminInfo");
    setAdmin(null);
  };

     return (<AdminAuthContext.Provider value={{user,login,logout}}>
          {children}
     </AdminAuthContext.Provider>)
}