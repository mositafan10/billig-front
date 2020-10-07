import React, { Component } from "react";
import {
  List,
  Avatar,
  Row,
  Col,
  Drawer,
  Spin,
  Tooltip,
  Upload,
  Button,
  Modal,
  message,
  Badge,
} from "antd";
import Axios from "axios";
import TextInput from "./TextInput";
import moment from "moment";
import { LinkOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { config } from "../../Constant";
import { Breakpoint } from "react-socks";
import DownloadPic from "../utils/DownloadPic";

var url = config.url.API_URL;
const token = localStorage.getItem("token");

const right_test_style = {
  display: "inline",
  border: "solid",
  borderRadius: "15px 10px 15px 10px ",
  backgroundColor: "lightcyan",
  borderColor: "white ",
  padding: "10px 10px 10px 10px",
  width: "auto",
  maxWidth: "70%",
  height: "auto",
};

const left_test_style = {
  marginBottom: "15px",
  float: "left",
  border: "solid",
  borderRadius: "10px 15px 10px 15px ",
  backgroundColor: "aliceblue",
  borderColor: "white",
  padding: "10px 10px 10px 10px",
  width: "auto",
  maxWidth: "70%",
  height: "auto",
};

class ChatDetail extends Component {
  state = {
    massages: [],
    // new_massages: [],
    offer: "",
    visible: this.props.visible,
    loading: false,
    fileList: [],
    interval: 1,
    new_mass_vis: false,
  };

  myRef = React.createRef();

  componentDidUpdate = (prevProps) => {
    const chatid = this.props.data;
    if (this.props.visible !== prevProps.visible) {
      setTimeout(() => {
        this.scrollToMyRef();
      }, 500);
      this.scrollToMyRef();
      this.setState({
        offer: this.props.offer,
        visible: this.props.visible,
        loading: true,
      });
      Axios.get(`${url}api/v1/chat/massagelist/${chatid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) =>
          this.setState({
            massages: res.data,
            loading: false,
          })
        )
        .catch((error) => message.error(error.response.data.detail));
      if (this.props.data !== prevProps.data) {
        this.state.interval = setInterval(() => {
          Axios.get(`${url}api/v1/chat/massagelist/${chatid}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((res) => {
              let a = res.data[res.data.length - 1].text;
              let b =
                this.state.massages[this.state.massages.length - 1] &&
                this.state.massages[this.state.massages.length - 1].text;
              if (a !== b && b != undefined) {
                this.setState({
                  massages: res.data,
                  new_mass_vis: true,
                });
              }
            })
            .catch((error) => console.log(error));
        }, 5000);
      }
    }
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
    this.props.parentCallback();
    this.componentWillUnmount();
  };

  componentWillUnmount = () => {
    clearInterval(this.state.interval);
  };

  onChange = ({ fileList: newFileList }) => {
    this.setState({
      fileList: newFileList,
    });
    this.handler();
  };

  scrollToMyRef = () => {
    this.myRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    this.setState({ new_mass_vis: false });
  };

  handler = () => {
    const token = localStorage.getItem("token");
    const chatid = this.props.data;
    Axios.get(`${url}api/v1/chat/massagelist/${chatid}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) =>
        this.setState({
          massages: res.data,
        })
      )
      .catch((error) => console.log(error));
    setTimeout(() => {
      this.scrollToMyRef();
    }, 600);
  };

  render() {
    const user = localStorage.getItem("user");
    const chatid = this.props.data;
    const token = localStorage.getItem("token");
    return (
      <div style={{ marginTop: "20px" }}>
        <Breakpoint medium up>
          <Drawer
            title={
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Row>
                    <Col xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
                      {user == this.props.sender ? (
                        <Link to={"/users/" + this.props.sender}>
                          <Avatar
                            src={`${url}dstatic/media/${this.props.avatar1}`}
                          />
                          <span
                            style={{ paddingRight: "10px", color: "black" }}
                          >
                            {this.props.receiver_name}
                          </span>
                        </Link>
                      ) : (
                        <Link to={"/users/" + this.props.receiver}>
                          <Avatar
                            src={`${url}dstatic/media/${this.props.avatar2}`}
                          />
                          <span
                            style={{ paddingRight: "10px", color: "black" }}
                          >
                            {this.props.sender_name}
                          </span>
                        </Link>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            }
            footer={
              <div>
                <Row
                  style={{
                    marginRight: "20px",
                    position: "fixed",
                    zIndex: 9999,
                    marginTop: "-100px",
                    visibility: this.state.new_mass_vis ? "visible" : "hidden",
                  }}
                >
                  <Col>
                    <Badge dot>
                      <Tooltip title="پیام جدید دارید">
                        <Button
                          onClick={this.scrollToMyRef}
                          size="large"
                          shape="circle-outline"
                          style={{
                            display: "grid",
                            alignItems: "center",
                            paddingTop: "10px",
                            backgroundColor: "royalblue",
                            color: "white",
                            borderColor: "white",
                          }}
                          icon={<ArrowDownOutlined />}
                        ></Button>
                      </Tooltip>
                    </Badge>
                  </Col>
                </Row>
                <Row style={{ padding: "20px 0 20px 0" }}>
                  <Col
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                    xxl={1}
                    style={{ justifyContent: "right", display: "flex" }}
                  >
                    <Upload
                      action={`${url}api/v1/chat/messages/${chatid}`}
                      name="billig"
                      headers={{ Authorization: `Bearer ${token}` }}
                      onChange={this.onChange}
                      fileList={this.fileList}
                      multiple="true"
                      accept=".png,.jpeg"
                    >
                      <Button
                        size="large"
                        icon={<LinkOutlined style={{ marginTop: "5px" }} />}
                      ></Button>
                    </Upload>
                  </Col>
                  <Col xs={23} sm={23} md={23} lg={23} xl={23} xxl={23}>
                    <TextInput data={chatid} handler={this.handler} />
                  </Col>
                </Row>
              </div>
            }
            placement="left"
            width={"50%"}
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
            getContainer={false}
            headerStyle={{ marginTop: 20 }}
            bodyStyle={{ marginBottom: 30, zIndex: 999 }}
            style={{ zIndex: 999 }}
          >
            {this.state.loading ? (
              <div style={{ marginTop: "100px" }}>
                <Spin />
              </div>
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={this.state.massages}
                locale={{ emptyText: " پیامی وجود ندارد" }}
                renderItem={(item) => (
                  <Row>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xl={24}
                      xxl={24}
                      style={{
                        borderColor: "#9cd3ee",
                        padding: "0 5px 0 5px",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        {item.first_day
                          ? moment(item.create_at).format("dddd D MMM")
                          : ""}
                      </div>
                      {user == item.ownerid ? (
                        <List.Item>
                          <div style={right_test_style}>
                            {item.picture === null ? (
                              <List.Item.Meta
                                style={{ fontSize: "8px" }}
                                description={item.text}
                              />
                            ) : (
                              <div>
                                <img
                                  src={`${url}dstatic/${item.picture}`}
                                  style={{
                                    borderRadius: "10px",
                                    margin: "5px",
                                  }}
                                  width={150}
                                />
                              </div>
                            )}
                            {moment(item.create_at).format("HH:mm")}
                          </div>
                        </List.Item>
                      ) : (
                        <List.Item style={left_test_style}>
                          <div>
                            {item.picture === null ? (
                              <List.Item.Meta
                                style={{ fontSize: "8px" }}
                                description={item.text}
                              />
                            ) : (
                              <div>
                                <img
                                  src={`${url}dstatic/${item.picture}`}
                                  style={{
                                    borderRadius: "10px",
                                    margin: "5px",
                                  }}
                                  width={150}
                                />
                              </div>
                            )}
                            {moment(item.create_at).format("HH:mm")}
                          </div>
                        </List.Item>
                      )}
                    </Col>
                  </Row>
                )}
              />
            )}
            <div ref={this.myRef}></div>
          </Drawer>
          <br />
        </Breakpoint>
        <Breakpoint small down>
          <Drawer
            style={{ position: "absolute" }}
            title={
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Row>
                    <Col span={20}>
                      {user === this.props.sender ? (
                        <Link to={"/users/" + this.props.sender}>
                          <Avatar
                            src={`${url}dstatic/media/${this.props.avatar2}`}
                          />
                        </Link>
                      ) : (
                        <Link to={"/users/" + this.props.receiver}>
                          <Avatar
                            src={`${url}dstatic/media/${this.props.avatar1}`}
                          />
                        </Link>
                      )}
                      <span style={{ paddingRight: "10px", fontSize: "14px" }}>
                        {this.props.sender_name}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            }
            footer={
              <Row>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                  <Upload
                    action={`${url}api/v1/chat/messages/${chatid}`}
                    name="billig"
                    headers={{ Authorization: `Bearer ${token}` }}
                    onChange={this.onChange}
                    fileList={this.fileList}
                    multiple="true"
                    accept=".png,.jpeg"
                  >
                    <Button
                      size="large"
                      icon={<LinkOutlined style={{ margin: "5px 0 0 5px" }} />}
                    ></Button>
                  </Upload>
                </Col>
                <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
                  <TextInput data={chatid} handler={this.handler} />
                </Col>
              </Row>
            }
            placement="left"
            width={"100%"}
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
            getContainer={false}
            headerStyle={{ marginTop: 20 }}
            bodyStyle={{ marginBottom: 30 }}
            maskStyle={{ zIndex: "999" }}
          >
            {this.state.loading ? (
              <div style={{ marginTop: "100px" }}>
                <Spin />
              </div>
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={this.state.massages}
                locale={{ emptyText: " پیامی وجود ندارد" }}
                renderItem={(item) => (
                  <Row>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xl={24}
                      xxl={24}
                      style={{
                        borderColor: "#9cd3ee",
                        padding: "0 5px 0 5px",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        {item.first_day
                          ? moment(item.create_at).format("dddd D MMM")
                          : ""}
                      </div>
                      {user == item.ownerid ? (
                        <List.Item>
                          <div style={right_test_style}>
                            {item.picture == null ? (
                              <List.Item.Meta
                                style={{ fontSize: "8px" }}
                                description={item.text}
                              />
                            ) : (
                              <div>
                                <img
                                  src={`${url}dstatic/${item.picture}`}
                                  style={{
                                    borderRadius: "10px",
                                    margin: "5px",
                                  }}
                                  width={150}
                                />
                              </div>
                            )}
                            {moment(item.create_at).format("HH:mm")}
                          </div>
                        </List.Item>
                      ) : (
                        <List.Item style={left_test_style}>
                          <div>
                            {item.picture == null ? (
                              <List.Item.Meta
                                style={{ fontSize: "8px" }}
                                description={item.text}
                              />
                            ) : (
                              <div>
                                <img
                                  src={`${url}dstatic/${item.picture}`}
                                  style={{
                                    borderRadius: "10px",
                                    margin: "5px",
                                  }}
                                  width={150}
                                />
                              </div>
                            )}
                            {moment(item.create_at).format("HH:mm")}
                          </div>
                        </List.Item>
                      )}
                    </Col>
                  </Row>
                )}
              />
            )}
            <div height="100px" ref={this.myRef}></div>
          </Drawer>
          <br />
        </Breakpoint>
      </div>
    );
  }
}

export default ChatDetail;
