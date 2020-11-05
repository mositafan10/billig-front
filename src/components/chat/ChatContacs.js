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
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) =>
        this.setState({
          contacs: res.data,
          loading: false,
        })
      )
      .catch((error) => console.log(error));
  }

  componentWillReceiveProps(){
    this.componentDidMount()
  }

  sendData = (chatid, offer, sender_avatar, receiver_avatar, sender_slug, receiver_slug, sender_name, receiver_name, packet_title, visible) => {
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
                    user == item.sender_slug ? (
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
                    user == item.sender_slug ? (
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
                        <p style={{fontSize:"14px",textAlign:"right"}}>{item.receiver_name}</p>
                        <p style={{textAlign:"right"}}>در آگهی {item.packet_title}</p>
                      </Button>
                    ) : (
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
                        <p style={{fontSize:"14px",textAlign:"right"}}>{item.sender_name}</p>
                        <p style={{textAlign:"right"}}>در آگهی {item.packet_title}</p>
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
