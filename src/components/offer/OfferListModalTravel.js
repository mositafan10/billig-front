import React from "react";
import { Button, Modal } from "antd";
import { Breakpoint } from "react-socks";
import UserOffer from './Useroffer';

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
            پیشنهادها
          </Button>
          <span>{this.props.count}</span>
          <Modal
            visible={this.state.offer_visible}
            title="پیشنهادهای ارسالی"
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
            <UserOffer travel={this.props.travel} />
          </Modal>
        </Breakpoint>
        <Breakpoint small down>
          <Button
            style={{border: "hidden", fontSize: "14px", borderRadius: "10px" }}
            onClick={this.drawerofferlist}
          >
          پیشنهادها : <span style={{marginRight:"3px"}}> {this.props.count} </span>
          </Button>
          <Modal
            title="پیشنهاد‌های ارسالی"
            okText="بازگشت"
            cancelButtonProps={{ hidden: "true" }}
            onOk={this.handleCancel}
            onCancel={this.handleCancel}
            width="100%"
            bodyStyle={{ borderRadius: "20px"}}
            visible={this.state.drawer_visible}
            style={{ textAlign: "right", fontFamily: "VazirD" }}
          >
              <UserOffer travel={this.props.travel} />
          </Modal>
        </Breakpoint>
      </div>
    );
  }
}

export default OfferListModal;
