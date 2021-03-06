import React, { Component } from "react";
import Axios from "axios";
import { Row, Col, Space, Divider, Input, message, ConfigProvider } from "antd";
import {
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  FacebookOutlined,
  CopyrightOutlined,
} from "@ant-design/icons";
import { config } from "../Constant";
import { Link } from "react-router-dom";

var url = config.url.API_URL;
const style_p = { color: "#edf2f0" };

const { Search } = Input;

class FooterSection extends Component {
  send = (value) => {
    Axios.post(`${url}api/v1/account/newsletter/`, {
      email: value,
    })
      .then((res) => {
        if (res.status === 200) {
          return message.success("ایمیل شما با موفقیت ثبت شد");
        }
      })
      .catch((error) => message.info(error.response.data.detail));
  };

  render() {
    return (
      <ConfigProvider direction="rtl">
        <Row style={{ backgroundColor: "#263238", color: "white" }}>
          <Col xs={24} sm={24} md={24} lg={2} xl={2} xxl={2}></Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={6}
            xl={6}
            xxl={6}
            style={{ marginBottom: "20px" }}
          >
            بیلیگ را در شبکه‌های اجتماعی دنبال کنید
            <Divider />
            <Space size="large">
              <a
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: "#edf2f0" }}
                href="https://twitter.com/billligofficial"
              >
                <TwitterOutlined style={{ fontSize: "30px" }} />
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: "#edf2f0" }}
                href="https://www.instagram.com/billligofficial/"
              >
                <InstagramOutlined style={{ fontSize: "30px" }} />
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: "#edf2f0" }}
                href="https://www.linkedin.com/company/billlig/"
              >
                <LinkedinOutlined style={{ fontSize: "30px" }} />
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: "#edf2f0" }}
                href="https://www.facebook.com/billlig.co"
              >
                <FacebookOutlined style={{ fontSize: "30px" }} />
              </a>
            </Space>
            <Divider />
            <p>از تخفیفات فروشگاه‌ها و جدیدترین‌های بیلیگ باخبر شوید:</p>
            <Search
              id="search"
              name="search"
              placeholder="ایمیل خود را وارد کنید"
              onSearch={(value) => this.send(value)}
              enterButton={"ارسال"}
              autoSize
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={2} xl={2} xxl={2}></Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
            <p>
              <b>راهنمای کاربران</b>
            </p>
            <hr width="120" style={{ float: "right" }} />
            <br />
            <Link to={"/whybilllig"}>
              <p style={style_p}>چرا بیلیگ ؟</p>
            </Link>
            <Link to={"/billliger"}>
              <p style={style_p}> راهنمای خریدار</p>
            </Link>
            <Link to={"/traveler"}>
              <p style={style_p}> راهنمای مسافر</p>
            </Link>
            <Link to={"/advices"}>
              <p style={style_p}> توصیه‌های بیلیگ به کاربران</p>
            </Link>
            <Link to={"/faq"}>
              <p style={style_p}>سوالات متداول</p>
            </Link>
          </Col>
          <br />
          <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
            <p>
              <b>بیلیگ</b>
            </p>
            <hr width="80" style={{ float: "right" }} />
            <br />
            <a rel="noopener noreferrer" target="_blank" href={`${url}blog/`}>
              <p style={style_p}>بلاگ</p>
            </a>
            <Link to={"/about-us"}>
              <p style={style_p}>درباره ما</p>
            </Link>
            <Link to={"/privacy"}>
              <p style={style_p}>حریم خصوصی</p>
            </Link>
            <Link to={"/terms"}>
              <p style={style_p}>شرایط و ضوابط</p>
            </Link>
          </Col>
          <br />
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={2}
            xl={2}
            xxl={2}
            style={{
              backgroundColor: "#edf2f0",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <a
              referrerpolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=216475&amp;code=EZitQXIqYJiGFMO1Q0uP"
            >
              <img
                referrerpolicy="origin"
                src="https://Trustseal.eNamad.ir/logo.aspx?id=216475&amp;Code=EZitQXIqYJiGFMO1Q0uP"
                alt=""
                id="EZitQXIqYJiGFMO1Q0uP"
              />
            </a>
          </Col>
        </Row>
        <Divider />
        <Row style={{ justifyContent: "center", display: "flex" }}>
          <br />
          <h5 style={{ textAlign: "center", color: "white" }}>
            <CopyrightOutlined /> تمامی حقوق برای بیلیگ محفوظ است. برداشتن مطالب
            با درج لینک سایت مانعی ندارد .{" "}
          </h5>
        </Row>
      </ConfigProvider>
    );
  }
}

export default FooterSection;
