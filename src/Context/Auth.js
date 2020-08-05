import React, { useState, useEffect, createContext } from 'react';
import Api from '../Api/api';
import { useHistory, useLocation } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const NavigatorHistory = useHistory();
    const NavigatorLocation = useLocation();
    const [userInfo, setUserInfo] = useState({
        authenticate: false,
        user: null,
    })

    useEffect(() => {
        if(userInfo.authenticate)
        {
            const dataAccessUser = localStorage.getItem('t');
            const { token, content } = JSON.parse(dataAccessUser);

            Api.defaults.headers.auth = token;

            setUserInfo({
                _authenticate: true,
                user: content
            })
        }
        setLoading(false)
    }, [userInfo.authenticate])

    function _login(dataUserAccess){

        localStorage.setItem('t', JSON.stringify(dataUserAccess))

        Api.defaults.headers.auth = dataUserAccess.token

        setUserInfo({
            authenticate: true,
            user: dataUserAccess.content
        })

        setLoading(true)

        const { from : redirectionPage } = NavigatorLocation.state || { from: { pathname: '/localizar' }}
        NavigatorHistory.replace(redirectionPage);
    }

    function _logout(){

        localStorage.removeItem('t')

        setUserInfo({
            authenticate: false,
            user: {}
        })

        setLoading(true)

        NavigatorHistory.push('/signin');
    }

    if(loading)
    return <h1>Caregando dados...</h1>

    return (
        <AuthContext.Provider value={{ userInfo, _login, _logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }