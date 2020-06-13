import React from 'react';
import Orders from '../components/Orders';
import Axios from 'axios';
import { Row, Col, Input } from 'antd';
import Sider from '../components/LandingPageSidebar';

const {Search} = Input

    

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
            <div style={{fontFamily:"IRANSans"}}>
                <Row style={{display:'flex', justifyContent:'center', marginBottom:"20px"}}>
                <div>
                    <Search
                        placeholder="جستجو در آگهی‌ها"
                        onSearch={value => console.log(value)}
                        style={{ width: 600, alignItems:"center" }}
                        /><br/><br/>
                </div>
                </Row>
                <Row>
                    <Col span={20}>
                        <Orders data={this.state.orders} />
                    </Col>
                    <Col span={4}  > 
                        <Sider/>
                    </Col>
                </Row>
                <br />
            </div>
        )
    }
}

export default OrderList;