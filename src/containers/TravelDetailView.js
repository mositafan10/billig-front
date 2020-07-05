import React from 'react';
import Axios from 'axios';
import { Card, Row, Col, Button, Space } from 'antd';
import billigpost from '../media/billigpost.png';
import OfferDetail from '../components/OfferInDetail';


class TravelDetail extends React.Component {

    state = {
        order : [],
        pic: ""
    }
    
    componentDidMount(){
        const travelID = this.props.match.params.travelID;
        Axios.get(`http://127.0.0.1:8000/api/v1/advertise/travel/${travelID}`)
            .then(res => {
                this.setState({
                    order: res.data
                });
                this.getPicture(res.data.pictures);
            })
        
    }

    getPicture = (ID) => {
        const picID = this.state.order.picture;
        console.log(picID)
        Axios.get(`http://127.0.0.1:8000/api/v1/advertise/get_picture/${picID}`)
            .then(res => {
                this.setState({
                    pic: res.data
                });
            })
    }

    render(){
        const travelID = this.props.match.params.travelID;
        
        return(
            <div style={{textAlign:"center", padding:"0 50px 0 50px"}}> 
                <Row width="500">
                    <Col span={14}>
                  {/* <Button style={{  fontSize:"13px", borderRadius:"10px"}}>نشان کردن سفر</Button> */}
                            <Row style={{display:"flex", justifyContent:"right" }}>
                                <Col style={{display:"flex"}} span={19}>
                                    {this.state.order.departure}
                                </Col>
                                <Col style={{display:"flex", justifyContent:"right"}} span={5} >
                                    <h4>مبدا</h4>
                                </Col>
                            </Row>
                    </Col>
                    <Col span={10}>
                        <Card style={{borderRadius:"20px"}} title={this.state.order.title}>
                           
                            <Row style={{display:"flex", justifyContent:"right" }}>
                                <Col style={{display:"flex"}} span={19}>
                                    {this.state.order.departure}
                                </Col>
                                <Col style={{display:"flex", justifyContent:"right"}} span={5} >
                                    <h4>مبدا</h4>
                                </Col>
                            </Row>
                            <hr style={{color:"aliceblue"}}/>
                            <Row style={{display:"flex", justifyContent:"right" }}>
                                    <Col style={{display:"flex"}} span={19}>
                                        {this.state.order.destination_city}
                                    </Col>
                                    <Col style={{display:"flex", justifyContent:"right"}} span={5} >
                                        <h4>مقصد</h4>
                                    </Col>
                            </Row>
                            <hr style={{color:"aliceblue"}}/>
                            <Row style={{display:"flex", justifyContent:"right" }}>
                                    <Col style={{display:"flex"}} span={16}>
                                        {this.state.order.flight_date}
                                    </Col>
                                    <Col style={{display:"flex", justifyContent:"right"}} span={8} >
                                        <h4>تاریخ پرواز</h4>
                                    </Col>
                            </Row>
                            <hr style={{color:"aliceblue"}}/>
                            <Row style={{display:"flex", justifyContent:"right" }}>
                                    <Col style={{display:"flex"}} span={16}>
                                      {/* {this.state.order.owner} */}
                                    </Col>
                                    <Col style={{display:"flex", justifyContent:"right"}} span={8} >
                                        <h4>آگهی دهنده</h4>
                                    </Col>
                            </Row>
                            <hr style={{color:"aliceblue"}}/>
                            <p style={{textAlign:"right"}}>{this.state.order.description}</p>
                            <br/>
                            <hr style={{color:"aliceblue"}}/><br/>
                            
                            {/* <hr style={{color:"aliceblue"}}/><br/> */}
                            <OfferDetail style data={this.state.order.slug}></OfferDetail>

                            {/* <Row style={{display:"flex", justifyContent:"right" }}>
                                    <Col style={{display:"flex"}} span={16}>
                                    <OfferDetail style data={this.state.order.slug}></OfferDetail>
                                    </Col>
                                    <Col style={{display:"flex", justifyContent:"right"}} span={8} >
                                    </Col>
                            </Row>   */}
                            
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default TravelDetail;

