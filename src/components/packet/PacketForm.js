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
  Radio,
  Col,
  InputNumber,
  Tooltip,
  notification,
  Steps,
  message
} from "antd";
import UploadFile from "../utils/UploadPicture";
import TextArea from "antd/lib/input/TextArea";
import { Link } from "react-router-dom";
import { config } from "../../Constant";

var url = config.url.API_URL;

const { Option } = Select;
const { Step } = Steps;

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

  handleChange = () => {
    if (this.state.buy) {
      this.setState({ buy: false });
    } else {
      this.setState({ buy: true });
    }
  };

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
    const token = localStorage.getItem("token");
    const pic_id = this.state.pic_id && this.state.pic_id;
    const buy_link = this.state.buy && values.buy_link;
    const parcel_price = this.state.buy && values.parcel_price;
    const category_other = this.state.category_other
      ? values.category_other
      : "";

    Axios.post(
      `${url}api/v1/advertise/packet/`,
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

    // const steps = [
    //   {
    //     title: 'نوع آگهی',
    //     content: 
    //     <div style={{justifyContent:"center", display:"center", textAlign:"center"}}>
    //       <br/>
    //     <p style={{fontSize:"16px"}}><b>در بیلیگ  هم‌ می‌توانید بسته خود را پست کنید و هم می‌توانید کالای مورد نظر خود را خریداری نمایید</b></p>
    //     <p style={{fontSize:"16px"}}><b>ابتدا نوع آگهی خود را مشخص کنید</b></p>
    //     <Radio.Group optionType="button" value={this.state.radio_value} onChange={this.radiochange.bind(this)} >
    //         <Radio style={{fontSize:"16px"}} value={false}>پست</Radio>
    //         <Radio style={{fontSize:"16px"}} value={true}>خرید</Radio>
    //     </Radio.Group>
    //     </div>
    //   },
    //   {
    //     title: 'دسته بندی کالا',
    //     content: <div style={{justifyContent:"center", display:"center", textAlign:"center"}}>
    //     <br/>
    //      <p style={{fontSize:"16px"}}><b>دسته بندی کالای خود را انتخاب کنید</b></p>
    //     <Select 
    //       defaultValue={this.state.category}
    //       style={{width:"200px"}}
    //       options={this.PacketCategory}
    //       onChange={this.changecategory}
    //       dropdownStyle={{ fontFamily: "VazirD" }}
    //     />
    //     <div
    //       style={{
    //         display: this.state.category_other ? "block" : "none",
    //       }}
    //     >
    //       <Divider plain orientation="center">
    //         توضیحات بیشتر
    //       </Divider>
    //         <Input style={{width:"200px"}}/>
    //     </div>
    //     </div>
    //   },
    //   {
    //     title: 'مشخصات کالا',
    //     content: 
    //     <div style={{textAlign:"center"}}>
    //       <br/>
    //       <p style={{fontSize:"16px"}}><b>وزن بسته</b></p>
    //       <p>وزن بسته باید عددی بین ۱۰۰ گرم تا ۳۰ کیلوگرم باشد</p>
    //       <InputNumber
    //         value={this.state.weight}
    //         formatter={(value) =>
    //           `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    //         }
    //         parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
    //         style={{ textAlign: "right", width:"200px" }}
    //         min={0}
    //       />
    //       <Divider/>
    //       <p style={{fontSize:"16px"}}><b>ابعاد بسته</b></p>
    //       <p>وزن بسته باید عددی بین ۱۰۰ گرم تا ۳۰ کیلوگرم باشد</p>
    //       <Select
    //         onChange={this.onChangedimension}
    //         value={this.state.dimension}
    //         style={{width:"200px"}}
    //         options={this.DIMENSION}
    //         dropdownStyle={{ fontFamily: "VazirD" }}
    //       />
    //       <Divider/>
    //       <p style={{fontSize:"16px"}}><b>تصویر بسته</b></p>
    //       <div style={{justifyContent:"center", display:"flex", textAlign:"center"}}>
    //        <UploadFile parentCallback={this.callbackFunction} />
    //        </div>
    //     </div>
    //   },
    //   {
    //     title: 'محل دریافت و تحویل',
    //     content: 'Last-content',
    //   },
    // ];

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
                <Input style={{ textAlign: "right" }} />
              </Form.Item>
              <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    کشور مبدا *
                  </Divider>
                  <Tooltip title="جایی که مسافر کالا را دریافت می ‌کند.">
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
                  </Tooltip>
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
                    کشور مقصد *
                  </Divider>
                  <Tooltip title="جایی که مسافر کالا را تحویل می‌دهد.">
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
                  </Tooltip>
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
                    ابعاد بسته *
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
                      {" "}
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
                    وزن بسته (کیلوگرم) *
                  </Divider>
                  <Form.Item
                    name="weight"
                    style={{ textAlign: "center" }}
                    rules={[
                      { required: true, message: "وزن بسته را وارد کنید" },
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
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    مبلغ پیشنهادی (تومان) *
                  </Divider>
                  <Tooltip title="مبلغی که به مسافر به عنوان پاداش داده می‌شود">
                    <Form.Item
                      name="suggested_price"
                      style={{ textAlign: "center" }}
                      rules={[
                        {
                          required: true,
                          message: "مبلغ پیشنهادی خود را وارد کنید",
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
                  </Tooltip>
                </Col>
              </Row>
              <Form.Item name="buy" style={{ textAlign: "center" }}>
                <Checkbox onChange={this.handleChange.bind()}>
                  بسته باید توسط مسافر خریداری شود
                </Checkbox>
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
                <Tooltip title="هر مشخصاتی که بتواند در پیدا کردن کالای مورد نظر شمابرای مسافر مفید باشد">
                  <Form.Item name="buy_link">
                    <Input />
                  </Form.Item>
                </Tooltip>
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
              <Divider plain orientation="center">
                {" "}
                توضیحات تکمیلی
              </Divider>
              <Form.Item name="description">
                <TextArea style={{ textAlign: "right" }} />
              </Form.Item>
              <Divider plain orientation="center">
                {" "}
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
                  با <a>قوانین و مقررات </a>بیلیگ پست موافقم *
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


{/* <div style={{padding:"50px"}}>
   
        <Steps current={this.state.current} onChange={this.onChange}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div className="steps-action">
          {this.state.current < steps.length - 1 && (
            <Button style={{ margin: '25px 8px' }} type="primary" onClick={() => this.next()}>
              مرحله بعد
            </Button>
          )}
          {this.state.current === steps.length - 1 && (
            <Button style={{ margin: '25px 8px' }} type="primary" onClick={() => message.success('Processing complete!')}>
              ثبت
            </Button>
          )}
          {this.state.current > 0 && (
            <Button style={{ margin: '25px 8px' }} onClick={() => this.prev()}>
              مرحله قبل
            </Button>
          )}
        </div>
      </div>  */}

      </div>
    );
  }
}

export default PackForm;
