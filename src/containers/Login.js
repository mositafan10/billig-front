import React from 'react';
import { Form, Input, Button, Spin, Modal, message } from 'antd';
import  { LoadingOutlined } from '@ant-design/icons';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth';
import Axios from 'axios';
const antIcon = <LoadingOutlined type="loading" style={{fontsize: 24, textAlign:"center"}} spin />; {/*should be place in center*/}
 

class LoginForm extends React.Component {
    state = {
        toDashboard: false,
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

    handleOkotp = (values) => {
        Axios.post('http://127.0.0.1:8000/api/v1/account/confirmresetpassword/', {
            otp: values.otp,
            phone_number: this.state.phone_number_otp
        })
        .then(res => console.log(res.data))
        .catch(error => console.log(error),)
        // message.success("رمز عبور جدید برابر با کد ارسالی می‌باشد. برای تغییر آن به پروفایل خود مراجع فرمایید.")
        this.setState({
            otp_visibile: false,
            visible: false,
            reset_pass_visible: false
            });
    }

    onFinish = values => {
    const otp = "";
    const error = localStorage.getItem('error');
    this.props.onAuth(values.phone_number, values.password, otp);
    if (error === null){
    this.setState({
        toDashboard: true,
     });
    console.log(error);
    message.success({
        content:"به بیلیگ پست خوش‌ آمدید",
        duration:5
     })
    }
    else { message.error({
        content: "رمز عبور را اشتباه وارد کرده‌اید",
        duration: 5
     })
    }
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    }

    render(){
        let errorMessage = null;
        if (this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
    }
    //   if (errorMessage != null) {
    //       this.setState({
    //           visible: true
    //       });
        //  return  <Modal visible={this.state.visible} >{errorMessage}</Modal>
    //   }
    
      if (this.props.error === null && this.state.toDashboard){
          console.log("hi", this.state.toDashboard)
       return <Redirect to='/profile'/> 
    }
  return (
    <div>
        {
        this.props.loading ?
        <Spin indicator={antIcon}/>
        :
        <Form
            size="middle"
            layout="vertical"
            name="basic"
            initialValues={{
            remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
        >
        <Form.Item
            style={{alignItems:"center"}}
            label="شماره موبایل"
            name="phone_number"
            rules={[
            {
                required: true,
                message: 'Please input your Phone Number!',
            },
            ]}
        >
          <Input style={{borderRadius:"10px"}}/>
        </Form.Item>
        <Form.Item
            style={{alignItems:"center"}}
            label="رمز عبور"
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
        >
        <Input.Password style={{borderRadius:"10px"}} />
        </Form.Item>
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
        <Form.Item style={{textAlign:"center"}}><br/>
            <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>
            ورود
            </Button>
            / 
            <NavLink 
            style={{marginRight:'20px'}}
            to='/signup/'>  ثبت نام
            </NavLink>
        </Form.Item>  
        </Form>
        } 
    </div>
  );
}
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (phone_number, password, otp) => dispatch(actions.authLogin(phone_number, password, otp))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);