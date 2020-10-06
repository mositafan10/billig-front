import React, { Component } from 'react';
import Axios from 'axios';  
import { Button, Divider, message } from 'antd';
import { config } from '../../Constant';
import { Link } from 'react-router-dom';

var url = config.url.API_URL;

class VerifyTransaction extends Component {
    
    state = {
        payment_status: "",
        token: ""
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token');
        const payment_status = query.get('payment_status');
        this.setState({
            payment_status: payment_status,
            token: token
        })
    }

    verify = () => {
        const token1 = localStorage.getItem('token')
        Axios.post(`${url}api/v1/payment/verify/`,
        { 
            token: this.state.token,
        },
        { headers: {"Authorization" : `Bearer ${token1}`} })
        .then(res => { 
            message.success("پرداخت شما با موفقیت انجام شد. لیست پرداخت ها را می‌توانید در پروفایل خود مشاهده نمایید.")
            window.location.replace = '/profile/'})
        .catch((error) => message.error(error.response.data.error))
    }

    render() {
        if( this.state.payment_status !== "OK") { 
            return (
                <div >
                    <p style={{display:"flex", justifyContent:"center", margin:"20px 0 20px"}}>عملیات ناموفق</p>
                    <Divider/>
                    <div style={{display:"flex", justifyContent:"center", margin:"20px 0 20px"}}>
                        <Link to='/profile/'><Button style={{borderRadius:"15px", backgroundColor:"green", color:"white"}}>بازگشت به پروفایل</Button></Link>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div style={{display:"flex", justifyContent:"center", margin:"20px 0 20px"}}>
                    <Button style={{borderRadius:"15px", backgroundColor:"green", color:"white"}} onClick={this.verify.bind(this)}>تکمیل فرآیند خرید</Button>
                </div>
            )
        }
    }
}

export default VerifyTransaction;