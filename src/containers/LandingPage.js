import React from 'react';
import Orders from '../components/Orders';
import Axios from 'axios';
import { Row, Col, Input, Divider, Button } from 'antd';
import Sider from '../components/LandingPageSidebar';

const {Search} = Input


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
                console.log(res.data);  
            })
            .catch(error => console.error(error));
    }

    render(){
        return(
            <div style={{fontFamily:"IRANSans"}}>
                <div>
                <Row >
                    <Col span={24}>
                <div style={{display:'flex', justifyContent:'center', height:"450px", alignItems:"center", border:"solid", borderRadius:"30px"}} > بنر برای معرفی بیلیگ پست </div>
                        <br/>
                        {/* <h2 style={{textAlign:"center"}}>آخرین آگهی‌ها</h2> */}
                        {/* <h2 style={{textAlign:"center"}}>! ما فروشگاه آنلاین نیستیم </h2>  */}
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
                        <div style={{alignItems:"center", display:'flex',justifyContent:'center', border:"solid", borderRadius:"30px", height:"300px"}}>
                        </div>
                        <Divider plain orientation="center"><b>چرا با بیلیگ خرید کنیم؟</b></Divider>
                        <div style={{alignItems:"center", display:'flex',justifyContent:'center', border:"solid", borderRadius:"30px", height:"300px"}}>
                        </div>
                        <Divider plain orientation="center"><b>نظرات کاربران در مورد بیلیگ</b> </Divider>
                        {/* <h2 style={{textAlign:"center"}}>نظرات کاربران در مورد بیلیگ </h2>  */}
                        <div style={{alignItems:"center", display:'flex',justifyContent:'center', border:"solid", borderRadius:"30px", height:"300px"}}>
                        </div>
                        <Divider plain orientation="center"><b>فروشگاه‌های آنلاین</b></Divider>
                        <div style={{alignItems:"center", display:'flex',justifyContent:'center', border:"solid", borderRadius:"30px", height:"300px"}}>
                        </div>
                        
                    </Col>
                    {/* <Col span={4}  >
                        <div style={{alignItems:"center", display:'flex',justifyContent:'center', border:"solid", borderRadius:"30px"}}> 
                        <Sider/>
                        </div>
                        <br/>
                        <div style={{height:"600px", border:"solid", borderRadius:"30px"}}>

                        </div>
                    </Col> */}
                </Row>
                </div>
                <br />
            </div>
        )
    }
}

export default LandingPage;