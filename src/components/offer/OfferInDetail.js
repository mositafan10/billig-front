import React from "react";
import {
  Modal,
  Button,
  Form,
  notification,
  Select,
  InputNumber,
  Input,
  Spin,
  Popconfirm,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { config } from "../../Constant";
import CreateTravel from "../travel/CreateTravel";

var url = config.url.API_URL;

const { Option } = Select;
const { TextArea } = Input;

class OfferDetail extends React.Component {
  defualt_description =
    "سلام. من تمایل دارم بسته شما را به مقصد برسانم. اگر موافق باشید به مذاکره ادامه بدیم";
  state = {
    visible: false,
    slug: "",
    price: "",
    parcelPrice: "",
    travel: "",
    description: this.defualt_description,
    travellist: [],
    loading: false,
    spinning: true,
    visiblePriceInfo: false,
    parcelPriceInfoVisible: false,
  };

  offer = () => {
    this.showModal();
  };

  closeInfo = () => {
    this.setState({ visiblePriceInfo: false });
  };

  showPriceInfo = () => {
    this.setState({ visiblePriceInfo: true });
  };

  showParcelPriceInfo = () => {
    this.setState({ parcelPriceInfoVisible: true });
  };

  closeParcelPriceInfo = () => {
    this.setState({ parcelPriceInfoVisible: false });
  };

  showModal = () => {
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/advertise/travels/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => this.setState({ travellist: res.data, spinning: false }))
      .catch((error) => console.error(error));
    this.setState({
      visible: true,
    });
  };

  handleOk = (values) => {
    const token = localStorage.getItem("token");
    const description = values.description
      ? values.description
      : this.defualt_description;
    this.setState({
      price: values.price,
      parcelPrice: values.parcelPrice,
      description: description,
      travel: values.travel,
      slug: this.props.data,
    });

    Axios.post(
      `${url}api/v1/advertise/offer/`,
      {
        price: this.state.price,
        parcelPrice: this.state.parcelPrice,
        travel: this.state.travel,
        description: this.state.description,
        packet: this.state.slug,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then((res) => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({
            visible: false,
            loading: false,
          });
          window.location.replace("/profile/mytravel");
        }, 3000);
        setTimeout(() => {
          notification["success"]({
            message: <div>پیشنهاد شما با موفقیت ثبت شد</div>,
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
            },
            duration: 3,
          });
        }, 1500);
      })
      .catch((error) => {
        notification["error"]({
          message: error.response.data.detail,
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

  handleCancel = (e) => {
    this.setState({
      visible: false,
      visiblePriceInfo: false,
    });
  };

  callbackfunction = () => {
    this.showModal();
  };

  render() {
    const token = localStorage.getItem("token");
    const pathname = window.location.pathname;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Button
          style={{ borderRadius: "8px", fontSize: "14px", backgroundColor:"#067fc8", color:"white", padding:"2px 10px" }}
          onClick={this.offer}
        >
          ثبت پیشنهاد
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
            hidden: !this.state.travellist.length && true,
          }}
          visible={this.state.visible}
          style={{ fontFamily: "VazirD" }}
        >
          {token ? (
            <div>
              <br />
              {this.state.spinning ? (
                <div style={{ margin: "100px", textAlign: "center" }}>
                  <Spin size="large" />
                </div>
              ) : (
                <div>
                  {this.state.travellist.length ? (
                    <Form
                      layout="vertical"
                      name="offering"
                      onFinish={this.handleOk}
                      initialValues={{ description: this.state.description }}
                    >
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          fontSize: "16px",
                        }}
                      >
                        ثبت پیشنهاد
                      </p>
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
                          dropdownStyle={{ fontFamily: "VazirD" }}
                        >
                          {this.state.travellist.map((e, key) => {
                            return (
                              <Option key={key} value={e.slug}>
                                {e.destination.name} به {e.departure.name} در "
                                {moment(e.flight_date_start).format("D MMM")}"{" "}
                              </Option>
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
                        دستمزد پیشنهادی (تومان)
                        <Popconfirm
                          overlayStyle={{ fontFamily: "VazirD" }}
                          cancelButtonProps={{ hidden: "true" }}
                          onConfirm={this.closeInfo}
                          okText="متوجه شدم"
                          visible={this.state.visiblePriceInfo}
                          title={
                            <div>
                              <p>
                                دستمزدی که در نظر دارید از آگهی دهنده دریافت
                                کنید
                              </p>
                            </div>
                          }
                        >
                          <QuestionCircleOutlined
                            style={{ marginRight: "5px" }}
                            onClick={this.showPriceInfo}
                          />
                        </Popconfirm>
                      </label>
                      <Form.Item
                        style={{
                          textAlign: "right",
                          fontSize: "10px",
                          width: "auto",
                        }}
                        name="price"
                        validateTrigger="onFinish"
                        rules={[
                          {
                            required: true,
                            message:
                              "قیمت پیشنهادی خود را به انگلیسی وارد کنید",
                          },
                          ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if ((value > 100000) & (value < 50000000)) {
                                return Promise.resolve();
                              }
                              if (value < 100000)
                                return Promise.reject(
                                  "دستمزد نمی‌تواند از ۱۰۰٫۰۰۰ تومان کمتر باشد"
                                );
                              if (value > 50000000)
                                return Promise.reject(
                                  "دستمزد نمی‌تواند از ۵۰٫۰۰۰٫۰۰۰ تومان بیشتر باشد"
                                );
                            },
                          }),
                        ]}
                      >
                        <InputNumber
                          type="tel"
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          style={{ textAlign: "right", width: "auto" }}
                          min={0}
                        />
                      </Form.Item>
                      {this.props.buy && (
                        <div>
                          <br />
                          <label
                            style={{
                              float: "right",
                              textAlign: "right",
                              marginTop: "-30px",
                            }}
                          >
                            قیمت کالا (تومان)
                            <Popconfirm
                              overlayStyle={{ fontFamily: "VazirD" }}
                              cancelButtonProps={{ hidden: "true" }}
                              visible={this.state.parcelPriceInfoVisible}
                              onConfirm={this.closeParcelPriceInfo}
                              okText="متوجه شدم"
                              title={
                                <div>
                                  <p>
                                    قیمت کالایی که قرار است خریداری شود را جستجو
                                    کرده و در اینجا وارد نمایید
                                  </p>
                                </div>
                              }
                            >
                              <QuestionCircleOutlined
                                style={{ marginRight: "5px" }}
                                onClick={this.showParcelPriceInfo}
                              />
                            </Popconfirm>
                          </label>
                          <Form.Item
                            style={{
                              textAlign: "right",
                              fontSize: "10px",
                              width: "auto",
                            }}
                            name="parcelPrice"
                            validateTrigger="onFinish"
                            rules={[
                              {
                                required: true,
                                message:
                                  "قیمت کالا را با اعداد انگلیسی وارد کنید",
                              },
                              ({ getFieldValue }) => ({
                                validator(rule, value) {
                                  if ((value > 100000) & (value < 200000000)) {
                                    return Promise.resolve();
                                  }
                                  if (value < 100000)
                                    return Promise.reject(
                                      "مبلغ کالا نمی‌تواند از ۱۰۰٫۰۰۰ تومان کمتر باشد"
                                    );
                                  if (value > 200000000)
                                    return Promise.reject(
                                      "مبلغ کالا نمی‌تواند از ۲۰۰٫۰۰۰٫۰۰۰ تومان بیشتر باشد"
                                    );
                                },
                              }),
                            ]}
                          >
                            <InputNumber
                              type="tel"
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              style={{ textAlign: "right", width: "auto" }}
                              min={0}
                            />
                          </Form.Item>
                        </div>
                      )}
                      <br />
                      <label
                        style={{
                          float: "right",
                          textAlign: "right",
                          marginTop: "-30px",
                        }}
                      >
                        متن پیشنهاد
                      </label>
                      <Form.Item name="description">
                        <TextArea
                          rows={5}
                          style={{
                            borderRadius: "10px",
                            border: "1px solid",
                            borderColor: "gainsboro",
                            padding: "10px",
                          }}
                        />
                      </Form.Item>
                    </Form>
                  ) : (
                    <p style={{ textAlign: "center" }}>
                      <b>
                        برای ثبت پیشنهاد ابتدا باید سفر خود را ثبت نمایید
                        <CreateTravel parentCallback={this.callbackfunction} />
                      </b>
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>
              ابتدا وارد
              <Link to={`/login/?next=${pathname}`}>حساب کاربری </Link>خود شوید
            </p>
          )}
        </Modal>
      </div>
    );
  }
}

export default OfferDetail;
