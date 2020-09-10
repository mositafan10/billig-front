import React from 'react';
import { Route , Switch } from 'react-router-dom';

//components
import Login from '../containers/Login';
import Signup from '../containers/Signup';

class ProfileRoutes extends React.Component {
    render(){
    return(             
        <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={Signup} />
        </Switch>
        );
    }
}

export default ProfileRoutes;
