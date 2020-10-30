import React from 'react';
import { Route , Switch, Redirect ,BrowserRouter, withRouter } from 'react-router-dom';
import OrderList from './containers/OrdersListView';
import OrderDetail from './containers/OrderDetailView';
import UserProfile from './containers/UserDetailView';
import LandingPage from './containers/LandingPage';
import TravelDetail from './containers/TravelDetailView';
import PackForm from './components/packet/PacketForm';
import PageNotFound from './components/errors/PageNotFound';
import AuthorizationFail from './components/errors/AuthorizationFail';
import VerifyTransaction from './components/payment/VerifyTransaction';
import AboutUs from './pages/AboutUs';
import HowToWork from './pages/HowToWork';
import TravelGuide from './pages/TravelGuide';
import SendParcelGuide from './pages/SendParcelGuide';
import BuyGuide from './pages/BuyGuide';
import Faq from './pages/Faq';

class BaseRouter extends React.Component {
    render(){
    return(
            <Switch>
                <Route exact path='/' render={(props) => <LandingPage {...this.props}/>} />
                <Route exact path='/orders' render={(props) => <OrderList {...this.props}/> }/>
                <Route exact path='/orders/:country' render={(props) => <OrderList {...this.props}/> }/>
                <Route exact path='/orders/:country/:category' render={(props) => <OrderList {...this.props}/> }/>
                <Route exact path='/create-packet' render={(props) => this.props.isAuthenticated ? <PackForm {...this.props}/>:<AuthorizationFail/>}/>
                <Route exact path='/travel/:travelID' component={this.props.isAuthenticated ? TravelDetail:AuthorizationFail} />
                <Route exact path='/users/:userID' component={UserProfile} />
                <Route exact path='/packet/:orderID' component={OrderDetail} />
                <Route exact path='/packet/:title/:orderID/' component={OrderDetail} />
                <Route exact path='/payment/verify' component={VerifyTransaction} />
                <Route exact path='/about-us' component={AboutUs} />
                <Route exact path='/how-billlig-work' component={HowToWork} />
                <Route exact path='/travel-guide' component={TravelGuide} />
                <Route exact path='/send-parcel-guide' component={SendParcelGuide} />
                <Route exact path='/buy-guide' component={BuyGuide} />
                <Route exact path='/faq' component={Faq} />
                <Route component={PageNotFound} />
                <Redirect from='/home' to='/'/>
            </Switch>
        );
    }
}

export default withRouter(BaseRouter);
