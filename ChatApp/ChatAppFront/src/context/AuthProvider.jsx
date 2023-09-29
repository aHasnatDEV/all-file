import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const options = {
            method: 'GET',
            credentials: "include"
        };
        fetch(`${import.meta.env.VITE_BASE_URL}/user/me`, options)
            .then(response => response.json())
            .then(response => {
                if(response.status!==401)setUser(response);
                
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [loading]);

    const userSingIn = (data) => {
        console.log(data);
        const options = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        fetch(`${import.meta.env.VITE_BASE_URL}/user`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    const userLogIn = (data) => {
        console.log(data);
        const options = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: 'include'
        };
        fetch(`${import.meta.env.VITE_BASE_URL}/user/login`, options)
            .then(response => response.json())
            .then(response => {
                setUser(response);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    const userLogOut = () => {
        const options = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({}),
            credentials: 'include'
        };
        fetch(`${import.meta.env.VITE_BASE_URL}/user/logout`, options)
            .then(response => response.json())
            .then(response => {
                setUser(response);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    const authInfo = { user, setUser, userSingIn, userLogIn, loading, setLoading, userLogOut }
    console.log('user:', user);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const AuthContextCtx = () => useContext(AuthContext);
