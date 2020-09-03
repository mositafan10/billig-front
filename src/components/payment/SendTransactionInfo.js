import React, { Component } from 'react';
import { Button } from 'antd';  
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import LoadingIPG from './LoadingIPG';


class SendTransactionInfo extends Component {
    callback_url = "http://127.0.0.1:3000"
    sendapi = () => {
        const token = localStorage.getItem('token');
        Axios.post('http://127.0.0.1:8000/api/v1/payment/send/',
            { 
             amount:"asda",
             callback_url: this.callback_url,
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
        .then( res => {if (res.status == 200) {return <Redirect to='/login' />}})
        .catch(error => console.error(error));
        
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