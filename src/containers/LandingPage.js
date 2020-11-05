import React from "react";
import Axios from "axios";
import { Row, Col, Divider, Button, Card } from "antd";
import { Link } from "react-router-dom";
import bag from "../media/Icon/022-bag.svg";
import secure_payment from "../media/Icon/secure_payment.svg";
import send_parcel from "../media/Icon/send_parcel.svg";
import make_money from "../media/Icon/make_money.svg";
import best_offer from "../media/Icon/best_offer.svg";
import cheap_buy from "../media/Icon/cheap_buy.svg";
import Orders from "../components/packet/Orders";
import main_banner from "../media/main_banner.svg";
import { config } from "../Constant";

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
  textAlign: "justify",
  lineHeight: "25px",
  height: "auto",
};
const style_icon = { width: "50px", display: "inline" };

class LandingPage extends React.Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = "بیلیگ-پلتفرم خرید و پست اشتراکی"
    Axios.get(`${url}api/v1/advertise/packet/`)
      .then((res) => {
        this.setState({
          orders: res.data,
          loading: false
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
            <Row>
              <Row>
                <Col
                  xs={0}
                  sm={0}
                  md={0}
                  lg={24}
                  xl={24}
                  xxl={24}
                  style={{ padding: "0 100px", fontFamily: "Vazir" }}
                >
                  <h1 style={{ fontSize: 33, textAlign: "right" }}>
                    از هر جا می‌خوای
                    <span style={{ color: "#46a0ae" }}> خرید</span> کن
                    <br />
                    به هر جا می‌خوای
                    <span style={{ color: "#46a0ae" }}> سفر</span> کن
                  </h1>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={0}
                  xl={0}
                  xxl={0}
                  style={{ textAlign: "center" }}
                >
                  <Divider />
                  <h1 style={{ fontSize: 20 }}>
                    از هر جا می‌خوای
                    <span style={{ color: "#46a0ae" }}> خرید</span> کن
                    <br />
                    به هر جا می‌خوای
                    <span style={{ color: "#46a0ae" }}> سفر</span> کن
                  </h1>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                  <h3 style={{ fontSize: "14px", textAlign: "right" }}>
                    بیلیگ مسافرانی که فضای اضافی در چمدان دارند رو به کسانی که
                    به خرید و یا پست از خارج از کشور دارند متصل می‌کند
                  </h3>
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
                  <h3 style={{ fontSize: "18px", textAlign: "right" }}>
                    بیلیگ مسافرانی که فضای اضافی در چمدان دارند رو به کسانی که
                    به خرید و یا پست از خارج از کشور دارند متصل می‌کند.{" "}
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                  <Divider plain orientation="center">
                    <Link to={"/how-billlig-work"}>
                      <span>بیلیگ چگونه کار می‌کند؟</span>
                    </Link>
                  </Divider>
                </Col>
                <Col
                  xs={0}
                  sm={0}
                  md={0}
                  lg={24}
                  xl={24}
                  xxl={24}
                  style={{ padding: "0 85px" }}
                >
                  <Divider plain orientation="center">
                    <Link to={"/how-billlig-work"}>
                      بیلیگ‌پست چگونه کار می‌کند؟
                    </Link>
                  </Divider>
                </Col>
              </Row>
            </Row>
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
            style={{ textAlign:"center" ,display: "flex", justifyContent:"center" }}
          >
            <Orders data={this.state.orders} page={8} pagesize={8} loading={this.state.loading}/>
          </Col>
          <Col xs={0} sm={0} md={0} lg={2} xl={2} xxl={2}></Col>
        </Row>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Divider style={{opacity:0}} />
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
      </div>
    );
  }
}

export default LandingPage;
