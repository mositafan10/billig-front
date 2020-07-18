import React from 'react';
import { Form, Input, Modal, Button, Space } from 'antd';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


class SignUpForm extends React.Component {

  state = {
    visible: false,
    password: "",
    phone_number: "",
    toDashboard: false
    };

  onFinish = values => {
    this.props.onAuth(values.phone_number, values.password)
    this.setState({
      password: values.password,
      phone_number: values.phone_number
    })
    {this.showModal()}  
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = values => {
    this.setState({
      visible: false,
      otp: values.otp,
      toDashboard: true,
    });

    const password = this.state.password;
    const phone_number = this.state.phone_number;
    const otp = this.state.otp;
    this.props.onAuth1(phone_number, password, otp)
    console.log("error:", this.props.error)
    
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
  return (
    <Form
      size="middle"
      layout="vertical"
      form={this.form}
      name="register"
      onFinish={this.onFinish}
      scrollToFirstError
    >
        <h3 style={{textAlign:"center"}}>ایجاد حساب کاربری</h3><br/>
        <Form.Item
        style={{alignItems:"center", textAlign:"center"}}
        name="phone_number"
        label="شماره موبایل"

        rules={[
          {
            required: true,
            message: '.شماره موبایل خود را وارد کنید',
          },
        ]}
      >
        <Input style={{width: '100%', borderRadius:"10px"}}/>
      </Form.Item>
      <Form.Item
        style={{alignItems:"center", textAlign:"center"}}
        name="password"
        label="رمز عبور"
        rules={[
          {
            required: true,
            message: '.رمز عبور خود را وارد کنید',
          },
        ]}
        hasFeedback
      >
      <Input.Password style={{borderRadius:"10px"}}/>
      </Form.Item> 
      <Form.Item
        style={{alignItems:"center", textAlign:"center"}}
        label="تکرار رمز عبور"
        name="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '.تکرار رمز عبور را وارد نمایید',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
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
            ثبت نام
            </Button>
            / 
            <NavLink 
            style={{marginRight:'20px'}}
            to='/login/'>  ورود 
            </NavLink>
        </Form.Item>
        <Modal
          onCancel={this.handleCancel}
          cancelText="انصراف"
          okText="ارسال"
          okButtonProps={{form:'otpInsert', key: 'submit', htmlType: 'submit',}}
          visible={this.state.visible}
          >
          <p style={{textAlign:"center", fontFamily:"IRANSans"}}> :کد تایید خود را وارد نمایید </p>
          <Form
          name="otpInsert"
          onFinish={this.handleOk}
          >
            <Form.Item 
              name="otp" 
              style={{textAlign:"right"}}
              rules={[
                {
                  required: true,
                  message: "کد تایید را وارد کنید"
                },
              ]}>
              <Input style={{borderRadius:"10px"}} autoFocus="true"/>
            </Form.Item>
          </Form>
        </Modal>
        <Space direction="vertical" size="large"/>
    </Form>
  );
};
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
  
    return {
        onAuth: (phone_number, password) => dispatch(actions.authSignup(phone_number, password)),
        onAuth1: (phone_number, password, otp) => dispatch(actions.authLogin(phone_number, password, otp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

