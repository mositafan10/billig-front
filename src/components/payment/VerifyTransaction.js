import React, { Component } from 'react';
import Axios from 'axios';  
import { Button, Divider } from 'antd';
import { config } from '../../Constant';
import { Redirect, Link } from 'react-router-dom';

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
        .then(res => {if(res.status == 201) {return <Redirect to='/payment/success' />}})
        .catch((error) => console.log(error))
    }

    render() {
        if( this.state.payment_status != "OK") { 
            return (
                <div >
                    <p style={{display:"flex", justifyContent:"center", margin:"20px 0 20px"}}>عملیات ناموفق</p>
                    <Divider/>
                    <div style={{display:"flex", justifyContent:"center", margin:"20px 0 20px"}}>
                        <Link to='/'><Button style={{borderRadius:"15px", backgroundColor:"green", color:"white"}}>بازگشت به صفحه اصلی</Button></Link>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div style={{display:"flex", justifyContent:"center", margin:"20px 0 20px"}}>
                    <Button style={{borderRadius:"15px", backgroundColor:"green", color:"white"}} onClick={this.verify}>تکمیل فرآیند خرید</Button>
                </div>
            )
        }
    }
}

export default VerifyTransaction;