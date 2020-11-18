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
  Tooltip,
  notification,
  Popconfirm,
  Space,
} from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import UploadFile from "../utils/UploadPicture";
import TextArea from "antd/lib/input/TextArea";
import { Link } from "react-router-dom";
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
    pic_id: 1,
    buy: false,
    ocv: "",
    category_other: false,
    loading: false,
    current: 0,
    radio_value: false,
    category: "",
    weight: "",
    dimension: "",
    phone_number: false,
  };

  PacketCategory = [
    { value: "0", label: "مدارک و مستندات" },
    { value: "1", label: "کتاب و مجله" },
    { value: "2", label: "لوازم الکترونیکی" },
    { value: "3", label: "کفش و پوشاک" },
    { value: "4", label: "لوازم آرایشی و بهداشتی" },
    { value: "5", label: "دارو" },
    { value: "6", label: "سایر موارد" },
  ];

  DIMENSION = [
    { value: "0", label: "کوچک" },
    { value: "1", label: "متوسط" },
    { value: "2", label: "بزرگ" },
  ];

  radiochange = e => {
    this.setState({
      radio_value: e.target.value,
    });
  }

  onChangedimension = (value) => {
    this.setState({dimension:value})
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  onChange = current => {
    this.setState({ current });
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
    });
  };

  handlebuy = () => {
    if (this.state.buy) {
      this.setState({ buy: false });
    } else {
      this.setState({ buy: true });
    }
  };

  handlephonenumber = () => {
    if (this.state.phone_number) {
      this.setState({ phone_number: false });
    } else {
      this.setState({ phone_number: true });
    }
  }

  changecategory = (value) => {
    this.setState({category:value})
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
    const origin_country = values.origin_country;
    const origin_city = values.origin_city;
    const destination_country = values.destination_country;
    const destination_city = values.destination_city;
    const category = values.category;
    const dimension = values.dimension;
    const weight = values.weight;
    const suggested_price = values.suggested_price;
    const description = values.description;
    const buy = this.state.buy;
    const phone_number = this.state.phone_number;
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
        phonenumber_visible: phone_number,
        picture: pic_id,
        price: parcel_price ? parcel_price : 0 ,
        link: buy_link,
        category_other: category_other,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then(function (res) {
        setTimeout(() => {
          window.location = "/profile/mypacket";
        }, 3000);
        setTimeout(()=>{ notification["success"]({
          message: "آگهی شما با موفقیت ثبت شد",
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 2.5,
        });},1500)
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
          duration: 2.5,
        });
        this.setState({
          loading: false,
        });
      });
  };

  componentDidMount() {
    document.title = "ثبت آگهی ـ بیلیگ "
    Axios.get(`${url}api/v1/account/countries/`).then((res) => {
      this.setState({
        countries: res.data,
      });
    });
  }

  render() {
    return (
      <div>
        <Link
          to={"/how-billlig-work"}
          style={{
            fontSize: "14px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          راهنمای ثبت آگهی
        </Link>
        <br />
        <Row>
          <Col xs={0} sm={0} md={0} lg={6} xl={6} xxl={6}></Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form onFinish={(values) => this.handleFormSubmit(values)}>
              <Divider plain orientation="center">
                عنوان آگهی *
              </Divider>
              <Form.Item
                name="title"
                style={{ textAlign: "right" }}
                rules={[
                  { required: true, message: "عنوان آگهی را وارد نمایید" },
                ]}
              >
                <Input style={{ textAlign: "right"}} />
              </Form.Item>
              <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                  <Popconfirm 
                    overlayStyle={{fontFamily:"VazirD"}}
                    cancelButtonProps={{hidden:"true"}}
                    okText="متوجه شدم"
                    title={
                      <p>مبدا محلی است که کالا در حال حاضر در‌ آنجا قرار دارد</p>
                  }
                    >
                      <InfoCircleOutlined/>
                    </Popconfirm>
                    <span style={{marginRight:"10px"}}>
                    کشور مبدا *
                    </span>
                  </Divider>
                    <Form.Item
                      name="origin_country"
                      style={{ textAlign: "right" }}
                      rules={[
                        { required: true, message: "کشور مبدا را انتخاب کنید" },
                      ]}
                    >
                      <Select
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
                    شهر مبدا *
                  </Divider>
                  <Form.Item
                    name="origin_city"
                    style={{ textAlign: "right" }}
                    rules={[
                      { required: true, message: "شهر مبدا را انتخاب کنید" },
                    ]}
                  >
                    <Select
                      disabled={this.state.city_origin_dis}
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
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                  <Popconfirm 
                    overlayStyle={{fontFamily:"VazirD"}}
                    cancelButtonProps={{hidden:"true"}}
                    okText="متوجه شدم"
                    title={
                      <p>مقصد محلی است که کالا قرار است به آن ارسال شود</p>
                  }
                    >
                      <InfoCircleOutlined/>
                    </Popconfirm>
                    <span style={{marginRight:"10px"}}>
                    کشور مقصد *
                    </span>
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
                    شهر مقصد *
                  </Divider>
                  <Form.Item
                    name="destination_city"
                    style={{ textAlign: "right" }}
                    rules={[
                      { required: true, message: "شهر مقصد را انتخاب کنید" },
                    ]}
                  >
                    <Select
                      disabled={this.state.city_destination_dis}
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
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Divider plain orientation="center">
                    <Popconfirm 
                    overlayStyle={{fontFamily:"VazirD"}}
                    cancelButtonProps={{hidden:"true"}}
                    okText="متوجه شدم"
                    title={
                    <div>
                      <p>کوچک :‌ بسته‌هایی که در جیب جا بشوند.</p>
                      <p>متوسط :‌ بسته‌هایی که در کوله‌پشتی جا بشوند.</p>
                      <p>بزرگ :‌ بسته‌هایی که در چمدان جا بشوند.</p>
                    </div>
                  }
                    >
                      <InfoCircleOutlined/>
                    </Popconfirm>
                   <span style={{marginRight:"10px"}}>
                    ابعاد بسته *
                    </span>
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
                    نوع بسته *
                  </Divider>
                  <Form.Item
                    name="category"
                    style={{ textAlign: "right" }}
                    rules={[
                      { required: true, message: "نوع بسته را انتخاب کنید" },
                    ]}
                  >
                    <Select
                      options={this.PacketCategory}
                      onChange={this.changecategory}
                      dropdownStyle={{ fontFamily: "VazirD" }}
                    />
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
                      <Input />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
                  <Divider plain orientation="center">
                  <Popconfirm 
                    overlayStyle={{fontFamily:"VazirD"}}
                    cancelButtonProps={{hidden:"true"}}
                    okText="متوجه شدم"
                    title="وزن بسته باید عددی بین ۱۰۰ گرم (۰.۱ کیلوگرم) تا ۳۰ کیلوگرم باشد">
                      <InfoCircleOutlined/>
                    </Popconfirm>
                    <span style={{marginRight:"10px"}}>
                    وزن بسته (کیلوگرم) *
                    </span>
                  </Divider>
                  <Form.Item
                    name="weight"
                    style={{ textAlign: "center" }}
                    rules={[
                      { required: true, message: "وزن بسته را با کیبورد انگلیسی وارد کنید" },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (value <= 30 && value > 0) {
                            return Promise.resolve();
                          }
                          return Promise.reject("وزن بسته باید عددی بین ۱۰۰ گرم تا ۳۰ کیلوگرم باشد");
                        },
                      }),
                    ]}
                  >
                    <Space>
                    
                    <InputNumber
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{ textAlign: "right" }}
                        min={0}
                      />
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                  <Popconfirm 
                    overlayStyle={{fontFamily:"VazirD"}}
                    cancelButtonProps={{hidden:"true"}}
                    okText="متوجه شدم"
                    title={
                      <p> مبلغی است که به صورت توافقی تعیین و به عنوان دستمزد به مسافر پرداخت می‌شود</p>
                  }
                    >
                      <InfoCircleOutlined/>
                    </Popconfirm>
                   <span style={{marginRight:"10px"}}>
                   مبلغ پیشنهادی (تومان) *
                    </span>
                  </Divider>
                    <Form.Item
                      name="suggested_price"
                      style={{ textAlign: "center" }}
                      rules={[
                        {
                          required: true,
                          message: "مبلغ پیشنهادی خود را با کیبورد انگلیسی وارد کنید",
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
                </Col>
              </Row>
              <Form.Item name="buy" style={{ textAlign: "center" }}>
              <Space>
              <Popconfirm 
                    overlayStyle={{fontFamily:"VazirD"}}
                    cancelButtonProps={{hidden:"true"}}
                    okText="متوجه شدم"
                    title={
                    <div>
                      <p>زمانی که‌ می‌خواهید مسافر کالای مورد نظر را برای شما خریداری کند این گزینه را فعال کنید.</p>
                      <p>در این حالت باید اطلاعات کالای مورد نظر را در کادری که باز می‌شود، وارد کرده و مبلغ آن را به علاوه بر دستمزد به سایت پرداخت کنید</p>
                    </div>
                  }
                    >
                      <InfoCircleOutlined/>
                    </Popconfirm>
                <Checkbox onChange={this.handlebuy.bind(this)}>
                   <span style={{marginRight:"10px"}}>
                   بسته باید توسط مسافر خریداری شود
                    </span>
                </Checkbox>
                </Space>
                <br />
              </Form.Item>
              <div
                style={{
                  display: this.state.buy ? "block" : "none",
                  border: "1px solid",
                  padding: "30px",
                  borderRadius: "15px",
                  backgroundColor: "aliceblue",
                  marginBottom: "10px",
                }}
              >
                <Divider plain orientation="center">
                  {" "}
                  لینک کالا / وبسایت فروشگاه / آدرس فروشگاه
                </Divider>
                  <Form.Item name="buy_link">
                    <Input placeholder="هر مشخصاتی که بتواند در پیدا کردن کالای مورد نظر برای مسافر مفید باشد" />
                  </Form.Item>
                <Divider plain orientation="center">
                  {" "}
               قیمت کالا (تومان)
                </Divider>
                <Form.Item name="parcel_price">
                  <InputNumber
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    style={{ textAlign: "right", width: "-moz-available" }}
                    min={0}
                  />
                </Form.Item>
              </div>
              <Form.Item
                name="phone_number"
                valuePropName="checked"
                style={{ textAlign: "center" }}
              >
                <Checkbox onChange={this.handlephonenumber.bind(this)}  style={{ textAlign: "right" }}>
                  شماره تماس من در‌ آگهی نمایش داده شود
                </Checkbox>
                </Form.Item>
              <Divider plain orientation="center">
               تصویر کالا
              </Divider>
              <Form.Item
                name="picture"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={{display:"flex", justifyContent:"center"}}>
                <UploadFile parentCallback={this.callbackFunction} />
                </div>
              </Form.Item>
                <Divider plain orientation="center">
                توضیحات تکمیلی
              </Divider>
              <Form.Item name="description">
                <TextArea placeholder="نکاتی را که به واضح‌تر شدن درخواست برای بازدیدکننده آگهی کمک می‌کند، در اینجا یادداشت کنید." style={{ textAlign: "right", padding:"10px" }} />
              </Form.Item>
              <Form.Item
                name="rule"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject("لطفا قوانین را ملاحظه بفرمایید"),
                  },
                ]}
                style={{ textAlign: "center" }}
              >
                <Checkbox style={{ textAlign: "right" }}>
                  با <Link to="/terms">قوانین و مقررات </Link>بیلیگ پست موافقم *
                </Checkbox>
              </Form.Item>
              <Divider plain orientation="center">
              </Divider>
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
