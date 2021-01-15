import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

class SendMessage extends React.Component {
  state = {
    messageModal: false,
    chatID: "",
    visible: false,
    info: {},
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
        <Link to={`/profile/inbox/${this.props.slug}`}>
          <Button
            style={{
              fontSize: "12px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "10px",
            }}
          >
            چت
          </Button>
        </Link>
      </div>
    );
  }
}

export default SendMessage;
