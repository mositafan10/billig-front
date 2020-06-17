import React from 'react';
import Axios from 'axios';
import PacketOffer from '../components/PacketOffer';
import { Card } from 'antd';




class OrderDetail extends React.Component {

    state = {
        order : [],
    }
    
    componentDidMount(){
        const orderID = this.props.match.params.orderID;
        Axios.get(`http://127.0.0.1:8000/api/v1/advertise/packet/${orderID}`)
            .then(res => {
                this.setState({
                    order: res.data
                });
            })
    }
    render(){
        const orderID = this.props.match.params.orderID;
        return(
            <div> 
                <Card title={this.state.order.title} style={{textAlign:"center"}}>
                    <p >{this.state.order.description}</p>
                    <div>
                        {this.state.order.picture}
                    </div>      
                </Card>
                <br/><h3 style={{textAlign:"center"}}>لیست پیشنهاد‌ها</h3>
                <PacketOffer data={orderID}/>
            </div>
        )
    }
}

export default OrderDetail;