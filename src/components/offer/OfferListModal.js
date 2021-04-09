import React from "react";
import { Modal } from "antd";
import PacketOffer from "../packet/PacketOffer";
import { Redirect } from "react-router-dom";
import { Breakpoint } from "react-socks";
import { config } from "../../Constant";
import Axios from "axios";
import { socket } from "../../socket";

var url = config.url.API_URL;
const token = localStorage.getItem("token");

class OfferListModal extends React.Component {
  state = {
    shouldRedirect: false,
    buy: false,
    packetOffer: [],
    loading: true,
  };

  componentDidMount() {
    this.getPacketOffer();
    const userID = localStorage.getItem("user");
    setTimeout(() => {
      for (var i = 0; i < this.state.packetOffer.length; i++) {
        const element = this.state.packetOffer[i].slug;
        socket.emit("createJoinOfferRoom", {
          offerID: element,
          userID: userID,
        });
      }
    }, 1000);
    socket.on("updateOffer", () => {
      this.getPacketOffer();
    });
  }

  getPacketOffer = () => {
    const packetID = this.props.match.params.packetID;
    Axios.get(`${url}api/v1/advertise/offers/${packetID}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        this.setState({
          packetOffer: res.data,
          loading: false,
        });
      })
      .catch((error) => console.error(error));
  };

  handleCancel = () => {
    this.setState({
      shouldRedirect: true,
    });
  };

  render() {
    const packetID = this.props.match.params.packetID;
    if (this.state.shouldRedirect) {
      return <Redirect push to="/profile/mypacket" />;
    }
    return (
      <div>
        <Breakpoint medium up>
          <Modal
            visible={true}
            title="پیشنهاد‌های دریافت شده"
            onOk={this.handleCancel}
            onCancel={this.handleCancel}
            closable={false}
            okText="بازگشت"
            okButtonProps={{
              textAlign: "center",
              style: { position: "unset" },
            }}
            cancelButtonProps={{ hidden: "true" }}
            style={{
              fontFamily: "VazirD",
              textAlign: "center",
              overflow: "hidden",
              borderRadius: "20px",
            }}
            width="90%"
            bodyStyle={{ borderRadius: "15px" }}
          >
            <PacketOffer
              data={this.state.packetOffer}
              buy={packetID.charAt(0) === "b"}
              loading={this.state.loading}
            />
          </Modal>
        </Breakpoint>
        <Breakpoint small down>
          <Modal
            title="پیشنهاد‌های دریافت شده"
            okText="بازگشت"
            cancelButtonProps={{ hidden: "true" }}
            onOk={this.handleCancel}
            onCancel={this.handleCancel}
            width="100%"
            bodyStyle={{ borderRadius: "20px" }}
            visible={true}
            style={{ textAlign: "right", fontFamily: "VazirD", overflow:"hidden", borderRadius: "15px"}}
          >
            <div>
              <PacketOffer
                data={this.state.packetOffer}
                buy={packetID.charAt(0) === "b"}
              />
            </div>
          </Modal>
        </Breakpoint>
      </div>
    );
  }
}

export default OfferListModal;
