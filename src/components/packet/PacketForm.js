import React from "react";
import Axios from "axios";
import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  Divider,
  Row,
  Col,
  InputNumber,
  notification,
  Popconfirm,
  Space,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import UploadFile from "../utils/UploadPicture";
import TextArea from "antd/lib/input/TextArea";
import { config } from "../../Constant";

var url = config.url.API_URL;

const { Option } = Select;

class PackForm extends React.Component {
  state = {
    countries: [],
    cities_origin: [],
    cities_destination: [],
    city_origin_dis: true,
    city_destination_dis: true,
    category: [],
    pic_id: 1,
    buy: false,
    category_other: false,
    loading: false,
    loadingCity: false,
    radio_value: false,
    weight: "",
    dimension: "",
    no_matter_origin: false,
    infovisible1: false,
    infovisible2: false,
    infovisible3: false,
    infovisible4: false,
    infovisible5: false,
    infovisible6: false,
    infovisible7: false,
    infovisible8: false,
    destination_city_select: []
  };

 
  DIMENSION = [
    { value: "0", label: "کوچک" },
    { value: "1", label: "متوسط" },
    { value: "2", label: "بزرگ" },
  ];

  radiochange = (e) => {
    this.setState({
      radio_value: e.target.value,
    });
  };

  handleOkinfo = (e) => {
    this.setState({
      infovisible1: false,
      infovisible2: false,
      infovisible3: false,
      infovisible4: false,
      infovisible5: false,
      infovisible6: false,
      infovisible7: false,
      infovisible8: false,
    })
  }

  showPopconfirm1 = () => {
    this.setState({
      infovisible1: true
    }) 
  }
  showPopconfirm2 = () => {
    this.setState({
      infovisible2: true
    }) 
  }
  showPopconfirm3 = () => {
    this.setState({
      infovisible3: true
    }) 
  }
  showPopconfirm3 = () => {
    this.setState({
      infovisible3: true
    }) 
  }
  showPopconfirm4 = () => {
    this.setState({
      infovisible4: true
    }) 
  }
  showPopconfirm5 = () => {
    this.setState({
      infovisible5: true
    }) 
  }
  showPopconfirm6 = () => {
    this.setState({
      infovisible6: true
    }) 
  }
  showPopconfirm7 = () => {
    this.setState({
      infovisible7: true
    }) 
  }
  showPopconfirm8 = () => {
    this.setState({
      infovisible8: true
    }) 
  }

