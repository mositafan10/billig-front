import React, { Component } from "react";
import { Input, Form, Button, notification, Row, Col, Divider, Modal } from "antd";
import Axios from "axios";
import { config } from "../../Constant";

var url = config.url.API_URL;

class ChangePassword extends Component {
  
  state = {
    loading: false,
    passmodal: false,
  };

  handleCancel = (e) => {
    this.setState({
      passmodal: false,
    });
  };

  handleOk = (values) => {
    this.setState({ loading: true });
    const token = localStorage.getItem("token");
    const current_password = values.current_password;
    const new_password = values.new_password;

    Axios.post(
      `${url}api/v1/account/changepassword/`,
      {
        current_password: current_password,
        new_password: new_password,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then(
        (res) => {
          notification["success"]({
            message: <div>رمز عبور با موفقیت تغییر کرد</div>,
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
            },
            duration: 3,
          });
        this.setState({ loading: false, passmodal: false })
        }
      )
      .catch(
        (error) =>
          notification["error"]({
            message: error.response.data.detail,
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
            },
            duration: 5,
          }),
        this.setState({ loading: false })
      );
  };

  render() {
    return (
      <div>
        <Button
          style={{ fontSize: "14px", borderRadius: "10px" }}
          onClick={() => {
            this.setState({ passmodal: true });
          }}
        >
          تغییر رمز عبور
        </Button>
        <Modal
          style={{ fontFamily: "VazirD" }}
          visible={this.state.passmodal}
          onCancel={this.handleCancel}
          cancelText="بازگشت"
          okButtonProps={{ hidden: true }}
        >
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Form name="change_pass" onFinish={this.handleOk}>
                <Divider plain orientation="center">
                  رمز عبور فعلی
                </Divider>
                <Form.Item
                  name="current_password"
                  rules={[
                    {
                      required: true,
                      message: ".رمز عبور فعلی خود را وارد کنید",
                    },
                  ]}
                >
                  <Input.Password style={{ borderRadius: "10px" }} />
                </Form.Item>
                <Divider plain orientation="center">
                  رمز عبور جدید
                </Divider>
                <Form.Item
                  style={{ alignItems: "center", textAlign: "center" }}
                  name="new_password"
                  rules={[
                    {
                      required: true,
                      message: "رمز عبور جدید را وارد نمایید",
                    },
                    {
                      min: 8,
                      message: "رمز عبور باید حداقل ۸ کاراکتر باشد",
                    },
                  ]}
                  hasFeedback
                  validateTrigger="onFinishField"
                >
                  <Input.Password style={{ borderRadius: "10px" }} />
                </Form.Item>
                <Divider plain orientation="center">
                  تکرار رمز عبور جدید
                </Divider>
                <Form.Item
                  style={{ alignItems: "center", textAlign: "center" }}
                  name="Confirm new Password"
                  dependencies={["new_password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: ".تکرار رمز عبور جدید را وارد نمایید",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("new_password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "تکرار رمز عبور را مجدد وارد نمایید"
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password style={{ borderRadius: "10px" }} />
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                  <br />
                  <Button
                    loading={this.state.loading}
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: "10px", borderRadius: "15px" }}
                  >
                    تغییر رمز
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default ChangePassword;
