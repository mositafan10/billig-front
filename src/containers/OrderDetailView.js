import React from 'react';
import Axios from 'axios';
import { Card, Row, Col, Button, Space } from 'antd';
import billigpost from '../media/billigpost.png';
import OfferDetail from '../components/OfferInDetail';


class OrderDetail extends React.Component {

    state = {
        order : [],
        pic: ""
    }
    
    componentDidMount(){
        const orderID = this.props.match.params.orderID;
        Axios.get(`http://127.0.0.1:8000/api/v1/advertise/packet/${orderID}`)
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
        const orderID = this.props.match.params.orderID;
        
        return(
            <div style={{textAlign:"center", padding:"0 50px 0 50px"}}> 
                <Row width="500">
                    <Col span={14}>
                    <img
                    width={150}
                    // alt="عکس آگهی"
                    src={this.state.pic}
                    style={{verticalAlign:"middle"}}
                  />
                  <br/><br/><hr width="200" style={{color:"aliceblue"}}/>

                  <p>با مطالعه‌ی <a>راهنمای خرید امن</a> آسوده‌تر خرید کنید</p>
                  <Button style={{fontSize:"13px", borderRadius:"10px"}}>نشان کردن آگهی</Button>
                    </Col>
                    <Col span={10}>
                        <Card style={{borderRadius:"20px"}} title={this.state.order.title}>
                            <Row style={{display:"flex", justifyContent:"right" }}>
                                    <Col style={{display:"flex"}} span={19}>
                                         {/* {this.state.order.category} */}
                                         کتاب
                                    </Col>
                                    <Col style={{display:"flex", justifyContent:"right"}} span={5} >
                                        <h4>دسته بندی</h4>
                                    </Col>
                            </Row>
                            <hr style={{color:"aliceblue"}}/>
                            <Row style={{display:"flex", justifyContent:"right" }}>
                                    <Col style={{display:"flex"}} span={19}>
                                        {this.state.order.origin_country}
                                    </Col>
                                    <Col style={{display:"flex", justifyContent:"right"}} span={5} >
                                        <h4>مبدا</h4>
                                    </Col>
                            </Row>
                            <hr style={{color:"aliceblue"}}/>
                            <Row style={{display:"flex", justifyContent:"right" }}>
                                    <Col style={{display:"flex"}} span={19}>
                                        {this.state.order.destination_country}
                                    </Col>
                                    <Col style={{display:"flex", justifyContent:"right"}} span={5} >
                                        <h4>مقصد</h4>
                                    </Col>
                            </Row>
                            {/* <hr style={{color:"aliceblue"}}/>
                            <Row style={{display:"flex", justifyContent:"right" }}>
                                    <Col style={{display:"flex"}} span={16}>
                                        {this.state.order.suggested_price}
                                        ۱۰۰/۰۰۰
                                    </Col>
                                    <Col style={{display:"flex", justifyContent:"right"}} span={8} >
                                        <h4>قیمت پیشنهادی</h4>
                                    </Col>
                            </Row> */}
                            <hr style={{color:"aliceblue"}}/>
                            <Row style={{display:"flex", justifyContent:"right" }}>
                                    <Col style={{display:"flex"}} span={16}>
                                      {/* {this.state.order.owner} */}
                                      حسین ناصری
                                    </Col>
                                    <Col style={{display:"flex", justifyContent:"right"}} span={8} >
                                        <h4>آگهی دهنده</h4>
                                    </Col>
                            </Row>
                            <hr style={{color:"aliceblue"}}/>
                            {this.state.order.buy ?
                                <div>
                                <Row style={{display:"flex", justifyContent:"right" }}>
                                    <Col style={{display:"flex"}} span={16}>
                                        دارد
                                    </Col>
                                    <Col style={{display:"flex", justifyContent:"right"}} span={8} >
                                        <h4>قابلیت خریداری</h4>
                                    </Col>
                                </Row>
                                <hr style={{color:"aliceblue"}}/>
                                <Row style={{display:"flex", justifyContent:"right" }}>
                                    <Col style={{display:"flex"}} span={16}>
                                    <span> تومان </span> <span style={{marginLeft:"5px"}}> ۱/۰۰۰/۰۰۰ </span> 
                                    </Col>
                                    <Col style={{display:"flex", justifyContent:"right"}} span={8} >
                                        <h4>قیمت کالا</h4>
                                    </Col>
                                </Row> 
                                <hr style={{color:"aliceblue"}}/>
                                <Row style={{display:"flex", justifyContent:"right" }}>
                                    <Col style={{display:"flex"}} span={16}>
                                        <a href='https://www.amazon.com'>www.amazon.com</a>
                                    </Col>
                                    <Col style={{display:"flex", justifyContent:"right"}} span={8} >
                                        <h4>لینک خرید</h4>
                                    </Col>
                                </Row> 
                                </div>
                            :
                                <Row style={{display:"flex", justifyContent:"right" }}>
                                    <Col style={{display:"flex"}} span={16}>
                                    ندارد
                                    </Col>
                                    <Col style={{display:"flex", justifyContent:"right"}} span={8} >
                                        <h4>قابلیت خریداری</h4>
                                    </Col>
                                </Row>  
                             }
                            <hr style={{color:"aliceblue"}}/><br/>
                            <p style={{textAlign:"right"}}>{this.state.order.description}</p>
                            <br/>
                            <hr style={{color:"aliceblue"}}/><br/>
                            <Row style={{display:"flex", justifyContent:"right", border:"1px" }}>
                                    <Col style={{display:"flex"}} span={16}>
                                    <h3> تومان </h3> <h3 style={{marginLeft:"5px"}}> ۲۰۰/۰۰۰ </h3> 
                                    </Col>
                                    <Col style={{display:"flex", justifyContent:"right"}} span={8} >
                                        درآمد شما
                                    </Col>
                            </Row> 
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

export default OrderDetail;