import React, { useContext } from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Localizar from './pages/Localizar';
import People from './pages/Peoples';
import Residues from './pages/Residues';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound';
import Singin from './pages/Signin';
import PageRestrict from './pages/PageRestrict';
import { AuthContext } from './Context/Auth';

function PrivateRoute({ children, ...rest }) {
    const { _isAuthenticate } = useContext(AuthContext)
    return (
      <Route
        {...rest}
        render={({ location }) =>
          _isAuthenticate ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

export default function RouterPages(){
    return(
        <Switch>
            <Route exact path='/'>
                <Home/>
            </Route>
            <PrivateRoute exact path='/localizar'>
                <Localizar/>
            </PrivateRoute>
            <PrivateRoute path='/perfil'>
                <Registration/>
            </PrivateRoute>
            <PrivateRoute adminOnly exact path='/peoples'>
                <People/>
            </PrivateRoute>
            <PrivateRoute adminOnly exact path='/residues'>
                <Residues/>
            </PrivateRoute>
            <Route exact path='/cadastro'>
                <Registration/>
            </Route>
            <Route exact path='/signin'>
                <Singin/>
            </Route>
            <Route exact path='/restrict-page'>
                <PageRestrict/>
            </Route>
            <Route path='*'>
                <NotFound/>
            </Route>
        </Switch>
    )
}