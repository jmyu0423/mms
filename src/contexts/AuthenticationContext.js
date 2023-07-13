import axios from 'axios';
import { createContext, useContext, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { authStatus } from "../recoil/atoms/authAtoms"

export const AuthenticationContext = createContext(undefined);

export const AuthenticationProvider = ({ children }) => {
    const authCurrent = useRecoilState(authStatus)[0];
    const setRecoilAuthState = useSetRecoilState(authStatus);

    const login = (data) => {
        setRecoilAuthState({userId: "test", current: true})
    };

    const logout = () => {
        setRecoilAuthState({userId: "", current: false})
    };

    return (
        <AuthenticationContext.Provider
            value={{
                login,
                logout
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthenticationContext);
};