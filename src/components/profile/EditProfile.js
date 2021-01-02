import React from "react";
import {
  Row,
  Col,
  Button,
  Divider,
  Card,
  Modal,
  Rate,
  Space,
  Form,
  Select,
  Input,
  notification,
  Popconfirm,
} from "antd";
import {
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import UploadProfilePicture from "../utils/UploadProfilePicture";
import EditProfileForm from "./EditProfileForm";
import Axios from "axios";
import { config } from "../../Constant";
import ChangePassword from "./ChangePassword";
import BankAccountList from './BankAccountList';

var url = config.url.API_URL;
const Option = { Select };
const style_left = {
  display: "flex",
  justifyContent: "flex-end",
  fontSize: "16px",
};
const style_right = {
  display: "flex",
  justifyContent: "right",
  fontSize: "16px",
};

class EditProfile extends React.Component {
  state = {
    user_profile: {},
    visible: false,
    modalvisible: false,
    social: [],
    passmodal: false,
    socialmodal: false,
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
          this.setState({ loading: false });
        }, 2000);
        this.componentDidMount();
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

  componentDidMount() {
    window.scroll(0, 0);
    const userID = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/account/users/profile/pr/${userID}`, {
      headers: { Authorization: `Token ${token}` },
    }).then((res) => {
      this.setState({
        user_profile: res.data,
      });
    });
    Axios.get(`${url}api/v1/account/socials/${userID}`).then((res) => {
      this.setState({
        social: res.data,
      });
    });
  }

  setIcon = (type, address, slug) => {
    switch (type) {
      case "Linkdin":
        return (
          <div>
            <a
              style={{ color: "black" }}
              rel="noopener noreferrer"
              target="_blank"
              href={`https://www.linkedin.com/in/${address}`}
            >
              <LinkedinOutlined style={{ fontSize: "35px" }} />
            </a>
            <p>
              <Popconfirm
                overlayStyle={{ fontFamily: "VazirD" }}
                title="آیا از حذف اکانت مطمئن هستید ؟"
                onConfirm={this.deletesocial.bind(this, slug)}
                onCancel={this.cancel}
                okText="بله"
                cancelText="خیر"
              >
                <Button style={{ color: "red", border: "hidden" }}>_</Button>
              </Popconfirm>
            </p>
          </div>
        );
      case "Twitter":
        return (
          <div>
            <a
              style={{ color: "black" }}
              rel="noopener noreferrer"
              target="_blank"
              href={`https://twitter.com/${address}`}
            >
              <TwitterOutlined style={{ fontSize: "35px" }} />
            </a>
            <p>
              <Popconfirm
                overlayStyle={{ fontFamily: "VazirD" }}
                title="آیا از حذف اکانت مطمئن هستید ؟"
                onConfirm={this.deletesocial.bind(this, slug)}
                onCancel={this.cancel}
                okText="بله"
                cancelText="خیر"
              >
                <Button style={{ color: "red", border: "hidden" }}>_</Button>
              </Popconfirm>
            </p>
          </div>
        );
      case "Facebook":
        return (
          <div>
            <a
              style={{ color: "black" }}
              rel="noopener noreferrer"
              target="_blank"
              href={`https://facebook.com/${address}`}
            >
              <FacebookOutlined style={{ fontSize: "35px" }} />
            </a>
            <p>
              <Popconfirm
                overlayStyle={{ fontFamily: "VazirD" }}
                title="آیا از حذف اکانت مطمئن هستید ؟"
                onConfirm={this.deletesocial.bind(this, slug)}
                onCancel={this.cancel}
                okText="بله"
                cancelText="خیر"
              >
                <Button style={{ color: "red", border: "hidden" }}>_</Button>
              </Popconfirm>
            </p>
          </div>
        );
      case "Instagram":
        return (
          <div>
            <a
              style={{ color: "black" }}
              rel="noopener noreferrer"
              target="_blank"
              href={`https://instagram.com/${address}`}
            >
              <InstagramOutlined style={{ fontSize: "35px" }} />
            </a>
            <p>
              <Popconfirm
                overlayStyle={{ fontFamily: "VazirD" }}
                title="آیا از حذف اکانت مطمئن هستید ؟"
                onConfirm={this.deletesocial.bind(this, slug)}
                onCancel={this.cancel}
                okText="بله"
                cancelText="خیر"
              >
                <Button style={{ color: "red", border: "hidden" }}>_</Button>
              </Popconfirm>
            </p>
          </div>
        );
      default:
        break;
    }
  };

  deletesocial = (id) => {
    const token = localStorage.getItem("token");
    Axios.delete(`${url}api/v1/account/social/${id}`, {
      headers: { Authorization: `Token ${token}` },
    }).then((res) => {
      this.componentDidMount();
    });
  };

  handleCancel = (e) => {
    this.setState({
      modalvisible: false,
      visible: false,
    });
  };

  showedit = () => {
    this.setState({ modalvisible: true });
  };

  callbackFunction = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <div>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <Row>
              <Col xs={24} sm={24} md={24} lg={12} xl={24} xxl={24}>
                <UploadProfilePicture
                  update={this.callbackFunction}
                  data={this.state.user_profile.picture}
                />
              </Col>
            </Row>
            <br />
            <Card
              style={{ borderRadius: "20px" }}
              title={
                <div>
                  {this.state.user_profile.name}
                  <br />
                  <Rate
                    allowHalf
                    value={this.state.user_profile.score}
                    disabled={true}
                  />
                </div>
              }
            >
              <div>
                <Row style={style_right}>
                  <Col
                    style={style_right}
                    xs={14}
                    sm={14}
                    md={14}
                    lg={14}
                    xl={14}
                  >
                    <h4>شماره موبایل</h4>
                  </Col>
                  <Col
                    style={style_left}
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    {this.state.user_profile.phone_number}
                  </Col>
                </Row>
              </div>
              {this.state.user_profile.email && (
                <div>
                  <Row style={style_right}>
                    <Col
                      style={style_right}
                      xs={14}
                      sm={14}
                      md={14}
                      lg={14}
                      xl={14}
                    >
                      <h4>ایمیل</h4>
                    </Col>
                    <Col
                      style={style_left}
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      xl={10}
                    >
                      {this.state.user_profile.email}
                    </Col>
                  </Row>
                </div>
              )}
              {this.state.user_profile.country && (
                <div>
                  <Row style={style_right}>
                    <Col
                      style={style_right}
                      xs={14}
                      sm={14}
                      md={14}
                      lg={14}
                      xl={14}
                    >
                      <h4>کشور</h4>
                    </Col>
                    <Col
                      style={style_left}
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      xl={10}
                    >
                      {this.state.user_profile.country &&
                        this.state.user_profile.country.name}
                    </Col>
                  </Row>
                </div>
              )}
              {this.state.user_profile.city && (
                <div>
                  <Row style={style_right}>
                    <Col
                      style={style_right}
                      xs={14}
                      sm={14}
                      md={14}
                      lg={14}
                      xl={14}
                    >
                      <h4>شهر</h4>
                    </Col>
                    <Col
                      style={style_left}
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      xl={10}
                    >
                      {this.state.user_profile.city &&
                        this.state.user_profile.city.name}
                    </Col>
                  </Row>
                </div>
              )}
            </Card>
            <br />
            <Button
              onClick={this.showedit}
              style={{ fontSize: "14px", borderRadius: "10px" }}
            >
              ویرایش پروفایل
            </Button>
            <br />
            <br />
            <Card title="شبکه‌های اجتماعی" style={{ borderRadius: "20px" }}>
              <p style={{ textAlign: "center" }}>
                شبکه‌های اجتماعی جهت شناخت بیشتر کاربران هنگام بازدید آنها از
                صفحه پروفایل شما نمایش داده می‌شوند
              </p>
              <Row style={{ display: "flex", justifyContent: "center" }}>
                {this.state.social.length != 4 && (
                  <Button
                    style={{ marginLeft: "10px", borderColor:"black" }}
                    size="large"
                    shape="circle"
                    onClick={this.showsocail}
                  >
                    +
                  </Button>
                )}
                <Space>
                  {this.state.social[0] &&
                    this.setIcon(
                      this.state.social[0].account_type,
                      this.state.social[0].address,
                      this.state.social[0].slug
                    )}
                  {this.state.social[1] &&
                    this.setIcon(
                      this.state.social[1].account_type,
                      this.state.social[1].address,
                      this.state.social[1].slug
                    )}
                  {this.state.social[2] &&
                    this.setIcon(
                      this.state.social[2].account_type,
                      this.state.social[2].address,
                      this.state.social[2].slug
                    )}
                  {this.state.social[3] &&
                    this.setIcon(
                      this.state.social[3].account_type,
                      this.state.social[3].address,
                      this.state.social[3].slug
                    )}
                </Space>
              </Row>
              <br />
              {this.state.social.length != 0 && (
                <p style={{ textAlign: "center" }}>
                  برای حذف اکانت روی علامت منفی  کنید
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
                    help={
                      <p style={{ direction: "ltr" }}>
                        وارد کنید @example به شکل
                      </p>
                    }
                    rules={[
                      {
                        required: true,
                        message: "آدرس اکانت را وارد کنید",
                      },
                    ]}
                  >
                    <Input prefix="@" style={{ direction: "ltr" }} />
                  </Form.Item>
                </Form>
              </Modal>
            </Card>
            <Modal
              onCancel={this.handleCancel}
              cancelText="بازگشت"
              okButtonProps={{ hidden: true }}
              visible={this.state.modalvisible}
              style={{ fontFamily: "VazirD" }}
            >
              <EditProfileForm
                data={this.state.user_profile}
                update={this.callbackFunction}
              />
            </Modal>
          </Col>
        </Row>
          <br/>
            <ChangePassword />
        <Divider />
        <BankAccountList />
      </div>
    );
  }
}

export default EditProfile;
