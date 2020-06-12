import React from 'react';
import PackForm from '../components/PacketForm';
import Axios from 'axios';
import { Row, Col, Divider } from 'antd';


class CreateOrder extends React.Component {

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
                <Row>
                    <Col span={8}>
                        <Divider style={{fontSize:"x-large"}}> راهنمای ثبت آگهی</Divider>
                    </Col >
                    <Col span={8}>
                    <Divider style={{fontSize:"x-large"}}>فرم ثبت آگهی </Divider>
                    <h2 align="center"> </h2>
                    <PackForm
                        requestType="post"
                        orderID={null}
                        btnText="create" />
                    </Col>
                    <Col span={8}>
                        <Divider style={{fontSize:"x-large"}}> راهنمای ثبت آگهی</Divider>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CreateOrder;