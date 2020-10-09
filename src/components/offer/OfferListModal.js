import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Drawer } from "antd";
import PacketOffer from "../packet/PacketOffer";
import { Breakpoint } from "react-socks";

class OfferListModal extends React.Component {
  state = {
    offer_visible: false,
    drawer_visible: false,
  };

  offerlistmodal = () => {
    this.setState({
      offer_visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      offer_visible: false,
      drawer_visible: false,
    });
  };

  drawerofferlist = () => {
    this.setState({
      drawer_visible: true,
    });
  };

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
            closable={false}
            okText="بازگشت"
            okButtonProps={{ textAlign: "center", style:{position:"unset"} }}
            cancelButtonProps={{ hidden: "true" }}
            style={{
              fontFamily: "VazirD",
              textAlign: "center",
              overflow: "hidden",
              borderRadius: "20px",
            }}
            width="80%"
            bodyStyle={{ borderRadius: "20px"}}
          >
            <PacketOffer data={this.props.data} />
          </Modal>
        </Breakpoint>
        <Breakpoint small down>
          <Button
            style={{fontSize: "14px", borderRadius: "10px" }}
            onClick={this.drawerofferlist}
          >
          مشاهده پیشنهادها : <span style={{marginRight:"3px"}}> {this.props.count} </span>
          </Button>
          
          <Modal
            title="پیشنهاد‌های آگهی"
            okText="بازگشت"
            cancelButtonProps={{ hidden: "true" }}
            onOk={this.handleCancel}
            onCancel={this.handleCancel}
            width="100%"
            bodyStyle={{ borderRadius: "20px"}}
            visible={this.state.drawer_visible}
            style={{ textAlign: "right", fontFamily: "VazirD" }}
          >
            <div>
              <PacketOffer data={this.props.data} />
            </div>
          </Modal>
        </Breakpoint>
      </div>
    );
  }
}

export default OfferListModal;
