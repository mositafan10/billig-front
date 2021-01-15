import React from "react";
import { Button, Modal, Input, Form, message, notification } from "antd";
import Axios from "axios";
import { config } from "../../Constant";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import NewPassword from "./NewPassword";

var url = config.url.API_URL;

class ResetPassword extends React.Component {
  state = {
    visible: false,
    reset_pass_visible: false,
    otp_visibile: false,
    phone_number: "",
    loading_first: true,
    loading_otp: true,
    new_pass_vis: false
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

  handleCancelNewPass = () => {
    this.setState({
      new_pass_vis: false,
    });
  }

  closeAll = () => {
    this.setState({
      reset_pass_visible: false,
      otp_visibile:false,
      new_pass_vis: false
    })
  }

  handleOk = (values) => {
    Axios.post(`${url}api/v1/account/resetpassword/`, {
      phone_number: values.phone_number,
    })
      .then((res) => {
        this.setState({
          otp_visibile: true,
          loading_first: false,
          phone_number: values.phone_number,
        });
      })
      .catch((error) => {
        notification["error"]({
          message: <div>{error.response.data.detail}</div>,
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 5,
        })
      });
  };

  handleOkotp = (values) => {
    Axios.post(`${url}api/v1/account/confirmresetpassword/`, {
      phone_number: this.state.phone_number,
      otp: values.otp,
    })
      .then((res) => {
        if (res.data.detail == true){
          this.setState({new_pass_vis:true})
        } 
      })
      .catch((error) => {
        console.log(error.response)
        notification["error"]({
            message: error.response.data,
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
            },
            duration: 5,
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
          closable={false}
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
            شماره موبایل را وارد نمایید
            </label>
            <Form.Item
              name="phone_number"
              style={{ textAlign: "right" }}
              rules={[
                {
                  required: true,
                  message: "شماره موبایل را وارد نمایید",
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
                      message: "وارد کردن کد الزامی است"
                    },
                  ]}
                >
                  <Input type="tel" />
                </Form.Item>
              </Form>
            </Modal>
            <Modal
             visible={this.state.new_pass_vis}
             onCancel={this.handleCancelNewPass}
             width="100%"
             okButtonProps={{
              hidden:"true"
            }}
            okText="ارسال"
            cancelText="انصراف"
            cancelButtonProps={{hidden:"true"}}
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              fontFamily: "VazirD",
            }}
            >
              <NewPassword data={this.state.phone_number} parentcallback={this.closeAll} />
            </Modal>
          </Form>
        </Modal>
      </Form.Item>
      </div>
    );
  }
}

export default ResetPassword;
