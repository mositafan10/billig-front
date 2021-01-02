import React, { Component } from "react";
import { notification, Button, Table, Row, Col, Card, Divider, Modal, Form, Input } from "antd";
import Axios from "axios";
import { config } from "../../Constant";

var url = config.url.API_URL;
const token = localStorage.getItem("token");
const style_center = { display: "flex", justifyContent: "center" };

class BankAccountList extends Component {
  state = {
    accounts: [],
    addVisible: false,
    loading: false
  };

  componentDidMount() {
    Axios.get(`${url}api/v1/payment/accounts/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) =>
        this.setState({
          accounts: res.data,
        })
      )
      .catch((error) =>
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
      );
  }

  addAccount = () => {
    this.setState({addVisible:true})
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
          this.setState({ addVisible: false });
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

  bank_accounts = [
    {
      title: "نام",
      dataIndex: "name",
      key: "slug",
      align: "right",
    },
    {
      title: "شماره حساب",
      dataIndex: "number",
      key: "slug",
      align: "center",
    },
  ];

  render() {
    return (
      <div>
        {this.state.accounts.length == 0 ?
        <div></div>
        :
        <div>
        <Row style={style_center}>
          <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
            <Card style={{ borderRadius: "20px" }}>
            <Table
            pagination={{
              hideOnSinglePage:true
            }}
              locale={{ emptyText: "شماره حسابی وجود ندارد" }}
              style={{ padding: "40px 10px 30px 10px" }}
              columns={this.bank_accounts}
              dataSource={this.state.accounts}
            />
            <Button
              onClick={this.addAccount}
              style={{
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              <b>+ شماره حساب جدید</b>
            </Button>
            </Card>
            <Divider/>
          </Col>
        </Row>
        <Modal
            visible={this.state.addVisible}
            onCancel={this.handlecanceladd}
            closable={false}
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
                validateTrigger="onFinish"
                style={{ textAlign: "center", fontFamily: "VazirD" }}
                rules={[
                  {
                    required: true,
                    message: "شماره شبای حساب خود را وارد کنید",
                  },
                  {
                    min: 24,
                    message: "شماره شبا معتبر نیست"
                  },
                  {
                    max:24,
                    message: "شماره شبا معتبر نیست"
                  }
                ]}
              >
                <Input
                  type='tel'
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
        </div>
      }
      </div>
    );
  }
}

export default BankAccountList;
