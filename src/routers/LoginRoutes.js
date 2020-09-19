import React from 'react';
import { Route , Switch } from 'react-router-dom';

//components
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import AfterSignup from '../pages/AfterSignup';

class ProfileRoutes extends React.Component {
    render(){
    return(             
        <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/signup/complete' exact component={AfterSignup} />
        </Switch>
        );
    }
}

export default ProfileRoutes;
