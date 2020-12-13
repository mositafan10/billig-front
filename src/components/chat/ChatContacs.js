import React, { Component } from "react";
import { List, Avatar, Button, Badge, Popconfirm } from "antd";
import { MoreOutlined, UserOutlined } from "@ant-design/icons";
import Axios from "axios";
import { config } from "../../Constant";
import { Link } from 'react-router-dom';  

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
    }).then((res) =>
      this.setState({
        contacs: res.data,
        loading: false,
      })
    );
  }

  componentWillReceiveProps() {
    this.componentDidMount();
  }

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

  // sendData = (
  //   chatid,
  //   sender_avatar,
  //   receiver_avatar,
  //   sender_slug,
  //   receiver_slug,
  //   sender_name,
  //   receiver_name,
  //   is_active,
  //   visible
  // ) => {
  //   this.props.parentCallback(
  //     chatid,
  //     sender_avatar,
  //     receiver_avatar,
  //     sender_slug,
  //     receiver_slug,
  //     sender_name,
  //     receiver_name,
  //     is_active,
  //     visible
  //   );
  // };

  render() {
    const user = localStorage.getItem("user");
    return (
      <div
        style={{
          marginTop: "20px",
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
                        // onClick={() =>
                        //   this.sendData(
                        //     item.slug,
                        //     item.sender_avatar,
                        //     item.receiver_avatar,
                        //     item.sender_slug,
                        //     item.receiver_slug,
                        //     item.sender_name,
                        //     item.receiver_name,
                        //     item.is_active,
                        //     this.state.visible
                        //   )
                        // }
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
                        // onClick={() =>
                        //   this.sendData(
                        //     item.slug,
                        //     item.sender_avatar,
                        //     item.receiver_avatar,
                        //     item.sender_slug,
                        //     item.receiver_slug,
                        //     item.sender_name,
                        //     item.receiver_name,
                        //     item.is_active,
                        //     this.state.visible
                        //   )
                        // }
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
                    <MoreOutlined />
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
