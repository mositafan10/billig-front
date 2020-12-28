import React, { Component } from "react";
import { List, Avatar, Button, Badge, Popconfirm } from "antd";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import Axios from "axios";
import { config } from "../../Constant";
import { socket } from '../../socket';
import { Link } from 'react-router-dom';  

var url = config.url.API_URL;

class ChatContacs extends Component {
  state = {
    contacs: [],
    loading: false,
    visible: true,
    length: 0
  };

  componentDidMount() {
    this.getLastMassage();
    const userID = localStorage.getItem('user');
    setTimeout(() => {
      for (var i = 0; i < this.state.contacs.length; i++) {
        const element = this.state.contacs[i].slug;
        socket.emit('createJoinRoom', {'chatID':element,'userID':userID});
      }
    }, 1000);
    socket.on('shouldUpdateMessage', () => {
      this.getLastMassage();
    });
  }

  getLastMassage = () => {
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/chat/chatlist/`, {
      headers: { Authorization: `Token ${token}` },
    }).then((res) =>
      this.setState({
        contacs: res.data,
        length: res.data.length
      })
    );
  }

  // componentWillUnmount() {
  //   for (var i = 0; i < this.state.contacs.length; i++) {
  //     const element = this.state.contacs[i].slug;
  //     socket.emit('leaveRoom', element);
  //   }
  // }

  handleOkinfo = (slug) => {
    const token = localStorage.getItem("token");
    const current_contacs = this.state.contacs;
    Axios.delete(`${url}api/v1/chat/conversation/${slug}`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) =>
        this.setState({
          contacs: current_contacs.filter((contacs) => contacs.slug !== slug),
        })
      )
      .catch((err) => console.log(err));
  };

  render() {
    const user = localStorage.getItem("user");
    return (
      <div
        style={{
          marginTop: "5px",
          overflowY: "scroll",
          direction: "ltr",
          maxHeight: "100%",
        }}
      >
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
                paddingRight: "20px",
                borderRadius: "10px",
                backgroundColor: !item.is_active && "#db540b",
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
                      <Link to={`/profile/inbox/${item.slug}`}>
                      <Button
                        style={{
                          border: "hidden",
                          fontSize: "12px",
                          backgroundColor: !item.is_active && "#db540b",
                        }}
                      >
                        <span style={{ fontSize: "14px", textAlign: "right" }}>
                          {item.receiver_name}
                        </span>
                      </Button>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Link to={`/profile/inbox/${item.slug}`}>
                      <Button
                        style={{
                          border: "hidden",
                          fontSize: "12px",
                          backgroundColor: !item.is_active && "#db540b",
                        }}
                      >
                        <span style={{ fontSize: "14px", textAlign: "right" }}>
                          {item.sender_name}
                        </span>
                      </Button>
                      </Link>
                    </div>
                  )
                }
              />
              {!item.is_active && (
                <Popconfirm
                  overlayStyle={{ fontFamily: "VazirD" }}
                  onConfirm={this.handleOkinfo.bind(this,item.slug)}
                  okText="حذف"
                  cancelText="انصراف"
                  title={
                    <div>
                      <p>آیا از حذف چت مطمئن هستید؟</p>
                    </div>
                  }
                >
                  <Button
                    size="large"
                    style={{ backgroundColor: "#db540b", border: "hidden" }}
                  >
                    <CloseOutlined />
                  </Button>
                </Popconfirm>
              )}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ChatContacs;
