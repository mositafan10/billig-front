import React from 'react';
import { Route , Switch } from 'react-router-dom';
import PacketUserList from '../components/packet/ListInProfile';
import UserOffer from '../components/offer/Useroffer';
import TravelProfile from '../containers/TravelProfile';
import EditProfile from '../components/profile/EditProfile';
import TransactionList from '../components/payment/TransactionList';
import InboxLayout from '../containers/InboxLayout';
import BookmarkPacket from '../components/packet/BookmarkPacket';
import PageNotFound from '../components/errors/PageNotFound';

class ProfileRoutes extends React.Component {
    render(){
    return(          
        this.props.isAuthenticated ?   
        <Switch>
            <Route exact path='/profile/mypacket' render={(props) =>  <PacketUserList/>} />
            <Route exact path='/profile/mytravel' render={(props) => <TravelProfile/> }/>
            <Route exact path='/profile/myoffer' render={(props) => <UserOffer/> }/>
            <Route exact path='/profile/editprofile' render={(props) => <EditProfile/> }/>
            <Route exact path='/profile/inbox' render={(props) => <InboxLayout/> }/>
            <Route exact path='/profile/payment' render={(props) => <TransactionList/> }/>
            <Route exact path='/profile/bookmark' render={(props) => <BookmarkPacket/> }/>
        </Switch>
        :
        <Route component={PageNotFound} /> 
        );
    }
}

export default ProfileRoutes;
