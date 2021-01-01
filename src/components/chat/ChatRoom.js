import React from "react";
import {
  List,
  Avatar,
  Row,
  Col,
  Drawer,
  Spin,
  Button,
  Badge,
} from "antd";
import Axios from "axios";
import TextInput from "./TextInput";
import moment from "moment";
import { Redirect } from 'react-router-dom'
import {
  DownOutlined,
  ArrowLeftOutlined,
  LoadingOutlined,
  MoreOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { config } from "../../Constant";
import { Breakpoint } from "react-socks";
import CheckMarkWhite from "../../media/small_icon/CheckMarkWhite.png";
import SingleCheck from "../../media/small_icon/SingleCheck.png";
import DownloadPic1 from "../utils/DownloadPic1";
import ChatContacs from "./ChatContacs";
import InfiniteScroll from "react-infinite-scroller";
import { socket } from '../../socket';

var url = config.url.API_URL;
const token = localStorage.getItem("token");
const style_center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
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

class ChatRoom extends React.Component {
  state = {
    massages: [],
    loading: false,
    newloading: false,
    visible: true,
    info: {},
    fileList: [],
    new_mass_vis: false,
    hasMore: true,
    page: 1,
    count: 0,
    redirect: false,
    onlineStatus: false,
  };

  myRef = React.createRef();

  componentDidMount() {
    this.getChatInfo();
    this.setState({ loading: true });
    const chatID = this.props.match.params.chatID;
    const userID = localStorage.getItem('user');

    // for join to room or create one
    socket.emit('createJoinRoom', {'chatID':chatID,'userID':userID});

    // for alert new mass
    socket.on('shouldUpdateMessage', (data) => {
      this.setState((state) => ({
        massages: state.massages.concat(data),
        new_mass_vis: true
      }));
    });
  }

  componentWillUnmount(){
    const chatID = this.props.match.params.chatID;
    Axios.get(`${url}api/v1/chat/massageSeen/${chatID}`, {
      headers: { Authorization: `Token ${token}` },
    })
  }


  handler = (data) => {
    const chatID = this.props.match.params.chatID;
    this.setState((state) => ({
      massages: state.massages.concat(data),
    }));
    const data1 = {'chatID': chatID, 'msg': data}
    socket.emit('private message',data1);
    this.scrollToMyRef();
  };

  getChatInfo = () => {
    const chatID = this.props.match.params.chatID;
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/chat/conversation/${chatID}`, {
      headers: { Authorization: `Token ${token}` },
    }).then((res) =>
      this.setState({
        info: res.data,
        loading: false,
      })
    );
  };
  
  scrollToMyRef = () => {
    this.myRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    this.setState({ new_mass_vis: false });
  };

  onClose = () => {
    this.setState({
      redirect: true
    })
  }

  moreData = () => {
    const chatID = this.props.match.params.chatID;
    const token = localStorage.getItem("token");
    this.setState({ hasMore: false });
    setTimeout(() => {
      const page = this.state.page;
      if (
        this.state.count == this.state.massages.length &&
        this.state.count != 0
      ) {
        this.setState({ hasMore: false, loading: false });
        return;
      }
      Axios.get(
        `${url}api/v1/chat/massagelist/${chatID}/?page=${page}&count=10`,
        { headers: { Authorization: `Token ${token}` } }
      )
        .then((res) => {
          this.setState((state) => ({
            massages: res.data.results.reverse().concat(state.massages),
            count: res.data.count,
            page: state.page + 1,
            hasMore: true,
            loading: false,
          }));
          if (this.state.page == 2 || this.state.page == 3) {
            this.scrollToMyRef();
          }
        })
        .catch((error) => console.error(error));
    }, 100);
  };


  onChange = ({ fileList: newFileList }) => {
    this.setState({
      fileList: newFileList,
    });
    let msg = newFileList[0].response
    if (msg !== undefined){
      this.handler(msg);
    } 
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/profile/inbox" />;
    }
    const chatID = this.props.match.params.chatID;
    const user = localStorage.getItem("user");
    return (
      <div style={{ marginTop: "20px" }}>
        <Breakpoint medium up>
          <ChatContacs />
          <Drawer
            title={
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Row>
                    <Col span={3}><Button size="large" style={{border:"hidden", color:"black"}}><MoreOutlined/></Button></Col>
                    <Col
                      span={18}
                      style={{ display: "flex", justifyContent: "right" }}
                    >
                      {user == this.state.info.sender_slug ? (
                        <Link
                          to={`/users/` + this.state.info.receiver_slug}
                        >
                          {this.state.onlineStatus ?
                          <div>
                          <Badge status="success">
                          <Avatar
                            src={`${url}dstatic/media/${this.state.info.receiver_avatar}`}
                          />
                          </Badge>
                          <span
                            style={{ paddingRight: "10px", color: "black" }}
                          >
                            {this.state.info.receiver_name}
                          </span>
                          </div>
                          :
                          <div>
                          {/* <Badge status="warning"> */}
                          <Avatar
                            src={`${url}dstatic/media/${this.state.info.receiver_avatar}`}
                          />
                          {/* </Badge> */}
                          <span
                            style={{ paddingRight: "10px", color: "black" }}
                          >
                            {this.state.info.receiver_name}
                          </span>
                          </div>
                          }
                          
                        </Link>
                      ) : (
                        
                        <Link to={"/users/" + this.state.info.sender_slug}>
                          {this.state.onlineStatus ?
                          <div>
                          <Badge status="success">
                          <Avatar
                            src={`${url}dstatic/media/${this.state.info.sender_avatar}`}
                          />
                          </Badge>
                          <span
                            style={{ paddingRight: "10px", color: "black" }}
                          >
                          {this.state.info.sender_name}
                          </span>
                          </div>
                          :
                          <div>
                          {/* <Badge status="warning"> */}
                          <Avatar
                            src={`${url}dstatic/media/${this.state.info.sender_avatar}`}
                          />
                          {/* </Badge> */}
                          <span
                            style={{ paddingRight: "10px", color: "black" }}
                          >
                            {this.state.info.sender_name}
                          </span>
                          </div>
                          }
                        </Link>
                      )}
                    </Col>
                    <Col
                      span={3}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Link to={"/profile/inbox"}>
                        <Button
                          size="large"
                          icon={<ArrowLeftOutlined size="large" />}
                          style={{ color: "black", border: "hidden" }}
                        />
                      </Link>
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
                        <Button
                          onClick={this.scrollToMyRef}
                          size="large"
                          shape="circle"
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
                    </Badge>
                  </Col>
                </Row>
                {this.state.info.is_active ? (
                  <div>
                    <Row style={{ padding: "5px 0 5px 0" }}>
                      <Col span={24}>
                        <TextInput data={chatID} handler={this.handler} />
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
              <div style={{ height: "100%", overflow: "auto" }}>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.moreData}
                  hasMore={this.state.hasMore}
                  loader={<Spin indicator={antIcon} style={style_center} />}
                  useWindow={false}
                  threshold={80}
                  isReverse={true}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={this.state.massages}
                    locale={{ emptyText: " پیامی وجود ندارد" }}
                    renderItem={(item) => (
                      <Row>
                        <Col
                          span={24}
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
                                        <img
                                          src={CheckMarkWhite}
                                          alt="check"
                                          width={20}
                                        />
                                      ) : (
                                        <img
                                          src={SingleCheck}
                                          alt="check"
                                          width={20}
                                        />
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
                </InfiniteScroll>
                <div ref={this.myRef} style={{ height: "20px" }}></div>
              </div>
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
                  <Col span={3}><Button size="large" style={{border:"hidden", color:"black"}}><MoreOutlined/></Button></Col>

                    <Col
                      span={18}
                      style={{ display: "flex", justifyContent: "right" }}
                    >
                      {user == this.state.info.sender_slug ? (
                        <Link
                        to={`/users/` + this.state.info.receiver_slug}
                      >
                        {this.state.onlineStatus ?
                        <div>
                        <Badge status="success">
                        <Avatar
                          src={`${url}dstatic/media/${this.state.info.receiver_avatar}`}
                        />
                        </Badge>
                        <span
                          style={{ paddingRight: "10px", color: "black" }}
                        >
                          {this.state.info.receiver_name}
                        </span>
                        </div>
                        :
                        <div>
                        {/* <Badge status="warning"> */}
                        <Avatar
                          src={`${url}dstatic/media/${this.state.info.receiver_avatar}`}
                        />
                        {/* </Badge> */}
                        <span
                          style={{ paddingRight: "10px", color: "black" }}
                        >
                          {this.state.info.receiver_name}
                        </span>
                        </div>
                        }
                      </Link>
                    ) : (
                      <Link to={"/users/" + this.state.info.sender_slug}>
                        {this.state.onlineStatus ?
                        <div>
                        <Badge status="success">
                        <Avatar
                          src={`${url}dstatic/media/${this.state.info.sender_avatar}`}
                        />
                        </Badge>
                        <span
                          style={{ paddingRight: "10px", color: "black" }}
                        >
                        {this.state.info.sender_name}
                        </span>
                        </div>
                        :
                        <div>
                        {/* <Badge status="warning"> */}
                        <Avatar
                          src={`${url}dstatic/media/${this.state.info.sender_avatar}`}
                        />
                        {/* </Badge> */}
                        <span
                          style={{ paddingRight: "10px", color: "black" }}
                        >
                          {this.state.info.sender_name}
                        </span>
                        </div>
                        }
                      </Link>
                      )}
                    </Col>
                    <Col
                      span={3}
                      style={{ display: "flex", justifyContent: "right" }}
                    >
                      <Link to={"/profile/inbox"}>
                        <Button
                          size="large"
                          icon={<ArrowLeftOutlined />}
                          style={{ color: "black", border: "hidden" }}
                        />
                      </Link>
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
                        <Button
                          onClick={this.scrollToMyRef}
                          size="large"
                          shape="circle"
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
                    </Badge>
                  </Col>
                </Row>
                {this.state.info.is_active ? (
                  <div>
                    <Row style={{ padding: "5px 0 5px 0" }}>
                      <Col span={24}>
                        <TextInput data={chatID} handler={this.handler} />
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
                <div style={{ height: "100%", overflow: "auto" }}>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.moreData}
                  hasMore={this.state.hasMore}
                  loader={<Spin indicator={antIcon} style={style_center} />}
                  useWindow={false}
                  threshold={80}
                  isReverse={true}
                >
              <List
                itemLayout="horizontal"
                dataSource={this.state.massages}
                locale={{ emptyText: " پیامی وجود ندارد" }}
                renderItem={(item) => (
                  <Row>
                    <Col
                      span={24}
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
                                    <img
                                      src={CheckMarkWhite}
                                      alt="check"
                                      width={20}
                                    />
                                  ) : (
                                    <img
                                      src={SingleCheck}
                                      alt="check"
                                      width={20}
                                    />
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
              </InfiniteScroll>
              <div ref={this.myRef} style={{ height: "5px" }}>
                <Spin style={{visibility:this.state.newloading?'block':'hidden'}}/>
              </div>
              </div>
            )}
          </Drawer>
          <br />
        </Breakpoint>
      </div>
    );
  }
}

export default ChatRoom;
