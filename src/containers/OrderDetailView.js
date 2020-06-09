import React from 'react';
import Axios from 'axios';
import { Card } from 'antd';



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
            <Card title={this.state.order.title}>
                {this.state.order.description}
            </Card>
            <br></br>
            </div>
        )
    }
}

export default OrderDetail;