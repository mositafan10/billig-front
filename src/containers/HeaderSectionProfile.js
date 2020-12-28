import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { Breakpoint } from "react-socks";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import {
  Button,
  Menu,
  Row,
  Col,
  Drawer,
  Avatar,
  Divider,
  Badge,
  Space,
} from "antd";
import logo from "../media/billlig.png";
import {
  ContainerOutlined,
  CommentOutlined,
  DollarCircleOutlined,
  ShoppingOutlined,
  HeartOutlined,
  AimOutlined,
  VerticalLeftOutlined,
  BellOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import { config } from "../Constant";
var url = config.url.API_URL;

class HeaderSectionProfile extends Component {
  state = {
    toDashboard: false,
    Drawerprofile: false,
    Drawerpage: false,
    Drawernotification: false,
    userinfo: {},
    total: 0,
  };

  exit = () => {
    this.props.logout();
    this.setState({
      toDashboard: true,
    });
  };

  showprofilemenu = () => {
    this.setState({
      Drawerprofile: true,
    });
  };

  showpagemenu = () => {
    this.setState({
      Drawerpage: true,
    });
  };

  shownotification = () => {
    this.setState({
      Drawernotification: true,
    });
  };

  onClose = () => {
    this.setState({
      Drawerprofile: false,
      Drawerpage: false,
      Drawernotification: false,
    });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    token != null &&
      token != "notready" &&
      Axios.post(`${url}api/v1/account/tokenValidation/`, {
        token: token,
      }).then((res) => {
        if (res.data.valid) {
          Axios.get(`${url}api/v1/account/userinfo/`, {
            headers: { Authorization: `Token ${token}` },
          }).then((res) => {
            this.setState({
              userinfo: res.data.data,
            });
          });
        } else {
          this.props.logout();
        }
      });
  }

  render() {
    if (this.state.toDashboard) {
      this.setState({
        toDashboard: false,
      });
      return <Redirect to="/login" />;
    }
    return (
      <div style={{ boxShadow: "0 0 5px 1px", zIndex: 1 }}>
        <Breakpoint medium up>
          <div>
            <Row style={{ padding: "0 20px 0 20px" }}>
              <Col xs={24} sm={24} md={20} lg={20} xl={20} xxl={20}>
                <div
                  style={{
                    float: "left",
                    width: "max-content",
                    display: "flex",
                    marginTop: "5px",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "25px",
                      border: "solid",
                      borderWidth: "1.5px",
                      padding: "0 10px 0 20px",
                      height: "45px",
                      width: "max-content",
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      to={this.props.isAuthenticated ? "/profile" : "/login"}
                    >
                      <div>
                        {this.props.isAuthenticated ? (
                          <span
                            style={{
                              color: "black",
                              marginLeft: "10px",
                              marginRight: "10px",
                            }}
                          >
                            {this.state.userinfo.user &&
                              this.state.userinfo.user.name}
                          </span>
                        ) : (
                          <span style={{ marginRight: "10px", color: "black" }}>
                            ورود به حساب کاربری
                          </span>
                        )}
                        <Button
                          icon={
                            <Avatar
                              src={`${url}dstatic/${this.state.userinfo.picture}`}
                            />
                          }
                          style={{
                            borderRadius: "15px",
                            color: "white",
                            borderColor: "white",
                          }}
                        />
                        {this.props.isAuthenticated && (
                          <Badge count={this.state.total} offset={[-20, 5]}>
                            <Link to="/profile/inbox">
                              <Button
                                onClick={this.zerototal}
                                icon={
                                  <Avatar
                                    style={{
                                      backgroundColor: "white",
                                      color: "black",
                                      marginTop: "3px",
                                    }}
                                    icon={<BellOutlined />}
                                  />
                                }
                                style={{
                                  borderRadius: "15px",
                                  alignItems: "center",
                                  color: "white",
                                  borderColor: "white",
                                }}
                              ></Button>
                            </Link>
                          </Badge>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
                <Row>
                  <Col>
                    <Menu
                      style={{ borderBottom: "hidden", marginTop: "5px" }}
                      mode="horizontal"
                    >
                      <Menu.Item key="1">
                        <Link to="/create-packet">
                          <span
                            style={{
                              boxShadow: "0 0 8px 1px",
                              backgroundColor: "#067fc8",
                              color: "white",
                              padding: "10px 15px 10px 15px",
                              borderRadius: "10px",
                            }}
                          >
                            ثبت رایگان آگهی
                          </span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="2">
                        <Link to="/orders">
                          <span
                            style={{
                              boxShadow: "0 0 8px 1px",
                              marginLeft: "-20px",
                              backgroundColor: "#ff9a00",
                              color: "white",
                              padding: "10px 15px 10px 15px",
                              borderRadius: "10px",
                            }}
                          >
                            کسب درآمد از سفر
                          </span>
                        </Link>
                      </Menu.Item>
                      {/* <Menu.Item key="3">
                        <Link to="/billliger">
                          <span
                            style={{
                              backgroundColor: "#FCA468",
                              color: "white",
                              padding: "10px 15px 10px 15px",
                              borderRadius: "10px",
                              marginLeft: "-20px",
                            }}
                          >
                            <b>راهنمای بیلیگر</b>
                          </span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="4">
                        <Link to="/traveler">
                          <span
                            style={{
                              marginLeft: "-20px",
                              backgroundColor: "#46A0AE",
                              color: "white",
                              padding: "10px 15px 10px 15px",
                              borderRadius: "10px",
                            }}
                          >
                            <b>راهنمای مسافر</b>
                          </span>
                        </Link>
                      </Menu.Item> */}
                    </Menu>
                  </Col>
                </Row>
              </Col>
              <Col
                xs={0}
                sm={0}
                md={4}
                lg={4}
                xl={4}
                xxl={4}
                style={{ display: "flex", alignItems: "center" }}
              >
                <a href="/">
                  <img
                    style={{
                      float: "right",
                      margin: "1px 20px 5px",
                      width: "55%",
                      height: "auto",
                    }}
                    alt="billlig"
                    src={logo}
                  />
                </a>
              </Col>
            </Row>
          </div>
        </Breakpoint>
        <Breakpoint small down>
          <div
            style={{
              zIndex: 1,
              backgroundColor: "white",
              boxShadow: "0 0 5px 1px",
              width: "-moz-available",
            }}
          >
            <Row>
              <Col
                xs={8}
                sm={8}
                md={8}
                lg={0}
                xl={0}
                xxl={0}
                style={{ paddingLeft: "10px" }}
              >
                <div>
                  <Button
                    onClick={this.showpagemenu}
                    icon={<PlusOutlined />}
                    style={{
                      color: "black",
                      border: "hidden",
                    }}
                  ></Button>
                  <Drawer
                    title={
                      <span>
                        <b>بیلیگ</b>
                      </span>
                    }
                    placement="left"
                    headerStyle={{ textAlign: "center" }}
                    closable={false}
                    onClose={this.onClose}
                    width="80%"
                    visible={this.state.Drawerpage}
                    style={{
                      textAlign: "left",
                      fontFamily: "VazirD",
                      color: "black",
                    }}
                  >
                    <div>
                      <h3 style={{ textAlign: "center" }}>
                        قصد ارسال یا خرید کالا دارید؟
                      </h3>
                      <hr style={{ color: "#067fc6" }} />
                      <p style={{ textAlign: "right" }}>
                        ابتدا بسته یا کالای مورد نظر خود را در سایت ثبت کنید. پس
                        از تایید، آگهی شما در سایت بیلیگ منتشر خواهد شد
                      </p>
                      <Row
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Space>
                          <Link to="/billliger">
                            <Button
                              onClick={this.onClose}
                              style={{
                                backgroundColor: "white",
                                color: "#067fc6",
                                borderRadius: "10px",
                                borderColor: "#067fc6",
                              }}
                            >
                              راهنمای بیلیگر
                            </Button>
                          </Link>
                          <Link to="/create-packet">
                            <Button
                              onClick={this.onClose}
                              style={{
                                backgroundColor: "#067fc6",
                                color: "white",
                                borderRadius: "10px",
                              }}
                            >
                              ثبت آگهی
                            </Button>
                          </Link>
                        </Space>
                      </Row>
                      <Divider />
                      <h3 style={{ textAlign: "center" }}>قصد سفر دارید؟</h3>
                      <hr style={{ color: "#ff9a00" }} />
                      <p style={{ textAlign: "right" }}>
                        با استفاده از بیلیگ می‌توانید قسمتی از خرج سفر خود را
                        جبران کنید. کافی است سفر خود را ثبت کنید و در لیست
                        آگهی‌های سایت آگهی مورد نظر خود را پیدا کنید
                      </p>

                      <Row
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Space>
                          <Link to="/traveler">
                            <Button
                              onClick={this.onClose}
                              style={{
                                backgroundColor: "white",
                                color: "#ff9a00",
                                borderRadius: "10px",
                                borderColor: "#ff9a00",
                              }}
                            >
                              راهنمای مسافر
                            </Button>
                          </Link>
                          <Link to="/profile/mytravel">
                            <Button
                              onClick={this.onClose}
                              style={{
                                backgroundColor: "#ff9a00",
                                color: "white",
                                borderRadius: "10px",
                              }}
                            >
                              ثبت سفر
                            </Button>
                          </Link>
                        </Space>
                      </Row>
                    </div>
                  </Drawer>
                </div>
              </Col>
              <Col
                xs={8}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                style={{ textAlign: "center" }}
              >
                <a href="/">
                  <img
                    style={{ width: "70%", height: "auto" }}
                    alt="billlig"
                    src={logo}
                  />
                </a>
              </Col>
              <Col
                xs={8}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                style={{ textAlign: "right", paddingRight: "15px" }}
              >
                {this.props.isAuthenticated && (
                  <Badge count={this.state.total} offset={[-20, 5]}>
                    <Link to="/profile/inbox">
                      <Button
                        onClick={this.zerototal}
                        icon={
                          <Avatar
                            style={{
                              backgroundColor: "white",
                              color: "black",
                            }}
                            icon={<BellOutlined />}
                          />
                        }
                        style={{
                          borderRadius: "15px",
                          alignItems: "center",
                          color: "white",
                          borderColor: "white",
                        }}
                      ></Button>
                    </Link>
                  </Badge>
                )}
                <Button
                  onClick={this.showprofilemenu}
                  icon={
                    this.state.userinfo.picture ? (
                      <Avatar
                        src={`${url}dstatic/${this.state.userinfo.picture}`}
                      />
                    ) : (
                      <Avatar
                        style={{
                          backgroundColor: "white",
                          color: "black",
                        }}
                        icon={<UserOutlined />}
                      />
                    )
                  }
                  style={{
                    borderRadius: "15px",
                    border: "1px solid",
                    color: "white",
                  }}
                ></Button>
                <Drawer
                  title={
                    this.props.isAuthenticated ? (
                      <div>
                        <Row
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {this.state.userinfo.picture ? (
                            <Avatar
                              src={`${url}dstatic/${this.state.userinfo.picture}`}
                              size="large"
                            />
                          ) : (
                            <Avatar
                              size="large"
                              style={{
                                backgroundColor: "white",
                                color: "black",
                                border: "1px solid",
                              }}
                              icon={<UserOutlined />}
                            />
                          )}
                          <Divider style={{ margin: "5px", opacity: "0" }} />
                          <span style={{ color: "white" }}>
                            {this.state.userinfo.user &&
                              this.state.userinfo.user.name}
                          </span>
                        </Row>
                      </div>
                    ) : (
                      <p style={{ color: "white", marginTop: "10px" }}>
                        حساب کاربری
                      </p>
                    )
                  }
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  width="65%"
                  headerStyle={{ backgroundColor: "#263238" }}
                  visible={this.state.Drawerprofile}
                  style={{ textAlign: "center", fontFamily: "VazirD" }}
                >
                  <div>
                    {this.props.isAuthenticated ? (
                      <div>
                        <Menu
                          mode="inline"
                          theme="light"
                          style={{ textAlign: "right" }}
                        >
                          <Menu.Item key="1" onClick={this.onClose}>
                            <Link to="/profile/mypacket"> آگهی‌های من </Link>
                            <ShoppingOutlined />
                          </Menu.Item>
                          <Menu.Item key="2" onClick={this.onClose}>
                            <Link to="/profile/mytravel"> سفرهای من </Link>
                            <AimOutlined />
                          </Menu.Item>
                          <Menu.Item key="4" onClick={this.onClose}>
                            <Link to="/profile/inbox"> صندوق پیام </Link>
                            <CommentOutlined />
                          </Menu.Item>
                          <Menu.Item key="5" onClick={this.onClose}>
                            <Link to="/profile/payment"> پرداخت </Link>
                            <DollarCircleOutlined />
                          </Menu.Item>
                          <Menu.Item key="6" onClick={this.onClose}>
                            <Link to="/profile/bookmark">
                              آگهی‌های نشان شده{" "}
                            </Link>
                            <HeartOutlined />
                          </Menu.Item>
                          <Menu.Item key="7" onClick={this.onClose}>
                            <Link to="/profile/comments">نظرات </Link>
                            <CommentOutlined />
                          </Menu.Item>
                          <Menu.Item key="8" onClick={this.onClose}>
                            <Link to="/profile/">اطلاعات کاربری </Link>
                            <ContainerOutlined />
                          </Menu.Item>
                          <Menu.Item key="9" onClick={this.exit}>
                            خروج <VerticalLeftOutlined />
                          </Menu.Item>
                        </Menu>
                      </div>
                    ) : (
                      <div>
                        <Link onClick={this.onClose} to="/login">
                          <p style={{ color: "black" }}>ورود</p>
                        </Link>
                        <Link onClick={this.onClose} to="/signup">
                          <p style={{ color: "black" }}>ثبت نام</p>
                        </Link>
                      </div>
                    )}
                  </div>
                </Drawer>
                <Drawer
                  title="اعلانات"
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  width="50%"
                  visible={this.state.Drawernotification}
                  style={{ textAlign: "right", fontFamily: "VazirD" }}
                >
                  <div></div>
                </Drawer>
              </Col>
            </Row>
          </div>
        </Breakpoint>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(
  connect(null, mapDispatchToProps)(HeaderSectionProfile)
);
