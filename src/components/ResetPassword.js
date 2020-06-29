import React from 'react';
import { Button, Modal, Input, Form, message } from 'antd';
import Axios from 'axios';

class ResetPassword extends React.Component {

    state = {
        visible: false,
        reset_pass_visible: false,
        otp_visibile: false,
        phone_number_otp: "",
    };

    showResetPass = () => {
        this.setState({
            reset_pass_visible: true
        })
    }

    handleCancel = () => {
        this.setState({
        reset_pass_visible: false,
        otp_visibile: false,
        });
    };

    handleOk = (values) => {
        Axios.post('http://127.0.0.1:8000/api/v1/account/resetpassword/', {
            phone_number: values.phone_number
        })
        .then(res => {console.log(res.data)
            this.setState({
                otp_visibile: true,
                phone_number_otp: values.phone_number
                });
        })
        .catch(error => {console.log(error);
        message.info({
            content: "نام کاربری وارد شده در سایت وجود ندارد",
        })
        })
    }

    render(){
        return(
            <Form.Item style={{textAlign:"center", borderRadius:"20px"}}>
            <Button style={{borderRadius:"10px", fontSize:"12px"}} onClick={this.showResetPass}>فراموشی رمز عبور</Button>
            <Modal
                onCancel={this.handleCancel}
                okButtonProps={{form:'reset_pass', key: 'submit', htmlType: 'submit'}}
                visible={this.state.reset_pass_visible}
                okText="ارسال"
                cancelText="انصراف"
                style={{borderRadius:"10px",fontFamily:"IRANSans", overflow:"hidden"}}
                >
                <p style={{fontFamily:"IRANSans",textAlign:"center"}}> بازیابی رمز عبور </p>
                <Form
                name="reset_pass"
                onFinish={this.handleOk}
                >
                    <br></br>
                    <label style={{fontFamily:"IRANSans", float:"right" ,textAlign:"right", marginTop:"-30px"}}>شماره موبایل</label>
                    <Form.Item 
                    name="phone_number" 
                    rules={[
                        {
                        required: true,
                        },
                    ]}>
                        <Input />
                    </Form.Item>
                    <Modal
                    visible={this.state.otp_visibile}
                    onCancel={this.handleCancel}
                    okButtonProps={{form:'reset_pass_otp', key: 'submit', htmlType: 'submit'}}
                    okText="ارسال"
                    cancelText="انصراف"
                    style={{borderRadius:"10px",fontFamily:"IRANSans", overflow:"hidden"}}
                    >
                        <p style={{fontFamily:"IRANSans",textAlign:"center"}}> کد پیامک شده را وارد کنید </p>
                        <Form
                         name="reset_pass_otp"
                         onFinish={this.handleOkotp}
                        >
                            <Form.Item 
                                name="otp" 
                                rules={[
                                    {
                                    required: true,
                                    },
                            ]}>
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Form>
            </Modal>
        </Form.Item>
        )
    }
}

export default ResetPassword;