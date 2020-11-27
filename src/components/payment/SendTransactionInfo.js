import React, { Component } from 'react';
import { Button, message, Popconfirm } from 'antd';  
import Axios from 'axios';
import { config } from '../../Constant';

var url = config.url.API_URL;
const callback_url = "https://billlig.com/payment/verify/"

class SendTransactionInfo extends Component {

    state = {
        token: "",
        visible: false
    }
    
    handleOkinfo = () => {
        this.setState({visible:false})
    }

    showInfo= () => {
        this.setState({visible:true})
    }

    sendapi = () => {
        this.setState({visible:true})
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
            <Popconfirm
            visible={this.state.visible}
            onConfirm={this.sendapi}
            overlayStyle={{ fontFamily: "VazirD" }}
            cancelButtonProps={{ hidden: "true" }}
            okText="متوجه شدم"
            title={
                <span>
                طبق قوانین بیلیگ،‌ به میزان ۵ درصد به مبلغ تایید شده به عنوان کارمزد افزوده خواهد شد.
                </span>
            }
          >
               <Button onClick={this.showInfo.bind(this)} style={{fontSize:"12px", border:"hidden", backgroundColor:"green", color:"white", borderRadius:"10px"}}>تایید و پرداخت</Button> 
            </Popconfirm>
            </div>
        );
    }
}

export default SendTransactionInfo;