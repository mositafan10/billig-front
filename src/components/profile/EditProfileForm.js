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
  Modal,
  notification,
  Space,
  Popconfirm,
} from "antd";
import {
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  FacebookOutlined,
  MailOutlined,
  PlusOutlined,
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
    socialmodal: false,
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

  deletesocial = (id) => {
    const token = localStorage.getItem("token");
    Axios.delete(`${url}api/v1/account/social/${id}`, {
      headers: { Authorization: `Token ${token}` },
    }).then((res) => {
      this.props.update();
    });
  };

  setIcon = (type, id) => {
    switch (type) {
      case "Linkdin":
        return (
          <Popconfirm
            overlayStyle={{ fontFamily: "VazirD" }}
            title="آیا از حذف اکانت مطمئن هستید ؟"
            onConfirm={this.deletesocial.bind(this, id)}
            onCancel={this.cancel}
            okText="بله"
            cancelText="خیر"
          >
            <Button style={{ border: "hidden" }}>
              <LinkedinOutlined style={{ fontSize: "35px" }} />
            </Button>
          </Popconfirm>
        );
      case "Twitter":
        return (
          <Popconfirm
            overlayStyle={{ fontFamily: "VazirD" }}
            title="آیا از حذف اکانت مطمئن هستید ؟"
            onConfirm={this.deletesocial.bind(this, id)}
            onCancel={this.cancel}
            okText="بله"
            cancelText="خیر"
          >
            <Button style={{ border: "hidden" }}>
              <TwitterOutlined style={{ fontSize: "35px" }} />
            </Button>
          </Popconfirm>
        );
      case "Facebook":
        return (
          <Popconfirm
            overlayStyle={{ fontFamily: "VazirD" }}
            title="آیا از حذف اکانت مطمئن هستید ؟"
            onConfirm={this.deletesocial.bind(this, id)}
            onCancel={this.cancel}
            okText="بله"
            cancelText="خیر"
          >
            <Button style={{ border: "hidden" }}>
              <FacebookOutlined style={{ fontSize: "35px" }} />
            </Button>
          </Popconfirm>
        );
      case "Instagram":
        return (
          <Popconfirm
            overlayStyle={{ fontFamily: "VazirD" }}
            title="آیا از حذف اکانت مطمئن هستید ؟"
            onConfirm={this.deletesocial.bind(this, id)}
            onCancel={this.cancel}
            okText="بله"
            cancelText="خیر"
          >
            <Button style={{ border: "hidden" }}>
              <InstagramOutlined style={{ fontSize: "35px" }} />
            </Button>
          </Popconfirm>
        );
      default:
        break;
    }
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

  cancelsocial = () => {
    this.setState({
      socialmodal: false,
    });
  };

  showsocail = () => {
    this.setState({
      socialmodal: true,
    });
  };

  handleOk = (values) => {
    this.setState({ loading: true });
    const token = localStorage.getItem("token");
    Axios.post(
      `${url}api/v1/account/socials/`,
      {
        account_type: values.type,
        address: values.address,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then((res) => {
        setTimeout(() => {
          notification["success"]({
            message: "اکانت شما با موفقیت ثبت شد",
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
            },
            duration: 3,
          });
        }, 1000);
        setTimeout(() => {
          this.setState({ socialmodal: false, loading: false });
        }, 2000);
        this.props.update();
      })
      .catch((err) => {
        notification["error"]({
          message: err.response.data.detail,
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 3,
        });
        setTimeout(() => {
          this.setState({ socialmodal: false, loading: false });
        }, 2000);
      });
  };

  render() {
    return (
      <div>
        <ConfigProvider direction="rtl">
          <Divider plain orientation="center">
            شبکه‌های اجتماعی
          </Divider>
          <p style={{ textAlign: "center" }}>
            شبکه‌های اجتماعی جهت شناخت بیشتر کاربران هنگام بازدید آنها از صفحه
            پروفایل شما نمایش داده می‌شوند
          </p>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            {this.props.social.length != 4 && (
              <Button
                icon={<PlusOutlined />}
                style={{ border: "hidden" }}
                size="large"
                onClick={this.showsocail}
              ></Button>
            )}
            <Space>
              {this.props.social[0] &&
                this.setIcon(
                  this.props.social[0].account_type,
                  this.props.social[0].slug
                )}
              {this.props.social[1] &&
                this.setIcon(
                  this.props.social[1].account_type,
                  this.props.social[1].slug
                )}
              {this.props.social[2] &&
                this.setIcon(
                  this.props.social[2].account_type,
                  this.props.social[2].slug
                )}
              {this.props.social[3] &&
                this.setIcon(
                  this.props.social[3].account_type,
                  this.props.social[3].slug
                )}
            </Space>
          </Row>
          <br />
          {this.props.social.length != 0 && (
            <p style={{ textAlign: "center" }}>
              برای حذف اکانت روی آن کلیک کنید
            </p>
          )}
          <Modal
            confirmLoading={this.state.loading}
            style={{ fontFamily: "VazirD" }}
            okButtonProps={{
              form: "socail",
              key: "submit",
              htmlType: "submit",
            }}
            title="اضافه کردن اکانت اجتماعی"
            visible={this.state.socialmodal}
            onCancel={this.cancelsocial}
            cancelText="بازگشت"
            okText="ثبت"
          >
            <Form name="socail" onFinish={this.handleOk}>
              <label>نوع اکانت</label>
              <Form.Item
                name="type"
                style={{ textAlign: "right", fontFamily: "VazirD" }}
                rules={[
                  {
                    required: true,
                    message: "نوع اکانت را وارد کنید",
                  },
                ]}
              >
                <Select dropdownStyle={{ fontFamily: "VazirD" }}>
                  <Option value="0">لینکدین</Option>
                  <Option value="1">فیسبوک</Option>
                  <Option value="2">اینستاگرام</Option>
                  <Option value="3">توییتر</Option>
                </Select>
              </Form.Item>
              <label>آدرس اکانت</label>
              <Form.Item
                name="address"
                style={{ textAlign: "right" }}
                rules={[
                  {
                    required: true,
                    message: "آدرس اکانت را وارد کنید",
                  },
                ]}
              >
                <Input
                  placeholder="وارد کنید @example به شکل"
                  style={{ direction: "ltr" }}
                />
              </Form.Item>
            </Form>
          </Modal>
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
                <Form.Item name="name">
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
