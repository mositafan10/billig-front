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
            .catch(error => console.error(error));
    }

    render(){
        return(
            <div style={{fontFamily:"IRANSans"}}>
                <div>
                <Row >
                    <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4} >
                        <div> 
                         <Sider/>
                        </div>
                        <br/>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
                        <br/>
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Search
                                placeholder="جستجو در آگهی‌ها"
                                onSearch={value => console.log(value)}
                                style={{ width: 600, alignItems:"center", fontSize:"12px" }}
                                size="large"
                                />
                            <br/><br/>
                         </div>
                        <div>
                            <Orders data={this.state.orders} page={2000} pagesize={21} />
                        </div>
                    </Col>
                </Row>
                </div>
                <br />
            </div>
        )
    }
}

export default OrderList;