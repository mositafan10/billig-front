import React, { Component } from "react";
import { Form, Input, Button, Row, Col } from "antd";

class ContactUs extends Component {
  onFinish = (values) => {
    // client.send(
    //     {
    //         text: values.text,
    //         from: values.email,
    //         to: 'someone <someone@your-email.com>, another <another@your-email.com>',
    //         // cc: 'else <else@your-email.com>',
    //         subject: 'testing emailjs',
    //     },
    //     (err, message) => {
    //         console.log(err || message);
    //     }
    // );
  };

  render() {
    return (
      <div style={{padding:"10px"}}>
        <Row style={{display:"flex", justifyContent:"center"}}>
            
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <h2 style={{textAlign:"center"}}>فرم تماس با ما</h2>
            <Form name="contact" onFinish={this.onFinish}>
            <Row>
            <Col span={12}>
              <Form.Item name="name"  rules={[{ required: true }]}>
            <label >نام</label>
                <Input />
              </Form.Item>
              </Col>
              </Row>
              <Row>
              <Col span={12}>
              <Form.Item name="email" rules={[{ required: true,message:"ایمیل خود را وارد نمایید"},{type: "email", message:"ایمیل نامعتبر است"} ]}>
              <label>ایمیل</label>
                <Input />
              </Form.Item>
              </Col>
              </Row>
              <Row>
              <Form.Item name="text" rules={[{ required: true, message:"یادداشت خود را وارد نمایید" }]}>
              <label >یادداشت</label>
                <Input.TextArea rows={5} />
              </Form.Item>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{borderRadius:"10px"}}>
                  ارسال
                </Button>
              </Form.Item>
              
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ContactUs;
