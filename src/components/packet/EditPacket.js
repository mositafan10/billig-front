import React, { Component } from "react";
import { Button, Modal } from "antd";
import PacketForEdit from "./PacketForEdit";
import Axios from "axios";
import { config } from "../../Constant";
import { Breakpoint } from "react-socks";

var url = config.url.API_URL;

class EditPacket extends Component {
  state = {
    edit_visible: false,
    packet: {},
  };

  offerlistmodal = () => {
    const token = localStorage.getItem("token");
    const packet_id = this.props.data;
    Axios.get(`${url}api/v1/advertise/packet/${packet_id}/`, {
      headers: { Authorization: `Token ${token}`},
    })
      .then((res) => {
        this.setState({
          packet: res.data,
          edit_visible: true,
        });
      })
      .catch((error) => console.error(error));
  };

  handleCancel = () => {
    this.setState({
      edit_visible: false,
    });
  };
  
  update = () => {
    this.props.update();
  };

  render() {
    return (
      <div>
        <Button
          style={{ border: "hidden", fontSize: "14px", borderRadius: "10px" }}
          onClick={this.offerlistmodal}
        >
          ویرایش
        </Button>
        <Breakpoint medium up>
          <Modal
            visible={this.state.edit_visible}
            title="ویرایش آگهی"
            onOk={this.handleCancel}
            onCancel={this.handleCancel}
            okText="بازگشت"
            okButtonProps={{ textAlign: "center" }}
            cancelButtonProps={{ hidden: "true" }}
            style={{
              fontFamily: "VazirD",
              textAlign: "center",
              overflow: "hidden",
              borderRadius: "10px",
            }}
            width="60%"
            bodyStyle={{ borderRadius: "20px" }}
            maskStyle={{ borderRadius: "20px" }}
          >
            <PacketForEdit
              updatelist={this.update}
              cancle={this.handleCancel}
              data={this.state.packet}
            />
          </Modal>
        </Breakpoint>
        <Breakpoint small down>
          <Modal
            visible={this.state.edit_visible}
            title="ویرایش آگهی"
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
            width="100%"
            bodyStyle={{ borderRadius: "20px" }}
            maskStyle={{ borderRadius: "20px" }}
          >
            <PacketForEdit
              updatelist={this.update}
              cancle={this.handleCancel}
              data={this.state.packet}
            />
          </Modal>
        </Breakpoint>
      </div>
    );
  }
}

export default EditPacket;
