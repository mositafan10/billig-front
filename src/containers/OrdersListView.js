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
                    <Col span={20}>
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
                            <Orders data={this.state.orders} page={2000} pagesize={12} />
                        </div>
                    </Col>
                    <Col span={4}  >
                        <div> 
                        <Sider/>
                        </div>
                        <br/>
                        
                    </Col>
                </Row>
                </div>
                <br />
            </div>
        )
    }
}

export default OrderList;