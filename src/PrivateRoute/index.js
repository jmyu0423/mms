import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useRecoilState } from 'recoil'
import { authStatus } from "../recoil/atoms/authAtoms"
import Login from "../pages/Login";

const PrivateRoute = ({ children, state }) => {
    const authCurrent = useRecoilState(authStatus)[0];
    if (state === "login") {
        return authCurrent.result === "ok" ? <Navigate to="/" /> : <Login />
    } else {
        return authCurrent.result === "ok" ? children : <Navigate to="/login" />
    }


}
export default PrivateRoute;
