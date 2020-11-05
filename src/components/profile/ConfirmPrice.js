import React from "react";
import { Button, Modal, Input, Form, InputNumber, notification, Divider } from "antd";
import Axios from "axios";
import { config } from "../../Constant";
import { Breakpoint } from "react-socks";

var url = config.url.API_URL;

class ConfirmPrice extends React.Component {
  state = {
    price_visible: false,
    loading:false
  };

  pricelistmodal = () => {
    this.setState({
      price_visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      price_visible: false,
    });
  };

  onFinish = (values) => {
    this.setState({loading:true})
    const price = values.price;
    const token = localStorage.getItem("token");
    Axios.post(
      `${url}api/v1/advertise/offer/update/`,
      {
        slug: this.props.data,
        price: price,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then(() => {
        this.props.parentfunction()
          this.setState({ price_visible: false, loading:false });
        
          notification["success"]({
            message: "مبلغ نهایی با موفقیت ثبت شد",
            description:"حال می‌توانید مبلغ را تایید نمایید",
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
              marginTop: "30%",
            },
            duration: 3,
          });
      })
      .catch((error) => {
        notification["error"]({
          message: error.response.data,
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
            marginTop: "30%",
          },
          duration: 3,
        });
      });
  };

  render() {
    const price1 = this.props.price1;
    return (
      <div>
        <Button
          onClick={this.pricelistmodal}
          style={{ fontSize: "12px", border: "hidden", borderRadius: "10px" }}
        >
          {" "}
          مبلغ نهایی
        </Button>
        <Breakpoint medium up>
          <Modal
            visible={this.state.price_visible}
            title="مبلغ نهایی"
            onCancel={this.handleCancel}
            okText="ارسال"
            cancelText="انصراف"
            confirmLoading={this.state.loading}
            okButtonProps={{
              form: "confirm_price",
              key: "submit",
              htmlType: "submit",
            }}
            style={{
              fontFamily: "VazirD",
              textAlign: "center",
              overflow: "hidden",
              borderRadius: "10px",
            }}
            width="50%"
            bodyStyle={{ borderRadius: "20px" }}
            maskStyle={{ borderRadius: "20px" }}
          >
            <Form
              size="middle"
              layout="vertical"
              name="confirm_price"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                name="price"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "مبلغ نهایی را وارد کنید",
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  style={{ textAlign: "right" }}
                  min={0}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Breakpoint>
        <Breakpoint small down>
          <Modal
            visible={this.state.price_visible}
            // title="مبلغ نهایی"
            onCancel={this.handleCancel}
            okText="ارسال"
            cancelText="انصراف"
            confirmLoading={this.state.loading}
            okButtonProps={{
              form: "confirm_price",
              key: "submit",
              htmlType: "submit",
            }}
            style={{
              fontFamily: "VazirD",
              textAlign: "center",
              overflow: "hidden",
              borderRadius: "10px",
              display:"flex",
              justifyContent:"center"
            }}
            width="90%"
            bodyStyle={{ borderRadius: "20px" }}
            maskStyle={{ borderRadius: "20px" }}
          >
            <p>مبلغ توافق فعلی</p> {price1} تومان
            <Divider >مبلغ نهایی را وارد نمایید (تومان)</Divider>
            <Form
              size="middle"
              layout="vertical"
              name="confirm_price"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                name="price"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "مبلغ نهایی را وارد کنید",
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  style={{ textAlign: "right", width:"250px" }}
                  min={0}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Breakpoint>
      </div>
    );
  }
}

export default ConfirmPrice;
