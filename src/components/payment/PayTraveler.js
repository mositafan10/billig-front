import React, { Component } from "react";
import { Button, message, notification, Form, Input, Modal, Row, Select } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Axios from "axios";
import { config } from "../../Constant";
const { Option } = Select;
var url = config.url.API_URL;
const token = localStorage.getItem("token");

class PayTraveler extends Component {
  state = {
    addVisible: false,
    selectVisible: false,
    loading: false,
    selectloading: false,
    account_number: "",
    account_owner: "",
    accounts: [],
    account: {}
   };

  pay = (values) => {
    const account = values.accounts
    this.setState({selectloading:true})
    Axios.post(
      `${url}api/v1/payment/paytraveler/`,
      {
        account: account,
        travel: this.props.travel,
        amount: this.props.amount
      },
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then(() => {
        setTimeout(() => {
          this.setState({ selectloading: false, selectVisible: false });
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
        setTimeout(()=>{window.location.reload()},2500)
      })
      .catch((err) => message.error(err.response.data.error));
  };

  showmodal = () => {
    this.setState({ selectVisible: true, loading: false });
    this.modal();
  }

  modal = () => {
    this.setState({loading: false });
    Axios.get(
      `${url}api/v1/payment/accounts/`,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
    .then(res => this.setState({
      accounts: res.data
    })) 
    .catch(error => (
      notification["info"]({
        message: error.response.data.detail,
        style: {
          fontFamily: "VazirD",
          textAlign: "right",
          float: "right",
          width: "max-content",
        },
        duration: 2.5,
      })
    ))
  };

  handlecanceladd = () => {
    this.setState({ addVisible: false });
  };

  handlecancelselect = () => {
    this.setState({ selectVisible: false });
  };

  showaddaccount = () => {
    this.setState({addVisible: true})
  }

  account = (values) => {
    this.setState({ loading: true });
    Axios.post(
      `${url}api/v1/payment/accounts/`,
      {
        number: values.number,
        name: values.name,
      },
      {
        headers: { Authorization: `Token ${token}` },
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
          this.modal();
          this.setState({addVisible:false})
        }, 2000);
      })
      .catch((err) => {
        notification["error"]({
          message: err.response.data.detail,
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
          onClick={this.showmodal}
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
          title={<div style={{textAlign:"center"}}>لیست حساب‌های ثبت‌ شده</div>}
          visible={this.state.selectVisible}
          onCancel={this.handlecancelselect}
          cancelText="بارگشت"
          okText="ثبت"
          style={{ fontFamily: "VazirD" }}
          confirmLoading={this.state.selectloading}
          okButtonProps={{
            form: "selectAccount",
            key: "submit",
            htmlType: "submit",
          }}
          >
            <Form 
            onFinish={(values) => this.pay(values)}
            size="middle"
            name="selectAccount"
              >
            <p>حساب مورد نظر را انتخاب نمایید</p>
            <Form.Item
                    name="accounts"
                    style={{ textAlign: "right" }}
                    rules={[
                      { required: true, message: "حساب مورد نظر را انتخاب کنید" },
                    ]}
                  >
                    <Select
                      dropdownStyle={{ fontFamily: "VazirD" }}
                    >
                      {this.state.accounts.map((e, key) => {
                        return (
                          <Option key={e.slug} value={e.slug}>
                            {e.number} - {e.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
            </Form>
          <Row style={{justifyContent:"center", display:"flex"}}>
          <Button
            icon={<PlusOutlined />}
            style={{ border: "hidden" }}
            size="large"
            onClick={this.showaddaccount}
          >
            اضافه کردن حساب جدید
          </Button>
          </Row>
          <Modal
          visible={this.state.addVisible}
          onCancel={this.handlecanceladd}
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
          <Form name="account" onFinish={this.account.bind(this)}>
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
              name="name"
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
        </Modal>
      </div>
    );
  }
}

export default PayTraveler;
