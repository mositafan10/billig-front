import React from 'react';
import { Form, Input, Modal, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


class SignUpForm extends React.Component {

  state = {
    visible: false,
    password: "",
    phone_number: ""
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
      otp: values.otp
    });
    const password = this.state.password;
    const phone_number = this.state.phone_number;
    const otp = this.state.otp;
    this.props.onAuth1(phone_number, password, otp)
    // this.props.history.push('/');
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
      form={this.form}
      name="register"
      onFinish={this.onFinish}
      scrollToFirstError
    >
        <Form.Item
        name="Phone Number"
        label="شماره موبایل"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input style={{width: '100%'}}/>
      </Form.Item>
      <Form.Item
        name="Password"
        label="رمز عبور"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item> 
      <Form.Item
        label="تکرار رمز عبور"
        name="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'تکرار رمز عبور را وارد نمایید',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('تکرار رمز عبور مطابقت ندارد');
            },
          }),
        ]}
      >
      <Input.Password />
      </Form.Item>
      <Form.Item style={{textAlign:"center"}}>
            <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>
            ثبت نام
            </Button>
            / 
            <NavLink 
            style={{marginRight:'20px'}}
            to='/login/'> ورود
            </NavLink>
        </Form.Item>
        <Modal
          visible={this.state.visible                                                                                                     }
          onCancel={this.handleCancel}
          // onOk={this.handleOk}
          okButtonProps={{form:'otpInsert', key: 'submit', htmlType: 'submit'}}
          >
            <p style={{textAlign:"center"}}> کد تایید خود را وارد نمایید </p>
          <Form
          name="otpInsert"
          onFinish={this.handleOk}
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

