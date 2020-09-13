import React, { Component } from "react";
import { Col, Row, Divider, Space, Button } from "antd";
import travelguide from "../media/travelguide.svg";

class BuyGuide extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={2}></Col>
          <Col
            xs={22}
            sm={22}
            md={22}
            lg={10}
            xl={10}
            xxl={10}
            style={{ textAlign: "center" }}
          >
            <img
              alt="billlig.com"
              src={travelguide}
              style={{ width: "70%", height: "auto" }}
            />
            <Divider style={{ opacity: "0" }} />
          </Col>
          <Col xs={1} sm={1} md={1} lg={0} xl={0} xxl={0}></Col>
          <Col xs={1} sm={1} md={1} lg={0} xl={0} xxl={0}></Col>
          <Col
            xs={22}
            sm={22}
            md={22}
            lg={10}
            xl={10}
            xxl={10}
            style={{ lineHeight: "30px" }}
          >
            <Divider style={{ opacity: "0" }} />
            <h1>
              <b>بدون نگرانی در مورد هزینه‌های سفر
با خرید و جابه‌جایی بسته آسوده به
 هر جا می‌خواهید سفر کنید.
</b>
              <hr />
            </h1>
            <p
              style={{
                fontSize: "15px",
                padding: "20px 0",
                lineHeight: "35px",
                textAlign: "justify",
              }}
            >
              بصورت کلی بیلیگ با متصل کردن کسی که قصد سفر داره به کسی که قصد
              خرید یا پست به از خارج یا داخل کشور رو داره، شکل می‌گیره .نحوه
              کارکرد بیلیگ بسیار هدایت شده است تا از هرگونه مشکل احتمالی جلوگیری
              شود
            </p>
            <p style={{ fontSize: "15px" }}>
              <b>برای آشنایی با مراحل کار به لینک‌های زیر مراجعه فرمایید:</b>
            </p>
            <div>
              <Space direction="horizontal">
                <Button
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#46a0ae",
                    color: "white",
                  }}
                >
                  {" "}
                  قصد سفر دارم{" "}
                </Button>
                <Button
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#46a0ae",
                    color: "white",
                  }}
                >
                  {" "}
                  قصد ارسال بسته دارم{" "}
                </Button>
                <Button
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#46a0ae",
                    color: "white",
                  }}
                >
                  {" "}
                  قصد خرید دارم{" "}
                </Button>
              </Space>
            </div>
          </Col>
          <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={2}></Col>
        </Row>
      </div>
    );
  }
}

export default BuyGuide;
