import React from "react";
import { Link } from 'react-router-dom';
import { Button, Modal, Drawer } from "antd";
import PacketOffer from "../packet/PacketOffer";
import { Breakpoint } from "react-socks";

class OfferListModal extends React.Component {
  state = {
    offer_visible: false,
    drawer_visible: false
  };

  offerlistmodal = () => {
    this.setState({
      offer_visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      offer_visible: false,
      drawer_visible: false
    });
  };
  
  drawerofferlist = () => {
      this.setState({
        drawer_visible: true
      })
  }

  render() {
    return (
      <div>
        <Breakpoint medium up>
          <Button
            style={{ border: "hidden", fontSize: "12px", borderRadius: "10px" }}
            onClick={this.offerlistmodal}
          >
            {" "}
            پیشنهادها{" "}
          </Button>{" "}
          <span>{this.props.count}</span>
          <Modal
            visible={this.state.offer_visible}
            title=" پیشنهادها"
            onOk={this.handleCancel}
            onCancel={this.handleCancel}
            okText="بازگشت"
            okButtonProps={{ textAlign: "center" }}
            cancelButtonProps={{ hidden: "true" }}
            style={{
              fontFamily: "IRANSans",
              textAlign: "center",
              overflow: "hidden",
              borderRadius: "10px",
            }}
            width="80%"
            bodyStyle={{ borderRadius: "20px" }}
            maskStyle={{ borderRadius: "20px" }}
          >
            <PacketOffer data={this.props.data} />
          </Modal>
        </Breakpoint>
        <Breakpoint small down>
          <Button
            style={{ border: "hidden", fontSize: "12px", borderRadius: "10px" }}
            onClick={this.drawerofferlist}
          >
            {" "}
            پیشنهادها{" "}
          </Button>{" "}
          <span>{this.props.count}</span>
          <Drawer
            title="بیلیگ"
            placement="right"
            // closable={false}
            onClose={this.handleCancel}
            width="80%"
            visible={this.state.drawer_visible}
            style={{ textAlign: "right", fontFamily: "VazirD" }}
          >
            <div>
            <PacketOffer data={this.props.data} />
            </div>
          </Drawer>
        </Breakpoint>
      </div>
    );
  }
}

export default OfferListModal;
