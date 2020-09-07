import React from 'react';
import Axios from 'axios';
import { Card, Row, Col, Divider } from 'antd';
import moment from 'moment';
import { config } from '../Constant';

var url = config.url.API_URL
const style_left = {display:"flex", justifyContent:"left"}
const style_right = {display:"flex", justifyContent:"right"}

class TravelDetail extends React.Component {

    state = {
        order : [],
        pic: ""
    }
    
    componentDidMount(){
        const travelID = this.props.match.params.travelID;
        Axios.get(`${url}api/v1/advertise/travel/${travelID}`)
            .then(res => {
                this.setState({
                    order: res.data
                });
            })
    }

    render(){
        return(
            <div style={{textAlign:"center", padding:"0 50px 0 50px"}}> 
                <Row>
                    <Col xs={0} sm={0} md={0} lg={6} xl={6} xxl={6}></Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Card style={{borderRadius:"20px"}} title={this.state.order.title}>
                            <Row style={style_right}>
                                <Col style={style_right} span={5} >
                                    <img src={`${url}dstatic/${this.state.order.departure ? this.state.order.departure.icon : ""}`} width={80} alt={this.state.order.departure.name} style={{borderRadius:"5px"}} />
                                </Col>
                                <Col style={style_left} span={19}>
                                <img src={`${url}dstatic/${this.state.order.destination ? this.state.order.departure.icon : ""}`} width={80}  alt={this.state.order.destination.name} style={{borderRadius:"5px"}} />
                                </Col>
                            </Row>
                            <Divider />
                            <Row style={style_right}>
                                <Col style={style_right} span={5} >
                                    مبدا
                                </Col>
                                <Col style={style_left} span={19}>
                                {this.state.order.departure ? this.state.order.departure.name : ""} - {this.state.order.departure_city}
                                    
                                </Col>
                            </Row>
                            <hr style={{color:"aliceblue"}}/>
                            <Row style={style_right}>
                                <Col style={style_right} span={5} >
                                مقصد
                                </Col>
                                <Col style={style_left} span={19}>
                                {this.state.order.destination ? this.state.order.destination.name : ""} - {this.state.order.destination_city}
                                </Col>
                            </Row>
                            <hr style={{color:"aliceblue"}}/>
                            <Row style={style_right}>
                                <Col style={style_right} span={8} >
                                    <h4>تاریخ پرواز</h4>
                                </Col>
                                <Col style={style_left} span={16}>
                                    {moment(this.state.flight_data_start).format('Do MMMM YYYY')}
                                </Col>
                            </Row>
                            <hr style={{color:"aliceblue"}}/>
                            <Row style={style_right}>
                                <Col style={style_right} span={8} >
                                    <h4>درآمد حاصل از این سفر</h4>
                                </Col>
                                <Col style={style_left} span={16}>
                                    {this.state.order.income}
                                </Col>
                            </Row>
                            <hr style={{color:"aliceblue"}}/>
                            <Row style={style_right}>
                                <Col style={style_right} span={8} >
                                    <h4>تعداد بسته‌های پذیرش شده</h4>
                                </Col>
                                <Col style={style_left} span={16}>
                                    {this.state.order.approved_packet}
                                </Col>
                            </Row>
                            <hr style={{color:"aliceblue"}}/>
                            <p style={{textAlign:"right"}}>{this.state.order.description}</p>
                        </Card>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={6} xl={6} xxl={6}></Col>
                </Row>
            </div>
        )
    }
}

export default TravelDetail;

