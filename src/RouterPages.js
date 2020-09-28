import React, { useContext } from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Context/Auth';

import Singin from './pages/Signin';
import Home from './pages/Home';
import Localizar from './pages/Localizar';
import Registration from './pages/Registration';
import RegistrationInformationPerson from './pages/RegistrationInformationPerson';
import RegistrationResiduesFromPerson from './pages/RegistrationResiduesFromPerson';
import Profile from './pages/Profile';

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
            <PrivateRoute exact path='/localizar' component={Localizar}/>
            <PrivateRoute exact path='/perfil' component={Profile}/>
            <PrivateRoute exact path='/perfil/meus-residuos' component={RegistrationResiduesFromPerson}/>

            <PrivateRoute admin exact path='/peoples' component={People}/>
            <PrivateRoute admin exact path='/residues' component={Residues}/>

            <Route exact path='/cadastro' component={Registration}/>
            <PrivateRoute exact path='/cadastro/informacoes-pessoais' component={RegistrationInformationPerson}/>
            <Route exact path='/cadastro/meus-residuos' component={RegistrationResiduesFromPerson}/>
            
            <Route exact path='/signin' component={Singin}/>
            <Route exact path='/restrict-page' component={PageRestrict}/>
            <Route path='*' component={NotFound}/>
        </Switch>
    )
}