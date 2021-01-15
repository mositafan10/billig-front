import React from "react";
import {
  Button,
  Modal,
  Form,
  Select,
  DatePicker,
  Radio,
  Tooltip,
  notification,
} from "antd";
import Axios from "axios";
import moment from "moment";
import { config } from "../../Constant";

var url = config.url.API_URL;
const { Option } = Select;

class CreateTravel extends React.Component {
  state = {
    createtravelvisible: false,
    countries: [],
    cities_origin: [],
    cities_destination: [],
    city_origin_dis: true,
    city_destination_dis: true,
    radio_value: false,
    confirmLoading: false,
  };

  componentDidMount() {
    Axios.get(`${url}api/v1/account/countries/`).then((res) => {
      this.setState({
        countries: res.data,
      }, () => {
        this.sortCountries();
    });
    });
  }

  sortCountries = () => {
    var result1 = [],
      result2 = [];
    const arr = this.state.countries;
    for (var i = 0; i < arr.length; i++) {
      if (
        arr[i].name == "ایران"  || arr[i].name == "کانادا" || arr[i].name == "آلمان" || arr[i].name == "آمریکا") {
        result1.push(arr[i]);
      } else {
        result2.push(arr[i]);
      }
    }
    var result = result1.concat(result2);
    this.setState({ countries: result });
  };

  showcreatetravel = () => {
    this.setState({
      createtravelvisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      createtravelvisible: false,
    });
  };

  handleOkTravel = (values) => {
    const token = localStorage.getItem("token");
    this.state.radio_value
      ? Axios.post(
          `${url}api/v1/advertise/travel/`,
          {
            departure: values.origin_country,
            departure_city: values.origin_city,
            destination: values.destination_country,
            destination_city: values.destination_city,
            flight_date_start: moment(values.flight_date1).format("YYYY-MM-DD"),
            flight_date_end: moment(values.flight_date2).format("YYYY-MM-DD"),
            description: values.description,
          },
          { headers: { Authorization: `Token ${token}` } }
        )
          .then((res) => {
            this.setState({ confirmLoading: true });
            setTimeout(() => {
              this.setState({
                createtravelvisible: false,
                confirmLoading: false,
              });
            }, 2000);
            if (this.props.loc === "offer") {
              this.props.parentCallback();
              notification["success"]({
                message: <div>سفر شما با موفقیت ثبت شد </div>,
                style: {
                  fontFamily: "VazirD",
                  textAlign: "right",
                  float: "right",
                  width: "max-content",
                },
                closeIcon: " ",
                duration: 3,
              });
            } else {
              this.props.parent();
              notification["success"]({
                message: (
                  <div>
                    سفر شما با موفقیت ثبت شد <br />
                    الان می‌توانید به صفحه لیست اگهی‌ها برید
                    <br /> و روی آگهی‌ها پیشنهاد بگذارید
                  </div>
                ),
                style: {
                  fontFamily: "VazirD",
                  textAlign: "right",
                  float: "right",
                  width: "max-content",
                },
                closeIcon: " ",
                duration: 8,
              });
            }
          })
          .catch((error) => {
            notification["error"]({
              message: error.response.data.detail,
              closeIcon: " ",
              style: {
                fontFamily: "VazirD",
                textAlign: "right",
                float: "right",
                width: "max-content",
              },
              duration: 3,
            });
            this.setState({ confirmLoading: false });
          })
      : Axios.post(
          `${url}api/v1/advertise/travel/`,
          {
            departure: values.origin_country,
            departure_city: values.origin_city,
            destination: values.destination_country,
            destination_city: values.destination_city,
            flight_date_start: moment(values.flight_date1).format("YYYY-MM-DD"),
            description: values.description,
          },
          { headers: { Authorization: `Token ${token}` } }
        )
          .then((res) => {
            this.setState({ confirmLoading: true });
            setTimeout(() => {
              this.setState({
                createtravelvisible: false,
                confirmLoading: false,
              });
            }, 2000);
            if (this.props.loc === "offer") {
              this.props.parentCallback();
              setTimeout(() => {
                notification["success"]({
                  message: <div>سفر شما با موفقیت ثبت شد </div>,
                  style: {
                    fontFamily: "VazirD",
                    textAlign: "right",
                    float: "right",
                    width: "max-content",
                  },
                  closeIcon: " ",
                  duration: 3,
                });
              }, 500);
            } else {
              setTimeout(() => {
                notification["success"]({
                  message: (
                    <div>
                      سفر شما با موفقیت ثبت شد <br />
                      الان می‌توانید به صفحه لیست اگهی‌ها برید
                      <br /> و روی آگهی‌ها پیشنهاد بگذارید
                    </div>
                  ),
                  style: {
                    fontFamily: "VazirD",
                    textAlign: "right",
                    float: "right",
                    width: "max-content",
                  },
                  closeIcon: " ",
                  duration: 8,
                });
              }, 500);
              this.props.parent();
            }
          })
          .catch(
            (error) =>
              notification["warn"]({
                message: error.response.data.detail,
                style: {
                  fontFamily: "VazirD",
                  textAlign: "right",
                  float: "right",
                  width: "max-content",
                },
                closeIcon: " ",
                duration: 3,
              }),
            this.setState({ confirmLoading: false })
          );
  };

  get_city_origin = (e) => {
    Axios.get(`${url}api/v1/account/cities/${e}`).then((res) => {
      this.setState({
        cities_origin: res.data,
        city_origin_dis: false,
      });
    });
  };

  get_city_destination = (e) => {
    Axios.get(`${url}api/v1/account/cities/${e}`).then((res) => {
      this.setState({
        cities_destination: res.data,
        city_destination_dis: false,
      });
    });
  };

  radioonChange = (e) => {
    this.setState({
      radio_value: e.target.value,
    });
  };

  disabledDate(current) {
    return current && current < moment().endOf("day");
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.showcreatetravel}
          style={{
            borderRadius: "8px",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          <b>+ ثبت سفر جدید</b>
        </Button>
        <Modal
          visible={this.state.createtravelvisible}
          onCancel={this.handleCancel}
          okButtonProps={{
            form: "create_travel",
            key: "submit",
            htmlType: "submit",
          }}
          okText={"ثبت"}
          confirmLoading={this.state.confirmLoading}
          cancelText="انصراف"
          style={{
            borderRadius: "10px",
            fontFamily: "VazirD",
            overflow: "hidden",
          }}
        >
          <p style={{ fontFamily: "VazirD", textAlign: "center" }}> ثبت سفر </p>
          <Form
            name="create_travel"
            onFinish={this.handleOkTravel}
            scrollToFirstError="true"
          >
            <br />
            <label
              style={{
                fontFamily: "VazirD",
                float: "right",
                textAlign: "right",
                marginTop: "-30px",
              }}
            >
              کشور مبدا
            </label>
            <Form.Item
              name="origin_country"
              style={{ textAlign: "right" }}
              rules={[
                {
                  required: true,
                  message: "کشور مبدا را انتخاب کنید",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="key"
                onChange={this.get_city_origin.bind()}
                dropdownStyle={{ fontFamily: "VazirD" }}
              >
                {this.state.countries.map((e) => {
                  return (
                    <Option key={e.name} value={e.id}>
                      {e.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <br />
            <label
              style={{
                fontFamily: "VazirD",
                float: "right",
                textAlign: "right",
                marginTop: "-30px",
              }}
            >
              شهر مبدا
            </label>
            <Form.Item
              name="origin_city"
              locale={{ emptyText: "سفری وجود ندارد" }}
              style={{ textAlign: "right" }}
              rules={[
                {
                  required: true,
                  message: "شهر مبدا را انتخاب کنید",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="key"
                disabled={this.state.city_origin_dis}
                dropdownStyle={{ fontFamily: "VazirD" }}
              >
                {this.state.cities_origin.map((e) => {
                  return (
                    <option key={e.name} value={e.id}>
                      {e.name}
                    </option>
                  );
                })}
              </Select>
            </Form.Item>
            <br />
            <label
              style={{
                fontFamily: "VazirD",
                float: "right",
                textAlign: "right",
                marginTop: "-30px",
              }}
            >
              کشور مقصد
            </label>
            <Form.Item
              name="destination_country"
              style={{ textAlign: "right" }}
              rules={[
                {
                  required: true,
                  message: "کشور مقصد را انتخاب کنید",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="key"
                onChange={this.get_city_destination.bind()}
                dropdownStyle={{ fontFamily: "VazirD" }}
              >
                {this.state.countries.map((e) => {
                  return (
                    <Option key={e.name} value={e.id}>
                      {e.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <br />
            <label
              style={{
                fontFamily: "VazirD",
                float: "right",
                textAlign: "right",
                marginTop: "-30px",
              }}
            >
              شهر مقصد
            </label>
            <Form.Item
              name="destination_city"
              style={{ textAlign: "right" }}
              rules={[
                {
                  required: true,
                  message: "شهر مقصد را انتخاب کنید",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="key"
                disabled={this.state.city_destination_dis}
                dropdownStyle={{ fontFamily: "VazirD" }}
              >
                {this.state.cities_destination.map((e) => {
                  return (
                    <option key={e.name} value={e.id}>
                      {e.name}
                    </option>
                  );
                })}
              </Select>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Radio.Group
                optionType="button"
                onChange={this.radioonChange.bind(this)}
                value={this.state.radio_value}
              >
                <Radio value={false}>یک طرفه</Radio>
                <Tooltip
                  overlayStyle={{ fontFamily: "VazirD" }}
                  title="در صورت انتخاب این گزینه، دو سفر برای شما ثبت خواهد شد."
                >
                  <Radio value={true}>دو طرفه</Radio>
                </Tooltip>
              </Radio.Group>
            </div>
            <br />
            <label
              style={{
                fontFamily: "VazirD",
                float: "right",
                textAlign: "right",
                marginTop: "-30px",
              }}
            >
              تاریخ رفت
            </label>
            {this.state.radio_value ? (
              <div>
                <Form.Item
                  name="flight_date1"
                  style={{ textAlign: "center" }}
                  rules={[
                    {
                      required: true,
                      message: "تاریخ پرواز خود را انتخاب کنید",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder=""
                    style={{ display: "flex" }}
                    disabledDate={this.disabledDate}
                  />
                </Form.Item>
                <br />
                <label
                  style={{
                    fontFamily: "VazirD",
                    float: "right",
                    textAlign: "right",
                    marginTop: "-30px",
                  }}
                >
                  تاریخ برگشت
                </label>
                <Form.Item
                  name="flight_date2"
                  style={{ textAlign: "center" }}
                  rules={[
                    {
                      required: true,
                      message: "تاریخ پرواز خود را انتخاب کنید",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder=""
                    style={{ display: "flex" }}
                    disabledDate={this.disabledDate}
                  />
                </Form.Item>
              </div>
            ) : (
              <Form.Item
                name="flight_date1"
                style={{ textAlign: "center" }}
                rules={[
                  {
                    required: true,
                    message: "تاریخ پرواز خود را انتخاب کنید",
                  },
                ]}
              >
                <DatePicker
                  placeholder=""
                  style={{ display: "flex" }}
                  disabledDate={this.disabledDate}
                />
              </Form.Item>
            )}
          </Form>
        </Modal>
      </div>
    );
  }
}

export default CreateTravel;
