import React from 'react';
import { Form, Input, Button, Spin, Divider } from 'antd';
import  { LoadingOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth';
import ResetPassword from '../components/profile/ResetPassword';
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
    this.props.onAuth(values.phone_number, values.password, otp);
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    }
    render(){
    return (
    <div style={{ display:"content", alignContent:"center", marginTop:"10px" }}>
        { 
        this.props.loading ?
        <div style={{margin:"100px"}}>
            <Spin size="large" />
        </div>
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
        <Divider>ورود به حساب کاربری</Divider><br/>
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
            <Button type="primary" htmlType="submit" style={{borderRadius:"15px",}}>
                ورود
            </Button> 
        </Form.Item>  
        <Form.Item>
            <ResetPassword />
        </Form.Item>
        <Form.Item style={{textAlign:"center"}}>
            <NavLink 
            style={{marginRight:'20px'}}
            to='/signup/'>هنوز ثبت نام نکرده اید؟
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