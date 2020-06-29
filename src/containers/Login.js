import React from 'react';
import { Form, Input, Button, Spin, Modal, message } from 'antd';
import  { LoadingOutlined } from '@ant-design/icons';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth';
import Axios from 'axios';
import ResetPassword from '../components/ResetPassword';
const antIcon = <LoadingOutlined type="loading" style={{fontsize: 24, textAlign:"center"}} spin />; {/*should be place in center*/}
 

class LoginForm extends React.Component {
   
    state = {
        toDashboard: false,
        visible: false,
        reset_pass_visible: false,
        otp_visibile: false,
        phone_number_otp: "",
    };

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
                message: 'شماره موبایل خود را وارد کنید',
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
                message: 'رمز عبور خود را وارد کنید',
            },
            ]}
        >
        <Input.Password style={{borderRadius:"10px"}} />
        </Form.Item>
        <Form.Item style={{textAlign:"center"}}><br/>
            <Button type="primary" htmlType="submit" style={{marginRight:'10px', borderRadius:"15px"}}>
            ورود
            </Button>
            / 
            <NavLink 
            style={{marginRight:'20px'}}
            to='/signup/'>  ثبت نام
            </NavLink>
        </Form.Item>  
        <Form.Item>
            <ResetPassword />
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