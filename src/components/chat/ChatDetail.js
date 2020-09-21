import React, { Component } from "react";
import { List, Avatar, Row, Col, Drawer, Spin, Tooltip, Upload, Button } from "antd";
import Axios from "axios";
import TextInput from "./TextInput";
import moment from "moment";
import { LeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { config } from "../../Constant";
import { Breakpoint } from "react-socks";
import DownloadPic1 from '../utils/DownloadPic1';

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
    visible: false,
    loading: true,
    fileList:[],
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
  };

    onChange = ({ fileList: newFileList }) => {
    this.setState({
        fileList:  newFileList
    })
    this.handler();
  }

  componentDidUpdate = (prevProps, callback) => {
    const token = localStorage.getItem("token");
    const chatid = this.props.data;
    if (this.props.data !== prevProps.data) {
      this.setState({
        offer: this.props.offer,
        visible: true,
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
          // callback(res)
        )
        .catch((error) => console.log(error));
    }
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
  };

  render() {
    const user = localStorage.getItem("user");
    const chatid = this.props.data;
    const token = localStorage.getItem('token');
    return (
      <div>
        <div style={{ marginTop: "20px" }}>
          <Breakpoint medium up>
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
                      </Col>
                      <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <p style={{ fontSize: "14px" }}>{this.state.offer}</p>
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
                        {user === this.props.sender ? (
                          <Link to={"/users/" + this.props.receiver}>
                            <Avatar
                              src={`${url}dstatic/media/${this.props.avatar1}`}
                            />
                          </Link>
                        ) : (
                          <Link to={"/users/" + this.props.sender}>
                            <Avatar
                              src={`${url}dstatic/media/${this.props.avatar2}`}
                            />
                          </Link>
                        )}
                      </Col>
                      <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}></Col>
                    </Row>
                  </Col>
                </Row>
              }
              footer={
                <Row>
                  <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}>
                    <ReloadOutlined
                      style={{ fontSize: "18px", float: "left", margin: "8px" }}
                    />{" "}
                  </Col>
                  <Col xs={20} sm={20} md={20} lg={12} xl={12} xxl={12}>
                    <TextInput data={chatid} handler={this.handler} />
                  </Col>
                  <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}>
                    {" "}
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
                      <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}></Col>
                      <Col
                        xs={20}
                        sm={20}
                        md={20}
                        lg={12}
                        xl={12}
                        xxl={12}
                        style={{
                          // borderRight: "solid",
                          // borderLeft: "solid",
                          borderColor: "#9cd3ee",
                          padding: "0 5px 0 5px",
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          {item.first_day
                            ? moment(item.create_at).format("dddd Do MMM")
                            : ""}
                        </div>
                        {user === item.ownerid ? (
                          <List.Item>
                            <div style={right_test_style}>
                              <List.Item.Meta
                                style={{ fontSize: "8px", height: "auto" }}
                                description={item.text}
                              />
                              {moment(item.create_at).format("HH:mm")}
                            </div>
                          </List.Item>
                        ) : (
                          <List.Item style={left_test_style}>
                            <div>
                              <List.Item.Meta
                                style={{ fontSize: "8px", height: "auto" }}
                                description={item.text}
                              />
                              {moment(item.create_at).format("HH:mm")}
                            </div>
                          </List.Item>
                        )}
                      </Col>
                      <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}></Col>
                    </Row>
                  )}
                />
              )}
            </Drawer>
            <br />
          </Breakpoint>
          <Breakpoint small down>
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
                      </Col>
                      <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <p style={{ fontSize: "14px" }}>{this.state.offer}</p>
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
                        {user === this.props.sender ? (
                          <Link to={"/users/" + this.props.receiver}>
                            <Avatar
                              src={`${url}dstatic/media/${this.props.avatar1}`}
                            />
                          </Link>
                        ) : (
                          <Link to={"/users/" + this.props.sender}>
                            <Avatar
                              src={`${url}dstatic/media/${this.props.avatar2}`}
                            />
                          </Link>
                        )}
                      </Col>
                      <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}></Col>
                    </Row>
                  </Col>
                </Row>
              }
              footer={
                <Row>
                  <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                    <Upload action={`${url}api/v1/chat/message/add/${chatid}`}
                          name="billig"
                          headers={{ Authorization: `Bearer ${token}` }}
                          onChange={this.onChange}
                        //   onPreview={onPreview}
                          fileList={this.fileList}>
                        <Button icon={<ReloadOutlined style={{marginTop:"5px"}}/>}></Button></Upload> 
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
                            ? moment(item.create_at).format("dddd Do MMM")
                            : ""}
                        </div>
                        {user === item.ownerid ? (
                          <List.Item>
                            <div style={right_test_style}>
                             { item.picture === null ? 
                              <List.Item.Meta
                                style={{ fontSize: "8px" }}
                                description={item.text}
                              />
                              :
                              <DownloadPic1 data={item.picture} size={100} />
                                }
                              {moment(item.create_at).format("HH:mm")}
                            </div>
                          </List.Item>
                        ) : (
                          <List.Item style={left_test_style}>
                            <div>
                            { item.picture === null ? 
                              <List.Item.Meta
                                style={{ fontSize: "8px" }}
                                description={item.text}
                              />
                              :
                              <div>
                              <img
                                src = {`${url}dstatic/${item.picture}`}
                                style={{borderRadius:"10px", margin:"5px"}}
                                width = {150}
                                />
                                </div>
                                }
                              {moment(item.create_at).format("HH:mm")}
                            </div>
                          </List.Item>
                        )}
                      </Col>
                    </Row>
                  )}
                />
              )}
            </Drawer>
            <br />
          </Breakpoint>
        </div>
      </div>
    );
  }
}

export default ChatDetail;
