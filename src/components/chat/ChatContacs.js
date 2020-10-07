import React, { Component } from "react";
import { List, Avatar, Button, Badge, Spin } from "antd";
import Axios from "axios";
import { config } from "../../Constant";

var url = config.url.API_URL;

class ChatContacs extends Component {
  state = {
    contacs: [],
    loading: true,
    visible: true
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/chat/chatlist/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) =>
        this.setState({
          contacs: res.data,
          loading: false,
        })
      )
      .catch((error) => console.log(error));
  }

  sendData = (chatid, offer, avatar1, avatar2, sender, receiver, sender_name, receiver_name, visible) => {
    this.props.parentCallback(
      chatid,
      offer,
      avatar1,
      avatar2,
      sender,
      receiver,
      sender_name,
      receiver_name,
      visible
    );
  };

  render() {
    const user = localStorage.getItem("user");
    return (
      <div style={{ marginTop: "40px" }}>
        {this.state.loading ? (
          <div style={{ marginTop: "100px" }}>
            <Spin />
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={this.state.contacs}
            locale={{ emptyText: "مذاکره‌ای وجود ندارد" }}
            renderItem={(item) => (
              <List.Item
                style={{
                  borderRight: "solid",
                  borderRightColor: "aliceblue",
                  margin: "0 20px 0 0",
                }}
              >
                <List.Item.Meta
                  avatar={
                    user == item.sender ? (
                      <Badge count={item.new_massage_sender}>
                        <Avatar
                          src={`${url}dstatic/media/${item.receiver_avatar}`}
                        />
                      </Badge>
                    ) : (
                      <Badge count={item.new_massage_receiver}>
                        <Avatar
                          src={`${url}dstatic/media/${item.sender_avatar}`}
                        />
                      </Badge>
                    )
                  }
                  title={
                    user == item.sender ? (
                      <Button
                        style={{ border: "hidden", fontSize: "12px" }}
                        onClick={() =>
                          this.sendData(
                            item.id,
                            item.offer_state,
                            item.receiver_avatar,
                            item.sender_avatar,
                            item.sender,
                            item.receiver,
                            item.sender_name,
                            item.receiver_name,
                            this.state.visible
                          )
                        }
                      >
                        {item.receiver_name}
                      </Button>
                    ) : (
                      <Button
                        style={{ border: "hidden", fontSize: "12px" }}
                        onClick={() =>
                          this.sendData(
                            item.id,
                            item.offer_state,
                            item.receiver_avatar,
                            item.sender_avatar,
                            item.sender,
                            item.receiver,
                            item.sender_name,
                            item.receiver_name,
                            this.state.visible
                          )
                        }
                      >
                        {item.sender_name}
                      </Button>
                    )
                  }
                />
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }
}

export default ChatContacs;
