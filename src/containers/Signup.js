import React from "react";
import {
  Form,
  Input,
  Modal,
  Button,
  Space,
  Divider,
  InputNumber,
  ConfigProvider,
  Checkbox,
  Spin
} from "antd";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

class SignUpForm extends React.Component {
  state = {
    visible: false,
    password: "",
    phone_number: "",
    name: "",
    toDashboard: false,
    loading: false,
    otploading: false
  };

  onFinish = (values) => {
    this.setState({loading:true})
    setTimeout(()=>{
      const token = localStorage.getItem('token')
      {
        if( token == "ready") {
        this.showModal();
        }
        this.setState({loading:false})
      }
    },2000)
    this.props.onAuth(values.phone_number);
    this.setState({
      password: values.password,
      phone_number: values.phone_number,
      name: values.name,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (values) => {
    this.setState({otploading: true,otp: values.otp})
    setTimeout(()=>{
      this.setState({
        visible: false,
        toDashboard: true,
      });
    },2000)
    this.setState({
      visible: false,
      otp: values.otp,
      toDashboard: true,
    });
    const password = this.state.password;
    const phone_number = this.state.phone_number;
    const name = this.state.name;
    const otp = this.state.otp;
    this.props.onAuth2(phone_number, password, otp, name);
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <ConfigProvider direction="ltr">
        <Spin spinning={this.state.loading}>
        <Form
          size="middle"
          layout="vertical"
          form={this.form}
          name="register"
          onFinish={this.onFinish}
          scrollToFirstError
        >
          <Divider>ایجاد حساب کاربری</Divider>
          <br />
          <Form.Item
            style={{ alignItems: "center", textAlign: "center" }}
            name="name"
            label="نام‌ و نام ‌خانوادگی"
            rules={[
              {
                required: true,
                message: ".نام خود را وارد کنید",
              },
            ]}
          >
            <Input style={{ width: "300px", borderRadius: "10px", textAlign:"center" }} />
          </Form.Item>
          <Form.Item
            style={{ alignItems: "center", textAlign: "left" }}
            name="phone_number"
            label="شماره موبایل"
            rules={[
              {
                required: true,
                message: ".شماره موبایل خود را وارد کنید",
              },
            ]}
          >
            <PhoneInput
              style={{
                fontFamily: "VazirD",
                borderRadius: "10px",
                width: "300px",
              }}
              country='ir'
              placeholder=""
              preferredCountries={['ir' ]}
              enableSearch="true"
              disableSearchIcon="true"
            />
          </Form.Item>
          <Form.Item
            style={{ alignItems: "center", textAlign: "center" }}
            name="password"
            label="رمز عبور"
            rules={[
              {
                required: true,
                message: ".رمز عبور خود را وارد کنید",
              },
            ]}
            hasFeedback
          >
            <Input.Password style={{width: "300px", borderRadius: "10px" }} />
          </Form.Item>
          <Form.Item
            style={{ alignItems: "center", textAlign: "center" }}
            label="تکرار رمز عبور"
            name="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: ".تکرار رمز عبور را وارد نمایید",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("تکرار رمز عبور را مجدد وارد نمایید");
                },
              }),
            ]}
          >
            <Input.Password style={{width: "300px", borderRadius: "10px" }} />
          </Form.Item>
          <Form.Item
                name="rule"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject("لطفا قوانین را ملاحظه بفرمایید"),
                  },
                ]}
                style={{ textAlign: "center", direction:"rtl" }}
              >
                <Checkbox style={{ textAlign: "right" }}>
                  با <a>قوانین و مقررات </a>بیلیگ پست موافقم *
                </Checkbox>
              </Form.Item>
          <Form.Item style={{width: "300px", textAlign: "center" }}>
            <br />
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px", borderRadius: "15px" }}
            >
              ثبت نام
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <br />
            <NavLink style={{ marginRight: "20px" }} to="/login/">
              {" "}
              ورود با حساب کاربری
            </NavLink>
          </Form.Item>
          <Modal
            onCancel={this.handleCancel}
            cancelText="انصراف"
            okText="ارسال"
            confirmLoading={this.setState.otploading}
            okButtonProps={{
              form: "otpInsert",
              key: "submit",
              htmlType: "submit",
            }}
            visible={this.state.visible}
            style={{ fontFamily: "VazirD" }}
          >
            <p style={{ textAlign: "center", fontFamily: "IRANSans" }}>
              {" "}
              کد تایید خود را وارد نمایید{" "}
            </p>
            <Form name="otpInsert" onFinish={this.handleOk}>
              <Form.Item
                name="otp"
                style={{ textAlign: "right", fontFamily:"VazirD" }}
                rules={[
                  {
                    required: true,
                    message: "کد تایید را وارد کنید",
                  },
                ]}
              >
                <InputNumber style={{ borderRadius: "10px", width:"100%", fontFamily:"VazirD", textAlign:"center" }} autoFocus />
              </Form.Item>
            </Form>
          </Modal>
          <Space direction="vertical" size="large" />
        </Form>
        </Spin>
      </ConfigProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (phone_number) =>
      dispatch(actions.authSignup(phone_number)),
    onAuth1: (phone_number, password, otp, name) =>
      dispatch(actions.authLogin(phone_number, password, otp, name)),
    onAuth2: (phone_number, password, otp, name) =>
      dispatch(actions.authSignup1(phone_number, password, otp, name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
