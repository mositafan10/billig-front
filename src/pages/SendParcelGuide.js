import React from "react";
import { Col, Row, Divider } from "antd";
import sendparcelguide from "../media/sendparcelguide.svg";
import insert from "../media/insert.svg";
import time from "../media/time.svg";
import money from "../media/money.svg";
import user from "../media/user.svg";
import Delivery from "../media/Delivery.svg";

const SendParcelGuide = () => {
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
          <h1>
            <b>راهنمای ارسال بسته با بیلیگ</b>
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
            بدون نگرانی در مورد هزینه حمل‌ونقل هرچیزی رو به هرجایی از دنیا که
            می‌خوای، بفرست.
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
            src={sendparcelguide}
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
            src={insert}
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
            <b>1- درج آگهی</b>
          </h2>
          <p
            style={{
              fontSize: "18px",
              padding: "20px 0",
              lineHeight: "35px",
              textAlign: "justify",
            }}
          >
            پس از ثبت‌نام به صفحه درج آگهی رفته و مشخصات بسته خود را به همراه
            مبدأ و مقصد آن، وارد کنید.{" "}
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
            src={time}
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
            <b>2- انتظار برای مسافر</b>
          </h2>
          <p
            style={{
              fontSize: "18px",
              padding: "20px 0",
              lineHeight: "35px",
              textAlign: "justify",
            }}
          >
            : پس از ثبت آگهی، پیشنهادهای مسافران برای جابه‌جایی بسته شما و
            همچنین مبلغ مد نظرشان برای دستمزد در پروفایل کاربری نمایش داده خواهد
            شد. شما می‌توانید پس از مذاکره با مسافران مختلف، یک مسافر را برای
            جابه‌جایی بسته خود انتخاب کرده و وارد مرحله پرداخت شوید.
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
            src={money}
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
            <b>3- پرداخت</b>
          </h2>
          <p
            style={{
              fontSize: "18px",
              padding: "20px 0",
              lineHeight: "35px",
              textAlign: "justify",
            }}
          >
            در این مرحله شما مبلغ توافق شده برای دستمزد را از طریق گزینه نهایی
            کردن سفارش، پرداخت کرده و منتظر تحویل بسته توسط مسافر بمانید.
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
            src={user}
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
            <b>4- هماهنگی</b>
          </h2>
          <p
            style={{
              fontSize: "18px",
              padding: "20px 0",
              lineHeight: "35px",
              textAlign: "justify",
            }}
          >
            پس از پرداخت به مسافر اطلاع داده می‌شود تا بسته را تحویل بگیرد. صفحه
            چت بین مسافر و شما تا لحظه خرید برای هماهنگی جزئیات تحویل و
            جابه‌جایی فعال می‌ماند تا شما از هر جهت نسبت به جابه‌جایی بسته خود
            مطمئن باشید و در جریان تمامی مراحل قرار بگیرید.
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
            مسافر در موعد مقرر طبق هماهنگی انجام شده بسته را به شما تحویل خواهد
            داد. پس از تأیید، هزینه به حساب مسافر واریز خواهد شد. در این مرحله
            می‌توانید از تجربه ارسالی مطمئن و ارزان لذت ببرید.
          </p>
        </Col>
        <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={2}></Col>
      </Row>
      <Divider style={{ opacity: "0" }} />
    </div>
  );
};

export default SendParcelGuide;
