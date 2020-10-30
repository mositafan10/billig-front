import React, { Component } from "react";
import { Button, message, notification, Form, Input, Modal } from "antd";
import Axios from "axios";
import { config } from "../../Constant";
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
    console.log("hi", values.number, values.owner);
    this.setState({ loading: true });
    Axios.post(
      `${url}api/v1/account/users/update/`,
      {
        account_number: values.number,
        account_owner: values.owner,
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
            form: "account",
            key: "submit",
            htmlType: "submit",
          }}
        >
          <Form name="account" onFinish={this.account}>
            <br />
            <label style={{ justifyContent: "right", display: "flex" }}>
              شماره شبا*
            </label>
            <Form.Item
              name="number"
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
            <br />
            <label style={{ justifyContent: "right", display: "flex" }}>
              نام صاحب حساب*
            </label>
            <Form.Item
              name="owner"
              style={{ textAlign: "center", fontFamily: "VazirD" }}
              rules={[
                {
                  required: true,
                  message: "نام صاحب حساب را وارد کنید",
                },
              ]}
            >
              <Input style={{ borderRadius: "10px", fontFamily: "VazirD" }} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default PayTraveler;
