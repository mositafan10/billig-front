import React from "react";
import { Col, Row, Carousel, Card, Tabs } from "antd";
import OfferAccept from "../../media/PacketGuide/OfferAccept.svg";
import chat from "../../media/traveler_guide/chat.svg";
import Payment from "../../media/PacketGuide/Payment.svg";
import Receive_parcel from "../../media/PacketGuide/Receive_parcel.svg";
import Register from "../../media/PacketGuide/Register.svg";
import add_trip from "../../media/traveler_guide/add_trip.svg";
import make_offer from "../../media/traveler_guide/make_offer.svg";
import deliverd from "../../media/traveler_guide/deliverd.svg";
import buy from "../../media/traveler_guide/buy.svg";
import { Breakpoint } from "react-socks";
const { Meta } = Card;
const { TabPane } = Tabs;
const center = {display:"center", justifyContent:"center"}
const travel_guide = { color: "black" };
const style_icon1 = { width: "30%", display: "inline" };
const h_style = { paddingBottom: "5px", textAlign: "center", color: "black" };
const card_icon = {
  backgroundColor: "white",
  textAlign: "center",
  paddingTop: "10px",
};
const card_icon_billliger = {
  backgroundColor: "white",
  textAlign: "center",
  paddingTop: "10px",
};

const card_style_packet = {
  padding: "20px 20px 20px 20px",
  backgroundColor: "white",
  color: "white",
  textAlign: "center",
  lineHeight: "25px",
  height: "auto",
};

const card_style_travel = {
  padding: "20px 20px 20px 20px",
  backgroundColor: "white",
  color: "white",
  textAlign: "center",
  lineHeight: "25px",
  height: "auto",
};

