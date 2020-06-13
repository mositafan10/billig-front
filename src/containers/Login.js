import React from 'react';
import { Form, Input, Button, Spin } from 'antd';
import  { Icon, LoadingOutlined} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth';
const antIcon = <LoadingOutlined type="loading" style={{fontsize: 24}} spin />;
 

class LoginForm extends React.Component {

  onFinish = values => {
    const otp = "";
    this.props.onAuth(values.phone_number, values.password, otp);
    console.log("error : ", this.props.error);
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
  return (
    <div>
        {/* {errorMessage} */}
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
          <Input />
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
        <Input.Password />
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