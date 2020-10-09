import React, { Component } from 'react';
import { Button, message, notification } from 'antd';
import Axios from 'axios';
import { config } from '../../Constant';
var url = config.url.API_URL;

class PayTraveler extends Component {

    pay = () => {
        const token = localStorage.getItem('token'); 
        Axios.post(`${url}api/v1/payment/paytraveler/`, {
            payment_number: this.props.travel,
            amount: this.props.amount,
        },{
            headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(() => 
            notification['success']({
                message: 'درخواست شما با موفقیت ثبت شد',
                style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content", marginTop:"70px"},
                duration:2.5,
              })
     )
        .catch(err => message.error(err.response.data.error))
    }   

    render() {
        return (
            <div>
                <Button style={{fontSize:"14px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}} onClick={this.pay}>تسویه حساب</Button>
            </div>
        );
    }
}

export default PayTraveler;