import React from "react";
import { Form, Input, Button, Spin, Divider, ConfigProvider } from "antd";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import ResetPassword from "../components/profile/ResetPassword";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

class LoginForm extends React.Component {
  state = {
    toDashboard: false,
    visible: false,
    reset_pass_visible: false,
    otp_visibile: false,
    phone_number_otp: "",
  };

  onFinish = (values) => {
    const path = window.location.search.replace("?next=/", "");
    const otp = "";
    this.props.onAuth(values.phone_number, values.password, path, otp);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    window.scroll(0, 0);
    return (
      <div
        style={{
          display: "content",
          alignContent: "center",
          marginTop: "10px",
        }}
      >
        {this.props.loading ? (
          <div style={{ margin: "100px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <ConfigProvider direction="ltr">
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
              <Divider>ورود به حساب کاربری</Divider>
              <br />
              <Form.Item
                style={{ alignItems: "center", textAlign: "left" }}
                label="شماره موبایل"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "شماره موبایل خود را وارد کنید",
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
                  searchPlaceholder=" "
                />
              </Form.Item>
              <Form.Item
                style={{ alignItems: "center" }}
                label="رمز عبور"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "رمز عبور خود را وارد کنید",
                  },
                ]}
              >
                <Input.Password style={{ borderRadius: "10px" }} />
              </Form.Item>
              <Form.Item>
                <ResetPassword />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <br />
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ borderRadius: "10px", padding: "0 25px 0 25px" }}
                >
                  ورود
                </Button>
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                هنوز ثبت نام نکرده اید ؟
                <NavLink style={{ marginRight: "20px" }} to="/signup/">
                  ثبت نام کنید
                </NavLink>
              </Form.Item>
            </Form>
          </ConfigProvider>
        )}
      </div>
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
    onAuth: (phone_number, password, path, otp) =>
      dispatch(actions.authLogin(phone_number, password, path, otp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
