import React from "react";
import { Button, Modal, Input, Form, message } from "antd";
import Axios from "axios";
import { config } from "../../Constant";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

var url = config.url.API_URL;

class ResetPassword extends React.Component {
  state = {
    visible: false,
    reset_pass_visible: false,
    otp_visibile: false,
    phone_number_otp: "",
    loading_first: true,
    loading_otp: true,
  };

  showResetPass = () => {
    this.setState({
      reset_pass_visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      reset_pass_visible: false,
    });
  };

  handleCancelotp = () => {
    this.setState({
      otp_visibile: false,
    });
  };

  handleOk = (values) => {
    Axios.post(`${url}api/v1/account/resetpassword/`, {
      phone_number: values.phone_number,
    })
      .then((res) => {
        this.setState({
          otp_visibile: true,
          loading_first: false,
          phone_number_otp: values.phone_number,
        });
      })
      .catch((error) => {
        message.info({
          content: "نام کاربری وارد شده در سایت وجود ندارد",
        });
      });
  };

  handleOkotp = (values) => {
    Axios.post(`${url}api/v1/account/confirmresetpassword/`, {
      phone_number: this.state.phone_number_otp,
      otp: values.otp,
    })
      .then((res) => {
        this.setState({
          otp_visibile: false,
          reset_pass_visible : false,
          loading_first: false,
          phone_number_otp: values.phone_number,
        });
        message.success(res.data.detail)
      })
      .catch((error) => {
        message.info({
          content: error.response.data.detail,
        });
      });
  };

  render() {
    return (
      <div>
      <Form.Item style={{ textAlign: "center", borderRadius: "20px"}}>
        <Button
          style={{ borderRadius: "10px", fontSize: "12px" }}
          onClick={this.showResetPass}
        >
          فراموشی رمز عبور
        </Button>
        <Modal
          onCancel={this.handleCancel}
          okButtonProps={{
            form: "reset_pass",
            key: "submit",
            htmlType: "submit",
          }}
          visible={this.state.reset_pass_visible}
          okText="ارسال"
          width="350px"
          cancelText="انصراف"
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            fontFamily: "VazirD",
            height:"auto"
          }}
        >
          <p style={{ textAlign: "center", fontFamily: "VazirD" }}>
            بازیابی رمز عبور
          </p>
          <br />
          <Form name="reset_pass" onFinish={this.handleOk}>
            <br></br>
            <label
              style={{
                float: "right",
                textAlign: "right",
                marginTop: "-30px",
                fontFamily: "VazirD",
              }}
            >
            شماره موبایل خود را وارد نمایید
            </label>
            <Form.Item
              name="phone_number"
              style={{ textAlign: "right" }}
              rules={[
                {
                  required: true,
                  message: "شماره موبایل را وارد کنید",
                },
              ]}
            >
              <PhoneInput
                style={{
                  fontFamily: "VazirD",
                  borderRadius: "10px",
                  direction:"ltr"
                }}
                country="ir"
                placeholder=""
                preferredCountries={["ir"]}
                enableSearch="true"
                disableSearchIcon="true"
              />
            </Form.Item>
            <Modal
              visible={this.state.otp_visibile}
              onCancel={this.handleCancelotp}
              okButtonProps={{
                form: "reset_pass_otp",
                key: "submit",
                htmlType: "submit",
              }}
              okText="ارسال"
              cancelText="انصراف"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                fontFamily: "VazirD",
              }}
            >
              <p style={{ textAlign: "center", fontFamily: "VazirD" }}>
                کد پیامک شده را وارد کنید
              </p>
              <Form name="reset_pass_otp" onFinish={this.handleOkotp}>
                <Form.Item
                  name="otp"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
          </Form>
        </Modal>
      </Form.Item>
      </div>
    );
  }
}

export default ResetPassword;
