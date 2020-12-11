import React from "react";
import { Layout, Menu, Row, Col, Divider, Badge } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import {
  ContainerOutlined,
  CommentOutlined,
  DollarCircleOutlined,
  ShoppingOutlined,
  HeartOutlined,
  AimOutlined,
  VerticalLeftOutlined,
} from "@ant-design/icons";
import HeaderSection_Profile from "../containers/HeaderSection_Profile";
import { Breakpoint } from "react-socks";

const menu_style = { color: "black" };
const icon_style = { marginLeft: "10px" };

const { Header, Sider, Content } = Layout;

class ProfileLayout extends React.Component {
  state = {
    total: 0,
  }



  exit = () => {
    this.props.logout();
    this.setState({
      toDashboard: true,
    });
  };

  totalnum = (v) => {
    this.setState({
      total: v.total
    })
  }

  render() {
    return (
      <div style={{ fontFamily: "VazirD", overflow: "hidden"}}>
        <Breakpoint medium up>
          <Layout style={{ backgroundColor: "white", height: "auto" }}>
            <Header style={{ backgroundColor: "white", padding: "0", height: "auto" }}>
              <HeaderSection_Profile {...this.props} total={this.totalnum}
                />
            </Header>
            <Divider/>
            <Layout>
              <Content
                style={{ backgroundColor: "white", textAlign: "center"}}
              >
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
                    <div>
                      {this.props.children}
                    </div>
                  </Col>
                </Row>
              </Content>
              <Sider
                width={220}
                style={{
                  overflowY:"hidden",
                  backgroundColor: "white",
                  position: "unset",
                }}
              >
                <Menu
                  mode="inline"
                  theme="light"
                  style={{
                    textAlign: "right",
                    backgroundColor: "white",
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
                  <Menu.Item key="4" >
                    <Link to="/profile/inbox">
                      <p style={menu_style}>
                        <Badge count={this.state.total} offset={[-110,0]}>
                        صندوق پیام
                        <CommentOutlined style={icon_style} />
                        </Badge>
                      </p>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Link to="/profile/payment">
                      <p style={menu_style}>
                        پرداخت‌ها
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
                  <Menu.Item key="9" onClick={this.exit}>
                    <Link to="/">
                      {" "}
                      <p style={menu_style}>
                        خروج
                        <VerticalLeftOutlined style={icon_style} />
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
              <HeaderSection_Profile {...this.props} total={this.totalnum} />
            </Header>
            <Divider style={{ opacity: "0" }} />
            <Content style={{ backgroundColor: "white", textAlign: "center" }}>
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Col span={22}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(ProfileLayout));
