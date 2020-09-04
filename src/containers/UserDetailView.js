import React from 'react';
import Axios from 'axios';
import { Card , Tabs, Rate } from 'antd';
import { config } from '../Constant';

var url = config.url.API_URL;
const { TabPane } = Tabs;

class UserProfile extends React.Component {

    state = {
        user_profile : [],
    }
    
    componentDidMount(){
        const userID = this.props.match.params.userID;
        Axios.get(`${url}api/v1/account/users/profile/${userID}`, )
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
                        src = {`${url}dstatic/${this.state.user_profile.picture}`}
                    /><br/>
                <Card bordered={false}>
                    <h3>{this.state.user_profile.name}</h3>
                <Rate allowHalf value={this.state.user_profile.score} disabled={true} />
                <br/><br/>
                    <p >{this.state.user_profile.bio}</p>
                </Card>
                <br/>
                <Tabs  tabPosition="top" style={{textAlign:"center"}}>
                    <TabPane tab="لیست سفرهای کاربر " key="1">
                    </TabPane>
                    <TabPane tab="نظرات دیگران " key="2">
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default UserProfile;