import React from 'react';
import { Route , Switch, Redirect } from 'react-router-dom';
import OrderList from './containers/OrdersListView';
import OrderDetail from './containers/OrderDetailView';
import Login from './containers/Login';
import Signup from './containers/Signup';
import UserProfile from './containers/UserDetailView';
import LandingPage from './containers/LandingPage';
import TravelDetail from './containers/TravelDetailView';
import PackForm from './components/packet/PacketForm';
import PageNotFound from './components/errors/PageNotFound';
import AuthorizationFail from './components/errors/AuthorizationFail';
import LoadingIPG from './components/payment/LoadingIPG';
import VerifyTransaction from './components/payment/VerifyTransaction';

class BaseRouter extends React.Component {
    render(){
    return(             
        <Switch>
            <Route exact path='/' render={(props) => <LandingPage/>} />
            <Route exact path='/orders' render={(props) => <OrderList/> }/>
            <Route exact path='/createpacket' render={(props) => this.props.isAuthenticated ? <PackForm {...this.props}/>:<AuthorizationFail/>}/>
            <Route exact path='/travel/:travelID' component={this.props.isAuthenticated ? TravelDetail:AuthorizationFail} />
            <Route exact path='/users/:userID' component={UserProfile} />
            <Route exact path='/packet/:orderID' component={OrderDetail} />
            <Route exact path='/ipgloading' component={LoadingIPG} />
            <Route exact path='/payment/verify' component={VerifyTransaction} />
            <Route component={PageNotFound} />
            <Redirect from='/home' to='/'/>
        </Switch>
        );
    }
}

export default BaseRouter;
