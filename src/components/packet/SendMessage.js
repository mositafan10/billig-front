import React from "react";
import Axios from "axios";
import { Button } from "antd";
import { config } from "../../Constant";
import ChatDetail from "../chat/ChatDetail";

var url = config.url.API_URL;

class SendMessage extends React.Component {
  state = {
    messageModal: false,
    chatID: "",
    visible: false,
    info: {},
  };

  show_modal = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const receiver = this.props.receiver;
    const sender = this.props.sender;
    const person = user == sender ? receiver : sender;

    Axios.post(
      `${url}api/v1/chat/conversation/`,
      {
        receiver: person,
        offer: this.props.slug,
      },
      { headers: { Authorization: `Token ${token}` } }
    )

      .then((res) => {
        Axios.get(`${url}api/v1/chat/conversation/${res.data.id}`, {
          headers: { Authorization: `Token ${token}` },
        }).then((res) => this.setState({ info: res.data }));
        this.setState({
          chatID: res.data.id,
          visible: true,
        });
      })
      .catch((error) => console.error(error));
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  callbackFunction1 = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          onClick={this.show_modal}
          style={{
            fontSize: "12px",
            backgroundColor: "white",
            color: "black",
            borderRadius: "10px",
          }}
        >
          چت
        </Button>
        <ChatDetail
          data={this.state.chatID && this.state.chatID}
          sender_avatar={this.state.info.sender_avatar}
          receiver_avatar={this.state.info.receiver_avatar}
          sender_slug={this.state.info.sender_slug}
          receiver_slug={this.state.info.receiver_slug}
          sender_name={this.state.info.sender_name}
          receiver_name={this.state.info.receiver_name}
          is_active = {this.state.info.is_active}
          visible={this.state.visible}
          parentCallback={this.callbackFunction1}
        />
      </div>
    );
  }
}

export default SendMessage;
