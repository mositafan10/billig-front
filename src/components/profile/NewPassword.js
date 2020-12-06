import React, { Component } from "react";
import { Input, Form, Button, notification, Row, Col, Divider } from "antd";
import Axios from "axios";
import { config } from "../../Constant";

var url = config.url.API_URL;
const style_center = { display: "flex", justifyContent: "center" };

class NewPassword extends Component {
  handleOk = (values) => {
    const new_password = values.new_password;
    const phone_number = this.props.data;
    Axios.post(`${url}api/v1/account/newPassword/`, {
      new_password: new_password,
      phone_number: phone_number,
    })
      .then((res) => {
        notification["success"]({
          message: <div>{res.data.detail}</div>,
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 5,
        });
        this.props.parentcallback()
      })
      .catch((error) => {
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
      })
  };

  render() {
    return (
      <div>
        <Row style={style_center}>
          <Col span={12}>
            <Form name="change_pass" onFinish={this.handleOk}>
              <Divider plain orientation="center">
                رمز جدید
              </Divider>
              <Form.Item
                style={{ alignItems: "center", textAlign: "center" }}
                name="new_password"
                rules={[
                  {
                    required: true,
                    message: ".رمز جدید را وارد کنید",
                  },
                  {
                    min: 8,
                    message: "رمز باید حداقل ۸ کاراکتر باشد",
                  },
                ]}
                hasFeedback
                validateTrigger={this.onFinish}
              >
                <Input.Password style={{ borderRadius: "10px" }} />
              </Form.Item>
              <Divider plain orientation="center">
                تکرار رمز جدید
              </Divider>
              <Form.Item
                style={{ alignItems: "center", textAlign: "center" }}
                name="Confirm new Password"
                dependencies={["new_password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: ".تکرار رمز جدید را وارد نمایید",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("new_password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "تکرار رمز را مجدد وارد نمایید"
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
                  type="primary"
                  htmlType="submit"
                  style={{ borderRadius: "10px", padding: "0 10px 0 10px" }}
                >
                  ارسال
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewPassword;
