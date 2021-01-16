import React, { Component } from "react";
import { Button, Modal, notification } from "antd";
import Axios from "axios";
import { config } from "../../Constant";

var url = config.url.API_URL;
const callback_url = "https://billlig.com/payment/verify/";

class SendTransactionInfo extends Component {
  state = {
    token: "",
    visible: false,
    net_amount: 0
  };

  handleOkinfo = () => {
    this.setState({ visible: false });
  };

  showInfo = () => {
    this.setState({
      visible: true,
    });
  };

  cancleInfo = () => {
    this.setState({
      visible: false,
    });
  };

  currency = (value) => {
    const p = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return p;
  };

  sendapi = () => {
    this.setState({ visible: true });
    const fee = this.props.fee;
    const token = localStorage.getItem("token");
    const amount_w = this.props.amount;
    const net_amount = (1 + fee / 100) * amount_w * 10;
    this.setState({net_amount:net_amount});
    Axios.post(
      `${url}api/v1/payment/send/`,
      {
        amount: net_amount,
        callback_url: callback_url,
        factorNumber: this.props.factorNumber,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then((res) => {
        if (res.data.status === 1) {
          return (
            this.setState({ token: res.data.token }),
            window.location.replace(
              `https://ipg.vandar.io/v3/${res.data.token}`
            )
          );
        }
      })
      .catch((error) => {
        notification["error"]({
          message: error.reponse.data.error,
          description:
            "در مورد مبلغ مورد نظر خودتان با مسافر مذاکره کنید تا مبلغ پیشنهادی اصلاح شود",
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          closeIcon: " ",
          duration: 5,
        });
      });
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.showInfo.bind(this)}
          style={{
            fontSize: "12px",
            border: "hidden",
            backgroundColor: "green",
            color: "white",
            borderRadius: "10px",
          }}
        >
          تایید و پرداخت
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={this.sendapi}
          style={{ fontFamily: "VazirD" }}
          cancelText="انصراف"
          okText="پرداخت"
          width="70%"
          title={
            <p style={{textAlign:"center"}}>
              طبق قوانین بیلیگ،‌ به میزان {this.props.fee} درصد به مبلغ تایید
              شده به عنوان کارمزد افزوده خواهد شد.
              <br /> مبلغ پرداختی شما {this.currency(this.state.net_amount)} خواهد بود
            </p>
          }
        ></Modal>
      </div>
    );
  }
}

export default SendTransactionInfo;
