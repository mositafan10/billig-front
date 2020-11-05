import React, { Component } from 'react';
import { Button, message, Tooltip } from 'antd';  
import Axios from 'axios';
import { config } from '../../Constant';

var url = config.url.API_URL;
const callback_url = "https://billlig.com/payment/verify/"

class SendTransactionInfo extends Component {

    state = {
        token:""
    }
    
    sendapi = () => {
        const token = localStorage.getItem('token');
        const amount_w = this.props.amount;
        const net_amount = ( 1 + 5/100 ) * amount_w * 10 ;
        Axios.post(`${url}api/v1/payment/send/`,
            { 
             amount: net_amount,
             callback_url: callback_url,
             factorNumber: this.props.factorNumber,
            },
            { headers: {"Authorization" : `Token ${token}`} })
        .then( res => 
            {if (res.data.status === 1 ) 
            {  return (
            this.setState({token: res.data.token}),
            window.location.replace(`https://ipg.vandar.io/v3/${res.data.token}`))}
        })
        .catch(error => message.error(error.response.data ? error.response.data.errors : ""));
    }

    render() {
        return (
            <div>
                { this.props.disabled ?
               <Tooltip title="ابتدا پیشنهاد را تایید کنید"><Button onClick={this.sendapi.bind(this)} disabled={this.props.disabled ? true : false} style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}>پرداخت</Button></Tooltip> 
               :
               <Button onClick={this.sendapi.bind(this)} disabled={this.props.disabled ? true : false} style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}>پرداخت</Button>
                }
            </div>
        );
    }
}

export default SendTransactionInfo;