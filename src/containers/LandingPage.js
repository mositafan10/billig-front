import React from "react";
import Axios from "axios";
import { Row, Col, Divider, Button, Card, Carousel } from "antd";
import { Link } from "react-router-dom";
import bag from "../media/Icon/022-bag.svg";
import secure_payment from "../media/Icon/secure_payment.svg";
import send_parcel from "../media/Icon/send_parcel.svg";
import make_money from "../media/Icon/make_money.svg";
import best_offer from "../media/Icon/best_offer.svg";
import cheap_buy from "../media/Icon/cheap_buy.svg";
import Orders from "../components/packet/Orders";
import main_banner from "../media/main_banner.svg";
import add_trip from "../media/traveler_guide/add_trip.svg";
import chat from "../media/traveler_guide/chat.svg";
import make_offer from "../media/traveler_guide/make_offer.svg";
import deliverd from "../media/traveler_guide/deliverd.svg";
import buy from "../media/traveler_guide/buy.svg";
import Offer_accept from "../media/Packet_guide/Offer_accept.svg";
import Payment from "../media/Packet_guide/Payment.svg";
import Receive_parcel from "../media/Packet_guide/Receive_parcel.svg";
import Register from "../media/Packet_guide/Register.svg";
import { config } from "../Constant";
import CommentsBilllig from "../components/rating/CommentsBilllig";
import CommentBillligCreate from "../components/rating/CommentBillligCreate";

var url = config.url.API_URL;
const { Meta } = Card;

const style_text = {
  alignContent: "center",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
};

const style_center = {
  display: "flex",
  justifyContent: "center",
  color: "black",
  textAlign: "justify",
};

const card_style = {
  borderRadius: "20px 10px 20px 10px",
  border: "solid",
  borderWidth: "0.5px",
  borderColor: "#707070",
  padding: "20px 20px 20px 20px",
  backgroundColor: "white",
  color: "white",
  textAlign: "justify",
  lineHeight: "25px",
  height: "auto",
};

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

const travel_guide = { color: "white" };

const style_icon = { width: "50px", display: "inline" };
const style_icon1 = { width: "30%", display: "inline" };

