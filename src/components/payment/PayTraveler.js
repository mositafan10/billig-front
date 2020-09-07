import React, { Component } from 'react';
import { Button, message } from 'antd';
import Axios from 'axios';
import { config } from '../../Constant';
var url = config.url.API_URL;

class PayTraveler extends Component {

    pay = () => {
        const token = localStorage.getItem('token'); 
        Axios.post(`${url}api/v1/payment/paytraveler/`, {
            payment_number: this.props.offer,
            amount: this.props.amount,
        },{
            headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(res => 
            {if(res.status == '1')
                {return message.success("درخواست شما با موفقیت ثبت شد")
            } 
        })
        .catch(err => message.error(err.response.data.error))
    }   

    render() {
        return (
            <div>
                <Button style={{fontSize:"12px", borderRadius:"10px"}} onClick={this.pay}>تسویه حساب</Button>
            </div>
        );
    }
}

export default PayTraveler;