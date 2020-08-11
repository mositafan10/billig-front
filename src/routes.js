import React from 'react';
import { Route , Switch } from 'react-router-dom';
import OrderList from './containers/OrdersListView';
import OrderDetail from './containers/OrderDetailView';
import CreateOrder from './containers/CreateOrder';
import Profile from './containers/ProfileLayout';
import Login from './containers/Login';
import Signup from './containers/Signup';
import ChatLayout from './containers/ChatLayout';
import UserProfile from './containers/UserDetailView';
import OrderForm from './containers/OrderForm';
import LandingPage from './containers/LandingPage';
import TravelDetail from './containers/TravelDetailView';
import PackForm from './components/PacketForm';

class BaseRouter extends React.Component {
    render(){
    return(
        <Switch>
            <Route exact path='/' render={(props) => <LandingPage/> }/>
            <Route exact path='/orders' render={(props) => <OrderList/> }/>
            <Route exact path='/profile' render={(props) => <Profile {...this.props}/> }/>
            <Route exact path='/login' render={(props) => <Login {...this.props}/> }/>
            <Route exact path='/signup' render={(props) => <Signup {...this.props}/> }/>
            <Route exact path='/createpacket' render={(props) => <PackForm {...this.props}/>}/>
            <Route exact path='/social' component={ChatLayout}/>
            <Route exact path='/:orderID' component={OrderDetail} />
            <Route exact path='/travel/:travelID' component={TravelDetail} />
            <Route exact path='/users/:userID' component={UserProfile} />
        </Switch>
        );
    }
}

export default BaseRouter;
