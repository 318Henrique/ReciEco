import React, { useState, useEffect, createContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Api from '../Api/api';
import Loading from '../pages/Loading';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const NavigatorLocation = useLocation();
    const NavigatorHistory = useHistory();
    const [loading, handleLoading] = useState(true);
    const [userDetail, handleInfoUser] = useState({
        isAuthenticate: false,
        dataUser: {}
    })

    useEffect(() => {
        const dataMain = localStorage.getItem('a');
        if(dataMain){
            const { token, content } = JSON.parse(dataMain);
            Api.defaults.headers.auth = token;

            handleInfoUser({
                isAuthenticate: true,
                dataUser: content
            })
        }

        handleLoading(false);
    }, [])

    function SignIn(data){
        const { token, content } = data;
        Api.defaults.headers.auth = token;

        handleInfoUser({ isAuthenticate: true, dataUser: content })
        
        localStorage.setItem('a', JSON.stringify(data));

        const { from } = NavigatorLocation.state || { from: { pathname: '/localizar' } };
        NavigatorHistory.replace(from);
    }

    function Logout(){
        Api.defaults.headers.auth = null;

        handleInfoUser({ isAuthenticate: false, dataUser: {} })

        localStorage.removeItem('a');

        NavigatorHistory.replace('/');
    }

    function HandleInfo(content){
        const dataHandledUser = Object.assign(userDetail.dataUser, content);
        handleInfoUser({ isAuthenticate: true, dataUser: dataHandledUser })

        const dataMain = localStorage.getItem('a');
        const { token } = JSON.parse(dataMain);
        const join_data = { token: token, content: dataHandledUser }
        localStorage.setItem('a', JSON.stringify(join_data));

    }

    if(loading)
    return <Loading/>

    return(
        <AuthContext.Provider value={{ userDetail, SignIn, Logout, HandleInfo }}>
            { children }
        </AuthContext.Provider>
    )
    
}

export { AuthContext, AuthProvider };