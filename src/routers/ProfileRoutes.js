import React from 'react';
import { Redirect, Route , Switch } from 'react-router-dom';
import PacketUserList from '../components/packet/ListInProfile';
import UserOffer from '../components/offer/Useroffer';
import TravelProfile from '../containers/TravelProfile';
import EditProfile from '../components/profile/EditProfile';
import TransactionList from '../components/payment/TransactionList';
import InboxLayout from '../containers/InboxLayout';
import BookmarkPacket from '../components/packet/BookmarkPacket';
import PageNotFound from '../components/errors/PageNotFound';
import AllComments from '../components/rating/AllComments';
import ChatRoom from '../components/chat/ChatRoom';
import OfferListModal from '../components/offer/OfferListModal';
import OfferListModalTravel from '../components/offer/OfferListModalTravel';

class ProfileRoutes extends React.Component {

    render(){
    const token = localStorage.getItem('token') 
    return(          
        (token != null)
        ?
        <Switch>
            <Route exact path='/profile/' render={(props) => <EditProfile/> }/>
            <Route exact path='/profile/comments' render={(props) => <AllComments/> }/>
            <Route exact path='/profile/mypacket' component={PacketUserList} />
            <Route exact path='/profile/mypacket/:packetID' component={OfferListModal} />
            <Route exact path='/profile/mytravel' component={TravelProfile}/>
            <Route exact path='/profile/mytravel/:travelID' component={OfferListModalTravel}/>
            <Route exact path='/profile/myoffer' render={(props) => <UserOffer/> }/>
            <Route exact path='/profile/inbox' render={(props) => <InboxLayout {...this.props}/> }/>
            <Route exact path='/profile/inbox/:chatID' component={ChatRoom}/>
            <Route exact path='/profile/payment' render={(props) => <TransactionList/> }/>
            <Route exact path='/profile/bookmark' render={(props) => <BookmarkPacket/> }/>
            <Route component={PageNotFound} />
        </Switch>
        :
        <Redirect to='/login/'/>
        );
    }
}

export default ProfileRoutes;
