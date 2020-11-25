import React, { Component } from "react";
import Axios from "axios";
import { Button, Divider, Col, Row, notification, Card, Spin } from "antd";
import { config } from "../../Constant";
import { Link } from "react-router-dom";

var url = config.url.API_URL;
const style_left = { display: "flex", justifyContent: "flex-end", fontSize:"14px" };
const style_right = { display: "flex", justifyContent: "right", fontSize:"14px" };

class VerifyTransaction extends Component {
  state = {
    payment_status: "",
    token: "",
    loading: false,
    paymentDate: "",
    cardNumber: "",
    transId: "",
    amount: "",
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get("token");
    const payment_status = query.get("payment_status");
    this.setState({
      payment_status: payment_status,
      token: token,
    });
    setTimeout(() => {
      this.verify()
    }, 1000);
  }

  verify = () => {
    const token1 = localStorage.getItem("token");
    Axios.post(
      `${url}api/v1/payment/verify/`,
      {
        token: this.state.token,
      },
      { headers: { Authorization: `Token ${token1}` } }
    )
      .then((res) => {
        setTimeout((res) => {
          this.setState({ 
            amount: res.data.amount,
            transID: res.data.transID,
            cardNumber: res.data.cardNumber,
            paymentDate: res.data.paymentDate,
            loading: false });
        }, 4000);
        notification["success"]({
          message: "پرداخت شما با موفقیت انجام شد",
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 3.5,
        });
      })
      .catch((error) =>
        notification["errors"]({
          message: error.response.data.detail,
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 3.5,
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
        <div >
          {this.state.loading ? (
            <div style={{ marginTop: "100px" }}>
              <Spin />
            </div>
          ) : (
            <div>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0 20px",
            }}
          >
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} style={{textAlign:"center"}}>
              <Link to={`/profile/payment`}>
              <Button
                loading={this.state.loading}
                style={{
                  borderRadius: "10px",
                  backgroundColor: "green",
                  color: "white",
                  fontSize:"16px"
                }}
              >
               لیست پرداخت‌ها
              </Button>
              </Link>
            </Col>
            </Row>
            <Row style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0 20px",
            }}>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} style={{textAlign:"center"}}>
              <Card style={{ borderRadius: "20px", fontSize:"20px" }} title="اطلاعات پرداخت">
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
                  <Col
                    style={style_left}
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    {this.state.transID}
                  </Col>
                </Row>
                <Divider/>
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
                  <Col
                    style={style_left}
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    {this.state.amount}
                  </Col>
                </Row>
                <Divider/>
                <Row style={style_right}>
                  <Col
                    style={style_right}
                    xs={14}
                    sm={14}
                    md={14}
                    lg={14}
                    xl={14}
                  >
                    <h4>شماره کارت</h4>
                  </Col>
                  <Col
                    style={style_left}
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    {this.state.cardNumber}
                  </Col>
                </Row>
                <Divider/>
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
                  <Col
                    style={style_left}
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    {this.state.paymentDate}
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          </div>
          )}
        </div>
      );
    }
  }
}

export default VerifyTransaction;
