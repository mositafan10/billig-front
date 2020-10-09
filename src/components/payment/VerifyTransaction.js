import React, { Component } from "react";
import Axios from "axios";
import { Button, Divider, message, notification } from "antd";
import { config } from "../../Constant";
import { Link } from "react-router-dom";

var url = config.url.API_URL;

class VerifyTransaction extends Component {
  state = {
    payment_status: "",
    token: "",
    loading: false,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get("token");
    const payment_status = query.get("payment_status");
    this.setState({
      payment_status: payment_status,
      token: token,
    });
  }

  verify = () => {
    const token1 = localStorage.getItem("token");
    this.setState({ loading: true });
    Axios.post(
      `${url}api/v1/payment/verify/`,
      {
        token: this.state.token,
      },
      { headers: { Authorization: `Bearer ${token1}` } }
    )
      .then((res) => { 
          setTimeout(() => {
            this.setState({ loading: false })
            window.location.replace("/profile/payment")
        }, 4000);
        notification['success']({
          message: 'پرداخت شما با موفقیت انجام شد',
          style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content", marginTop:"70px"},
          duration:3.5,
        });
      })
      .catch((error) => message.error(error.response.data.error));
  };

  render() {
    if (this.state.payment_status !== "OK") {
      return (
        <div>
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0 20px",
            }}
          >
            عملیات ناموفق
          </p>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0 20px",
            }}
          >
            <Link to="/profile/">
              <Button
                style={{
                  borderRadius: "15px",
                  backgroundColor: "green",
                  color: "white",
                }}
              >
                بازگشت به پروفایل
              </Button>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0 20px",
          }}
        >
          <Button
            loading={this.state.loading}
            style={{
              borderRadius: "15px",
              backgroundColor: "green",
              color: "white",
            }}
            onClick={this.verify.bind(this)}
          >
            تکمیل فرآیند خرید
          </Button>
        </div>
      );
    }
  }
}

export default VerifyTransaction;
