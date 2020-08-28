import React, { useContext } from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Context/Auth';

import Singin from './pages/Signin';
import Home from './pages/Home';
import Localizar from './pages/Localizar';
import Contact from './pages/Contact';
import Registration from './pages/Registration';

import People from './pages/Administrador/Peoples';
import Residues from './pages/Administrador/Residues';

import NotFound from './pages/NotFound';
import PageRestrict from './pages/PageRestrict';

function PrivateRoute({ component: Component, admin, ...rest }) {
    const { userDetail: { isAuthenticate, dataUser } } = useContext(AuthContext);
    return (
        <Route
        {...rest}
        render={({ location }) => {
            
            if(admin && !dataUser.admin) return <Redirect to="/restrict-page"/>

            if(isAuthenticate) return <Component/>
            else return <Redirect to={{ pathname: "/signin", state: { from: location } }}/>
        }}
        />
    );
}

export default function RouterPages(){
    return(
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/Contact' component={Contact}/>
            <PrivateRoute exact path='/localizar' component={Localizar}/>
            <PrivateRoute exact path='/perfil' component={Registration}/>
            <PrivateRoute admin exact path='/peoples' component={People}/>
            <PrivateRoute admin exact path='/residues' component={Residues}/>
            <Route exact path='/cadastro' component={Registration}/>
            <Route exact path='/signin' component={Singin}/>
            <Route exact path='/restrict-page' component={PageRestrict}/>
            <Route path='*' component={NotFound}/>
        </Switch>
    )
}