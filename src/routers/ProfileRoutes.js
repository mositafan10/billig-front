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
import CommentList from '../components/rating/CommentList';
import Login from '../containers/Login';

class ProfileRoutes extends React.Component {
    render(){
    return(          
        this.props.isAuthenticated ?   
        <Switch>
            <Route exact path='/profile/' render={(props) => <EditProfile/> }/>
            <Route exact path='/profile/comments' render={(props) => <CommentList/> }/>
            <Route exact path='/profile/mypacket' render={(props) =>  <PacketUserList/>} />
            <Route exact path='/profile/mytravel' render={(props) => <TravelProfile/> }/>
            <Route exact path='/profile/myoffer' render={(props) => <UserOffer/> }/>
            <Route exact path='/profile/inbox' render={(props) => <InboxLayout {...this.props}/> }/>
            <Route exact path='/profile/payment' render={(props) => <TransactionList/> }/>
            <Route exact path='/profile/bookmark' render={(props) => <BookmarkPacket/> }/>
            <Route component={PageNotFound} />
        </Switch>
        :
        <Route component={<Login/>} /> 
        );
    }
}

export default ProfileRoutes;
