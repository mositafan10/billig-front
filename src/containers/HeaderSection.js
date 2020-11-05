import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { Breakpoint } from "react-socks";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import {
  Button,
  Dropdown,
  Menu,
  Row,
  Col,
  Badge,
  Drawer,
  Avatar,
  Divider,
} from "antd";
import { UserOutlined, MenuOutlined, BellOutlined } from "@ant-design/icons";
import logo from "../media/billlig.png";
import {
  ContainerOutlined,
  CommentOutlined,
  DollarCircleOutlined,
  ShoppingOutlined,
  HeartOutlined,
  AimOutlined,
  VerticalLeftOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import { config } from "../Constant";

var url = config.url.API_URL;

class HeaderSection extends Component {
  state = {
    toDashboard: false,
    Drawerprofile: false,
    Drawerpage: false,
    Drawernotification: false,
    userinfo: {},
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
    {
      token != null &&
        Axios.get(`${url}api/v1/account/userinfo/`, {
          headers: { Authorization: `Token ${token}` },
        })
          .then((res) => {
            this.setState({
              userinfo: res.data,
            });
          })
          .catch((error) => console.error(error));
    }
  }

  menu_login = (
    <Menu mode="inline" theme="light" style={{ textAlign: "right" }}>
      <Menu.Item key="1">
        <Link to="/profile/mypacket"> آگهی‌های من <ShoppingOutlined /> </Link> 
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/profile/mytravel"> سفرهای من <AimOutlined /></Link> 
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/profile/myoffer"> پیشنهادهای من <ContainerOutlined /></Link> 
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/profile/inbox"> صندوق پیام <CommentOutlined /></Link> 
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/profile/payment">پرداخت <DollarCircleOutlined /></Link> 
      </Menu.Item>
      <Menu.Item key="6">
        <Link to="/profile/bookmark">آگهی‌های نشان شده <HeartOutlined /></Link> 
      </Menu.Item>
      <Menu.Item key="7">
        <Link to="/profile/editprofile">اطلاعات کاربری <ContainerOutlined /></Link>
      </Menu.Item>
      <Menu.Item key="8" onClick={this.exit}>
      <Link to="/"> خروج <VerticalLeftOutlined /></Link>
      </Menu.Item>
    </Menu>
  );

  menu_logout = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/login">ورود</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/signup">ثبت نام</Link>
      </Menu.Item>
    </Menu>
  );

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
                    width: "200px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "25px",
                      border: "solid",
                      borderWidth: "1.5px",
                      height: "45px",
                      width: "100px",
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Dropdown
                      overlay={
                        this.props.isAuthenticated
                          ? this.menu_login
                          : this.menu_logout
                      }
                      trigger={["click"]}
                      overlayStyle={{ fontFamily: "VazirD" }}
                    >
                      <div>
                        <Button
                          icon={<MenuOutlined />}
                          style={{
                            border: "hidden",
                            color: "black",
                            borderRadius: "15px",
                          }}
                        ></Button>
                        <Button
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
                            color: "white",
                            borderColor: "white",
                          }}
                        ></Button>
                      </div>
                    </Dropdown>
                  </div>
                  {/* {this.props.isAuthenticated && (
                    <div>
                      <Badge dot={true}>
                        <Button
                          icon={<BellOutlined />}
                          style={{
                            border: "hidden",
                            border: "1px solid",
                            borderRadius: "15px",
                            marginLeft: "10px",
                          }}
                        ></Button>
                      </Badge>
                    </div>
                  )} */}
                </div>
                <Row>
                  <Col xs={24} sm={24} md={20} lg={20} xl={20} xxl={20}>
                    <Menu
                      style={{ borderBottom: "hidden", marginTop: "5px" }}
                      mode="horizontal"
                    >
                      <Menu.Item key="1">
                        <Link to="/create-packet">
                          <b>ثبت رایگان آگهی</b>
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="2">
                        <Link to="/orders">
                          <b>کسب درآمد از سفر</b>
                        </Link>
                      </Menu.Item>
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
              position: "fixed",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: "0 0 5px 1px",
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
                    icon={<MenuOutlined />}
                    style={{
                      color: "black",
                      border: "hidden",
                    }}
                  ></Button>
                  <Drawer
                    title={<p style={{ color: "white" }}>بیلیگ</p>}
                    placement="left"
                    headerStyle={{ backgroundColor: "#46a0ae", color: "white" }}
                    closable={false}
                    onClose={this.onClose}
                    width="50%"
                    visible={this.state.Drawerpage}
                    style={{
                      textAlign: "left",
                      fontFamily: "VazirD",
                      color: "black",
                    }}
                  >
                    <div>
                      <Link
                        style={{ color: "black" }}
                        onClick={this.onClose}
                        to="/create-packet"
                      >
                        <p>ثبت آگهی</p>
                      </Link>
                      <Link
                        style={{ color: "black" }}
                        onClick={this.onClose}
                        to="/orders"
                      >
                        <p>کسب در آمد از سفر</p>
                      </Link>
                      <a
                        style={{ color: "black" }}
                        onClick={this.onClose}
                        href="https://billlig.com/blog"
                      >
                        <p>بلاگ</p>
                      </a>
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
                    style={{ width: "60%", height: "auto" }}
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
                          border: "1px solid",
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
                          <p style={{ color: "white" }}>
                            {" "}
                            {this.state.userinfo.user &&
                              this.state.userinfo.user.name}
                          </p>
                        </Row>
                      </div>
                    ) : (
                      <p style={{ color: "white", marginTop: "10px" }}>حساب کاربری</p>
                    )
                  }
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  width="65%"
                  headerStyle={{ backgroundColor: "#46a0ae" }}
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
                            <Link to="/profile/mypacket"> آگهی‌های من </Link>{" "}
                            <ShoppingOutlined />
                          </Menu.Item>
                          <Menu.Item key="2" onClick={this.onClose}>
                            <Link to="/profile/mytravel"> سفرهای من </Link>{" "}
                            <AimOutlined />
                          </Menu.Item>
                          <Menu.Item key="3" onClick={this.onClose}>
                            <Link to="/profile/myoffer"> پیشنهادهای من </Link>{" "}
                            <ContainerOutlined />
                          </Menu.Item>
                          <Menu.Item key="4" onClick={this.onClose}>
                            <Link to="/profile/inbox"> صندوق پیام </Link>{" "}
                            <CommentOutlined />
                          </Menu.Item>
                          <Menu.Item key="5" onClick={this.onClose}>
                            <Link to="/profile/payment">پرداخت </Link>{" "}
                            <DollarCircleOutlined />
                          </Menu.Item>
                          <Menu.Item key="6" onClick={this.onClose}>
                            <Link to="/profile/bookmark">
                              آگهی‌های نشان شده{" "}
                            </Link>{" "}
                            <HeartOutlined />
                          </Menu.Item>
                          <Menu.Item key="7" onClick={this.onClose}>
                            <Link to="/profile/editprofile">
                              اطلاعات کاربری
                            </Link>{" "}
                            <ContainerOutlined />
                          </Menu.Item>
                          <Menu.Item key="8" onClick={this.exit}>
                            خروج <VerticalLeftOutlined />
                          </Menu.Item>
                        </Menu>
                      </div>
                    ) : (
                      <div>
                        <Link onClick={this.onClose} to="/login">
                          <p>ورود</p>
                        </Link>
                        <Link onClick={this.onClose} to="/signup">
                          <p>ثبت نام</p>
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

export default withRouter(connect(null, mapDispatchToProps)(HeaderSection));
