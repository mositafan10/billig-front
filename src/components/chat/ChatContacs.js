import React, { Component } from "react";
import { List, Avatar, Button, Badge } from "antd";
import { MoreOutlined, UserOutlined } from "@ant-design/icons";
import Axios from "axios";
import { config } from "../../Constant";

var url = config.url.API_URL;

class ChatContacs extends Component {
  state = {
    contacs: [],
    loading: false,
    visible: true,
  };

  componentDidMount() {
    this.setState({ loading: true });
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/chat/chatlist/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) =>
        this.setState({
          contacs: res.data,
          loading: false,
        })
      )
  }

  componentWillReceiveProps() {
    this.componentDidMount();
  }

  sendData = (
    chatid,
    offer,
    sender_avatar,
    receiver_avatar,
    sender_slug,
    receiver_slug,
    sender_name,
    receiver_name,
    packet_title,
    visible
  ) => {
    this.props.parentCallback(
      chatid,
      offer,
      sender_avatar,
      receiver_avatar,
      sender_slug,
      receiver_slug,
      sender_name,
      receiver_name,
      packet_title,
      visible
    );
  };

  render() {
    const user = localStorage.getItem("user");
    return (
      <div style={{ marginTop: "20px", overflowY:"scroll", direction:"ltr", maxHeight:"60%" }}>
        <List
          loading={this.state.loading}
          itemLayout="horizontal"
          dataSource={this.state.contacs}
          locale={{
            emptyText: (
              <div>
                شما هنوز مذاکره‌ای آغاز نکرده‌اید
                <br /> مذاکره با ثبت پیشنهاد روی آگهی آغاز می شود.
              </div>
            ),
          }}
          renderItem={(item) => (
            <List.Item
              style={{
                margin: "0 20px 0 0",
              }}
            >
              <List.Item.Meta
                avatar={
                  user == item.sender_slug ? (
                    item.receiver_avatar ? (
                      <Badge count={item.not_seen}>
                        <Avatar
                          src={`${url}dstatic/media/${item.receiver_avatar}`}
                        />
                      </Badge>
                    ) : (
                      <Badge count={item.not_seen}>
                      <Avatar
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          border: "1px solid",
                        }}
                      >
                        <UserOutlined />
                      </Avatar>
                      </Badge>
                    )
                  ) : item.sender_avatar ? (
                    <Badge count={item.not_seen}>
                      <Avatar
                        src={`${url}dstatic/media/${item.sender_avatar}`}
                      />
                    </Badge>
                  ) : (
                    <Badge count={item.not_seen}>
                    <Avatar
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid",
                      }}
                    >
                      <UserOutlined />
                    </Avatar>
                    </Badge>
                  )
                }
                title={
                  user == item.sender_slug ? (
                    <div>
                      <Button
                        style={{ border: "hidden", fontSize: "12px" }}
                        onClick={() =>
                          this.sendData(
                            item.slug,
                            item.offer_state,
                            item.sender_avatar,
                            item.receiver_avatar,
                            item.sender_slug,
                            item.receiver_slug,
                            item.sender_name,
                            item.receiver_name,
                            item.packet_title,
                            this.state.visible
                          )
                        }
                      >
                        <span style={{ fontSize: "14px", textAlign: "right" }}>
                          {item.receiver_name}
                        </span>
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        style={{ border: "hidden", fontSize: "12px" }}
                        onClick={() =>
                          this.sendData(
                            item.slug,
                            item.offer_state,
                            item.sender_avatar,
                            item.receiver_avatar,
                            item.sender_slug,
                            item.receiver_slug,
                            item.sender_name,
                            item.receiver_name,
                            item.packet_title,
                            this.state.visible
                          )
                        }
                      >
                        <span style={{ fontSize: "14px", textAlign: "right" }}>
                          {item.sender_name}
                        </span>
                      </Button>
                    </div>
                  )
                }
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ChatContacs;
