import React from 'react';
import Axios from 'axios';
import { Row, Col, Divider, Button } from 'antd';

import Orders from '../components/Orders';

const style = {
    alignItems:"center",
    display:'flex',
    justifyContent:'center',
    border:"solid",
    borderRadius:"30px",
    height:"300px"
}

class LandingPage extends React.Component {

    state = {
        orders : []
    }

    componentDidMount(){
        Axios.get('http://127.0.0.1:8000/api/v1/advertise/packet/')
            .then(res => {
                this.setState({
                    orders: res.data
                });
            })
            .catch(error => console.error(error));
    }

    render(){
        return(
            <div>
                <div>
                    <Row >
                        <Col span={24}>
                            <div style={{display:'flex', justifyContent:'center', height:"450px", alignItems:"center", border:"solid", borderRadius:"30px"}} > بنر برای معرفی بیلیگ پست </div>
                            <br/>
                            <Divider plain orientation="center"><b>بیلیگ چگونه کار می‌کند؟</b></Divider>
                            <div style={{alignItems:"center", display:'flex',justifyContent:'center', border:"solid", borderRadius:"30px", height:"300px"}}>
                            </div>
                            <Divider plain orientation="center"><b>آخرین آگهی‌ها</b></Divider>
                            <div style={{alignItems:"center", display:'flex',justifyContent:'center', paddingLeft:"180px"}}>
                                <Orders data={this.state.orders} page={6} pagesize={6} />
                            </div>
                            <div style={{textAlign:"center"}}>
                                <Button href={'/orders'} style={{borderRadius:"15px"}} >نمایش همه آگهی‌ها</Button>
                            </div><br/>
                            <Divider plain orientation="center"><b>! ما فروشگاه آنلاین نیستیم</b></Divider>
                            <div style={style}>
                            </div>
                            <Divider plain orientation="center"><b>چرا با بیلیگ خرید کنیم؟</b></Divider>
                            <div style={style}>
                            </div>
                            <Divider plain orientation="center"><b>نظرات کاربران در مورد بیلیگ</b> </Divider>
                            <div style={style}>
                            </div>
                            <Divider plain orientation="center"><b>فروشگاه‌های آنلاین</b></Divider>
                            <div style={style}>
                            </div>
                        </Col>
                    </Row>
                </div>
                <br />
            </div>
        )
    }
}

export default LandingPage;