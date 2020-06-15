import React from 'react';
import { Route , Switch } from 'react-router-dom';
import OrderList from './containers/OrdersListView';
import OrderDetail from './containers/OrderDetailView';
import CreateOrder from './containers/CreateOrder';
import Profile from './containers/ProfileLayout';
import Login from './containers/Login';
import Signup from './containers/Signup';


class BaseRouter extends React.Component {
    render(){
    return(
        <Switch>
            <Route exact path='/' render={(props) => <OrderList/> }/>
            <Route exact path='/profile' render={(props) => <Profile {...this.props}/> }/>
            <Route exact path='/login' render={(props) => <Login {...this.props}/> }/>
            <Route exact path='/signup' render={(props) => <Signup {...this.props}/> }/>
            <Route exact path='/packet' render={(props) => <CreateOrder {...this.props}/> }/>
            <Route exact path='/:orderID' component={OrderDetail} />
        </Switch>
        );
    }
}

export default BaseRouter;
