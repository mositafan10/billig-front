import React from "react";
import { Col, Row } from "antd";
import add_trip from "../media/traveler_guide/add_trip.svg";
import chat from "../media/traveler_guide/chat.svg";
import make_offer from "../media/traveler_guide/make_offer.svg";
import deliverd from "../media/traveler_guide/deliverd.svg";
import buy from "../media/traveler_guide/buy.svg";

const travel_guide = { color: "white" };
const style_icon1 = { width: "30%", display: "inline" };

const card_style_travel = {
    borderRadius: "20px 10px 20px 10px",
    border: "solid",
    borderWidth: "0.5px",
    borderColor: "#707070",
    padding: "20px 20px 20px 20px",
    backgroundColor: "#46A0AE",
    color: "white",
    textAlign: "justify",
    lineHeight: "25px",
    height: "auto",
  };

const TravelerLanding = () => {
  return (
      <div>
<Row style={{ justifyContent: "center", display: "flex" }}>
          <Col span={2}>
            <h1
              style={{
                backgroundColor: "#46A0AE",
                color: "white",
                fontSize: "26px",
                textAlign: "center",
                border: "2px solid",
                borderRadius: "20px",
                padding: "5px",
              }}
            >
              مسافر
            </h1>
          </Col>
          <Col span={24}>
            <h2 style={{ textAlign: "center" }}>
              
              می‌خواهم بسته دیگران را به مقصد برسانم.
            </h2>
          </Col>
        </Row>
        <Divider style={{ opacity: "0" }} />
        <Row style={{ textAlign: "center" }}>
          <Col span={2}></Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
            <Card
              style={{ backgroundColor: "white" }}
              bordered={false}
              cover={
                <img alt="billlig.com" src={add_trip} style={style_icon1} />
              }
            >
              <h3 style={{ paddingBottom: "5px" }}>
                مرحله۱: ثبت نام و ثبت سفر
              </h3>
              <Meta
                style={card_style_travel}
                description={
                  <div style={travel_guide}>
                    در سایت ثبت نام کن و بعد سفرت رو ثبت کن.
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
                <img alt="billlig.com" src={make_offer} style={style_icon1} />
              }
            >
              <h3 style={{ paddingBottom: "5px" }}>مرحله۲: پیشنهاد بذار</h3>
              <Meta
                style={card_style_travel}
                description={
                  <div style={travel_guide}>
                    حالا باید لیست آگهی‌ها رو ببینی و روی آگهی‌ای که می‌خوای
                    پیشنهاد بذاری
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
                style={card_style_travel}
                description={
                  <div style={travel_guide}>
                    حالا باید باتوجه به نیاز آگهی‌دهنده یا یک بسته رو از
                    صاحب‌بسته تحویل بگیری و با خودت بیاری یا اگه لازم باشه خودت
                    بخریش و بیاریش .
                  </div>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
            <Card
              style={{ backgroundColor: "white" }}
              bordered={false}
              cover={<img alt="billlig.com" src={buy} style={style_icon1} />}
            >
              <h3 style={{ paddingBottom: "5px" }}>مرحله۴: دریافت و حمل </h3>
              <Meta
                style={card_style_travel}
                description={
                  <div style={travel_guide}>
                    حالا باید باتوجه به نیاز آگهی‌دهنده یا یک بسته رو از
                    صاحب‌بسته تحویل بگیری و با خودت بیاری یا اگه لازم باشه خودت
                    بخریش و بیاریش.
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
                <img alt="billlig.com" src={deliverd} style={style_icon1} />
              }
            >
              <h3 style={{ paddingBottom: "5px" }}>
                مرحله۵: تحویل و دریافت دستمزد
              </h3>

              <Meta
                style={card_style_travel}
                description={
                  <div style={travel_guide}>
                    حالا باید بسته رو به صاحبش تحویل بدی و دستمزدت رو از بیلیگ
                    دریافت کنی
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
        </div>

  );
};

export default TravelerLanding;