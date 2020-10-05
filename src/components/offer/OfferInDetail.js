import React from "react";
import { Modal, Button, Form, Input, message, Select, InputNumber } from "antd";
import Axios from "axios";
import TextArea from "antd/lib/input/TextArea";
import { Link } from "react-router-dom";
import moment from "moment";
import { config } from "../../Constant";
import CreateTravel from '../travel/CreateTravel';

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
      visible: false,
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
        message.success("پیشنهاد شما با موفقیت ثبت شد")
      })
      .catch((error) => message.error(error.response.data));
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
      .then((res) => this.setState({ travellist: res.data}))
      .catch((error) => console.error(error));
  };

  callbackfunction = () => {
    this.componentDidMount()
  }

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
                  <p style={{ display:"flex", justifyContent:"center", fontSize:"16px"}}>ثبت پیشنهاد</p>
                  {" "}
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
                      style={{ textAlign: "right", borderRadius: "10px" }}
                    >
                      {this.state.travellist.map((e, key) => {
                        return (
                          <option key={key} value={e.slug}>
                            {e.destination.name} به {e.departure.name} در{" "}
                            "{moment(e.flight_date_start).format("Do MMM YYYY")}"{" "}
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
                    style={{ textAlign: "right", fontSize: "10px" }}
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
                      style={{ textAlign: "right", width: "-moz-available" }}
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
                    <CreateTravel loc={"offer"} parent={this.callbackfunction} />
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
