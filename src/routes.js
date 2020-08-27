import React from 'react';
import { Route , Switch } from 'react-router-dom';
import OrderList from './containers/OrdersListView';
import OrderDetail from './containers/OrderDetailView';
import Profile from './containers/ProfileLayout';
import Login from './containers/Login';
import Signup from './containers/Signup';
import UserProfile from './containers/UserDetailView';
import LandingPage from './containers/LandingPage';
import TravelDetail from './containers/TravelDetailView';
import PackForm from './components/PacketForm';
import ChatwithWebsocket from './components/ChatwithWebsocket';
import PageNotFound from './components/PageNotFound';
import AuthorizationFail from './components/AuthorizationFail';


class BaseRouter extends React.Component {
    render(){
    return(
        <Switch>
            <Route exact path='/' render={(props) => <LandingPage/>} />
            <Route exact path='/orders' render={(props) => <OrderList/> }/>
            <Route exact path='/profile' render={(props) =>
                this.props.isAuthenticated ? <Profile {...this.props}/>:<AuthorizationFail {...this.props}/>}/>
            <Route exact path='/login' render={(props) => <Login {...this.props}/> }/>
            <Route exact path='/signup' render={(props) => <Signup {...this.props}/> }/>
            <Route exact path='/createpacket' render={(props) =>
                this.props.isAuthenticated ? <PackForm {...this.props}/>:<AuthorizationFail/>}/>
            <Route exact path='/travel/:travelID' component={TravelDetail} />
            <Route exact path='/users/:userID' component={UserProfile} />
            <Route exact path='/chat/test' component={ChatwithWebsocket} />
            <Route exact path='/packet/:orderID' component={OrderDetail} />
            <Route component={PageNotFound  } />
        </Switch>
        );
    }
}

export default BaseRouter;
