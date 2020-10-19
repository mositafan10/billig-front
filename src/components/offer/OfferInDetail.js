import React from "react";
import { Modal, Button, Form, notification, message, Select, InputNumber } from "antd";
import Axios from "axios";
import TextArea from "antd/lib/input/TextArea";
import { Link } from "react-router-dom";
import moment from "moment";
import { config } from "../../Constant";
import CreateTravel from "../travel/CreateTravel";

var url = config.url.API_URL;

const { Option } = Select;
const token = localStorage.getItem("token");

class OfferDetail extends React.Component {
  state = {
    visible: false,
    slug: "",
    price: "",
    travel: "",
    description: "",
    travellist: [],
    loading: false,
  };

  offer = () => {
    {
      this.showModal();
    }
  };

  success = () => {
    message.success({
      content: "پیشنهاد شما با موفقیت ثبت شد.",
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (values) => {
    this.setState({
      price: values.price,
      description: values.description,
      travel: values.travel,
      slug: this.props.data,
    });

    Axios.post(
      `${url}api/v1/advertise/offer/`,
      {
        price: this.state.price,
        travel: this.state.travel,
        description: this.state.description,
        packet: this.state.slug,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({
            visible: false,
            loading: false,
          });
        }, 3000);
        setTimeout(() => {
        notification['success']({
          message: 'پیشنهاد شما با موفقیت ثبت شد',
          style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content", marginTop:"30%"},
          duration:3,
        });
      }, 1500);
      })
      .catch((error) => {
      notification['error']({
        message: error.response.data.detail,
        style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content", marginTop:"30%", fontSizeAdjust:"0.4"},
        duration:3,
      });
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount = () => {
    Axios.get(`${url}api/v1/advertise/travellist/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => this.setState({ travellist: res.data }))
      .catch((error) => console.error(error));
  };

  callbackfunction = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Button
          style={{ borderRadius: "10px", fontSize: "12px" }}
          onClick={this.offer}
        >
          <b> ثبت پیشنهاد جدید </b>
        </Button>
        <Modal
          onCancel={this.handleCancel}
          cancelText="بازگشت"
          okText="ارسال"
          confirmLoading={this.state.loading}
          okButtonProps={{
            form: "offering",
            key: "submit",
            htmlType: "submit",
          }}
          visible={this.state.visible}
          style={{ fontFamily: "VazirD" }}
        >
          {token ? (
            <div>
              <br />
              {this.state.travellist.length ? (
                <Form
                  layout="vertical"
                  name="offering"
                  onFinish={this.handleOk}
                >
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    ثبت پیشنهاد
                  </p>{" "}
                  <br />
                  <label
                    style={{
                      float: "right",
                      textAlign: "right",
                      marginTop: "-30px",
                    }}
                  >
                    انتخاب سفر
                  </label>
                  <Form.Item
                    name="travel"
                    style={{ textAlign: "right", borderRadius: "10px" }}
                    rules={[
                      {
                        required: true,
                        message: "سفر خود را انتخاب کنید",
                      },
                    ]}
                  >
                    <Select
                      style={{ textAlign: "right", borderRadius: "10px"}}
                      dropdownStyle={{ fontFamily: "VazirD" }}
                    >
                      {this.state.travellist.map((e, key) => {
                        return (
                          <option key={key} value={e.slug}>
                            {e.destination.name} به {e.departure.name} در "
                            {moment(e.flight_date_start).format("D MMM")}"{" "}
                          </option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <br />
                  <label
                    style={{
                      float: "right",
                      textAlign: "right",
                      marginTop: "-30px",
                    }}
                  >
                    قیمت پیشنهادی (تومان)
                  </label>
                  <Form.Item
                    style={{
                      textAlign: "right",
                      fontSize: "10px",
                      width: "auto",
                    }}
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "قیمت پیشنهادی خود را وارد کنید",
                      },
                    ]}
                  >
                    <InputNumber
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      style={{ textAlign: "right", width: "auto" }}
                      min={0}
                    />
                  </Form.Item>
                  <br />
                  <label
                    style={{
                      float: "right",
                      textAlign: "right",
                      marginTop: "-30px",
                    }}
                  >
                    توضیحات{" "}
                  </label>
                  <Form.Item name="description">
                    <TextArea style={{ borderRadius: "10px" }} />
                  </Form.Item>
                </Form>
              ) : (
                <p style={{ textAlign: "center" }}>
                  <b>
                    برای ثبت پیشنهاد ابتدا باید سفر خود را ثبت نمایید
                    <CreateTravel
                      loc={"offer"}
                      parent={this.callbackfunction}
                    />
                  </b>
                </p>
              )}
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>
              ابتدا <Link to="/login"> وارد </Link>سایت شوید{" "}
            </p>
          )}
        </Modal>
      </div>
    );
  }
}

export default OfferDetail;
