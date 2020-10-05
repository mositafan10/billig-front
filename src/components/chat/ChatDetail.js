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
  Modal
} from "antd";
import Axios from "axios";
import TextInput from "./TextInput";
import moment from "moment";
import { LinkOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { config } from "../../Constant";
import { Breakpoint } from "react-socks";
import DownloadPic1 from "../utils/DownloadPic1";

var url = config.url.API_URL;

const right_test_style = {
  display: "inline",
  border: "solid",
  borderRadius: "15px 10px 15px 10px ",
  backgroundColor: "deepskyblue",
  borderColor: "deepskyblue",
  padding: "10px 10px 10px 10px",
  width: "auto",
  maxWidth: "70%",
  height: "auto",
};

const left_test_style = {
  marginBottom: "15px",
  float: "inline-end",
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
    offer: "",
    visible: this.props.visible,
    loading: true,
    fileList: [],
  };

  myRef = React.createRef();

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
     visible:false
    })
     this.props.parentCallback()
  };

  onChange = ({ fileList: newFileList }) => {
    this.setState({
      fileList: newFileList,
    });
    this.handler();
  };

  scrollToMyRef = () => {
    this.myRef.current.scrollIntoView();
  };

  componentDidUpdate = (prevProps, callback) => {
    const token = localStorage.getItem("token");
    const chatid = this.props.data;
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        offer: this.props.offer,
        visible: this.props.visible,
        loading: true,
      });
      Axios.get(`${url}api/v1/chat/massagelist/${chatid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(
          (res) =>
            this.setState({
              massages: res.data,
              loading: false,
            })
          // callback(res)
        )
        .catch((error) => console.log(error));
    }

    this.scrollToMyRef();
  };


  handler = (callback) => {
    const token = localStorage.getItem("token");
    const chatid = this.props.data;
    Axios.get(`${url}api/v1/chat/massagelist/${chatid}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(
        (res) => (
          this.setState({
            massages: res.data,
          }),
          callback(res)
        )
      )
      .catch((error) => console.log(error));
    this.scrollToMyRef();
  };

  render() {
    const user = localStorage.getItem("user");
    const chatid = this.props.data;
    const token = localStorage.getItem("token");
    return (
        <div style={{ marginTop: "20px" }}>
          <Breakpoint medium up>
            {/* <div > */}
            <Drawer 
              title={
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row>
                      <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
                        <Tooltip title="به روزرسانی پیام‌ها">
                          {this.state.loading ? (
                            <Spin />
                          ) : (
                            <ReloadOutlined
                              onClick={this.componentDidUpdate}
                              style={{ fontSize: "20px" }}
                            />
                          )}
                        </Tooltip>
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
                        {user !== this.props.sender ? (
                          
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
                       <span style={{paddingRight:"10px"}}>{this.props.sender_name}</span> 
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
              footer={
                <Row style={{padding:"20px 0 20px 0"}}>
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
              }
              placement="left"
              width={"50%"}
              closable={true}
              onClose={this.onClose}
              visible={this.state.visible}
              getContainer={false}
              headerStyle={{ marginTop: 20 }}
              bodyStyle={{ marginBottom: 30, zIndex:999 }}
              style={{zIndex:999}}
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
                            ? moment(item.create_at).format("dddd d MMM")
                            : ""}
                        </div>
                        {user === item.ownerid ? (
                          <List.Item>
                            <div style={right_test_style}>
                              {item.picture === null ? (
                                <List.Item.Meta
                                  style={{ fontSize: "8px" }}
                                  description={item.text}
                                />
                              ) : (
                                <DownloadPic1 data={item.picture} size={100} />
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
            {/* </div> */}
            <br />
          </Breakpoint>
          <Breakpoint small down>
            
            <Drawer
            style={{ position: 'absolute' }}
              title={
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row>
                      <Col span={4}>
                        <Tooltip title="به روزرسانی پیام‌ها">
                          {this.state.loading ? (
                            <Spin />
                          ) : (
                            <ReloadOutlined
                              onClick={this.componentDidUpdate}
                              style={{ fontSize: "16px", marginTop: "7px" }}
                            />
                          )}
                        </Tooltip>
                      </Col>
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
                      <span style={{paddingRight:"10px", fontSize:"14px"}}>{this.props.sender_name}</span> 
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
              footer={
                <Row>
                  <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} >
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
                        icon={<LinkOutlined style={{ margin:"5px 0 0 5px" }} />}
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
              maskStyle={{zIndex:"999"}}
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
                            ? moment(item.create_at).format("dddd d MMM")
                            : ""}
                        </div>
                        {user === item.ownerid ? (
                          <List.Item>
                            <div style={right_test_style}>
                              {item.picture === null ? (
                                <List.Item.Meta
                                  style={{ fontSize: "8px" }}
                                  description={item.text}
                                />
                              ) : (
                                <DownloadPic1 data={item.picture} size={100} />
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
        </div>
    );
  }
}

export default ChatDetail;
