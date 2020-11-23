import React from "react";
import { Button, Modal, Input, Form, InputNumber, notification, Divider, Popconfirm } from "antd";
import Axios from "axios";
import { config } from "../../Constant";
import { Breakpoint } from "react-socks";

var url = config.url.API_URL;

class ConfirmPrice extends React.Component {
  state = {
    price_visible: false,
    loading:false
  };

  currency = (value) => {
    const p =  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return p
  }

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
    const parcelPrice = values.parcelPrice;
    const token = localStorage.getItem("token");
    Axios.post(
      `${url}api/v1/advertise/offer/update/`,
      {
        slug: this.props.data,
        price: price,
        parcelPrice: parcelPrice,
        status: 2
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then(() => {
          this.props.parentfunction()
          setTimeout(()=>{
            this.setState({ price_visible: false, loading:false });
          },3000)
          notification["success"]({
            message: "مبلغ با موفقیت ثبت شد",
            description: "منتظر تایید و پرداخت مبلغ از سوی آگهی‌دهنده باشید",
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
            },
            duration: 5,
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
    const parcelPrice = this.props.parcel_price;
    const buy = this.props.buy;
    return (
      <div>
        <Button
          onClick={this.pricelistmodal}
          style={{ fontSize: "12px", backgroundColor:"green",color:"white", borderColor:"white", borderRadius: "10px" }}
        >
          تایید مبلغ نهایی
        </Button>
        <Breakpoint medium up>
          <Modal
            visible={this.state.price_visible}
            title="نهایی کردن مبلغ"
            onCancel={this.handleCancel}
            okText="تایید و ارسال"
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
            <p>مبلغ توافق فعلی: {this.currency(price1)} تومان</p> 
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
                placeholder="مبلغ را به تومان وارد کنید"
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
              <p>مبلغ فعلی کالا : {parcelPrice ? this.currency(parcelPrice) : 0 } تومان</p> 
              <p>قیمت نهایی کالایی را که قرار است خریداری شود وارد نمایید</p>
              <Form.Item
               placeholder="مبلغ را به تومان وارد کنید"
                name="parcelPrice"
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
            okText="تایید و ارسال"
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
            <p>مبلغ توافق فعلی: {this.currency(price1)} تومان</p> 
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
              <p>مبلغ فعلی کالا : {parcelPrice ? this.currency(parcelPrice) : 0 } تومان</p> 
              <p>قیمت نهایی کالایی را که قرار است خریداری شود وارد نمایید</p>
              <Form.Item
                name="parcelPrice"
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
