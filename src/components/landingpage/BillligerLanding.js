import React from "react";
import { Col, Row } from "antd";
import Offer_accept from "../media/Packet_guide/Offer_accept.svg";
import Payment from "../media/Packet_guide/Payment.svg";
import Receive_parcel from "../media/Packet_guide/Receive_parcel.svg";
import Register from "../media/Packet_guide/Register.svg";

const style_icon1 = { width: "30%", display: "inline" };

const card_style_packet = {
    borderRadius: "20px 10px 20px 10px",
    border: "solid",
    borderWidth: "0.5px",
    borderColor: "#707070",
    padding: "20px 20px 20px 20px",
    backgroundColor: "#FCA468",
    color: "white",
    textAlign: "justify",
    lineHeight: "25px",
    height: "auto",
  };

const BillligerLanding = () => {
  return (
      <div>
        <Row style={{ justifyContent: "center", display: "flex" }}>
          <Col span={2}>
            <h1
              style={{
                backgroundColor: "#FCA468",
                color: "white",
                fontSize: "26px",
                textAlign: "center",
                border: "2px solid",
                borderRadius: "20px",
                padding: "5px",
              }}
            >
              آگهی‌دهنده
            </h1>
          </Col>
          <Col span={24}>
            <h2 style={{ textAlign: "center" }}>
              
              می‌خواهم بسته‌ای را پست کنم.
            </h2>
          </Col>
        </Row>
        <Divider style={{ opacity: "0" }} />
        <Row
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
            <Card
              style={{ backgroundColor: "white" }}
              bordered={false}
              cover={
                <img alt="billlig.com" src={Register} style={style_icon1} />
              }
            >
              <h3 style={{ paddingBottom: "5px" }}>
                مرحله۱: ثبت نام و ثبت آگهی
              </h3>
              <Meta
                style={card_style_packet}
                description={
                  <div style={travel_guide}>
                    در سایت ثبت نام کن و آگهی خودت رو ثبت کن..
                  </div>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
            <Card
              style={{ backgroundColor: "white" }}
              bordered={false}
              cover={
                <img alt="billlig.com" src={Offer_accept} style={style_icon1} />
              }
            >
              <h3 style={{ paddingBottom: "5px" }}>
                مرحله۲: دریافت پیشنهاد و مذاکره
              </h3>
              <Meta
                style={card_style_packet}
                description={
                  <div style={travel_guide}>
                    حالا باید صبر کنی تا مسافرها روی آگهیت پیشنهاد بذارن و
                    باهاشون سر قیمت و بقیه مسائل توافق کنی
                  </div>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
            <Card
              style={{ backgroundColor: "white" }}
              bordered={false}
              cover={<img alt="billlig.com" src={chat} style={style_icon1} />}
            >
              <h3 style={{ paddingBottom: "5px" }}>مرحله ۳: مذاکره </h3>
              <Meta
                style={card_style_packet}
                description={
                  <div style={travel_guide}>
                    درصورتی که پیشنهاد مسافر رو قبول کنید حالا باید در مورد
                    دستمزد، محل تحویل و ... مذاکره کنید و به توافق برسید..
                  </div>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
            <Card
              style={{ backgroundColor: "white" }}
              bordered={false}
              cover={
                <img alt="billlig.com" src={Payment} style={style_icon1} />
              }
            >
              <h3 style={{ paddingBottom: "5px" }}>مرحله۴: پرداخت </h3>
              <Meta
                style={card_style_packet}
                description={
                  <div style={travel_guide}>
                    همان‌طور که می‌دانید بسیاری از فروشگاه‌های خارجی باشد تا
                    کالاهای اورجینال را با تخفیف بالا بخرید.
                  </div>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
            <Card
              style={{ backgroundColor: "white" }}
              bordered={false}
              cover={
                <img
                  alt="billlig.com"
                  src={Receive_parcel}
                  style={style_icon1}
                />
              }
            >
              <h3 style={{ paddingBottom: "5px" }}>مرحله۵: دریافت بسته </h3>
              <Meta
                style={card_style_packet}
                description={
                  <div style={travel_guide}>
                    حالا باید منتظر بمونی تا به زودی مسافر از راه برسه و بسته رو
                    برات بیاره
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
    </div>
  );
};

export default BillligerLanding;
