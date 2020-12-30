import React from "react";
import { Button, Modal } from "antd";
import { Breakpoint } from "react-socks";
import UserOffer from "./Useroffer";
import { config } from "../../Constant";
import Axios from "axios";
import { socket } from "../../socket";
import { Redirect } from "react-router-dom";

var url = config.url.API_URL;
const token = localStorage.getItem("token");

class OfferListModalTravel extends React.Component {
  state = {
    shouldRedirect: false,
    travelOffer: [],
    loading: true,
  };

  componentDidMount() {
    this.getTravelOffer();
    const userID = localStorage.getItem("user");
    setTimeout(() => {
      for (var i = 0; i < this.state.travelOffer.length; i++) {
        const element = this.state.travelOffer[i].slug;
        socket.emit("createJoinOfferRoom", {
          offerID: element,
          userID: userID,
        });
      }
    }, 1000);
    socket.on("updateOffer", () => {
      this.getTravelOffer();
    });
  }

  getTravelOffer = () => {
    const travelID = this.props.match.params.travelID;
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/advertise/getuseroffer/${travelID}`, {
      headers: { Authorization: `Token ${token}` },
    }).then((res) =>
      this.setState({
        travelOffer: res.data,
        loading: false,
      })
    );
  };

  handleCancel = () => {
    this.setState({
      shouldRedirect: true,
    });
  };

  render() {
    if (this.state.shouldRedirect) {
      return <Redirect push to="/profile/mytravel" />;
    }
    return (
      <div>
        <Breakpoint medium up>
          <Modal
            visible={true}
            title="پیشنهادهای ارسالی"
            onOk={this.handleCancel}
            onCancel={this.handleCancel}
            closable={false}
            okText="بازگشت"
            okButtonProps={{
              textAlign: "center",
            }}
            cancelButtonProps={{ hidden: "true" }}
            style={{
              fontFamily: "VazirD",
              textAlign: "center",
              overflow: "hidden",
              borderRadius: "20px",
            }}
            width="90%"
          >
            <UserOffer
              data={this.state.travelOffer}
              loading={this.state.loading}
              update={this.getTravelOffer}
            />
          </Modal>
        </Breakpoint>
        <Breakpoint small down>
          <Modal
            title="پیشنهاد‌های ارسالی"
            okText="بازگشت"
            cancelButtonProps={{ hidden: "true" }}
            onOk={this.handleCancel}
            onCancel={this.handleCancel}
            width="100%"
            bodyStyle={{ borderRadius: "20px" }}
            visible={true}
            style={{ textAlign: "right", fontFamily: "VazirD" }}
          >
            <UserOffer
              data={this.state.travelOffer}
              loading={this.state.loading}
              update={this.getTravelOffer}
            />
          </Modal>
        </Breakpoint>
      </div>
    );
  }
}

export default OfferListModalTravel;
