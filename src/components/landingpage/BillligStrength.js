import React from "react";
import { Col, Row, Card, Divider, Carousel } from "antd";
import bag from "../../media/Icon/022-bag.svg";
import secure_payment from "../../media/Icon/secure_payment.svg";
import send_parcel from "../../media/Icon/send_parcel.svg";
import make_money from "../../media/Icon/make_money.svg";
import best_offer from "../../media/Icon/best_offer.svg";
import cheap_buy from "../../media/Icon/cheap_buy.svg";
import { Breakpoint } from "react-socks";
const { Meta } = Card;

const style_icon = { width: "10%", display: "inline" };

const card_style = {
  borderRadius: "20px 10px 20px 10px",
  border: "solid",
  borderWidth: "0.5px",
  borderColor: "white",
  padding: "20px 20px 20px 20px",
  textAlign: "justify",
  lineHeight: "25px",
  height: "auto",
};

const title_style = {
  padding: "15px",
  textAlign: "center",
  color: "white",
};

const contentStyle = {
  textAlign: "center",
  background: "#46A0AE",
  borderRadius: "5px",
};

const BillligStrength = () => {
  return (
    <div style={{ backgroundColor: "#46A0AE", paddingTop:"10px", marginTop:"20px"}}>
      <Divider >مزیت‌های بیلیگ برای شما</Divider>
      <Breakpoint medium up>
        <Carousel autoplay effect="scrollx">
          <div>
            <Row
              style={{
                backgroundColor: "#46A0AE",
                textAlign: "center",
                paddingTop: "30px",
                paddingBottom: "30px",
                borderRadius:"15px"
              }}
            >
              <Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={3}></Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                <Card
                  style={{ backgroundColor: "#46A0AE" }}
                  bordered={false}
                  cover={<img alt="example" src={bag} style={style_icon} />}
                >
                  <h3 style={title_style}>خرید کالاهای خاص و غیر قابل دسترس</h3>
                  <Meta
                    style={card_style}
                    description={
                      <div style={{ color: "white" }}>
                        بسیاری از کلکسیونرها و افرادی که به دنبال کالایی خاص
                        هستند، می‌بایست به بازارهای جهانی دسترسی داشته باشند. از
                        طرفی هزینه حمل‌ونقل برای آوردن کالا به ایران بالاست و
                        صرفه اقتصادی ندارد. بستر بیلیگ به شما کمک می‌کند تا در هر
                        لحظه و در هر کجای جهان که قصد خرید کالایی را دارید، با
                        هزینه حمل‌ونقل کم، آن را خریداری کنید.
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                <Card
                  style={{ backgroundColor: "#46A0AE" }}
                  bordered={false}
                  cover={
                    <img alt="example" src={best_offer} style={style_icon} />
                  }
                >
                  <h3 style={title_style}>
                    بهره‌مندی از تخفیفات و فرصت‌های جهانی
                  </h3>
                  <Meta
                    style={card_style}
                    description={
                      <div style={{ color: "white" }}>
                        همان‌طور که می‌دانید بسیاری از فروشگاه‌های خارجی در
                        زمان‌های خاص تخفیفات بسیار قابل توجهی بر روی محصولات خود
                        اعمال می‌کنند؛ همچنین در فروشگاه‌هایی نظیر آمازون همواره
                        بسیاری از کالاها دارای تخفیف هستند. پس این فرصت عالی
                        می‌تواند در ایران هم برای شما فراهم باشد تا کالاهای
                        اورجینال را با تخفیف بالا بخرید.
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                <Card
                  style={{ backgroundColor: "#46A0AE" }}
                  bordered={false}
                  cover={
                    <img
                      alt="example"
                      src={secure_payment}
                      style={style_icon}
                    />
                  }
                >
                  <h3 style={title_style}>کسب در آمد از سفر</h3>
                  <Meta
                    style={card_style}
                    description={
                      <div style={{ color: "white" }}>
                        با استفاده از بیلیگ شما می‌توانید بخشی از هزینه‌های سفر
                        خود را جبران کنید. فقط کافی‌ست فضای خالی چمدان خود را
                        محاسبه کنید و به همان اندازه از آگهی‌های سایت، سفارش
                        !خرید یا جابه‌جایی بسته قبول کنید و پول پارو کنید حتی
                        می‌توانید با جمع‌آوری چند بسته یا خرید چند کالا، به
                        مقاصدی که همیشه آرزو داشتید سفر کنید و لذت ببرید.
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={3}></Col>
            </Row>
          </div>
          <div>
            <Row
              style={{
                backgroundColor: "#46A0AE",
                textAlign: "center",
                paddingTop: "30px",
                paddingBottom: "30px",
                borderRadius:"15px"
              }}
            >
              <Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={3}></Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                <Card
                  style={{ backgroundColor: "#46A0AE" }}
                  bordered={false}
                  cover={
                    <img alt="example" src={make_money} style={style_icon} />
                  }
                >
                  <h3 style={title_style}>پرداخت امن</h3>
                  <Meta
                    style={card_style}
                    description={
                      <div style={{ color: "white" }}>
                        هیچ جای نگرانی در مورد پرداخت به مسافر وجود ندارد؛ چون
                        شما پول را به بیلیگ پرداخت می‌کنید و ما این هزینه را
                        امانت نگه می‌داریم و به محض تحویل بسته یا کالای خود و
                        تأیید آن، هزینه برای مسافر واریز خواهد شد و در صورت عدم
                        تأیید پول به شما برگردانده می‌شود.
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                <Card
                  style={{ backgroundColor: "#46A0AE" }}
                  bordered={false}
                  cover={
                    <img alt="example" src={send_parcel} style={style_icon} />
                  }
                >
                  <h3 style={title_style}>ارسال بسته</h3>
                  <Meta
                    style={card_style}
                    description={
                      <div style={{ color: "white" }}>
                        مشکلات تحریم باعث شده تا ارسال بار به خارج از کشور یا
                        بالعکس به کاری بسیار پرهزینه و طولانی تبدیل شود. شما
                        می‌توانید با استفاده از پلتفرم بیلیگ از مسافرانی که بین
                        کشور‌های مختلف در رفت‌وآمد هستند، درخواست کنید تا بسته
                        شما را به مقصد مورد نظر برسانند و در ازای آن مبلغی را
                        دریافت کنند.
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                <Card
                  style={{ backgroundColor: "#46A0AE" }}
                  bordered={false}
                  cover={
                    <img alt="example" src={cheap_buy} style={style_icon} />
                  }
                >
                  <h3 style={title_style}>
                    خرید ارزان‌تر نسبت به فروشگاه‌های داخلی
                  </h3>
                  <Meta
                    style={card_style}
                    description={
                      <div style={{ color: "white" }}>
                        با استفاده از بیلیگ نه تنها از اصل بودن کالای خود مطمئن
                        خواهید بود بلکه هزینه کمتری هم پرداخت می‌کنید. شما تنها
                        هزینه اضافی که برای خرید کالای خود در بیلیگ پرداخت
                        می‌کنید، مبلغی به‌عنوان پاداش برای مسافر است. به همین
                        دلیل خرید با استفاده از بیلیگ برای شما بسیار باصرفه‌تر
                        از فروشگاه‌های داخلی خواهد بود.
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={3}></Col>
            </Row>
          </div>
        </Carousel>
      </Breakpoint>
      <Breakpoint small down>
        <div style={contentStyle}>
          <Divider />
          <Carousel autoplay effect="fade">
            <div style={contentStyle}>
              <h3 style={title_style}>خرید کالاهای خاص و غیر قابل دسترس</h3>
              <Card
                style={{ backgroundColor: "#46A0AE", color: "white" }}
                bordered={false}
                cover={<img alt="example" src={bag} style={style_icon} />}
              >
                <Meta
                  style={card_style}
                  description={
                    <div style={{ color: "white" }}>
                      بسیاری از کلکسیونرها و افرادی که به دنبال کالا خاص هستند،
                      باید به بازارهای جهانی دسترسی داشته باشند. از طرفی هزینه
                      حمل‌ونقل برای آوردن کالا به ایران صرفه اقتصادی ندارد، بستر
                      بیلیگ به شما کمک می‌کند در هر لحظه در هرجا جهان قصد خرید
                      کالایی را داشتید با هزینه حمل‌ونقل پایین آن راخریداری کنید
                    </div>
                  }
                />
              </Card>
            </div>
            <div style={contentStyle}>
              <h3 style={title_style}>کسب درآمد با بیلیگ</h3>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                <Card
                  style={{ backgroundColor: "#46A0AE", color: "white" }}
                  bordered={false}
                  cover={
                    <img alt="example" src={make_money} style={style_icon} />
                  }
                >
                  <Meta
                    style={card_style}
                    description={
                      <div style={{ color: "white" }}>
                        با استفاده از بیلیگ شما می‌توانید بخشی از هزینه‌های سفر
                        خود را جبران کنید. فقط کافی‌ست فضای خالی چمدان خود را
                        محاسبه کنید و به همان اندازه از آگهی‌های سایت، سفارش
                        !خرید یا جابه‌جایی بسته قبول کنید و پول پارو کنید حتی
                        می‌توانید با جمع‌آوری چند بسته یا خرید چند کالا، به
                        مقاصدی که همیشه آرزو داشتید سفر کنید و لذت ببرید.
                      </div>
                    }
                  />
                </Card>
              </Col>
            </div>
            <div>
              <h3 style={title_style}>بهره‌مندی از تخفیفات و فرصت‌های جهانی</h3>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                <Card
                  style={{ backgroundColor: "#46A0AE", color: "white" }}
                  bordered={false}
                  cover={
                    <img alt="example" src={best_offer} style={style_icon} />
                  }
                >
                  <Meta
                    style={card_style}
                    description={
                      <div style={{ color: "white" }}>
                        همان‌طور که می‌دانید بسیاری از فروشگاه‌های خارجی در
                        زمان‌های خاص تخفیفات بسیار قابل توجهی بر روی محصولات خود
                        اعمال می‌کنند؛ همچنین در فروشگاه‌هایی نظیر آمازون همواره
                        بسیاری از کالاها دارای تخفیف هستند. پس این فرصت عالی
                        می‌تواند در ایران هم برای شما فراهم باشد تا کالاهای
                        اورجینال را با تخفیف بالا بخرید.
                      </div>
                    }
                  />
                </Card>
              </Col>
            </div>
            <div>
              <h3 style={title_style}>پرداخت امن</h3>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                <Card
                  style={{ backgroundColor: "#46A0AE", color: "white" }}
                  bordered={false}
                  cover={
                    <img
                      alt="example"
                      src={secure_payment}
                      style={style_icon}
                    />
                  }
                >
                  <Meta
                    style={card_style}
                    description={
                      <div style={{ color: "white" }}>
                        هیچ جای نگرانی در مورد پرداخت به مسافر وجود ندارد؛ چون
                        شما پول را به بیلیگ پرداخت می‌کنید و ما این هزینه را
                        امانت نگه می‌داریم و به محض تحویل بسته یا کالای خود و
                        تأیید آن، هزینه برای مسافر واریز خواهد شد و در صورت عدم
                        تأیید پول به شما برگردانده می‌شود.
                      </div>
                    }
                  />
                </Card>
              </Col>
            </div>
            <div>
              <h3 style={title_style}>ارسال بسته</h3>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                <Card
                  style={{ backgroundColor: "#46A0AE", color: "white" }}
                  bordered={false}
                  cover={
                    <img alt="example" src={send_parcel} style={style_icon} />
                  }
                >
                  <Meta
                    style={card_style}
                    description={
                      <div style={{ color: "white" }}>
                        مشکلات تحریم باعث شده تا ارسال بار به خارج از کشور یا
                        بالعکس به کاری بسیار پرهزینه و طولانی تبدیل شود. شما
                        می‌توانید با استفاده از پلتفرم بیلیگ از مسافران درخواست
                        کنید تا بسته شما را به مقصد مورد نظر ببرند و در ازای آن
                        مبلغی را دریافت کنند.
                      </div>
                    }
                  />
                </Card>
              </Col>
            </div>
            <div>
              <h3 style={title_style}>
                خرید ارزان‌تر نسبت به فروشگاه‌های داخلی
              </h3>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                <Card
                  style={{ backgroundColor: "#46A0AE", color: "white" }}
                  bordered={false}
                  cover={
                    <img alt="example" src={cheap_buy} style={style_icon} />
                  }
                >
                  <Meta
                    style={card_style}
                    description={
                      <div style={{ color: "white" }}>
                        با استفاده از بیلیگ نه تنها از اصل بودن کالای خود مطمئن
                        خواهید بود بلکه هزینه کمتری هم پرداخت می‌کنید. شما تنها
                        هزینه اضافی که برای خرید کالای خود در بیلیگ پرداخت
                        می‌کنید، مبلغی به‌عنوان پاداش برای مسافر است. به همین
                        دلیل خرید با استفاده از بیلیگ برای شما بسیار باصرفه‌تر
                        از فروشگاه‌های داخلی خواهد بود.
                      </div>
                    }
                  />
                </Card>
              </Col>
            </div>
          </Carousel>
        </div>
      </Breakpoint>
    </div>
  );
};

export default BillligStrength;
