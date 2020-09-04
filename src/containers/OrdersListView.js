import React from 'react';
import Axios from 'axios';
import { Row, Col, Input, Divider } from 'antd';
import Orders from '../components/packet/Orders';
import Sider from '../components/LandingPageSidebar';
import { config } from '../Constant';

var url = config.url.API_URL
const {Search} = Input

class OrderList extends React.Component {

    state = {
        orders : []
    }

    componentDidMount(){
        Axios.get(`${url}api/v1/advertise/packet/`)
            .then(res => {
                this.setState({
                    orders: res.data
                });
            })
            .catch(error => console.error(error));
    }

    render(){
        return(
            <div style={{display:"flex", justifyContent:"center"}}>
                <Row >
                    <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4} >
                         <Sider/>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}> 
                    <Row style={{display:"flex", justifyContent:"center"}} >
                        <Col>
                            <Search
                                placeholder="جستجو در آگهی‌ها"
                                onSearch={value => console.log(value)}
                                style={{ width: 600, alignItems:"center", fontSize:"12px" }}
                                size="middle"
                                />
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Row style={{display:"flex", justifyContent:"center"}}>
                        <Col xs={0} sm={0} md={0} lg={1} xl={1} xxl={1}></Col>
                        <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={22}>
                            <Orders data={this.state.orders} page={2000} pagesize={21} />
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={1} xl={1} xxl={1}></Col>
                    </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default OrderList;