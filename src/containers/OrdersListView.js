import React from 'react';
import Orders from '../components/Orders';
import Axios from 'axios';
    

class OrderList extends React.Component {

    state = {
        orders : []
    }

    componentDidMount(){
        Axios.get('http://127.0.0.1:8000/api/v1/advertise/packet/')
            .then(res => {
                this.setState({
                    orders: res.data
                });
                console.log(res.data);  
            })
    }

    render(){
        return(
            <div>
                <Orders data={this.state.orders} />
                <br />
            </div>
        )
    }
}

export default OrderList;