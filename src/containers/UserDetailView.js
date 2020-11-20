import React from "react";
import Axios from "axios";
import { Card, Tabs, Rate, Space, Row, Col } from "antd";
import { config } from "../Constant";
import CommentUser from "../components/comment/CommentUser";
import { Breakpoint } from "react-socks";
import TimeDiff from "../components/utils/TimeDiff";
import {
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

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

var url = config.url.API_URL;
const { TabPane } = Tabs;

class UserProfile extends React.Component {
  state = {
    user_profile: [],
    social: [],
  };

  componentDidMount() {
    window.scroll(0,0)
    const userID = this.props.match.params.userID;
    Axios.get(`${url}api/v1/account/users/profile/${userID}`).then((res) => {
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

  setIcon = (type, address) => {
    switch (type) {
      case "Linkdin":
        return (
          <a style={{ color: "black" }} href={`https://linkdin.com/${address}`}>
            <LinkedinOutlined style={{ fontSize: "35px" }} />
          </a>
        );
      case "Twitter":
        return (
          <a style={{ color: "black" }} href={`https://twitter.com/${address}`}>
            <TwitterOutlined style={{ fontSize: "35px" }} />
          </a>
        );
      case "Facebook":
        return (
          <a
            style={{ color: "black" }}
            href={`https://facebook.com/${address}`}
          >
            <FacebookOutlined style={{ fontSize: "35px" }} />
          </a>
        );
      case "Instagram":
        return (
          <a
            style={{ color: "black" }}
            href={`https://instagram.com/${address}`}
          >
            <InstagramOutlined style={{ fontSize: "35px" }} />
          </a>
        );
      default:
        break;
    }
  };

  render() {
    const userID = this.props.match.params.userID;
    return (
      <div>
        <Breakpoint medium up>
          <div style={{ textAlign: "center" }}>
            <img
              width={300}
              style={{ borderRadius: "10px" }}
              src={`${url}dstatic/${this.state.user_profile.picture}`}
            />
            <Card bordered={false}>
              <h3>{this.state.user_profile.name}</h3>
              <Rate
                allowHalf
                value={this.state.user_profile.score}
                disabled={true}
              />
              <br />
              <br />
              <Space>
                {this.state.social[0] &&
                  this.setIcon(
                    this.state.social[0].account_type,
                    this.state.social[0].address
                  )}
                {this.state.social[1] &&
                  this.setIcon(
                    this.state.social[1].account_type,
                    this.state.social[0].address
                  )}
                {this.state.social[2] &&
                  this.setIcon(
                    this.state.social[2].account_type,
                    this.state.social[0].address
                  )}
                {this.state.social[3] &&
                  this.setIcon(
                    this.state.social[3].account_type,
                    this.state.social[0].address
                  )}
              </Space>
            </Card>
            <br />
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
                <Card style={{ borderRadius: "20px" }}>
                  <Row style={style_right}>
                    <Col
                      style={style_right}
                      xs={14}
                      sm={14}
                      md={14}
                      lg={14}
                      xl={14}
                    >
                      <h4>سابقه کاربر</h4>
                    </Col>
                    <Col
                      style={style_left}
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      xl={10}
                    >
                      <TimeDiff data={this.state.user_profile.joined_at} />
                    </Col>
                  </Row>
                  <Row style={style_right}>
                    <Col
                      style={style_right}
                      xs={14}
                      sm={14}
                      md={14}
                      lg={14}
                      xl={14}
                    >
                      <h4>تعداد سفرهای انجام شده</h4>
                    </Col>
                    <Col
                      style={style_left}
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      xl={10}
                    >
                      {this.state.user_profile.travel_done}
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Tabs tabPosition="top" style={{ textAlign: "center" }}>
              <TabPane tab="نظرات دیگران " key="1">
                <CommentUser userID={userID} />
              </TabPane>
            </Tabs>
          </div>
        </Breakpoint>
        <Breakpoint small down>
          <div style={{ textAlign: "center" }}>
            <img
              width={300}
              style={{ borderRadius: "10px" }}
              src={`${url}dstatic/${this.state.user_profile.picture}`}
            />
            <br />
            <Card bordered={false}>
              <h3>{this.state.user_profile.name}</h3>
              <Rate
                allowHalf
                value={this.state.user_profile.score}
                disabled={true}
              />
              <br />
              <br />
              <Space>
                {this.state.social[0] &&
                  this.setIcon(
                    this.state.social[0].account_type,
                    this.state.social[0].address
                  )}
                {this.state.social[1] &&
                  this.setIcon(
                    this.state.social[1].account_type,
                    this.state.social[0].address
                  )}
                {this.state.social[2] &&
                  this.setIcon(
                    this.state.social[2].account_type,
                    this.state.social[0].address
                  )}
                {this.state.social[3] &&
                  this.setIcon(
                    this.state.social[3].account_type,
                    this.state.social[0].address
                  )}
              </Space>
            </Card>
            <br />
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
                <Card style={{ borderRadius: "20px" }}>
                  <Row style={style_right}>
                    <Col
                      style={style_right}
                      xs={14}
                      sm={14}
                      md={14}
                      lg={14}
                      xl={14}
                    >
                      <h4>سابقه کاربر</h4>
                    </Col>
                    <Col
                      style={style_left}
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      xl={10}
                    >
                      <TimeDiff data={this.state.user_profile.joined_at} />
                    </Col>
                  </Row>
                  <Row style={style_right}>
                    <Col
                      style={style_right}
                      xs={14}
                      sm={14}
                      md={14}
                      lg={14}
                      xl={14}
                    >
                      <h4>تعداد سفرهای انجام شده</h4>
                    </Col>
                    <Col
                      style={style_left}
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      xl={10}
                    >
                      {this.state.user_profile.travel_done}
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Tabs tabPosition="top" style={{ textAlign: "center" }}>
              <TabPane tab="نظرات دیگران " key="1">
                <CommentUser userID={userID} />
              </TabPane>
            </Tabs>
          </div>
        </Breakpoint>
      </div>
    );
  }
}

export default UserProfile;
