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
  Badge,
} from "antd";
import Axios from "axios";
import TextInput from "./TextInput";
import moment from "moment";
import {
  LinkOutlined,
  DownOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { config } from "../../Constant";
import { Breakpoint } from "react-socks";
import CheckMarkWhite from "../../media/small_icon/CheckMarkWhite.png";
import SingleCheck from "../../media/small_icon/SingleCheck.png";
import DownloadPic1 from "../utils/DownloadPic1";

var url = config.url.API_URL;
const token = localStorage.getItem("token");

const right_test_style = {
  textAlign: "right",
  border: "solid",
  borderRadius: "15px 15px 15px 15px ",
  backgroundColor: "#1890ff",
  borderColor: "white ",
  padding: "10px 10px 10px 10px",
  width: "auto",
  maxWidth: "70%",
  height: "auto",
  color: "white",
};

const center_test_style = {
  display: "inline-block",
  border: "solid",
  borderRadius: "15px 10px 15px 10px ",
  backgroundColor: "green",
  borderColor: "white ",
  padding: "10px 10px 10px 10px",
  width: "auto",
  maxWidth: "70%",
  height: "auto",
  color: "white",
};

const left_test_style = {
  textAlign: "right",
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
  constructor(props) {
    super(props);

    this.state = {
      massages: [],
      visible: this.props.visible,
      loading: false,
      fileList: [],
      interval: 1,
      new_mass_vis: false,
    };
  }

  myRef = React.createRef();

  componentDidUpdate = (prevProps) => {
    const chatid = this.props.data;
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        visible: this.props.visible,
        loading: true,
      });
      Axios.get(`${url}api/v1/chat/massagelist/${chatid}`, {
        headers: { Authorization: `Token ${token}` },
      }).then(
        (res) =>
          this.setState({
            massages: res.data,
            loading: false,
          }),
        setTimeout(() => {
          this.scrollToMyRef();
        }, 500)
      );

      // REFRESH CHAT EACH 5 SECOND AND CHECK NEW MASSAGE
      if (this.props.data !== prevProps.data) {
        this.state.interval = setInterval(() => {
          Axios.get(`${url}api/v1/chat/massagelist/${chatid}`, {
            headers: { Authorization: `Token ${token}` },
          })
            .then((res) => {
              let a = res.data[res.data.length - 1].text;
              let b =
                this.state.massages[this.state.massages.length - 1] &&
                this.state.massages[this.state.massages.length - 1].text;
              if (a !== b && b != undefined) {
                this.setState({
                  massages: res.data,
                });

                if (res.data.length > 8) {
                  this.setState({
                    new_mass_vis: true,
                  });
                }
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
    const chatid = this.props.data;
    Axios.get(`${url}api/v1/chat/massagelist/${chatid}`, {
      headers: { Authorization: `Token ${token}` },
    }).then((res) => {
      this.setState({
        massages: res.data,
      })
      this.scrollToMyRef()
      }
    );
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
                    <Col span={3}></Col>
                    <Col
                      span={18}
                      style={{ display: "flex", justifyContent: "right" }}
                    >
                      {user == this.props.sender_slug ? (
                        <Link
                          to={`${url}users/` + this.props.receiver_slug}
                        >
                          <Avatar
                            src={`${url}dstatic/media/${this.props.receiver_avatar}`}
                          />
                          <span
                            style={{ paddingRight: "10px", color: "black" }}
                          >
                            {this.props.receiver_name}
                          </span>
                        </Link>
                      ) : (
                        <Link to={"/users/" + this.props.sender_slug}>
                          <Avatar
                            src={`${url}dstatic/media/${this.props.sender_avatar}`}
                          />
                          <span
                            style={{ paddingRight: "10px", color: "black" }}
                          >
                            {this.props.sender_name}
                          </span>
                        </Link>
                      )}
                    </Col>
                    <Col
                      span={3}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        onClick={this.onClose}
                        size="large"
                        icon={<ArrowLeftOutlined size="large" />}
                        style={{ color: "black", border: "hidden" }}
                      />
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
                            backgroundColor: "whitesmoke",
                            color: "black",
                            borderColor: "white",
                          }}
                          icon={<DownOutlined />}
                        ></Button>
                      </Tooltip>
                    </Badge>
                  </Col>
                </Row>
                {this.props.is_active ? (
                  <div>
                    <Row style={{ padding: "5px 0 5px 0" }}>
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
                          headers={{ Authorization: `Token ${token}` }}
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
                ) : (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <p>امکان ارسال پیام در این چت وجود ندارد</p>
                  </div>
                )}
              </div>
            }
            placement="left"
            width={"50%"}
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            getContainer={false}
            headerStyle={{ height: "60px" }}
            bodyStyle={{ marginBottom: 30, zIndex: 999 }}
            style={{ zIndex: 999 }}
          >
            {this.state.loading ? (
              <div style={{ marginTop: "100px" }}>
                <Spin />
              </div>
            ) : (
              <div>
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
                          textAlign: "center",
                        }}
                      >
                        <div>
                          {item.first_day
                            ? moment(item.create_at).format("dddd D MMM")
                            : ""}
                        </div>

                        {item.type_text == 1 ? (
                          <div style={center_test_style}>
                            {item.text}
                            <br />
                            {moment(item.create_at).format("HH:mm - MMM DD ")}
                          </div>
                        ) : (
                          <div>
                            {user == item.owner_slug ? (
                              <List.Item>
                                <div style={right_test_style}>
                                  {item.picture === null ? (
                                    item.text
                                  ) : (
                                    <div>
                                      <DownloadPic1
                                        size={200}
                                        data={item.picture}
                                      />
                                    </div>
                                  )}
                                  <br />
                                  <div style={{ textAlign: "right" }}>
                                    {moment(item.create_at).format("HH:mm")}
                                    {item.is_seen ? (
                                      <img src={CheckMarkWhite} alt="check" width={20} />
                                    ) : (
                                      <img src={SingleCheck} alt="check" width={20} />
                                    )}
                                  </div>
                                </div>
                              </List.Item>
                            ) : (
                              <List.Item style={left_test_style}>
                                <div>
                                  {item.picture === null ? (
                                    item.text
                                  ) : (
                                    <div>
                                      <DownloadPic1
                                        size={200}
                                        data={item.picture}
                                      />
                                    </div>
                                  )}
                                  <br />
                                  <div style={{ textAlign: "right" }}>
                                    {moment(item.create_at).format("HH:mm")}
                                  </div>
                                </div>
                              </List.Item>
                            )}
                          </div>
                        )}
                      </Col>
                    </Row>
                  )}
                />
              </div>
            )}
            <div ref={this.myRef}></div>
          </Drawer>
          <br />
        </Breakpoint>
        <Breakpoint small down>
          <Drawer
            title={
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Row>
                    <Col
                      span={3}
                      style={{ display: "flex", justifyContent: "right" }}
                    ></Col>
                    <Col
                      span={18}
                      style={{ display: "flex", justifyContent: "right" }}
                    >
                      {user == this.props.sender_slug ? (
                        <Link
                          to={`${url}users/` + this.props.receiver_slug}
                        >
                          <Avatar
                            src={`${url}dstatic/media/${this.props.receiver_avatar}`}
                          />
                          <span
                            style={{ paddingRight: "10px", color: "black" }}
                          >
                            {this.props.receiver_name}
                          </span>
                        </Link>
                      ) : (
                        <Link to={"/users/" + this.props.sender_slug}>
                          <Avatar
                            src={`${url}dstatic/media/${this.props.sender_avatar}`}
                          />
                          <span
                            style={{ paddingRight: "10px", color: "black" }}
                          >
                            {this.props.sender_name}
                          </span>
                        </Link>
                      )}
                    </Col>
                    <Col
                      span={3}
                      style={{ display: "flex", justifyContent: "right" }}
                    >
                      <Button
                        onClick={this.onClose}
                        size="large"
                        icon={<ArrowLeftOutlined />}
                        style={{ color: "black", border: "hidden" }}
                      />
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
                            backgroundColor: "whitesmoke",
                            color: "black",
                            borderColor: "white",
                          }}
                          icon={<DownOutlined />}
                        ></Button>
                      </Tooltip>
                    </Badge>
                  </Col>
                </Row>
                {this.props.is_active ? (
                  <div>
                    <Row style={{ padding: "5px 0 5px 0" }}>
                      <Col
                        span={2}
                        style={{ justifyContent: "right", display: "flex" }}
                      >
                        <Upload
                          action={`${url}api/v1/chat/messages/${chatid}`}
                          name="billig"
                          headers={{ Authorization: `Token ${token}` }}
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
                      <Col span={22} >
                        <TextInput data={chatid} handler={this.handler} />
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <p>امکان ارسال پیام در این چت وجود ندارد</p>
                  </div>
                )}
              </div>
            }
            placement="left"
            width={"100%"}
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            getContainer={false}
            headerStyle={{ height: "60px" }}
            bodyStyle={{ marginBottom: 30 }}
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
                        textAlign: "center",
                      }}
                    >
                      <div>
                        {item.first_day
                          ? moment(item.create_at).format("dddd D MMM")
                          : ""}
                      </div>

                      {item.type_text == 1 ? (
                        <div style={center_test_style}>
                          {item.text}
                          <br />
                          {moment(item.create_at).format("HH:mm - MMM DD ")}
                        </div>
                      ) : (
                        <div>
                          {user == item.owner_slug ? (
                            <List.Item>
                              <div style={right_test_style}>
                                {item.picture === null ? (
                                  item.text
                                ) : (
                                  <div>
                                    <DownloadPic1
                                      size={150}
                                      data={item.picture}
                                    />
                                  </div>
                                )}
                                <br />
                                <div style={{ textAlign: "right" }}>
                                  {moment(item.create_at).format("HH:mm")}
                                  {item.is_seen ? (
                                    <img src={CheckMarkWhite} alt="check" width={20} />
                                  ) : (
                                    <img src={SingleCheck} alt="check" width={20} />
                                  )}
                                </div>
                              </div>
                            </List.Item>
                          ) : (
                            <List.Item style={left_test_style}>
                              <div>
                                {item.picture === null ? (
                                  item.text
                                ) : (
                                  <div>
                                    <DownloadPic1
                                      size={150}
                                      data={item.picture}
                                    />
                                  </div>
                                )}
                                <br />
                                <div style={{ textAlign: "left" }}>
                                  {moment(item.create_at).format("HH:mm")}
                                </div>
                              </div>
                            </List.Item>
                          )}
                        </div>
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
