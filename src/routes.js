import React, { Profiler } from 'react';
import { Route } from 'react-router-dom';
import OrderList from './containers/OrdersListView';
import OrderDetail from './containers/OrderDetailView';
import CreateOrder from './containers/CreateOrder';
import Profile from './containers/ProfileLayout';
import Login from './containers/Login';
import Signup from './containers/Signup';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={OrderList} />
        <Route exact path='/:orderID' component={OrderDetail} />
        <Route exact path='/packet' component={CreateOrder} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
    </div>
);

export default BaseRouter;
