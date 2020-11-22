import React, { Component } from "react";
import Axios from "axios";
import { Button, Divider, Col, Row, notification, Card } from "antd";
import { config } from "../../Constant";
import { Link } from "react-router-dom";

var url = config.url.API_URL;
const style_left = { display: "flex", justifyContent: "flex-end" };
const style_right = { display: "flex", justifyContent: "right" };


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
      { headers: { Authorization: `Token ${token1}` } }
    )
      .then((res) => { 
          setTimeout(() => {
            this.setState({ loading: false })
            window.location.replace("/profile/payment")
        }, 4000);
        notification['success']({
          message: 'پرداخت شما با موفقیت انجام شد',
          style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content"},
          duration:3.5,
        });
      })
      .catch((error) => 
      notification['errors']({
        message: error.response.data.detail,
        style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content"},
        duration:3.5,
      })
      );
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
          <Card
              style={{ borderRadius: "20px"}}
              title="اطلاعات پرداخت"
            > 
              <Row style={style_right}>
                <Col
                  style={style_right}
                  xs={14}
                  sm={14}
                  md={14}
                  lg={14}
                  xl={14}
                >
                  <h4>شماره پیگیری</h4>
                </Col>
                <Col style={style_left} xs={10} sm={10} md={10} lg={10} xl={10}>
                </Col>
              </Row>
              <Row style={style_right}>
                <Col
                  style={style_right}
                  xs={14}
                  sm={14}
                  md={14}
                  lg={14}
                  xl={14}
                >
                  <h4>مبلغ تراکنش</h4>
                </Col>
                <Col style={style_left} xs={10} sm={10} md={10} lg={10} xl={10}>
                </Col>
              </Row>
              <Row style={style_right}>
                <Col
                  style={style_right}
                  xs={14}
                  sm={14}
                  md={14}
                  lg={14}
                  xl={14}
                >
                  <h4>تاریخ تراکنش</h4>
                </Col>
                <Col style={style_left} xs={10} sm={10} md={10} lg={10} xl={10}>
                </Col>
              </Row>
            </Card>
        </div>
      );
    }
  }
}

export default VerifyTransaction;
