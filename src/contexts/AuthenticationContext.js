import axios from 'axios';
import { createContext, useContext, useRef, useState } from 'react';

export const AuthenticationContext = createContext(undefined);

export const AuthenticationProvider = ({ children }) => {
    return (
        <AuthenticationContext.Provider
            value={{
                login,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthenticationContext);
};