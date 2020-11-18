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
    const parcel_price = values.parcel_price;
    const token = localStorage.getItem("token");
    Axios.post(
      `${url}api/v1/advertise/offer/update/`,
      {
        slug: this.props.data,
        price: price,
        parcel_price: parcel_price
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
          },
          duration: 3,
        });
      });
  };

  render() {
    const price1 = this.props.price1;
    const parcel_price = this.props.parcel_price;
    const buy = this.props.buy;
    return (
      <div>
        <Button
          onClick={this.pricelistmodal}
          style={{ fontSize: "12px", border: "hidden", borderRadius: "10px" }}
        >
          مبلغ نهایی
        </Button>
        <Breakpoint medium up>
          <Modal
            visible={this.state.price_visible}
            title="نهایی کردن مبلغ"
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
            width="30%"
            bodyStyle={{ borderRadius: "20px" }}
            maskStyle={{ borderRadius: "20px" }}
          >
            <p>مبلغ توافق فعلی: {price1} تومان</p> 
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
              <p>دستمزدی را که پس از مذاکره با صاحب آگهی توافق کرده‌اید، وارد نمایید.</p>
              <Form.Item
                name="price"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "مبلغ نهایی دستمزد را وارد کنید",
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  style={{ textAlign: "right", width:"200px" }}
                  min={0}
                />
              </Form.Item>
              {buy &&
              <div>
              <p>مبلغ فعلی کالا : {parcel_price ? parcel_price : 0 } تومان</p> 
              <p>قیمت نهایی کالایی را که قرار است خریداری شود وارد نمایید</p>
              <Form.Item
                name="parcel_price"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "مبلغ نهایی کالا را وارد کنید",
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  style={{ textAlign: "right", width:"200px" }}
                  min={0}
                />
              </Form.Item>
              </div>}
            </Form>
          </Modal>
        </Breakpoint>
        <Breakpoint small down>
          <Modal
            title="نهایی کردن مبلغ"
            visible={this.state.price_visible}
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
            <p>مبلغ توافق فعلی: {price1} تومان</p> 
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
              <p>دستمزدی را که پس از مذاکره با صاحب آگهی توافق کرده‌اید، وارد نمایید.</p>
              <Form.Item
                name="price"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "مبلغ نهایی دستمزد را وارد کنید",
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  style={{ textAlign: "right", width:"200px" }}
                  min={0}
                />
              </Form.Item>
              {buy &&
              <div>
              <p>مبلغ فعلی کالا : {parcel_price ? parcel_price : 0 } تومان</p> 
              <p>قیمت نهایی کالایی را که قرار است خریداری شود وارد نمایید</p>
              <Form.Item
                name="parcel_price"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "مبلغ نهایی کالا را وارد کنید",
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  style={{ textAlign: "right", width:"200px" }}
                  min={0}
                />
              </Form.Item>
              </div>}
            </Form>
          </Modal>
        </Breakpoint>
      </div>
    );
  }
}

export default ConfirmPrice;
