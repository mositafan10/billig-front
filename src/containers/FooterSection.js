import React, { Component } from 'react';
import Axios from 'axios';
import { Row, Col, Space, Divider, Input, message, ConfigProvider } from 'antd';
import {  TwitterOutlined 
        , InstagramOutlined 
        , LinkedinOutlined 
        , FacebookOutlined
        , CopyrightOutlined  } 
    from '@ant-design/icons';
import {config} from '../Constant';
import { Link } from 'react-router-dom';

var url = config.url.API_URL;
const style_p ={color:"#707070"}

const { Search } = Input;

class FooterSection extends Component {

    send = (value) => {
        Axios.post(`${url}api/v1/account/newsletter/`,
        {
           email:value
        })
        .then( res => { if(res.status === 200) { return message.success("ایمیل شما با موفقیت ثبت شد")}})
        .catch(error => message.info(error.response.data.detail))
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
                            <a target="_blank" style={{color:"black"}} href="https://twitter.com/Billlig1"><TwitterOutlined style={{fontSize:"30px"}} /></a>
                            <a target="_blank" style={{color:"black"}} href="https://www.instagram.com/billligofficial/"><InstagramOutlined style={{fontSize:"30px"}} /></a>
                            <a target="_blank" style={{color:"black"}} href="https://www.linkedin.com/in/billlig/"><LinkedinOutlined style={{fontSize:"30px"}} /></a>
                            <a target="_blank" style={{color:"black"}} href="https://www.facebook.com/billligofficial"><FacebookOutlined style={{fontSize:"30px"}} /></a>
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
                        <Link to={'/whybilllig'}><p style={style_p}>چرا بیلیگ ؟</p></Link>
                        <Link to={'/billliger'}><p style={style_p}> راهنمای بیلیگر</p></Link>
                        <Link to={'/traveler'}><p style={style_p}> راهنمای مسافر</p></Link>
                        <Link to={'/advices'}><p style={style_p}> توصیه‌های بیلیگ به کاربران</p></Link>
                        <Link to={'/faq'}><p style={style_p}>سوالات متداول</p></Link>
                    </Col>
                    <hr/>
                    {/* <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4} >
                        <p><b>خدمات  کاربران</b></p><hr width="120" style={{float:"right"}}/><br/>
                        <p style={style_p}>پشتیبانی</p>
                        <Link to={'/signup'}><p style={style_p}>ثبت‌نام</p></Link>
                    </Col>
                    <hr/> */}
                    <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4} >
                        <p><b>بیلیگ</b></p><hr width="80" style={{float:"right"}}/><br/>
                        <a target="_blank" href={`${url}blog/`}><p style={style_p}>بلاگ</p></a>
                        <Link to={'/about-us'}><p style={style_p}>درباره ما</p></Link>
                        {/* <Link to={'/contact-us'}><p style={style_p}>تماس با ما</p></Link> */}
                        <Link to={'/privacy'}><p style={style_p}>حریم خصوصی</p></Link>
                        <Link to={'/terms'}><p style={style_p}>شرایط و ضوابط</p></Link>
                    </Col>
                    <hr/>
                        <Col xs={24} sm={24} md={24} lg={2} xl={2} xxl={2}>
                    </Col> 
                </Row>
                <Divider/>
                <Row style={{justifyContent:"center", display:"flex"}}>
                    <br/>
                    <h5 style={{textAlign:"center"}}><CopyrightOutlined /> تمامی حقوق برای بیلیگ محفوظ است. برداشتن مطالب با درج لینک سایت مانعی ندارد . </h5>
                </Row>
            </ConfigProvider>
        );
    }
}

export default FooterSection;