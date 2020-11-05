import React, { Component } from "react";
import { Form, Col, Button, Row, Divider, Select, Input, Checkbox } from "antd";
import Axios from "axios";
import { config } from "../../Constant";

var url = config.url.API_URL;
const { Option } = Select;

class PacketForEdit extends Component {
  state = {
    countries: [],
    cities_origin: [],
    cities_destination: [],
    city_origin_dis: true,
    city_destination_dis: true,
    pic_id: [],
    buy: false,
  };

  PacketCategory = [
    { value: "0", label: "مدارک و مستندات" },
    { value: "1", label: "کتاب و مجله" },
    { value: "2", label: "لوازم الکترونیکی" },
    { value: "3", label: "کفش و پوشاک" },
    { value: "4", label: "لوازم آرایشی و بهداشتی" },
    { value: "5", label: "سایر موارد" },
  ];

  Dimension = [
    { value: "0", label: "خیلی کوچک" },
    { value: "1", label: "کوچک" },
    { value: "2", label: "متوسط" },
    { value: "3", label: "بزرگ" },
    { value: "4", label: "خیلی بزرگ" },
  ];

  search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i].value;
      }
    }
  }

  get_city_destination = (e) => {
    console.log("country", e);
    Axios.get(`${url}api/v1/account/cities/${e}`).then((res) => {
      this.setState({
        cities_destination: res.data,
        city_destination_dis: false,
      });
    });
  };

  handleChange = () => {
    this.setState({ buy: true });
  };

  handleChangevalue = (event) => {
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: target.value });
    console.log(this.state.title);
  };

  get_city_origin = (e) => {
    console.log("country", e);
    Axios.get(`${url}api/v1/account/cities/${e}`).then((res) => {
      this.setState({
        cities_origin: res.data,
        city_origin_dis: false,
      });
      console.log(res.data);
    });
  };

  handleFormSubmit = (values) => {
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
      : this.search(this.props.data.category, this.PacketCategory);
    const weight = values.weight ? values.weight : this.props.data.weight;
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
    const status = this.props.data.status;
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
        description: description,
        buy: buy,
        status: status,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then((res) => {
        if (res.status == 200) {
          this.props.cancle();
          this.props.updatelist();
        }
      })
      .catch((error) => console.error(error));
  };

  componentDidMount = () => {
    Axios.get(`${url}api/v1/account/countries/`).then((res) => {
      this.setState({
        countries: res.data,
      });
      console.log(res.data);
    });
  };

  render() {
    return (
      <div style={{fontFamily:"VazirD"}}>
        <Row>
          <Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={6}></Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
            <Form
              onFinish={(values) => this.handleFormSubmit(values)}
              id="edit"
            >
              <Divider plain orientation="center">
                عنوان آگهی
              </Divider>
              <Form.Item name="title" style={{ textAlign: "right" }}>
                <Input
                  defaultValue={this.props.data.title}
                  onChange={this.handleChangevalue}
                  style={{ textAlign: "right" }}
                />
              </Form.Item>
              <Row>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    کشور مبدا
                  </Divider>
                  <Form.Item
                    name="origin_country"
                    style={{ textAlign: "right" }}
                  >
                    <Select
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
                    شهر مبدا
                  </Divider>
                  <Form.Item name="origin_city" style={{ textAlign: "right" }}>
                    <Select
                      disabled={this.state.city_origin_dis}
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
                    کشور مقصد
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
                    شهر مقصد
                  </Divider>
                  <Form.Item
                    name="destination_city"
                    style={{ textAlign: "right" }}
                  >
                    <Select
                      disabled={this.state.city_destination_dis}
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
                    ابعاد بسته
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
                    نوع بسته
                  </Divider>
                  <Form.Item name="category" style={{ textAlign: "right" }}>
                    <Select
                      defaultValue={this.props.data.category}
                      options={this.PacketCategory}
                      dropdownStyle={{ fontFamily: "VazirD" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    مبلغ پیشنهادی
                  </Divider>
                  <Form.Item
                    name="suggested_price"
                    style={{ textAlign: "right" }}
                  >
                    <Input
                      defaultValue={this.props.data.suggested_price}
                      style={{ textAlign: "right" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Divider plain orientation="center">
                    وزن بسته
                  </Divider>
                  <Form.Item name="weight" style={{ textAlign: "right" }}>
                    <Input
                      defaultValue={this.props.data.weight}
                      style={{ textAlign: "right" }}
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="buy" style={{ textAlign: "center" }}>
                <Checkbox
                  checked={this.props.data.buy}
                  onChange={this.handleChange.bind()}
                >
                  بسته می‌تواند توسط مسافر خریداری شود
                </Checkbox>
                <br />
              </Form.Item>
              <Divider plain orientation="center">
                {" "}
                توضیحات تکمیلی
              </Divider>
              <Form.Item name="description">
                <textarea
                  defaultValue={this.props.data.description}
                  style={{ textAlign: "right", padding: "10px" }}
                  rows="4"
                />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  style={{ borderRadius: "8px" }}
                  type="primary"
                  htmlType="submit"
                >
                  ویرایش آگهی
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={6}></Col>
        </Row>
      </div>
    );
  }
}

export default PacketForEdit;
