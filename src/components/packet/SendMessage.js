import React from "react";
import Axios from "axios";
import { Button, Modal, Form, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { config } from "../../Constant";
import { Link } from "react-router-dom";
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
    const receiver = this.props.data;
    Axios.post(
      `${url}api/v1/chat/conversation/`,
      {
        receiver: receiver,
        offer: this.props.slug,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        Axios.get(`${url}api/v1/chat/conversation/${res.data.id}`, {
          headers: { Authorization: `Bearer ${token}` },
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
          visible={this.state.visible}
          offer={this.state.info.offer_state}
          avatar1={this.state.info.sender_avatar}
          avatar2={this.state.info.receiver_avatar}
          sender={this.state.info.sender}
          receiver={this.state.info.receiver}
          sender_name={this.state.info.sender_name}
          receiver_name={this.state.receiver_name}
          parentCallback={this.callbackFunction1}
        />
      </div>
    );
  }
}

export default SendMessage;
