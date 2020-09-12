import React, { Component } from 'react';
import Axios from 'axios';
import { Row, Col, Space, Divider, Input, message, ConfigProvider } from 'antd';
import {  TwitterOutlined 
        , InstagramOutlined 
        , LinkedinOutlined 
        , FacebookOutlined  } 
    from '@ant-design/icons';
import {config} from '../Constant';

var url = config.url.API_URL;
const style_p ={color:"#707070"}

const { Search } = Input;

class FooterSection extends Component {

    send = (value) => {
        Axios.post(`${url}api/v1/account/newsletter/`,
        {
           email:value
        })
        .then( message.success("ایمیل شما با موفقیت ثبت شد"))
        .catch(error => console.error(error))
    }

    render() {
        return (
            <ConfigProvider direction="rtl">
                <Row style={{backgroundColor:"#edf2f0"}}>
                    <Col xs={24} sm={24} md={24} lg={2} xl={2} xxl={2}>
                    </Col>  
                    <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} >
                        بیلیگ را در شبکه‌های اجتماعی دنبال کنید
                        <Divider/>
                        <Space size="large">
                            <TwitterOutlined style={{fontSize:"30px"}} />
                            <InstagramOutlined style={{fontSize:"30px"}} />
                            <LinkedinOutlined style={{fontSize:"30px"}} />
                            <FacebookOutlined style={{fontSize:"30px"}} />
                        </Space>
                        <Divider/>
                        <p>از تخفیفات فروشگاه‌ها و جدیدترین‌های بیلیگ باخبر شوید:</p>
                        <Search
                            id="search" 
                            name="search" 
                            placeholder="ایمیل خود را وارد کنید" 
                            onSearch={(value) => this.send(value)} 
                            enterButton={"ارسال"} 
                            autoSize />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={2} xl={2} xxl={2}>
                    </Col>
                    <hr/>
                    <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4} >
                        <p><b>راهنمای کاربران</b></p><hr width="120" style={{float:"right"}}/><br/>
                       <a><p style={style_p}>نحوه ثبت سفارش</p></a>
                        <p style={style_p}>فرآیند ارسال سفارش</p>
                    </Col>
                    <hr/>
                    <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4} >
                        <p><b>خدمات  کاربران</b></p><hr width="120" style={{float:"right"}}/><br/>
                        <p style={style_p}>سوالات متداول</p>
                        <p style={style_p}>شرایط استفاده</p>
                        <p style={style_p}>حریم خصوصی</p>
                        <p style={style_p}>گزارش مشکلات</p>
                    </Col>
                    <hr/>
                    <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4} >
                        <p><b>بیلیگ</b></p><hr width="80" style={{float:"right"}}/><br/>
                        <p style={style_p}>درباره ما</p>
                        <p style={style_p}>بلاگ</p>
                        <p style={style_p}>تماس با ما</p>
                    </Col>
                    <hr/>
                        <Col xs={24} sm={24} md={24} lg={2} xl={2} xxl={2}>
                    </Col> 
                </Row>
                <Divider/>
                <Row style={{justifyContent:"center", display:"flex",}}>
                    <br/>
                    <h5 style={{textAlign:"center"}}>.کلیه حقوق این سایت متعلق به شرکت ... است</h5>
                </Row>
            </ConfigProvider>
        );
    }
}

export default FooterSection;