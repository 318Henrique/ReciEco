import React from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import { getToken } from './Components/AuthVerification';

import Home from './pages/Home';
import Localizar from './pages/Localizar';
import People from './pages/Peoples';
import Residues from './pages/Residues';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound';
import Singin from './pages/Signin';
import PageRestrict from './pages/PageRestrict';

function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          getToken.token_access !== null ? (
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
  
const RoutePrivateAdmin = ({children, admin = false, ...rest}) => {
    return (
        <Route
            {...rest}
            render={({location}) =>  admin && getToken.admin !== null? 
                (children) :
                (
                    <Redirect
                    to={{
                        pathname: "/restrict-page",
                        state: { from: location}
                    }}
                    />
                )
            }
        />
    )
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
            <RoutePrivateAdmin exact path='/peoples' admin={true}>
                <People/>
            </RoutePrivateAdmin>
            <RoutePrivateAdmin exact path='/residues' admin={true}>
                <Residues/>
            </RoutePrivateAdmin>
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