import React, { Component } from "react";
import { Button, message, notification, Form, InputNumber, Input } from "antd";
import Axios from "axios";
import { config } from "../../Constant";
import Modal from "antd/lib/modal/Modal";
var url = config.url.API_URL;
const token = localStorage.getItem("token");

class PayTraveler extends Component {
  state = {
    visible: false,
    loading: false,
  };

  pay = () => {
    Axios.post(
      `${url}api/v1/payment/paytraveler/`,
      {
        payment_number: this.props.travel,
        amount: this.props.amount,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
          notification["success"]({
            message: "درخواست شما با موفقیت ثبت شد",
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
            },
            duration: 2.5,
          });
        }, 1500);
        setTimeout(()=>{window.location.reload()},3500)
      })
      .catch((err) => message.error(err.response.data.error));
  };

  modal = () => {
    this.setState({ visible: true });
  };

  handlecancel = () => {
    this.setState({ visible: false });
  };

  account = (values) => {
    this.setState({ loading: true });
    Axios.post(
      `${url}api/v1/account/users/update/`,
      {
        account_number: values.account_number,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        setTimeout(() => {
          notification["success"]({
            message: "شماره شبای شما با موفقیت ثبت شد",
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
            },
            duration: 2.5,
          });
        }, 2000);
        setTimeout(() => {
          this.pay();
        }, 2000);
      })
      .catch((err) => {
        notification["error"]({
          message: err.response.data.account_number[0],
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 2.5,
        });
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.modal}
          style={{
            fontSize: "14px",
            border: "hidden",
            backgroundColor: "aliceblue",
            borderRadius: "10px",
          }}
        >
          تسویه حساب
        </Button>
        <Modal
          visible={this.state.visible}
          onCancel={this.handlecancel}
          cancelText="انصراف"
          okText="ثبت"
          style={{ fontFamily: "VazirD" }}
          confirmLoading={this.state.loading}
          okButtonProps={{
            form: "account_number",
            key: "submit",
            htmlType: "submit",
          }}
        >
          <p style={{ textAlign: "center" }}>شماره شبا</p>
          <Form name="account_number" onFinish={this.account}>
            <Form.Item
              name="account_number"
              style={{ textAlign: "center", fontFamily: "VazirD" }}
              rules={[
                {
                  required: true,
                  message: "شماره شبای حساب خود را وارد کنید",
                },
              ]}
            >
              <Input
                prefix="IR"
                style={{
                  direction: "ltr",
                  borderRadius: "10px",
                  width: "100%",
                  fontFamily: "VazirD",
                  textAlign: "left",
                }}
                autoFocus
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default PayTraveler;
