import React, { Component } from 'react';
import { Button, message } from 'antd';  
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { config } from '../../Constant';

var url = config.url.API_URL;
const callback_url = "http:billlig.com/payment/verify/"

class SendTransactionInfo extends Component {

    state = {
        token:""
    }
    
    sendapi = () => {
        const token = localStorage.getItem('token');
        Axios.post(`${url}api/v1/payment/send/`,
            { 
             amount:this.props.amount,
             callback_url: callback_url,
             factorNumber: this.props.factorNumber,
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
        .then( res => 
            {if (res.data.status == 1 ) 
            {  return (
            console.log("hi","sdfsfsfs"),
            this.setState({token: res.data.token}),
            window.location.replace(`https://ipg.vandar.io/v3/${res.data.token}`))}
        })
        .catch(error => message.error(error.response.data ? error.response.data.detail : ""));
    }

    render() {
        return (
            <div>
                <Button onClick={this.sendapi} style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}>تایید و پرداخت</Button>
            </div>
        );
    }
}

export default SendTransactionInfo;