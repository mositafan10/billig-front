import React from 'react';
import Axios from 'axios';
import { Card } from 'antd';
import Detail from '../components/OrderDetail';



class OrderDetail extends React.Component {

    state = {
        order : []
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
        return(
            <div>
            <Detail data={this.state.order} />
            <br></br>
            </div>
        )
    }
}

export default OrderDetail;