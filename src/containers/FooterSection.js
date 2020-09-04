import React, { Component } from 'react';
import { Row, Col } from 'antd';

class FooterSection extends Component {
    render() {
        return (
            <div>
                <h4 style={{textAlign:"center"}}><b>بیلیگ پست ، پلتفرم ارسال بسته</b></h4>
                <br/><br/>
                <Row>
                <Col xs={24} sm={16} md={8} lg={8} xl={4}>
                </Col>
                <Col xs={24} sm={16} md={8} lg={8} xl={4}>
                </Col>
                <Col xs={24} sm={16} md={8} lg={8} xl={4}>
                    <div></div>
                </Col>
                <Col xs={24} sm={16} md={8} lg={8} xl={4} >
                <h4><b>خدمات مشتریان</b></h4><hr width="150" style={{float:"right"}}/><br/>
                <p>ارسال پیشنهادات</p>
                <p>پشتیبانی ۲۴ ساعته</p>
                </Col>
                <Col xs={24} sm={16} md={8} lg={8} xl={4} >
                <h4><b>راهنمای مشتریان</b></h4><hr width="150" style={{float:"right"}}/><br/>
                <p>سوالات متداول</p>
                <p>قوانین و مقررات</p>
                </Col>
                <Col xs={24} sm={16} md={8} lg={8} xl={4} >
                <h4><b>بیلیگ</b></h4><hr width="150" style={{float:"right"}}/><br/>
                <p>درباره بیلیگ</p>
                <p>شبکه جامع اطلاعات سفر</p>
                <p>درباره بیلیگ</p>
                </Col>
                </Row>
                <div>
                    <Row style={{justifyContent:"center", display:"flex",}}>
                        <br/>
                        <h5 style={{textAlign:"center"}}>.کلیه حقوق این سایت متعلق به شرکت ... است</h5>
                    </Row>
                </div>
            </div>
        );
    }
}

export default FooterSection;