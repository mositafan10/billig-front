import React from 'react';
import PackForm from '../components/PacketForm';
import Axios from 'axios';
import { Row, Col, Divider } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


class CreateOrder extends React.Component {

    state = {
        orders : [],
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
            <Row>
            <Col span={8}></Col>
            <Col span={8}>
            <div>
            {
                this.props.isAuthenticated ?
                <div style={{fontFamily:"IRANSans"}}>
                    {/* <Divider style={{fontSize:"large"}}> فرم ثبت آگهی </Divider> */}
                    <h2 align="center"> </h2>
                    <PackForm
                        requestType="post"
                        orderID={null}
                        btnText="create" 
                        {...this.props}/>
                </div> 
                :
                <p style={{fontFamily:"IRANSans", textAlign:"center"}}> لطفا ابتدا در سایت<a href={'/login'}> وارد</a> شوید </p>
             }
            </div>
            </Col>
            <Col span={8}></Col>
            </Row>
        )
    }
}


export default CreateOrder;