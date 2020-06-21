import React from 'react';
import { Button, message } from 'antd';
import Axios from 'axios';

const token = localStorage.getItem('token');

class FriendRequest extends React.Component {
    
    handlerequest = () => {
        const userID = this.props.data;
        Axios.post(`http://127.0.0.1:8000/api/v1/account/friend/`,
        {following: userID},
        { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
    }

    render(){
        return(
            <Button onClick={this.handlerequest} style={{fontSize:"12px" ,borderRadius:"8px"}}><b>  درخواست دوستی </b></Button>
        )
    }
}

export default FriendRequest;