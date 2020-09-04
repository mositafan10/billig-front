import React from 'react';
import Axios from 'axios';
import { Card , Tabs, Rate } from 'antd';
import CommentUser from '../components/Comment';

const root_url = "http://193.141.64.9/"


// import PacketOffer from '../components/PacketOffer';
// import FriendRequest from '../components/FriendRequest';

const { TabPane } = Tabs;

class UserProfile extends React.Component {

    state = {
        user_profile : [],
    }
    
    componentDidMount(){
        const userID = this.props.match.params.userID;
        Axios.get(`${root_url}api/v1/account/users/profile/${userID}`, )
            .then(res => {
                this.setState({
                    user_profile: res.data
                });
            })
    }

    render(){
        return(
            <div style={{textAlign:"center"}}> 
                    <img
                        width={300}
                        // alt="profile pic"
                        src = {`${root_url}dstatic/${this.state.user_profile.picture}`}
                    /><br/>
                <Card bordered={false}>
                    <h3>{this.state.user_profile.name}</h3>
                <Rate allowHalf value={this.state.user_profile.score} disabled={true} />
                <br/><br/>
                    <p >{this.state.user_profile.bio}</p>
                    <div>
                        {/* {this.state.user_profile.picture} */}
                    </div>
                    
                {/* <FriendRequest data={this.state.user_profile.id}/> */}
                </Card>
                <br/>
                <Tabs  tabPosition="top" style={{textAlign:"center"}}>
                    <TabPane tab="لیست سفرهای کاربر " key="2">
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