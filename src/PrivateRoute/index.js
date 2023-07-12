import React from 'react';
import { useAuth } from '../contexts/AuthenticationContext';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { authentication } = useAuth();

    return authentication.current ? children : <Navigate to="/login" />
}
export default PrivateRoute;
