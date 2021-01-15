import React from "react";
import Axios from "axios";
import {
  Row,
  Col,
  Form,
  Divider,
  Select,
  Button,
  Input,
  ConfigProvider,
  notification,
} from "antd";
import {
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { config } from "../../Constant";

var url = config.url.API_URL;
const Option = { Select };

class EditProfileForm extends React.Component {
  state = {
    countries: [],
    cities: [],
    city_dis: true,
    loading: false,
    mainloading: false
  };

  componentDidMount() {
    Axios.get(`${url}api/v1/account/countries/`)
      .then((res) => {
        this.setState({
          countries: res.data,
        });
      })
      .catch((err) => console.log(err));

    Axios.get(`${url}api/v1/account/cities/`)
      .then((res) => {
        this.setState({
          cities: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  get_city = (e) => {
    Axios.get(`${url}api/v1/account/cities/${e}`).then((res) => {
      this.setState({
        cities: res.data,
        city_dis: false,
      });
    });
  };

  handleFormSubmit = (values) => {
    const token = localStorage.getItem("token");
    this.setState({mainloading:true})
    Axios.post(
      `${url}api/v1/account/users/update/`,
      {
        country: values.living_country
        ? values.living_country
        : (this.props.data.country ? this.props.data.country.id : this.props.data.country),
        city: values.living_city ? values.living_city : (this.props.data.city ? this.props.data.city.id : this.props.data.city),
        name: values.name ? values.name : this.props.data.name,
        email: values.email ? values.email : this.props.data.email,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then((res) => {
        setTimeout(()=>{
          notification["success"]({
            message: "با موفقیت به روزرسانی شد",
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
            },
            duration: 3,
          });
          this.setState({mainloading:false})
          this.props.update();
        },1000)
      })
      .catch((error) => console.error(error));
  };

  render() {
    return (
      <div>
        <ConfigProvider direction="rtl">
          <Form
            size="middle"
            onFinish={(values) => this.handleFormSubmit(values)}
          >
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                <Divider plain orientation="center">
                  <MailOutlined
                    style={{
                      fontSize: "30px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                  ایمیل
                </Divider>
                <Form.Item name="email">
                  <Input
                    defaultValue={this.props.data && this.props.data.email}
                    type="email"
                    style={{ borderRadius: "8px", direction: "ltr" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                <Divider plain orientation="center">
                  <UserOutlined
                    style={{
                      fontSize: "30px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                  نام
                </Divider>
                <Form.Item name="name"
                rules={[
                  {
                    pattern:'^([a-zA-Zئؤإأآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی ])+$',
                    message:"نام باید صرفا از حروف تشکیل شده باشد"
                  }
                ]}
                >
                  <Input
                    defaultValue={this.props.data && this.props.data.name}
                    style={{ borderRadius: "8px", direction: "rtl" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider plain orientation="center">
              محل اقامت
            </Divider>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={11} xxl={11}>
                <label>کشور</label>
                <Form.Item
                  name="living_country"
                  style={{ display: "flex", justifyContent: "right" }}
                >
                  <Select
                    dropdownStyle={{ fontFamily: "VazirD" }}
                    defaultValue={
                      this.props.data.country
                        ? this.props.data.country.name
                        : ""
                    }
                    onChange={this.get_city.bind()}
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
              <Col xs={0} sm={0} md={0} lg={2} xl={2} xxl={2}></Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={11} xxl={11}>
                <label>شهر</label>
                <Form.Item name="living_city">
                  <Select
                    disabled={this.state.city_dis}
                    dropdownStyle={{ fontFamily: "VazirD" }}
                    defaultValue={
                      this.props.data.city ? this.props.data.city.name : ""
                    }
                  >
                    {this.state.cities.map((e, key) => {
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
            <br />
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Form.Item style={{ textAlign: "center" }}>
                  <Button
                    loading={this.state.mainloading}
                    style={{ borderRadius: "8px" }}
                    type="primary"
                    htmlType="submit"
                  >
                    ویرایش
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </ConfigProvider>
      </div>
    );
  }
}

export default EditProfileForm;
