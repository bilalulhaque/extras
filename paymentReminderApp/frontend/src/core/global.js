import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState('');
    const [paymentId, setPaymentId] = useState('');

        
    return (
        <GlobalContext.Provider
            value={{
                token,
                setToken,
                userId,
                setUserId,
                paymentId,
                setPaymentId
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };