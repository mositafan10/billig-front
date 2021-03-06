import React, { Component } from "react";
import {
  Form,
  Col,
  Button,
  Row,
  Divider,
  Select,
  Input,
  Checkbox,
  notification,
  InputNumber,
} from "antd";
import Axios from "axios";
import { config } from "../../Constant";

var url = config.url.API_URL;
const { TextArea } = Input;
const { Option } = Select;

class PacketForEdit extends Component {
  state = {
    countries: [],
    cities_origin: [],
    cities_destination: [],
    city_origin_dis: true,
    city_destination_dis: true,
    category: [],
    pic_id: 1,
    buy: this.props.data.buy,
    loading: false,
    phonenumber_visible: this.props.data.phonenumber_visible,
    no_matter_origin: this.props.data.no_matter_origin,
    parcel_price: this.props.data.buy ? this.props.data.buyinfo.price : "",
    parcel_link: this.props.data.buy ? this.props.data.buyinfo.link : "",
    currency: this.props.data.buy ? this.props.data.buyinfo.currency : "",
  };

  Dimension = [
    { value: 0, label: "کوچک" },
    { value: 1, label: "متوسط" },
    { value: 2, label: "بزرگ" },
  ];

  WEIGHT = [
    { value: 0, label: "کمتر از ۱ کیلوگرم" },
    { value: 1, label: "بین ۱ تا ۵ کیلوگرم" },
    { value: 2, label: "بین ۵ تا ۱۰ کیلوگرم" },
    { value: 3, label: "بیشتر از ۱۰ کیلوگرم" },
  ];

  CURRENCY = [
    { value: "تومان", label: "تومان" },
    // { value: "دلار", label: "دلار" },
    // { value: "یورو", label: "یورو" },
  ];

  search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].label === nameKey) {
        return myArray[i].value;
      }
    }
  }

  handlenomattercountry = () => {
    if (this.state.no_matter_origin) {
      this.setState({ no_matter_origin: false });
    } else {
      this.setState({ no_matter_origin: true, city_origin_dis: true });
    }
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

  handlebuy = () => {
    if (this.state.buy) {
      this.setState({ buy: false, no_matter_origin: false });
    } else {
      this.setState({ buy: true });
    }
  };

  handlephonenumber = () => {
    if (this.state.phonenumber_visible) {
      this.setState({ phonenumber_visible: false });
    } else {
      this.setState({ phonenumber_visible: true });
    }
  };

  handleChangevalue = (event) => {
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: target.value });
  };

  handleFormSubmit = (values) => {
    this.setState({ loading: true });
    const packet_id = this.props.data.slug;
    const title = values.title ? values.title : this.props.data.title;
    const origin_country = values.origin_country
      ? values.origin_country
      : this.props.data.origin_country.id;
    const origin_city = values.origin_city
      ? values.origin_city
      : this.props.data.origin_city
      ? this.props.data.origin_city.id
      : "";
    const destination_country = values.destination_country
      ? values.destination_country
      : this.props.data.destination_country.id;
    const destination_city = values.destination_city
      ? values.destination_city
      : this.props.data.destination_city
      ? this.props.data.destination_city.id
      : "";
    const category = values.category
      ? values.category
      : this.props.data.category
      ? this.props.data.category.id
      : "";
    const weight = values.weight
      ? this.search(values.weight, this.WEIGHT)
      : this.search(this.props.data.weight, this.WEIGHT);
    const dimension = values.dimension
      ? values.dimension
      : this.search(this.props.data.dimension, this.Dimension);
    const suggested_price = values.suggested_price
      ? values.suggested_price
      : this.props.data.suggested_price;
    const description = values.description
      ? values.description
      : this.props.data.description;
    const buy = this.state.buy;
    const phonenumber_visible = this.state.phonenumber_visible;
    const no_matter_origin = this.state.no_matter_origin;
    const parcel_price = values.parcel_price
      ? values.parcel_price
      : this.state.parcel_price;
    const parcel_link = values.buy_link
      ? values.buy_link
      : this.state.parcel_link;
    const currency = values.currency ? values.currency : this.state.currency;
    const token = localStorage.getItem("token");

    Axios.put(
      `${url}api/v1/advertise/packet/${packet_id}/`,
      {
        title: title,
        origin_country: origin_country,
        origin_city: origin_city,
        destination_country: destination_country,
        destination_city: destination_city,
        category: category,
        dimension: dimension,
        weight: weight,
        suggested_price: suggested_price,
        buy: buy,
        phonenumber_visible: phonenumber_visible,
        no_matter_origin: no_matter_origin,
        description: description,
        parcel_price: parcel_price,
        parcel_link: parcel_link,
        currency: currency,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then((res) => {
        setTimeout(() => {
          notification["success"]({
            message: "آگهی با موفقیت ویرایش شد",
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
            },
            closeIcon: " ",
            duration: 3,
          });
          this.setState({ loading: false });
          this.props.cancle();
          this.props.updatelist();
        }, 1000);
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
          closeIcon: " ",
          duration: 3,
        });
        this.setState({ loading: false });
      });
  };

  componentDidMount = () => {
    Axios.get(`${url}api/v1/account/countries/`).then((res) => {
      this.setState(
        {
          countries: res.data,
        },
        () => {
          this.sortCountries();
        }
      );
    });
    Axios.get(`${url}api/v1/advertise/categoryList/`).then((res) => {
      this.setState({
        category: res.data,
      });
    });
    if (this.props.data.origin_country.id !== 1) {
      this.get_city_origin(this.props.data.origin_country.id);
    }
    this.get_city_destination(this.props.data.destination_country.id);
  };

  callbackFunction = (childData) => {
    if (childData.length == 1) {
      const pic_id =
        childData[0] &&
        childData[0].response &&
        childData[0].response &&
        childData[0].response.id;
      this.setState({
        pic_id: pic_id,
      });
    } else {
      return null;
    }
  };

  sortCountries = () => {
    var result1 = [],
      result2 = [];
    const arr = this.state.countries;
    for (var i = 0; i < arr.length; i++) {
      if (
        arr[i].name == "ایران" ||
        arr[i].name == "کانادا" ||
        arr[i].name == "آلمان" ||
        arr[i].name == "آمریکا"
      ) {
        result1.push(arr[i]);
      } else {
        result2.push(arr[i]);
      }
    }
    var result = result1.concat(result2);
    this.setState({ countries: result });
  };

  render() {
    return (
      <div style={{ fontFamily: "VazirD" }}>
        <Row style={{ justifyContent: "center", display: "flex" }}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
            <Form
              initialValues={{
                title: this.props.data.title,
                description: this.props.data.description,
                weight: this.props.data.weight,
                suggested_price: this.props.data.suggested_price,
                buy_link: this.props.data.buyinfo.link,
                parcel_price: this.props.data.buyinfo.price,
                currency: this.props.data.buyinfo.currency,
              }}
              onFinish={(values) => this.handleFormSubmit(values)}
              id="edit"
            >
              <Divider plain orientation="center">
                عنوان آگهی
              </Divider>
              <Form.Item
                name="title"
                style={{ textAlign: "right" }}
                rules={[
                  { required: true, message: "عنوان آگهی را وارد نمایید" },
                  {
                    pattern: "^([a-zA-Z0-9 \u0600-\u06FF])+$",
                    message: "عنوان آگهی باید از حروف و اعداد تشکیل شده باشد",
                  },
                  {
                    max: 50,
                    message: "عنوان آگهی نباید بیشتر از ۵۰ کاراکتر باشد",
                  },
                ]}
              >
                <Input
                  onChange={this.handleChangevalue}
                  style={{ textAlign: "right" }}
                />
              </Form.Item>
              {/* <Form.Item name="buy" style={{ textAlign: "center" }}>
                <Checkbox
                  onChange={this.handlebuy.bind(this)}
                  defaultChecked={this.state.buy}
                >
                  <span style={{ marginRight: "10px" }}>
                    بسته باید توسط مسافر خریداری شود
                  </span>
                </Checkbox>
                <br />
              </Form.Item> */}
              {this.state.buy && (
                <div>
                  <Form.Item
                    name="no_matter_origin"
                    style={{ textAlign: "center" }}
                  >
                    <Checkbox
                      defaultChecked={this.state.no_matter_origin}
                      onChange={this.handlenomattercountry.bind(this)}
                      style={{ textAlign: "right" }}
                    >
                      محل خرید کالا فرقی نمی‌کند
                    </Checkbox>
                  </Form.Item>
                </div>
              )}
              <Row>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    {this.state.buy ? (
                      <span>خرید کالا از کشور</span>
                    ) : (
                      <span>دریافت بسته در کشور</span>
                    )}
                  </Divider>
                  <Form.Item
                    name="origin_country"
                    style={{ textAlign: "right" }}
                  >
                    <Select
                      disabled={this.state.no_matter_origin}
                      defaultValue={
                        this.props.data.origin_country
                          ? this.props.data.origin_country.name
                          : ""
                      }
                      onChange={this.get_city_origin.bind()}
                      dropdownStyle={{ fontFamily: "VazirD" }}
                    >
                      {this.state.countries.map((e, key) => {
                        return (
                          <Option key={key} value={e.id}>
                            {e.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    {this.state.buy ? (
                      <span>خرید کالا از شهر</span>
                    ) : (
                      <span>دریافت بسته در شهر</span>
                    )}
                  </Divider>
                  <Form.Item name="origin_city" style={{ textAlign: "right" }}>
                    <Select
                      disabled={
                        this.props.data.origin_country.id === 1 &&
                        this.state.city_origin_dis
                      }
                      defaultValue={this.props.data.origin_city.name}
                      dropdownStyle={{ fontFamily: "VazirD" }}
                    >
                      {this.state.cities_origin.map((e, key) => {
                        return (
                          <Option key={key} value={e.id}>
                            {e.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    {this.state.buy ? (
                      <span style={{ marginRight: "10px" }}>
                        تحویل کالا در کشور *
                      </span>
                    ) : (
                      <span style={{ marginRight: "10px" }}>
                        تحویل بسته در کشور *
                      </span>
                    )}
                  </Divider>
                  <Form.Item
                    name="destination_country"
                    style={{ textAlign: "right" }}
                  >
                    <Select
                      defaultValue={
                        this.props.data.destination_country
                          ? this.props.data.destination_country.name
                          : ""
                      }
                      onChange={this.get_city_destination.bind()}
                      dropdownStyle={{ fontFamily: "VazirD" }}
                    >
                      {this.state.countries.map((e, key) => {
                        return (
                          <option key={key} value={e.id}>
                            {e.name}
                          </option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    {this.state.buy ? (
                      <span style={{ marginRight: "10px" }}>
                        تحویل کالا در شهر *
                      </span>
                    ) : (
                      <span style={{ marginRight: "10px" }}>
                        تحویل بسته در شهر *
                      </span>
                    )}
                  </Divider>
                  <Form.Item
                    name="destination_city"
                    style={{ textAlign: "right" }}
                  >
                    <Select
                      // disabled={this.state.city_destination_dis}
                      defaultValue={this.props.data.destination_city.name}
                      dropdownStyle={{ fontFamily: "VazirD" }}
                    >
                      {this.state.cities_destination.map((e, key) => {
                        return (
                          <Option key={key} value={e.id}>
                            {e.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    ابعاد
                  </Divider>
                  <Form.Item name="dimension" style={{ textAlign: "right" }}>
                    <Select
                      defaultValue={this.props.data.dimension}
                      options={this.Dimension}
                      dropdownStyle={{ fontFamily: "VazirD" }}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    دسته‌بندی
                  </Divider>
                  <Form.Item name="category" style={{ textAlign: "right" }}>
                    <Select
                      defaultValue={this.props.data.category.name}
                      dropdownStyle={{ fontFamily: "VazirD" }}
                    >
                      {this.state.category.map((e, key) => {
                        return (
                          <Option key={key} value={e.id}>
                            {e.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ justifyContent: "center", display: "flex" }}>
                <Divider plain orientation="center">
                  دستمزد پیشنهادی (تومان)
                </Divider>
                <Form.Item
                  name="suggested_price"
                  style={{ textAlign: "right" }}
                  validateTrigger="onFinish"
                  rules={[
                    {
                      required: true,
                      message:
                        "دستمزد پیشنهادی خود را با صفحه کلید انگلیسی وارد کنید",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (value > 10000) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "دستمزد نمی‌تواند از ۱۰٫۰۰۰ تومان کمتر باشد"
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
                    style={{ textAlign: "right", width: "200px" }}
                    min={0}
                  />
                </Form.Item>
              </Row>
              <Row style={{ justifyContent: "center", display: "flex" }}>
                <Divider plain orientation="center">
                  وزن حدودی
                </Divider>
                <Form.Item
                  name="weight"
                  style={{ textAlign: "center" }}
                  rules={[
                    {
                      required: true,
                      message: "وزن بسته را انتخاب کنید",
                    },
                  ]}
                >
                  <Select
                    options={this.WEIGHT}
                    dropdownStyle={{ fontFamily: "VazirD" }}
                  />
                </Form.Item>
              </Row>
              <div
                style={{
                  display: this.state.buy ? "block" : "none",
                  padding: "10px",
                  borderRadius: "15px",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                <Divider plain orientation="center">
                  لینک کالا
                </Divider>
                <Form.Item name="buy_link">
                  <TextArea rows={2} placeholder="لینک مشخصات کالا وارد کنید" />
                </Form.Item>

                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <Divider plain orientation="center">
                    <span style={{ marginRight: "10px" }}>قیمت حدودی کالا</span>
                  </Divider>
                  <Col
                    xs={14}
                    sm={14}
                    md={14}
                    lg={12}
                    xl={12}
                    xxl={12}
                    style={{ textAlign: "left" }}
                  >
                    <Form.Item name="parcel_price">
                      <InputNumber
                        type="tel"
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{ textAlign: "center", width: "100px" }}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={10}
                    sm={10}
                    md={10}
                    lg={12}
                    xl={12}
                    xxl={12}
                    style={{ textAlign: "right" }}
                  >
                    <Form.Item
                      name="currency"
                      style={{ textAlign: "right", width: "60px" }}
                    >
                      <Select
                        options={this.CURRENCY}
                        dropdownStyle={{ fontFamily: "VazirD" }}
                        defaultValue={this.CURRENCY[0].label}
                        showArrow={false}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
              <Divider plain orientation="center">
                توضیحات تکمیلی
              </Divider>
              <Form.Item
                name="description"
                validateTrigger="onFinish"
                rules={[
                  {
                    required: true,
                    message: "توضیحات لازم را وارد نمایید",
                  },
                  {
                    max: 1000,
                    message: "طول متن بیشتر از ۱۰۰۰ حرف است",
                  },
                  {
                    min: 5,
                    message: "مقداری بیشتر توضیح دهید",
                  },
                ]}
              >
                <TextArea
                  initialValues={this.props.data.description}
                  style={{ textAlign: "right", padding: "10px" }}
                  rows="4"
                />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  loading={this.state.loading}
                  style={{ borderRadius: "8px" }}
                  type="primary"
                  htmlType="submit"
                >
                  ویرایش آگهی
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PacketForEdit;
