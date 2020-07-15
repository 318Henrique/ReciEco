import React from 'react';
import {Switch, Route} from 'react-router-dom';
// import {getToken} from './Components/AuthVerification';

import Home from './pages/Home';
import Localizar from './pages/Localizar';
import People from './pages/Peoples';
import Residues from './pages/Residues';
import PageRestrict from './pages/PageRestrict';
import NotFound from './pages/NotFound';


// const RoutePrivate = ({children, ...rest}) => {
//     return (
//         <Route
//             {...rest}
//             render={({location}) =>  getToken.admin !== null ? 
//                 (children) :
//                 (
//                     <Redirect
//                     to={{
//                         pathname: "/restrict-access",
//                         state: { from: location}
//                     }}
//                     />
//                 )
//             }
//         />
//     )
// }


export default function RouterPages(){
    return(
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/localizar' component={Localizar}/>
            <Route exact path='/peoples' component={People}/>
            <Route exact path='/residues' component={Residues}/>
            <Route exact path='/restrict-access' component={PageRestrict}/>
            <Route path='*' component={NotFound}/>
        </Switch>
    )
}