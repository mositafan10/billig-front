import React from "react";
import { Col, Row, Divider } from "antd";
import ShoppingGuide from "../media/ShoppingGuide.svg";
import insert from "../media/insert.svg";
import time from "../media/time.svg";
import money from "../media/money.svg";
import Delivery  from "../media/Delivery.svg";
import buyer from '../media/buyer.svg';


const SendParcelGuide = () => {
  window.scroll(0,0)
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
              <b>راهنمای خرید کالا با بیلیگ</b>
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
بدون نگرانی از مشکلات حمل‌ونقل و گمرک 
هرچیزی رو از هرجایی تو دنیا 
احتیاج داشتی، 
با استفاده از بیلیگ بخر
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
              src={ShoppingGuide}
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
              خرید کالا از طریق پلتفرم بیلیگ یک فرآیند کاملاً هدایت شده و گام‌به‌گام است
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
پس از ثبت‌نام به صفحه درج آگهی رفته و لینک کالای مورد نظر خود را از 
هر فروشگاهی که کالا در آن قرار  دارد، وارد کنید.
در غیر این صورت اطلاعات دقیق کالا و مشخصات فروشگاه آن را وارد کنید
تا مسافر به راحتی بتواند کالای شما رو خریداری و تهیه کند.    
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
            >: 
پس از ثبت آگهی، پیشنهادهای مسافران برای خرید کالای شما و همچنین 
مبلغ مد نظرشان برای دستمزد در پروفایل کاربری نمایش داده خواهد شد.
شما می‌توانید پس از مذاکره با مسافران مختلف، یک مسافر را برای انجام خرید
انتخاب کرده و وارد مرحله پرداخت شوید.
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
در این مرحله شما مبلغ کالای مورد نظر خود را به همراه دستمزد توافق شده
برای مسافر از طریق گزینه نهایی کردن سفارش پرداخت کرده و منتظر خرید
توسط مسافر مورد نظر می‌مانید.
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
پس از پرداخت به مسافر اطلاع داده می‌شود تا خرید را انجام دهد.
صفحه چت بین مسافر و شما تا لحظه خرید برای هماهنگی جزئیات خرید 
فعال می‌ماند تا شما از هر جهت نسبت به خرید خود مطمئن باشید و
در جریان تمامی مراحل خرید قرار بگیرید.
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
مسافر در موعد مقرر پس از خرید کالا را طبق هماهنگی انجام شده به شما
تحویل خواهد داد. پس از تأیید، هزینه به حساب مسافر واریز خواهد شد.
در این مرحله می‌توانید از خرید خود لذت ببرید.
            </p>
          </Col>
          <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={2}></Col>
        </Row>
        <Divider style={{opacity:"0"}}/>

      </div>
    );
}

export default SendParcelGuide;
