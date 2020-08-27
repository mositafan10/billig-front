import React, { Component } from 'react';
import { Input, Form, Button, message, Row, Col, Divider, Drawer } from 'antd';
import Axios from 'axios';

class ChangePassword_mobile extends Component {

    state = {
        visible: false,
      }
    
    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
    onClose = () => {
        this.setState({
          visible: false,
        });
      };
    
    handleOk = (values) => {
        const token = localStorage.getItem('token');
        const current_password = values.current_password;
        const new_password = values.new_password;

        Axios.post('http://127.0.0.1:8000/api/v1/account/changepassword/',
            { 
                current_password: current_password,
                new_password: new_password,
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
        .then(function (res) { if (res.status == 200){ message.success("رمز عبور با موفقیت تغییر کرد") }})
        .catch(error => message.error(error.response.data.detail));
    }

    componentDidMount(){
       this.setState({
           visible: true
       })
    }
    
    componentWillUnmount(){
        this.setState({
            visible: false
        })
    }

    // componentDidCatch(){
    //     this.setState({
    //         visible: false
    //     })
    // }

    // componentWillMount(){
    //     this.setState({
    //         visible: false
    //     })
    // }

    render() {
        return (
            <div>
                <Drawer
                closable={true}
                onClose={this.onClose}
                visible={this.state.visible}
                placement="left"
                bodyStyle={{fontFamily:"IRANSans"}}
                width={"90%"}>
                <Row>
                    <Col xs={0} sm={0} md={0} lg={6} xl={6} xxl={6}></Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form
                    name="change_pass"
                    onFinish={this.handleOk}
                    >
                        <Divider plain orientation="center">رمز عبور فعلی</Divider>
                        <Form.Item 
                        name="current_password" 
                        rules={[
                            {
                            required: true,
                            message:".رمز عبور فعلی خود را وارد کنید"
                            },
                        ]}>
                            <Input.Password style={{borderRadius:"10px"}} />
                        </Form.Item>
                        <Divider plain orientation="center">رمز عبور جدید</Divider>
                        <Form.Item
                            style={{alignItems:"center", textAlign:"center"}}
                            name="new_password"
                            rules={[
                            {
                                required: true,
                                message: '.رمز عبور جدید را وارد کنید',
                            },
                            ]}
                            hasFeedback
                        >
                            <Input.Password style={{borderRadius:"10px"}}/>
                        </Form.Item> 
                        <Divider plain orientation="center">تکرار رمز عبور جدید</Divider>
                        <Form.Item
                            style={{alignItems:"center", textAlign:"center"}}
                            name="Confirm new Password"
                            dependencies={['new_password']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: '.تکرار رمز عبور جدید را وارد نمایید',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                if (!value || getFieldValue('new_password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('تکرار رمز عبور را مجدد وارد نمایید');
                                },
                            }),
                            ]}
                        >
                            <Input.Password style={{borderRadius:"10px"}} />
                        </Form.Item>
                        <Form.Item style={{textAlign:"center"}}><br/>
                            <Button type="primary" htmlType="submit" style={{marginRight:'10px', borderRadius:"15px"}}>
                            ارسال  
                            </Button>
                        </Form.Item>
                    </Form>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={6} xl={6} xxl={6}></Col>
                </Row>
                </Drawer>
            </div>
        );
    }
}

export default ChangePassword_mobile;