class LandingPage extends React.Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = "بیلیگ-پلتفرم خرید و پست اشتراکی";
    Axios.get(`${url}api/v1/advertise/packets/all`)
      .then((res) => {
        this.setState({
          orders: res.data.results,
          loading: false,
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <img
              alt="billlig.com"
              src={main_banner}
              style={{ width: "100%", height: "auto" }}
            />
          </Col>
          <Col
            style={style_text}
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={12}
          >
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Row>
                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                  <h1 style={{ fontSize: "20px", textAlign: "center" }}>
                    <span style={{ fontSize: "30px" }}>بیلیگ</span>
                    <br />
                    <span>
                      {" "}
                      یک پلتفرم پست اشتراکی است که{" "}
                      <span style={{ color: "#FCA468" }}>صاحب‌بسته </span>را به{" "}
                      <span style={{ color: "#46A0AE" }}>مسافر </span>وصل
                      می‌کند.
                    </span>
                  </h1>
                </Col>
                <Col
                  xs={0}
                  sm={0}
                  md={0}
                  lg={24}
                  xl={24}
                  xxl={24}
                  style={{ padding: "0 100px" }}
                >
                  <h1 style={{ fontSize: "24px", textAlign: "right" }}>
                    <span style={{ fontSize: "30px" }}>بیلیگ؛</span>
                    <br />
                    <span>
                      {" "}
                      یک پلتفرم پست اشتراکی است که{" "}
                      <span style={{ color: "#FCA468" }}>صاحب‌بسته </span>را به{" "}
                      <span style={{ color: "#46A0AE" }}>مسافر </span>وصل
                      می‌کند.
                    </span>
                  </h1>
                </Col>
              </Row>
              <Row
                style={{
                  justifyContent: "center",
                  display: "flex",
                  textAlign: "center",
                }}
              >
                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                  <Divider plain orientation="center">
                    <Link to={"/how-billlig-work"}>
                      <Button
                        size="large"
                        style={{
                          borderRadius: "15px",
                          backgroundColor: "#46A0AE",
                          color: "white",
                          borderColor: "white",
                        }}
                      >
                        راهنمای استفاده از بیلیگ
                      </Button>
                    </Link>
                  </Divider>
                </Col>
                <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                  <Divider plain orientation="center">
                    <Link to={"/how-billlig-work"}>
                      <Button
                        size="large"
                        style={{
                          borderRadius: "15px",
                          backgroundColor: "#46A0AE",
                          color: "white",
                          borderColor: "white",
                        }}
                      >
                        راهنمای استفاده از بیلیگ
                      </Button>
                    </Link>
                  </Divider>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
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
              {" "}
              می‌خواهم بسته دیگران را به مقصد برسانم.
            </h2>
          </Col>
        </Row>
        <Divider style={{ opacity: "0" }} />
        <Row style={{ textAlign: "center" }}>
          <Col span={2}></Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
            <Card
              style={{ backgroundColor: "ghostwhite" }}
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
              style={{ backgroundColor: "ghostwhite" }}
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
              style={{ backgroundColor: "ghostwhite" }}
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
              style={{ backgroundColor: "ghostwhite" }}
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
              style={{ backgroundColor: "ghostwhite" }}
              bordered={false}
              cover={
                <img alt="billlig.com" src={deliverd} style={style_icon1} />
              }
            >
              <h3 style={{ paddingBottom: "5px" }}>
                مرحله۵: تحویل و دریافت دستمزد{" "}
              </h3>

              <Meta
                style={card_style_travel}
                description={
                  <div style={travel_guide}>
                    حالا باید بسته رو به صاحبش تحویل بدی و دستمزدت رو از بیلیگ
                    دریافت کنی{" "}
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
        <Divider style={{ opacity: "0" }} />
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
              {" "}
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
              style={{ backgroundColor: "ghostwhite" }}
              bordered={false}
              cover={
                <img alt="billlig.com" src={Register} style={style_icon1} />
              }
            >
              <h3 style={{ paddingBottom: "5px" }}>
                مرحله۱: ثبت نام و ثبت آگهی{" "}
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
              style={{ backgroundColor: "ghostwhite" }}
              bordered={false}
              cover={
                <img alt="billlig.com" src={Offer_accept} style={style_icon1} />
              }
            >
              <h3 style={{ paddingBottom: "5px" }}>
                مرحله۲: دریافت پیشنهاد و مذاکره{" "}
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
              style={{ backgroundColor: "ghostwhite" }}
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
              style={{ backgroundColor: "ghostwhite" }}
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
              style={{ backgroundColor: "ghostwhite" }}
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
        <Row>
          <Divider>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "25px",
              }}
            >
              آخرین آگهی‌ها
            </h1>
          </Divider>
          <br />
          <Col xs={0} sm={0} md={0} lg={2} xl={2} xxl={2}></Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={20}
            xl={20}
            xxl={20}
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Orders data={this.state.orders} loading={this.state.loading} />
          </Col>
          <Col xs={0} sm={0} md={0} lg={2} xl={2} xxl={2}></Col>
        </Row>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Divider style={{ opacity: 0 }} />
          <Link to="/orders">
            <Button style={{ borderRadius: "8px" }}>نمایش همه آگهی</Button>
          </Link>
        </Row>
        <Divider style={{ opacity: "0" }} />
        <Row style={{ backgroundColor: "aliceblue", textAlign: "center" }}>
          <Divider>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "25px",
              }}
            >
              مزیت‌های بیلیگ برای شما
            </h1>
          </Divider>
          <br />
          <Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={3}></Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
            <Card
              style={{ backgroundColor: "aliceblue" }}
              bordered={false}
              cover={<img alt="example" src={bag} style={style_icon} />}
            >
              <h3 style={{ paddingBottom: "5px" }}>
                خرید کالاهای خاص و غیر قابل دسترس
              </h3>
              <Meta
                style={card_style}
                description="بسیاری از کلکسیونرها و افرادی که به دنبال کالا خاص
                            هستند، باید به بازارهای جهانی دسترسی داشته باشند.
                            از طرفی هزینه حمل‌ونقل برای آوردن کالا به ایران صرفه
                            اقتصادی ندارد، بستر  بیلیگ به شما کمک می‌کند در هر 
                            لحظه در هرجا جهان قصد خرید کالایی را داشتید با هزینه
                            حمل‌ونقل پایین آن راخریداری کنید"
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
            <Card
              style={{ backgroundColor: "aliceblue" }}
              bordered={false}
              cover={<img alt="example" src={best_offer} style={style_icon} />}
            >
              <h3 style={{ paddingBottom: "5px" }}>
                بهره‌مندی از تخفیفات و فرصت‌های جهانی
              </h3>
              <Meta
                style={card_style}
                description="همان‌طور که می‌دانید بسیاری از فروشگاه‌های خارجی 
                            در زمان‌های خاص تخفیفات بسیار قابل توجهی بر روی 
                            محصولات خود اعمال می‌کنند؛ همچنین در فروشگاه‌هایی 
                            نظیر آمازون همواره بسیاری از کالاها دارای تخفیف هستند.
                            پس این فرصت عالی می‌تواند در ایران هم برای شما فراهم
                            باشد تا کالاهای اورجینال را با تخفیف بالا بخرید."
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
            <Card
              style={{ backgroundColor: "aliceblue" }}
              bordered={false}
              cover={
                <img alt="example" src={secure_payment} style={style_icon} />
              }
            >
              <h3 style={{ paddingBottom: "5px" }}>پرداخت امن</h3>
              <Meta
                style={card_style}
                description="هیچ جای نگرانی در مورد پرداخت به مسافر وجود ندارد؛
                            چون شما پول را به بیلیگ پرداخت می‌کنید و ما این هزینه 
                            را امانت نگه می‌داریم و به محض تحویل بسته یا کالای خود
                            و تأیید آن، هزینه برای مسافر واریز خواهد شد و در صورت 
                            عدم تأیید پول به شما برگردانده می‌شود."
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={3}></Col>
        </Row>
        <Row style={{ backgroundColor: "aliceblue", textAlign: "center" }}>
          <Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={3}></Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
            <Card
              style={{ backgroundColor: "aliceblue" }}
              bordered={false}
              cover={<img alt="example" src={make_money} style={style_icon} />}
            >
              <h3 style={{ paddingBottom: "5px" }}>کسب درآمد با بیلیگ</h3>
              <Meta
                style={card_style}
                description="با استفاده از بیلیگ شما می‌توانید بخشی از هزینه‌های سفر
                            خود را جبران کنید. فقط کافی‌ست فضای خالی چمدان خود 
                            را محاسبه کنید و به همان اندازه از آگهی‌های سایت، سفارش
                            !خرید یا جابه‌جایی بسته قبول کنید و پول پارو کنید
                            حتی می‌توانید با جمع‌آوری چند بسته یا خرید چند کالا، 
                            به مقاصدی که همیشه آرزو داشتید سفر کنید و لذت ببرید."
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
            <Card
              style={{ backgroundColor: "aliceblue" }}
              bordered={false}
              cover={<img alt="example" src={send_parcel} style={style_icon} />}
            >
              <h3 style={{ paddingBottom: "5px" }}>ارسال بسته</h3>
              <Meta
                style={card_style}
                description="مشکلات تحریم باعث شده تا ارسال بار به خارج از کشور
                            یا بالعکس به کاری بسیار پرهزینه و طولانی تبدیل شود.
                            شما می‌توانید با استفاده از پلتفرم بیلیگ از مسافران
                            درخواست کنید تا بسته شما را به مقصد مورد نظر ببرند
                            و در ازای آن مبلغی را دریافت کنند."
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
            <Card
              style={{ backgroundColor: "aliceblue" }}
              bordered={false}
              cover={<img alt="example" src={cheap_buy} style={style_icon} />}
            >
              <h3 style={{ paddingBottom: "5px" }}>
                خرید ارزان‌تر نسبت به فروشگاه‌های داخلی
              </h3>
              <Meta
                style={card_style}
                description="با استفاده از بیلیگ نه تنها از اصل بودن کالای خود مطمئن
                                خواهید بود بلکه هزینه کمتری هم پرداخت می‌کنید. 
                                شما تنها هزینه اضافی که برای خرید کالای خود در بیلیگ
                                پرداخت می‌کنید، مبلغی به‌عنوان پاداش برای مسافر است.
                                به همین دلیل خرید با استفاده از بیلیگ برای شما بسیار 
                                باصرفه‌تر از فروشگاه‌های داخلی خواهد بود."
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={3}></Col>
        </Row>
        <Row>
          <Divider>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "25px",
              }}
            >
              آخرین نظرات
            </h1>
          </Divider>
          <br />
          <Col xs={0} sm={0} md={0} lg={2} xl={2} xxl={2}></Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={20}
            xl={20}
            xxl={20}
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CommentsBilllig count={5} />
          </Col>
          <Col xs={0} sm={0} md={0} lg={2} xl={2} xxl={2}></Col>
        </Row>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Divider style={{ opacity: 0 }} />
          <CommentBillligCreate />
        </Row>
        <Divider />
      </div>
    );
  }
}

export default LandingPage;
