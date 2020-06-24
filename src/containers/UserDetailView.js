import React from 'react';
import Axios from 'axios';
// import PacketOffer from '../components/PacketOffer';
import { Card , Tabs, Button } from 'antd';
import CommentUser from '../components/Comment';
import FriendRequest from '../components/FriendRequest';

const { TabPane } = Tabs;
class UserProfile extends React.Component {

    state = {
        user_profile : [],
    }
    
    componentDidMount(){
        const userID = this.props.match.params.userID;
        Axios.get(`http://127.0.0.1:8000/api/v1/account/users/profile/${userID}`, )
            .then(res => {
                this.setState({
                    user_profile: res.data
                });
            })
    }
    render(){
        return(
            <div style={{textAlign:"center"}}> 
                <Card 
                    title={this.state.user_profile.first_name + ' ' + this.state.user_profile.last_name} style={{textAlign:"center"}}>
                    <img
                        width={100}
                        // alt="profile pic"
                        src={this.state.user_profile.picture}
                    /><br/><br/>
                    <p >{this.state.user_profile.bio}</p>
                    <div>
                        {/* {this.state.user_profile.picture} */}
                    </div>   
                <FriendRequest data={this.state.user_profile.id}/>
                </Card>
                <br/>
                <Tabs  tabPosition="top" style={{textAlign:"center"}}>
                    <TabPane tab="لیست آگهی‌ها" key="1">
                        لیست آگهی‌ها
                    </TabPane>
                    <TabPane tab="لیست سفرها " key="2">
                        لیست سفرها
                    </TabPane>
                    <TabPane tab="نظرات دیگران " key="3">
                        نظرات دیگران
                        <CommentUser />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default UserProfile;