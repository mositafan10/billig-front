import React from "react";
import { Col, Row, Divider } from "antd";
import travelguide from "../media/travelguide.svg";
import global from "../media/global.svg";
import mobile from "../media/mobile.svg";
import support from "../media/support.svg";
import buyer from "../media/buyer.svg";
import Delivery from "../media/Delivery.svg";

const TravelGuide = () => {
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
          style={{ lineHeight: "30px" }}
        >
          <Divider style={{ opacity: "0" }} />
          <h1 style={{ padding: "20 px" }}>
            <b>راهنمای سفر با بیلیگ</b>
          </h1>
          <p
            style={{
              fontSize: "18px",
              padding: "20px 0",
              lineHeight: "35px",
              textAlign: "justify",
            }}
          >
            بدون نگرانی در مورد هزینه‌های سفر با خرید و جابه‌جایی بسته آسوده به
            هر جا می‌خواهید سفر کنید. شود
          </p>
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
          style={{ textAlign: "center" }}
        >
          <img
            alt="billlig.com"
            src={travelguide}
            style={{ width: "70%", height: "auto" }}
          />
          <Divider style={{ opacity: "0" }} />
        </Col>
        <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={2}></Col>
      </Row>
      <Row
        style={{
          backgroundColor: "#46a0ae",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col>
          <p
            style={{
              color: "white",
              display: "flex",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            <b>
              خرید کالا از طریق بیلیگ یک فرآیند کاملا هدایت شده و گام به گام است
              <br />
            </b>
          </p>
        </Col>
      </Row>

      {/* first column */}
      <Row>
        <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}></Col>
        <Col
          xs={0}
          sm={0}
          md={0}
          lg={2}
          xl={2}
          xxl={2}
          style={{ textAlign: "center", alignSelf: "center" }}
        >
          <img
            alt="billlig.com"
            src={global}
            style={{ width: "50%", height: "auto" }}
          />
          <Divider style={{ opacity: "0" }} />
        </Col>
        <Col xs={1} sm={1} md={1} lg={0} xl={0} xxl={0}></Col>
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={14}
          xl={14}
          xxl={14}
          style={{ lineHeight: "30px" }}
        >
          <Divider style={{ opacity: "0" }} />
          <h2 style={{ padding: "20 px" }}>
            <b>1- درج سفر</b>
          </h2>
          <p
            style={{
              fontSize: "18px",
              padding: "20px 0",
              lineHeight: "35px",
              textAlign: "justify",
            }}
          >
            پس از ثبت‌نام به صفحه درج سفر رفته و اطلاعات سفر خود را شامل مبدأ و
            مقصد و تاریخ پرواز، وارد کنید تا ما بتوانیم لیستی از بهترین آگهی‌های
            متناسب با سفر شما را در اختیارتان بگذاریم.
          </p>
        </Col>
        <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={2}></Col>
      </Row>

      {/* second column */}
      <Row style={{ backgroundColor: "#EDF2F0" }}>
        <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}></Col>
        <Col
          xs={0}
          sm={0}
          md={0}
          lg={2}
          xl={2}
          xxl={2}
          style={{ textAlign: "center", alignSelf: "center" }}
        >
          <img
            alt="billlig.com"
            src={mobile}
            style={{ width: "50%", height: "auto" }}
          />
          <Divider style={{ opacity: "0" }} />
        </Col>
        <Col xs={1} sm={1} md={1} lg={0} xl={0} xxl={0}></Col>
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={14}
          xl={14}
          xxl={14}
          style={{ lineHeight: "30px" }}
        >
          <Divider style={{ opacity: "0" }} />
          <h2 style={{ padding: "20 px" }}>
            <b>2- پیشنهاد</b>
          </h2>
          <p
            style={{
              fontSize: "18px",
              padding: "20px 0",
              lineHeight: "35px",
              textAlign: "justify",
            }}
          >
            در این مرحله شما می‌توانید از بین آگهی‌های متناسب با سفر شما،
            پیشنهاد خود را در مورد قیمت مد نظرتان برای انجام این آگهی پیشنهاد
            دهید. هیچ محدودیتی برای تعداد پیشنهادهای شما وجود ندارد و شما
            می‌توانید با توجه به شرایط خود به هر تعداد آگهی که می‌خواهید پیشنهاد
            دهید.
          </p>
        </Col>
        <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={2}></Col>
      </Row>

      {/* third column */}
      <Row>
        <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}></Col>
        <Col
          xs={0}
          sm={0}
          md={0}
          lg={2}
          xl={2}
          xxl={2}
          style={{ textAlign: "center", alignSelf: "center" }}
        >
          <img
            alt="billlig.com"
            src={support}
            style={{ width: "50%", height: "auto" }}
          />
          <Divider style={{ opacity: "0" }} />
        </Col>
        <Col xs={1} sm={1} md={1} lg={0} xl={0} xxl={0}></Col>
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={14}
          xl={14}
          xxl={14}
          style={{ lineHeight: "30px" }}
        >
          <Divider style={{ opacity: "0" }} />
          <h2 style={{ padding: "20 px" }}>
            <b>3- مذاکره</b>
          </h2>
          <p
            style={{
              fontSize: "18px",
              padding: "20px 0",
              lineHeight: "35px",
              textAlign: "justify",
            }}
          >
            در این مرحله خریدار از بین پیشنهادها یک را انتخاب کرده و در مورد
            شرایط خرید و قیمت پیشنهاد با شما وارد مذاکره می‌شود. در صورت نهایی
            شدن توافق بین شما و خریدار شما منتظر می‌مانید تا خریدار هزینه را
            پرداخت کند.
          </p>
        </Col>
        <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={2}></Col>
      </Row>

      {/* fourth column */}
      <Row style={{ backgroundColor: "#EDF2F0" }}>
        <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}></Col>
        <Col
          xs={0}
          sm={0}
          md={0}
          lg={2}
          xl={2}
          xxl={2}
          style={{ textAlign: "center", alignSelf: "center" }}
        >
          <img
            alt="billlig.com"
            src={buyer}
            style={{ width: "50%", height: "auto" }}
          />
          <Divider style={{ opacity: "0" }} />
        </Col>
        <Col xs={1} sm={1} md={1} lg={0} xl={0} xxl={0}></Col>
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={14}
          xl={14}
          xxl={14}
          style={{ lineHeight: "30px" }}
        >
          <Divider style={{ opacity: "0" }} />
          <h2 style={{ padding: "20 px" }}>
            <b>4- خرید</b>
          </h2>
          <p
            style={{
              fontSize: "18px",
              padding: "20px 0",
              lineHeight: "35px",
              textAlign: "justify",
            }}
          >
            پس از پرداخت مشتری شما موظفید با انجام هماهنگی، کالای مورد نظر را
            خریده و یا تحویل بگیرید و جزئیات فرآیند را به مشتری اطلاع دهید.
          </p>
        </Col>
        <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={2}></Col>
      </Row>

      {/* fifth column */}
      <Row>
        <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}></Col>
        <Col
          xs={0}
          sm={0}
          md={0}
          lg={2}
          xl={2}
          xxl={2}
          style={{ textAlign: "center", alignSelf: "center" }}
        >
          <img
            alt="billlig.com"
            src={Delivery}
            style={{ width: "50%", height: "auto" }}
          />
          <Divider style={{ opacity: "0" }} />
        </Col>
        <Col xs={1} sm={1} md={1} lg={0} xl={0} xxl={0}></Col>
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={14}
          xl={14}
          xxl={14}
          style={{ lineHeight: "30px" }}
        >
          <Divider style={{ opacity: "0" }} />
          <h2 style={{ padding: "20 px" }}>
            <b>5- تحویل</b>
          </h2>
          <p
            style={{
              fontSize: "18px",
              padding: "20px 0",
              lineHeight: "35px",
              textAlign: "justify",
            }}
          >
            پس از خرید در موعد مقرر، شما کالاهای خریداری شده را به مشتری تحویل
            می‌دهید و به محض تأیید مشتری، هزینه توافق شده به حساب شما واریز
            خواهد شد و می‌توانید از این سفر و سفرهای بعدی خود لذت ببرید.
          </p>
        </Col>
        <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={2}></Col>
      </Row>
      <Divider style={{ opacity: "0" }} />
    </div>
  );
};

export default TravelGuide;
