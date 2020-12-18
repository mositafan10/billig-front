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
  Spin,
} from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Timer from "../components/utils/Timer";

class SignUpForm extends React.Component {
  state = {
    visible: false,
    password: "",
    phone_number: "",
    name: "",
    toDashboard: false,
    loading: false,
    otploading: false,
    timer: false,
    enable: true,
  };

  child = React.createRef();

  onFinish = (values) => {
    this.setState({ loading: true });
    setTimeout(() => {
      const signup = localStorage.getItem("signup");
      if (signup == "ready") {
        this.showModal();
      }
      this.setState({ loading: false });
    }, 2000);
    this.props.onAuth(values.phone_number, values.password);
    this.setState({
      password: values.password,
      phone_number: values.phone_number,
      name: values.name,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
      timer: true,
    });
  };

  handleOk = (values) => {
    this.setState({ otploading: true});
    setTimeout(() => {
      this.setState({
        toDashboard: true,
      });
      const signup = localStorage.getItem("signup");
      console.log(signup)
      if (signup == "notready") {
        this.setState({ otploading: false})
      }
    }, 3000);
    this.setState({
      otp: values.otp,
    });
    const password = this.state.password;
    const phone_number = this.state.phone_number;
    const name = this.state.name;
    const otp = values.otp;
    this.props.onAuth2(phone_number, password, otp, name);
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  timer = () => {
    this.setState({
      timer: true,
      enable: true,
    });
    this.props.onAuth(this.state.phone_number);
    this.child.current.componentDidMount();
  };

  reset = () => {
    this.setState({
      timer: false,
      enable: false,
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
                {
                  pattern:'^([a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی ])+$',
                  message:"نام باید صرفا از حروف تشکیل شده باشد"
                }
              ]}
            >
              <Input
                style={{
                  width: "300px",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              />
            </Form.Item>
            <Form.Item
              style={{ alignItems: "center", textAlign: "center" }}
              name="phone_number"
              label="شماره موبایل"
              rules={[
                {
                  required: true,
                  message: ".شماره موبایل خود را وارد کنید",
                },
                {
                  min: 8,
                  message: "شماره موبایل نامعتبر است",
                },
              ]}
            >
              <PhoneInput
                style={{
                  fontFamily: "VazirD",
                  borderRadius: "10px",
                  width: "300px",
                }}
                country="ir"
                placeholder=""
                preferredCountries={["ir"]}
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
                  message: "رمز خود را وارد نمایید",
                },
                {
                  min: 8,
                  message: "رمز باید حداقل ۸ کاراکتر باشد",
                },
              ]}
              hasFeedback
              validateTrigger={this.onFinish}
            >
              <Input.Password
                style={{ width: "300px", borderRadius: "10px" }}
              />
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
                  message: ".تکرار رمز را وارد نمایید",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("تکرار رمز مطابقت ندارد");
                  },
                }),
              ]}
            >
              <Input.Password
                style={{ width: "300px", borderRadius: "10px" }}
              />
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
              style={{ textAlign: "center", direction: "rtl" }}
            >
              <Checkbox style={{ textAlign: "right" }}>
                با <Link to="/terms">قوانین و مقررات </Link>بیلیگ پست موافقم *
              </Checkbox>
            </Form.Item>
            <Form.Item style={{ width: "300px", textAlign: "center" }}>
              <br />
              <Button
                type="primary"
                htmlType="submit"
                style={{ borderRadius: "10px", padding: "0 25px 0 25px" }}
              >
                ثبت نام
              </Button>
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <br />
              <Link style={{ marginRight: "20px" }} to="/login/">
                ورود با حساب کاربری
              </Link>
            </Form.Item>
            <Modal
              onCancel={this.handleCancel}
              cancelText="انصراف"
              okText="ارسال"
              confirmLoading={this.state.otploading}
              okButtonProps={{
                form: "otpInsert",
                key: "submit",
                htmlType: "submit",
              }}
              visible={this.state.visible}
              style={{ fontFamily: "VazirD" }}
            >
              <p style={{ textAlign: "center", fontFamily: "IRANSans" }}>
                کد تایید
              </p>
              <Form name="otpInsert" onFinish={this.handleOk}>
                <Form.Item
                  name="otp"
                  style={{ textAlign: "center", fontFamily: "VazirD" }}
                  rules={[
                    {
                      required: true,
                      message: "کد تایید را با کیبورد انگلیسی وارد کنید",
                    },
                  ]}
                >
                  <InputNumber
                    type="tel"
                    pattern="\d*"
                    style={{
                      borderRadius: "10px",
                      width: "50%",
                      fontFamily: "VazirD",
                      textAlign: "center",
                    }}
                    autoFocus
                  />
                </Form.Item>
                <Form.Item
                  style={{ borderRadius: "10px", textAlign: "center" }}
                >
                  <Timer
                    ref={this.child}
                    parentcallback={this.reset.bind(this)}
                    timer={this.state.timer}
                  />
                  <Button
                    disabled={this.state.enable}
                    onClick={this.timer}
                    style={{
                      borderRadius: "10px",
                      border: "hidden",
                      marginLeft: "5px",
                    }}
                  >
                    ارسال مجدد
                  </Button>
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
    onAuth: (phone_number, password) =>
      dispatch(actions.authSignup(phone_number, password)),
    onAuth1: (phone_number, password, otp, name) =>
      dispatch(actions.authLogin(phone_number, password, otp, name)),
    onAuth2: (phone_number, password, otp, name) =>
      dispatch(actions.authSignup1(phone_number, password, otp, name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
