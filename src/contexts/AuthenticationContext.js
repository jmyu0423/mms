import axios from 'axios';
import { createContext, useContext, useRef, useState } from 'react';

export const AuthenticationContext = createContext(undefined);

export const AuthenticationProvider = ({ children }) => {

    const principalPrototype = {
        userNm: null,
        userAuthTypeNm: null,
        userAuthTypeCd: null,
        dsSeq: null,
        userId: null
    };
    const [principal, setPrincipal] = useState(principalPrototype);
    const authentication = useRef(principal.userId != null ? true : false);

    const login = (data) => {
        authentication.current = true;
    };

    const logout = () => {
        authentication.current = false;
        setPrincipal(principalPrototype);
    };

    const getPrincipal = () => principal;

    return (
        <AuthenticationContext.Provider
            value={{
                login,
                logout,
                getPrincipal,
                authentication
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthenticationContext);
};