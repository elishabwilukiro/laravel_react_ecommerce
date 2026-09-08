import { useContext } from "react"
import { AdminAuthContext } from "./context/AdminAuth"
import { Navigate } from "react-router-dom"

export const RequireAuth = ({ children }) => {
     
     const {user} = useContext(AdminAuthContext);

     if(!user){
          return <Navigate to={`/account/login`} />
     }

     return children;
}