import React from "react";
import { Col, Row, Divider } from "antd";
import about from "../media/aboutus.svg";
import about2 from "../media/about2.svg";
import Favicon from "../media/FavIcon.png";

const style_center = {display: "flex", justifyContent: "center"}

const AboutUs = () => {
  window.scroll(0, 0);
  return (
    <div>
      <Row style={style_center} >
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={4}
          xl={4}
          xxl={4}
          style={{ textAlign: "center" }}
        >
          <img
            alt="billlig.com"
            src={Favicon}
            style={{ width: "40%", height: "auto" }}
          />
        </Col>
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={12}
          xl={12}
          xxl={12}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "15px",
            lineHeight: "30px",
          }}
        >
          <div
            style={{
              backgroundColor: "#067fc8",
              color: "white",
              borderRadius: "10px",
              padding: "25px",
              lineHeight: "30px",
            }}
          >
            <p style={{textAlign:"justify"}}>
              <b>
                بیلیگ در سال 1398 با هدف ارسال بسته توسط مسافران آغاز به کار کرد
                و بعد از مدتی تصمیم بر ایجاد پلتفرمی یکپارچه برای ارسال بسته و
                خرید از خارج کشور برای سهولت در این فرآیند پیچیده شد. حالا ما
                قصد داریم با گسترش این شبکه به مدل جدیدی در خرید الکترونیک بر
                پایه اقتصاد اشتراکی برسیم؛ مدلی که نفع همه در اون باشه
              </b>
            </p>
          </div>
        </Col>
      </Row > 
      <Divider style={{ opacity: "0" }} />
      <Row style={style_center}>
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
            <b>پست بی‌واسطه در سراسر دنیا</b>
          </h1>
          <hr />
          <p style={{ fontSize: "15px", padding: "40px 0" }}>
            هدف ما از انجام این پروژه این است که از طرفی هزینه‌ها و مدت حمل‌ونقل
            به داخل و خارج ایران را کاهش دهیم و از طرف دیگر با استفاده از مفهوم
            اقتصاد اشتراکی باعث بیشتر شدن مسافرت به سراسر دنیا و کسب درآمد شویم.
          </p>
        </Col>
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={10}
          xl={10}
          xxl={10}
          style={{
            display: "flex",
            justifyContent: "center",
            lineHeight: "30px",
          }}
        >
          <img
            alt="billlig.com"
            src={about}
            style={{ width: "80%", height: "auto" }}
          />
        </Col>
      </Row>
      <div >
        <Row style={{direction:"ltr", display: "flex", justifyContent: "center"}}>
          <Col
            xs={22}
            sm={22}
            md={22}
            lg={10}
            xl={10}
            xxl={10}
            style={{ textAlign: "right", lineHeight: "30px" }}
          >
            <Divider style={{ opacity: "0" }} />
            <Divider style={{ opacity: "0" }} />
            <h1>
              <b>خرید از هر جایی در دنیا با بیلیگ</b>
            </h1>
            <hr />
            <p style={{ fontSize: "15px", padding: "40px 0" }}>
              هدف دیگر ما اتصال به بازارهای جهانی‌ست تا بتوانیم تجربه خریدی با
              کیفیت و مطمئن را بسیار ارزان‌تر از مدل‌های دیگر برای ایرانیان به
              ارمغان بیاوریم. در این مدل هم خریداران از خرید خود راضی خواهند بود
              و هم مسافرانی که از این طریق توانسته‌اند کسب درآمد کنند و بخشی از
              هزینه‌های خود را پوشش دهند.
            </p>
          </Col>
          <Col
            xs={22}
            sm={22}
            md={22}
            lg={10}
            xl={10}
            xxl={10}
            style={{
              display: "flex",
              justifyContent: "center",
              lineHeight: "30px",
            }}
          >
            <img
              alt="billlig.com"
              src={about2}
              style={{ width: "80%", height: "auto" }}
            />
          </Col>
        </Row>
      </div>
      <Divider style={{ opacity: "0" }} />
      <Row
        style={{
          backgroundColor: "#067fc8",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col>
          <h1
            style={{
              color: "white",
              display: "flex",
              textAlign: "center",
              lineHeight: "35px",
            }}
          >
            <b>ارزش‌های ما :‌ رضایت مشتری ، سهولت در استفاده ،‌ کیفیت جهانی</b>
          </h1>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
