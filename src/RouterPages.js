import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Registration from './pages/Registration';
import Localizar from './pages/Localizar';
import NotFound from './pages/NotFound';

export default function RouterPages(){
    return(
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/cadastro' component={Registration}/>
            <Route exact path='/localizar' component={Localizar}/>
            <Route path='*' component={NotFound}/>
        </Switch>
    )
}