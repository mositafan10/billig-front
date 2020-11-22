import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Divider, Button, Space } from "antd";
import image from "../media/HowtoWork.svg";

const HowToWork = () => {
  window.scrollTo(0, 0);
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
            src={image}
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
            <b>با بیلیگ فاصله ها رو کم کن</b>
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
            بصورت کلی بیلیگ با متصل کردن کسی که قصد سفر داره به کسی که قصد خرید
            یا پست به از خارج یا داخل کشور رو داره، شکل می‌گیره .نحوه کارکرد
            بیلیگ بسیار هدایت شده است تا از هرگونه مشکل احتمالی جلوگیری شود
          </p>
          <p style={{ fontSize: "15px" }}>
            <b>برای آشنایی با مراحل کار به لینک‌های زیر مراجعه فرمایید:</b>
          </p>
          <div>
            <Space style={{ display: "flex", textAlign: "center" }}>
              <Link to={"/traveler"}>
                <Button
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#46A0AE",
                    color: "white",
                  }}
                >
                  راهنمای مسافر
                </Button>
              </Link>
              <Link to={"/billliger"}>
                <Button
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#FCA468",
                    color: "white",
                  }}
                >
                  راهنمای بیلیگر
                </Button>
              </Link>
            </Space>
            <Divider style={{ opacity: "0" }} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HowToWork;