const BillligerLanding = () => {
  return (
    <div>
      <Breakpoint medium up>
        {/* <Carousel autoplay effect="scrollx"> */}
        <Tabs centered animated size="large" type="card" >
        <TabPane tab={<p style={{color:"#ff9a00", padding:"0 10px 0 10px", fontSize:"16px", marginTop:"10px"}}>بیلیگر</p>} key="1">
          <div style={{ backgroundColor: "white" }}>
            <Row
              style={{
                justifyContent: "center",
                display: "flex",
                // backgroundColor: "#FCA468",
              }}
            >
              <Col>
                <h1
                  style={{
                    // backgroundColor: "white",
                    color: "#ff9a00",
                    fontSize: "26px",
                    textAlign: "center",
                    padding: "0 25px 0 25px",
                    marginTop: "20px",
                  }}
                >
                  بیلیگر
                </h1>
              </Col>
              <Col span={24}>
                <h3 style={{textAlign:"center", marginBottom:"20px"}}>می‌خواهم بسته‌ای را پست کنم.</h3>
              </Col>
            </Row>
            <Row
              style={{
                justifyContent: "center",
                display: "flex",
                backgroundColor: "white",
              }}
            >
              <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon_billliger}
                  bordered={false}
                  cover={
                    <img
                      alt="billlig.com"
                      src={Register}
                      style={style_icon1}
                      height="90px"
                    />
                  }
                >
                  <h3 style={h_style}>مرحله ۱ :‌ثبت‌نام و ثبت آگهی</h3>
                  <Meta
                    style={card_style_packet}
                    description={
                      <div style={travel_guide}>
                        در سایت ثبت‌نام کن و آگهی خودت رو ثبت کن{" "}
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon_billliger}
                  bordered={false}
                  cover={
                    <img
                      alt="billlig.com"
                      src={OfferAccept}
                      style={style_icon1}
                    />
                  }
                >
                  <h3 style={h_style}>مرحله ۲ :‌ دریافت پیشنهاد</h3>
                  <Meta
                    style={card_style_packet}
                    description={
                      <div style={travel_guide}>
                        حالا باید صبر کنی تا مسافرها روی آگهیت پیشنهاد بذارن
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon_billliger}
                  bordered={false}
                  cover={
                    <img alt="billlig.com" src={chat} style={style_icon1} />
                  }
                >
                  <h3 style={h_style}>مرحله ۳ : مذاکره </h3>
                  <Meta
                    style={card_style_packet}
                    description={
                      <div style={travel_guide}>
                        در صورتی که پیشنهاد مسافری رو قبول کنی بعد باید در مورد
                        دستمزد، محل تحویل و ... مذاکره کنی و به توافق برسی
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon_billliger}
                  bordered={false}
                  cover={
                    <img alt="billlig.com" src={Payment} style={style_icon1} />
                  }
                >
                  <h3 style={h_style}>مرحله ۴ :‌پرداخت</h3>
                  <Meta
                    style={card_style_packet}
                    description={
                      <div style={travel_guide}>
                        بعد توافق با مسافر باید دستمزد
                        مسافر رو به بیلیگ پرداخت کنی. اگه می‌خوای مسافر خودش
                        برات از اونجا خرید کنه و بیاره، ‌هزینه کالا رو هم باید
                        پرداخت کنی
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon_billliger}
                  bordered={false}
                  cover={
                    <img
                      alt="billlig.com"
                      src={Receive_parcel}
                      style={style_icon1}
                    />
                  }
                >
                  <h3 style={h_style}>مرحله ۵ :‌دریافت بسته </h3>
                  <Meta
                    style={card_style_packet}
                    description={
                      <div style={travel_guide}>
                        حالا باید منتظر بمونی تا مسافر از راه برسه و بسته رو
                        بهت تحویل بده
                      </div>
                    }
                  />
                </Card>
              </Col>
            </Row>
          </div>
          </TabPane>
          <TabPane tab={<p style={{color:"#067fc8", padding:"0 10px 0 10px", fontSize:"16px", marginTop:"10px"}}>مسافر</p>} key="2">
          <div>
            <Row
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Col>
                <h1
                  style={{
                    backgroundColor: "white",
                    color: "#067fc8",
                    fontSize: "26px",
                    textAlign: "center",
                    borderRadius: "20px",
                    padding: "0 25px 0 25px",
                    marginTop: "20px",
                  }}
                >
                  مسافر
                </h1>
              </Col>
              <Col span={24}>
                <h2 style={{ textAlign:"center", marginBottom:"20px"}}>می‌خواهم بسته دیگران را به مقصد برسانم.</h2>
              </Col>
            </Row>
            <Row style={{ textAlign: "center", backgroundColor: "white" }}>
              <Col span={2}></Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon}
                  bordered={false}
                  cover={
                    <img alt="billlig.com" src={add_trip} style={style_icon1} />
                  }
                >
                  <h3 style={h_style}>مرحله ۱ : ثبت نام و ثبت سفر</h3>
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
                  style={card_icon}
                  bordered={false}
                  cover={
                    <img
                      alt="billlig.com"
                      src={make_offer}
                      style={style_icon1}
                    />
                  }
                >
                  <h3 style={h_style}>مرحله ۲ : پیشنهاد بذار</h3>
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
                  style={card_icon}
                  bordered={false}
                  cover={
                    <img alt="billlig.com" src={chat} style={style_icon1} />
                  }
                >
                  <h3 style={h_style}>مرحله ۳: مذاکره </h3>
                  <Meta
                    style={card_style_travel}
                    description={
                      <div style={travel_guide}>
                        حالا باید باتوجه به نیاز آگهی‌دهنده یا یک بسته رو از
                        صاحب‌بسته تحویل بگیری و با خودت بیاری یا اگه لازم باشه
                        خودت بخریش و بیاریش .
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon}
                  bordered={false}
                  cover={
                    <img alt="billlig.com" src={buy} style={style_icon1} />
                  }
                >
                  <h3 style={h_style}>مرحله ۴ : دریافت و حمل </h3>
                  <Meta
                    style={card_style_travel}
                    description={
                      <div style={travel_guide}>
                        حالا باید باتوجه به نیاز آگهی‌دهنده یا یک بسته رو از
                        صاحب‌بسته تحویل بگیری و با خودت بیاری یا اگه لازم باشه
                        خودت بخریش و بیاریش.
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon}
                  bordered={false}
                  cover={
                    <img alt="billlig.com" src={deliverd} style={style_icon1} />
                  }
                >
                  <h3 style={h_style}>مرحله ۵ : تحویل و دریافت دستمزد</h3>

                  <Meta
                    style={card_style_travel}
                    description={
                      <div style={travel_guide}>
                        حالا باید بسته رو به صاحبش تحویل بدی و دستمزدت رو از
                        بیلیگ دریافت کنی
                      </div>
                    }
                  />
                </Card>
              </Col>
            </Row>
          </div>
          </TabPane>
        </Tabs>
      </Breakpoint>
      <Breakpoint small down>
        <div>
          {/* <Row
            style={{
              justifyContent: "center",
              display: "flex",
              backgroundColor: "white",
            }}
          >
            <Col>
              <h1
                style={{
                  // backgroundColor: "#FCA468",
                  color: "#ff9a00",
                  fontSize: "20px",
                  textAlign: "center",
                  padding: "0 15px 0 15px",
                  marginTop: "20px",
                }}
              >
                بیلیگر
              </h1>
              <hr style={{color:"white"}} />
            </Col>
            <Col span={24}>
              <h2 style={h_style}>می‌خواهم بسته‌ای را پست کنم.</h2>
            </Col>
          </Row>
          <Carousel >
            <div >
              <Row style={center}>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4} style={center}>
                <Card
                  style={card_icon_billliger}
                  bordered={false}
                  cover={
                    <img
                      alt="billlig.com"
                      src={Register}
                      style={style_icon1}
                      height="90px"
                    />
                  }
                >
                  <h3 style={h_style}>مرحله ۱ : ثبت نام و ثبت آگهی</h3>
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
              </Row>
            </div>
            <div>
            <Row style={center}>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon_billliger}
                  bordered={false}
                  cover={
                    <img
                      alt="billlig.com"
                      src={OfferAccept}
                      style={style_icon1}
                    />
                  }
                >
                  <h3 style={h_style}>مرحله ۲ : دریافت پیشنهاد و مذاکره</h3>
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
              </Row>
            </div>
            <div>
            <Row style={center}>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon_billliger}
                  bordered={false}
                  cover={
                    <img alt="billlig.com" src={chat} style={style_icon1} />
                  }
                >
                  <h3 style={h_style}>مرحله ۳ : مذاکره </h3>
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
              </Row>
            </div>
            <div>
            <Row style={center}>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon_billliger}
                  bordered={false}
                  cover={
                    <img alt="billlig.com" src={Payment} style={style_icon1} />
                  }
                >
                  <h3 style={h_style}>مرحله ۴ : پرداخت </h3>
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
              </Row>
            </div>
            <div>
            <Row style={center}>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon_billliger}
                  bordered={false}
                  cover={
                    <img
                      alt="billlig.com"
                      src={Receive_parcel}
                      style={style_icon1}
                    />
                  }
                >
                  <h3 style={h_style}>مرحله ۵ : دریافت بسته </h3>
                  <Meta
                    style={card_style_packet}
                    description={
                      <div style={travel_guide}>
                        حالا باید منتظر بمونی تا به زودی مسافر از راه برسه و
                        بسته رو برات بیاره
                      </div>
                    }
                  />
                </Card>
              </Col>
              </Row>
            </div>
          </Carousel>
        </div>
        <div >
          <Row style={{ justifyContent: "center", display: "flex" }}>
            <Col>
              <h1
                style={{
                  backgroundColor: "white",
                  color: "#067fc8",
                  fontSize: "20px",
                  textAlign: "center",
                  padding: "0 15px 0 15px",
                  marginTop: "20px",
                }}
              >
                مسافر
              </h1>
              <hr style={{color:"white"}}/>
            </Col>
            <Col span={24}>
              <h3 style={h_style}>می‌خواهم بسته دیگران را به مقصد برسانم.</h3>
            </Col>
          </Row>
          <Carousel>
            <div>
              <Row style={{ justifyContent: "center", display: "flex" }}>
                <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                  <Card
                    style={card_icon}
                    bordered={false}
                    cover={
                      <img
                        alt="billlig.com"
                        src={add_trip}
                        style={style_icon1}
                      />
                    }
                  >
                    <h3 style={h_style}>مرحله ۱ : ثبت نام و ثبت سفر</h3>
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
              </Row>
            </div>
            <div>
            <Row style={center}>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon}
                  bordered={false}
                  cover={
                    <img
                      alt="billlig.com"
                      src={make_offer}
                      style={style_icon1}
                    />
                  }
                >
                  <h3 style={h_style}>مرحله ۲ : پیشنهاد بذار</h3>
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
              </Row>
            </div>
            <div>
            <Row style={center}>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon}
                  bordered={false}
                  cover={
                    <img alt="billlig.com" src={chat} style={style_icon1} />
                  }
                >
                  <h3 style={h_style}>مرحله ۳ : مذاکره </h3>
                  <Meta
                    style={card_style_travel}
                    description={
                      <div style={travel_guide}>
                        حالا باید باتوجه به نیاز آگهی‌دهنده یا یک بسته رو از
                        صاحب‌بسته تحویل بگیری و با خودت بیاری یا اگه لازم باشه
                        خودت بخریش و بیاریش .
                      </div>
                    }
                  />
                </Card>
              </Col>
              </Row>
            </div>
            <div>
            <Row style={center}>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon}
                  bordered={false}
                  cover={
                    <img alt="billlig.com" src={buy} style={style_icon1} />
                  }
                >
                  <h3 style={h_style}>مرحله ۴ : دریافت و حمل </h3>
                  <Meta
                    style={card_style_travel}
                    description={
                      <div style={travel_guide}>
                        حالا باید باتوجه به نیاز آگهی‌دهنده یا یک بسته رو از
                        صاحب‌بسته تحویل بگیری و با خودت بیاری یا اگه لازم باشه
                        خودت بخریش و بیاریش.
                      </div>
                    }
                  />
                </Card>
              </Col>
              </Row>
            </div>
            <div>
            <Row style={center}>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Card
                  style={card_icon}
                  bordered={false}
                  cover={
                    <img alt="billlig.com" src={deliverd} style={style_icon1} />
                  }
                >
                  <h3 style={h_style}>مرحله ۵ : تحویل و دریافت دستمزد</h3>

                  <Meta
                    style={card_style_travel}
                    description={
                      <div style={travel_guide}>
                        حالا باید بسته رو به صاحبش تحویل بدی و دستمزدت رو از
                        بیلیگ دریافت کنی
                      </div>
                    }
                  />
                </Card>
              </Col>
              </Row>
            </div>
          </Carousel>
          <Divider style={{ opacity: "0" }} /> */}
        </div>
      </Breakpoint>
    </div>
  );
};

export default BillligerLanding;
