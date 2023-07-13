import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useRecoilState } from 'recoil'
import { authStatus } from "../recoil/atoms/authAtoms"
import Login from "../pages/login/Login";

const PrivateRoute = ({ children }) => {
    console.log(children)
    const authCurrent = useRecoilState(authStatus)[0];
    if(children.type.name === "Login"){
        return authCurrent.current ? <Navigate to="/"/> : <Login/>
    }else{
        return authCurrent.current ? children : <Navigate to="/login" />
    }
   
    
}
export default PrivateRoute;
