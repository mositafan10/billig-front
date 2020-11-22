import React from "react";
import { Layout, Menu, Row, Col, Button, Divider, Badge } from "antd";
import {
  ContainerOutlined,
  CommentOutlined,
  DollarCircleOutlined,
  ShoppingOutlined,
  HeartOutlined,
  AimOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import HeaderSection from "../containers/HeaderSection";
import { Breakpoint } from "react-socks";
const menu_style = { color: "black" };
const icon_style = { marginLeft: "10px" };

const { Header, Sider, Content } = Layout;

class ProfileLayout extends React.Component {
  render() {
    return (
      <div style={{ fontFamily: "VazirD", overflow: "hidden" }}>
        <Breakpoint medium up>
          <Layout style={{ backgroundColor: "aliceblue", height:"auto" }}>
            <Header
              style={{ backgroundColor: "white", padding: "0", height: "auto" }}
            >
              <HeaderSection {...this.props} />
            </Header>
            <Divider style={{ opacity: "0", backgroundColor: "white" }} />
            <Layout>
              <Content
                style={{ backgroundColor: "white", textAlign: "center"}}
              >
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
                    <div className="site-layout-content">
                      {this.props.children}
                    </div>
                  </Col>
                </Row>
              </Content>
              <Sider
                width={250}
                style={{
                  height:"100vh",
                  backgroundColor: "aliceblue",
                  position: "unset",
                  borderRadius: "20px",
                }}
              >
                  <Menu
                    mode="inline"
                    theme="light"
                    style={{
                      textAlign: "right",
                      backgroundColor: "aliceblue",
                      color: "white",
                    }}
                  >
                    <Menu.Item key="1">
                      <Link to="/profile/mypacket">
                        <p style={menu_style}>
                          آگهی‌های من
                          <ShoppingOutlined style={icon_style} />
                        </p>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Link to="/profile/mytravel">
                        
                        <p style={menu_style}>
                          سفرهای من
                          <AimOutlined style={icon_style} />
                        </p>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <Link to="/profile/inbox">
                        <p style={menu_style}>
                          صندوق پیام
                          <CommentOutlined style={icon_style} />
                        </p>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <Link to="/profile/payment">
                        <p style={menu_style}>
                          پرداخت
                          <DollarCircleOutlined style={icon_style} />
                        </p>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                      <Link to="/profile/bookmark">
                        <p style={menu_style}>
                          آگهی‌های نشان شده <HeartOutlined style={icon_style} />
                        </p>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                      <Link to="/profile/comments">
                        <p style={menu_style}>
                          نظرات
                          <CommentOutlined style={icon_style} />
                        </p>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                      <Link to="/profile/">
                        <p style={menu_style}>
                          اطلاعات کاربری
                          <ContainerOutlined style={icon_style} />
                        </p>
                      </Link>
                    </Menu.Item>
                  </Menu>
              </Sider>
            </Layout>
          </Layout>
        </Breakpoint>
        <Breakpoint small down>
          <Layout style={{ backgroundColor: "white" }}>
            <Header
              style={{ backgroundColor: "white", padding: "0", height: "auto" }}
            >
              <HeaderSection {...this.props} />
            </Header>
            <Divider style={{ opacity: "0" }} />
            <Content style={{ backgroundColor: "white", textAlign: "center" }}>
              <Row style={{display:"flex", justifyContent:"center"}}>
                <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
                  <div className="site-layout-content">
                    {this.props.children}
                  </div>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Breakpoint>
      </div>
    );
  }
}

export default ProfileLayout;