  onChangedimension = (value) => {
    this.setState({ dimension: value });
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
      this.setState({loadingCity:false})
    });
    this.setState({loadingCity: true, destination_city_select:" "})
  };

  handlebuy = () => {
    if (this.state.buy) {
      this.setState({ buy: false, no_matter_origin: false });
    } else {
      this.setState({ buy: true });
    }
  };

  handlenomattercountry = () => {
    if (this.state.no_matter_origin) {
      this.setState({ no_matter_origin: false });
    } else {
      this.setState({ no_matter_origin: true, city_origin_dis: true });
    }
  };

  // should fix dut to new model 
  changecategory = (value) => {
    this.setState({ category: value });
    if (value === "6") {
      if (this.state.category_other === false) {
        this.setState({
          category_other: true,
        });
      } else {
        this.setState({
          category_other: false,
        });
      }
    } else {
      this.setState({
        category_other: false,
      });
    }
  };

  handleFormSubmit = (values) => {
    this.setState({ loading: true });
    const token = localStorage.getItem("token");
    const title = values.title;
    const origin_country = this.state.no_matter_origin
      ? 1
      : values.origin_country;
    const origin_city = this.state.no_matter_origin ? 1 : values.origin_city;
    const destination_country = values.destination_country;
    const destination_city = values.destination_city;
    const category = values.category;
    const dimension = values.dimension;
    const weight = values.weight;
    const suggested_price = values.suggested_price;
    const description = values.description;
    const buy = this.state.buy;
    const no_matter_origin = this.state.no_matter_origin;
    const pic_id = this.state.pic_id && this.state.pic_id;
    const buy_link = this.state.buy && values.buy_link;
    const parcel_price = this.state.buy && values.parcel_price;
    const category_other = this.state.category_other
      ? values.category_other
      : "";
    Axios.post(
      `${url}api/v1/advertise/packets/`,
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
        description: description,
        buy: buy,
        picture: pic_id,
        price: parcel_price ? parcel_price : 0,
        link: buy_link,
        category_other: category_other,
        no_matter_origin: no_matter_origin,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then(function (res) {
        setTimeout(() => {
          window.location = "/profile/mypacket";
          this.setState({loading:false})
        }, 3000);
        setTimeout(() => {
          notification["success"]({
            message: "آگهی شما با موفقیت ثبت شد",
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
            },
            duration: 2,
          });
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
          duration: 3,
        });
        this.setState({
          loading: false,
        });
      });
  };

  
  componentDidMount() {
    document.title = "ثبت آگهی ـ بیلیگ ";
    window.scroll(0,0)
    Axios.get(`${url}api/v1/account/countries/`).then((res) => {
      this.setState({
        countries: res.data,
      });
    });
    Axios.get(`${url}api/v1/advertise/categoryList/1`).then((res) => {
      this.setState({
        category: res.data,
      });
    });
  }

  render() {
    return (
      <div style={{ margin: "30px" }}>
        <Row>
          <Col xs={0} sm={0} md={0} lg={6} xl={6} xxl={6}></Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form
              onFinish={(values) => this.handleFormSubmit(values)}
              size="middle"
              scrollToFirstError={true}
            >
              <Form.Item name="buy" style={{ textAlign: "center" }}>
                <Space>
                  <Popconfirm
                    overlayStyle={{ fontFamily: "VazirD" }}
                    cancelButtonProps={{ hidden: "true" }}
                    visible={this.state.infovisible1}
                    onConfirm={this.handleOkinfo}
                    okText="متوجه شدم"
                    title={
                      <div>
                        <p>
                          زمانی که‌ می‌خواهید مسافر کالای مورد نظر را برای شما
                          خریداری کند این گزینه را فعال کنید.
                        </p>
                      </div>
                    }
                  >
                  <Button style={{border:"hidden", margin:"-5px"}} onClick={this.showPopconfirm1}><InfoCircleOutlined /></Button>
                  </Popconfirm>
                  <Checkbox onChange={this.handlebuy.bind(this)}>
                    <span style={{ marginRight: "10px" }}>
                      بسته باید توسط مسافر خریداری شود
                    </span>
                  </Checkbox>
                </Space>
                <br />
              </Form.Item>
              <Divider plain orientation="center">
                عنوان آگهی *
              </Divider>
              <Form.Item
                name="title"
                style={{ textAlign: "right" }}
                rules={[
                  { required: true, message: "عنوان آگهی را وارد نمایید" },
                  {
                    max: 45,
                    message: "عنوان آگهی نباید بیشتر از ۵۰ کاراکتر باشد",
                  },
                ]}
              >
                <Input maxLength={50} style={{ textAlign: "right" }} />
              </Form.Item>
              {this.state.buy && (
                <div>
                  <Form.Item
                    name="no_matter_origin"
                    valuePropName="checked"
                    style={{ textAlign: "center" }}
                  >
                    <Space>
                      <Popconfirm
                        visible={this.state.infovisible2}
                        onConfirm={this.handleOkinfo}
                        overlayStyle={{ fontFamily: "VazirD" }}
                        cancelButtonProps={{ hidden: "true" }}
                        okText="متوجه شدم"
                        title={
                          <div>
                            <p>
                              زمانی که قصد خرید کالایی را دارید و برای شما فرقی
                              نمی‌کند که از چه کشوری خریداری شود،‌ این گزینه را
                              فعال نمایید
                            </p>
                          </div>
                        }
                      >
                  <Button  style={{border:"hidden", margin:"-5px"}} onClick={this.showPopconfirm2}><InfoCircleOutlined /></Button>
                      </Popconfirm>
                      <Checkbox
                        onChange={this.handlenomattercountry.bind(this)}
                        style={{ textAlign: "right" }}
                      >
                        محل خرید کالا فرقی نمی‌کند
                      </Checkbox>
                    </Space>
                  </Form.Item>
                </div>
              )}
              <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    <Popconfirm
                  
                      className="info3"
                      visible={this.state.infovisible3}
                      onConfirm={this.handleOkinfo}
                      overlayStyle={{ fontFamily: "VazirD" }}
                      cancelButtonProps={{ hidden: "true" }}
                      okText="متوجه شدم"
                      title={
                        this.state.buy ? (
                          <span>
                            مبدا محلی است که کالا از آنجا خریداری می‌شود
                          </span>
                        ) : (
                          <span>
                            مبدا محلی است که بسته در حال حاضر در‌ آنجا قرار دارد
                          </span>
                        )
                      }
                    >
                  <Button className="info3" style={{border:"hidden", margin:"-5px"}} onClick={this.showPopconfirm3}><InfoCircleOutlined /></Button>
                    </Popconfirm>
                    <span style={{ marginRight: "10px" }}>
                      {this.state.buy ? (
                        <span>خرید کالا از کشور</span>
                      ) : (
                        <span>دریافت بسته در کشور</span>
                      )}
                    </span>
                  </Divider>
                  <Form.Item
                    name="origin_country"
                    style={{ textAlign: "right" }}
                    rules={[
                      this.state.no_matter_origin
                        ? { required: false }
                        : {
                            required: true,
                            message: "کشور مبدا را انتخاب کنید",
                          },
                    ]}
                  >
                    <Select
                      disabled={this.state.no_matter_origin}
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
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    {this.state.buy ? (
                      <span>خرید کالا از شهر</span>
                    ) : (
                      <span>دریافت بسته در شهر</span>
                    )}
                  </Divider>
                  <Form.Item
                    name="origin_city"
                    style={{ textAlign: "right" }}
                    rules={[
                      this.state.no_matter_origin
                        ? { required: false }
                        : {
                            required: true,
                            message: "شهر مبدا را انتخاب کنید",
                          },
                    ]}
                  >
                    <Select
                      disabled={this.state.city_origin_dis}
                      dropdownStyle={{ fontFamily: "VazirD" }}
                      loading={this.state.loadingCity}
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
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    <Popconfirm
                      visible={this.state.infovisible4}
                      onConfirm={this.handleOkinfo}
                      overlayStyle={{ fontFamily: "VazirD" }}
                      cancelButtonProps={{ hidden: "true" }}
                      okText="متوجه شدم"
                      title={
                        this.state.buy ? (
                          <span style={{ marginRight: "10px" }}>
                            محلی است که کالا قرار است در آنجا تحویل گیرنده داده
                            شود 
                          </span>
                        ) : (
                          <span style={{ marginRight: "10px" }}>
                            محلی است که بسته قرار است در آنجا تحویل گیرنده داده
                            شود 
                          </span>
                        )
                      }
                    >
                  <Button style={{border:"hidden", margin:"-5px"}} onClick={this.showPopconfirm4}><InfoCircleOutlined /></Button>
                    </Popconfirm>
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
                    rules={[
                      { required: true, message: "کشور مقصد را انتخاب کنید" },
                    ]}
                  >
                    <Select
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
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
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
                    rules={[
                      { required: true, message: "شهر مقصد را انتخاب کنید" },
                    ]}
                  >
                    <Select
                      value={this.state.destination_city_select}
                      onChange={this.changeCityDestination}
x                     disabled={this.state.city_destination_dis}
                      dropdownStyle={{ fontFamily: "VazirD" }}
                    >
                      {this.state.cities_destination.map((e) => {
                        return (
                          <Option key={e.id} value={e.id}>
                            {e.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    <Popconfirm
                      visible={this.state.infovisible5}
                      onConfirm={this.handleOkinfo}
                      overlayStyle={{ fontFamily: "VazirD" }}
                      cancelButtonProps={{ hidden: "true" }}
                      okText="متوجه شدم"
                      title={
                        <div>
                          <p>کوچک :‌ بسته‌هایی که در جیب جا بشوند.</p>
                          <p>متوسط :‌ بسته‌هایی که در کوله‌پشتی جا بشوند.</p>
                          <p>بزرگ :‌ بسته‌هایی که در چمدان جا بشوند.</p>
                        </div>
                      }
                    >
                  <Button style={{border:"hidden", margin:"-5px"}} onClick={this.showPopconfirm5}><InfoCircleOutlined /></Button>
                    </Popconfirm>
                    {this.state.buy ? (
                      <span style={{ marginRight: "10px" }}> ابعاد کالا *</span>
                    ) : (
                      <span style={{ marginRight: "10px" }}> ابعاد بسته *</span>
                    )}
                  </Divider>
                  <Form.Item
                    name="dimension"
                    style={{ textAlign: "right" }}
                    rules={[
                      { required: true, message: "ابعاد بسته را انتخاب کنید" },
                    ]}
                  >
                    <Select
                      options={this.DIMENSION}
                      dropdownStyle={{ fontFamily: "VazirD" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    دسته‌بندی *
                  </Divider>
                  <Form.Item
                    name="category"
                    style={{ textAlign: "right" }}
                    rules={[
                      { required: true, message: "دسته‌بندی را انتخاب کنید" },
                    ]}
                  >
                    <Select
                      // onChange={this.changecategory}
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
                  <div
                    style={{
                      display: this.state.category_other ? "block" : "none",
                    }}
                  >
                    <Divider plain orientation="center">
                      دسته بندی آگهی خود را وارد کنید
                    </Divider>
                    <Form.Item
                      name="category_other"
                      style={{ textAlign: "right" }}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
                  <Divider plain orientation="center">
                    <Popconfirm
                      visible={this.state.infovisible6}
                      onConfirm={this.handleOkinfo}
                      overlayStyle={{ fontFamily: "VazirD" }}
                      cancelButtonProps={{ hidden: "true" }}
                      okText="متوجه شدم"
                      title="وزن بسته باید عددی بین ۰.۱ تا ۳۰ کیلوگرم باشد"
                    >
                  <Button style={{border:"hidden", margin:"-5px"}} onClick={this.showPopconfirm6}><InfoCircleOutlined /></Button>
                    </Popconfirm>
                    {this.state.buy ? (
                      <span style={{ marginRight: "10px" }}>
                        وزن حدودی کالا (کیلوگرم) *
                      </span>
                    ) : (
                      <span style={{ marginRight: "10px" }}>
                        وزن حدودی بسته (کیلوگرم) *
                      </span>
                    )}
                  </Divider>
                  <Form.Item
                    name="weight"
                    style={{ textAlign: "center" }}
                    rules={[
                      {
                        required: true,
                        message: "وزن بسته را با کیبورد انگلیسی وارد نمایید",
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (value <= 30 && value > 0) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "وزن بسته باید عددی بین ۱۰۰ گرم تا ۳۰ کیلوگرم باشد"
                          );
                        },
                      }),
                    ]}
                  >
                    <InputNumber
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      style={{ textAlign: "right", width: "200px" }}
                      min={0}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    <Popconfirm
                      visible={this.state.infovisible7}
                      onConfirm={this.handleOkinfo}
                      overlayStyle={{ fontFamily: "VazirD" }}
                      cancelButtonProps={{ hidden: "true" }}
                      okText="متوجه شدم"
                      title={
                        <p>
                          مبلغی است که به صورت توافقی تعیین و به عنوان دستمزد به
                          مسافر پرداخت می‌شود
                        </p>
                      }
                    >
                  <Button style={{border:"hidden", margin:"-5px"}} onClick={this.showPopconfirm7}><InfoCircleOutlined /></Button>
                    </Popconfirm>
                    <span style={{ marginRight: "10px" }}>
                      مبلغ دستمزد (تومان) *
                    </span>
                  </Divider>
                  <Form.Item
                    name="suggested_price"
                    style={{ textAlign: "center" }}
                    rules={[
                      {
                        required: true,
                        message:
                          "مبلغ پیشنهادی خود را با کیبورد انگلیسی وارد کنید",
                      },
                    ]}
                  >
                    <InputNumber
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      style={{ textAlign: "right", width: "200px" }}
                      min={0}
                    />
                  </Form.Item>
                </Col>
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
                  لینک کالا / وبسایت فروشگاه / آدرس فروشگاه
                </Divider>
                <Form.Item 
                rules={[
                  {
                    required: this.state.buy ? true : false ,
                    message:
                      "مشخصات محل خرید کالا را وارد نمایید",
                  },
                ]}
                name="buy_link">
                  <TextArea
                    rows={5}
                    placeholder="هر مشخصاتی که بتواند در پیدا کردن کالای مورد نظر برای مسافر مفید باشد"
                  />
                </Form.Item>
                <Divider plain orientation="center">
                  <Popconfirm
                    visible={this.state.infovisible8}
                    onConfirm={this.handleOkinfo}
                    overlayStyle={{ fontFamily: "VazirD" }}
                    cancelButtonProps={{ hidden: "true" }}
                    okText="متوجه شدم"
                    title={
                      <div>
                        چنانچه قیمت کالا به صورت دقیق مشخص نیست،‌ مبلغ حدودی آن
                        را وارد نمایید. <br />
                        در مراحل بعدی مذاکره، قیمت دقیق کالا مشخص خواهد شد.
                      </div>
                    }
                  >
                  <Button style={{border:"hidden", margin:"-5px"}} onClick={this.showPopconfirm8}><InfoCircleOutlined /></Button>
                  </Popconfirm>
                  <span style={{ marginRight: "10px" }}>قیمت کالا (تومان)</span>
                </Divider>
                <Form.Item name="parcel_price">
                  <InputNumber
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    style={{ textAlign: "center", width: "200px" }}
                    min={0}
                  />
                </Form.Item>
              </div>
              <Divider plain orientation="center">
                {this.state.buy ? (
                  <span style={{ marginRight: "10px" }}> تصویر کالا</span>
                ) : (
                  <span style={{ marginRight: "10px" }}> تصویر بسته</span>
                )}
              </Divider>
              <Form.Item
                name="picture"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <UploadFile parentCallback={this.callbackFunction} />
                </div>
              </Form.Item>
              <Divider plain orientation="center">
                توضیحات تکمیلی
              </Divider>
              <Form.Item name="description" rules={[
                {
                  required: true,
                  message: "توضیحات لازم را وارد نمایید"
                },
                  {
                    max: 1000,
                    message: "طول متن بیشتر از ۱۰۰۰ حرف است",
                  },
                ]}>
                <TextArea
                  placeholder="نکاتی را که به واضح‌تر شدن درخواست شما برای بازدیدکننده آگهی کمک می‌کند، در اینجا یادداشت نمایید."
                  style={{ textAlign: "right", padding: "10px" }}
                  rows={5}
                />
              </Form.Item>
              <Divider plain orientation="center"></Divider>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  loading={this.state.loading}
                  style={{ borderRadius: "8px" }}
                  type="primary"
                  htmlType="submit"
                >
                  ثبت آگهی
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col xs={0} sm={0} md={0} lg={6} xl={6} xxl={6}></Col>
        </Row>
      </div>
    );
  }
}

export default PackForm;
