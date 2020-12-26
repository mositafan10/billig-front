import React from "react";
import { Col, Row } from "antd";
import ChatContacs from "../components/chat/ChatContacs";
import ChatBox from "../media/chat.svg";

class InboxLayout extends React.Component {
  render() {
    window.scroll(0, 0);
    return (
      <div style={{ backgroundColor: "white", overflowY: "hidden" }}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={7} xl={7} xxl={7}>
            <ChatContacs/>
          </Col>
          <Col xs={0} sm={0} md={0} lg={16} xl={16} xxl={16}>
            <div style={{ alignContent: "center", margin: "40px 0" }}>
              <img
                alt="billlig.com"
                src={ChatBox}
                style={{ width: "60%", height: "auto" }}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default InboxLayout;
