import React from "react";
import { Modal, Button, Form, Input, message, Select } from "antd";
import Axios from "axios";
import TextArea from "antd/lib/input/TextArea";
import { Link } from "react-router-dom";
import moment from "moment";
import { config } from "../../Constant";

var url = config.url.API_URL;

const { Option } = Select;

class OfferDetail extends React.Component {
  state = {
    visible: false,
    slug: "",
    price: "",
    travel: "",
    description: "",
    travellist: [],
  };

  offer = () => {
    {
      this.showModal();
    }
  };

  success = () => {
    message.success({
      content: "پیشنهاد شما با موفقیت ثبت شد.",
      style: { fontFamily: "IRANSans" },
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (values) => {
    this.setState({
      visible: false,
      price: values.price,
      description: values.description,
      travel: values.travel,
      slug: this.props.data,
    });

    const token = localStorage.getItem("token");
    console.log(
      "HI",
      this.state.price,
      this.state.flight_date,
      this.state.id,
      this.state.description
    );
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
        console.log(res);
        window.location.replace("/profile/myoffer");
      })
      .catch((error) => console.error(error));
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/advertise/travellist/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => this.setState({ travellist: res.data }))
      .catch((error) => console.error(error));
  };

  render() {
    const token = localStorage.getItem("token");
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
          style={{ fontFamily: "IRANSans" }}
          onCancel={this.handleCancel}
          cancelText="بازگشت"
          okText="ارسال"
          okButtonProps={{
            form: "offering",
            key: "submit",
            htmlType: "submit",
          }}
          visible={this.state.visible}
        >
          {token ? (
            <div>
              <br />
              <br />
              <p style={{ textAlign: "center" }}>
                <b>
                  برای ثبت پیشنهاد باید ابتدا اقدام به{" "}
                  <Link to="/profile/mytravel">ثبت سفر </Link> خود نمایید
                </b>
              </p>
              <Form
                layout="vertical"
                style={{ fontFamily: "IRANSans" }}
                name="offering"
                onFinish={this.handleOk}
              >
                {" "}
                <br />
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
                  <Select style={{ textAlign: "right", borderRadius: "10px" }}>
                    {this.state.travellist.map((e, key) => {
                      return (
                        <option key={key} value={e.slug}>
                          {e.destination.name} به {e.departure.name} در{" "}
                          {moment(e.flight_date_start).format("MMM Do YYYY")}{" "}
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
                  قیمت پیشنهادی
                </label>
                <Form.Item
                  style={{ textAlign: "right", fontSize: "10px" }}
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "قیمت پیشنهادی خود را وارد کنید",
                    },
                  ]}
                >
                  <Input
                    style={{ textAlign: "right", borderRadius: "10px" }}
                    placeholder="به تومان وارد کنید"
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
