import React from 'react';
import { Row, Col } from 'antd';
import UploadProfilePicture from '../utils/UploadProfilePicture';
import EditProfileForm from './EditProfileForm';
import Axios from 'axios';
import { config } from '../../Constant'

var url = config.url.API_URL


class EditProfile extends React.Component {
    state = {
        user_profile: {},
    }
    
    componentDidMount(){
        const userID = localStorage.getItem('user');
        Axios.get(`${url}api/v1/account/users/profile/${userID}`, )
            .then(res => {
                this.setState({
                    user_profile: res.data
                });
            })
    }

    callbackFunction = () => {
        this.componentDidMount()
      }

    render(){
        return(
            <div>
                <Row>
                    <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}></Col>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <UploadProfilePicture update={this.callbackFunction} data={this.state.user_profile.picture} />
                            </Col>
                        </Row>
                        <br/>
                        <EditProfileForm  data={this.state.user_profile} update={this.callbackFunction}/>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}></Col>
                </Row>
            </div>
        );
    }
}

export default EditProfile;