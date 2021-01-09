import React from "react";
import { Col, Row, Button } from "antd";
import { Link } from "react-router-dom";
import main_banner from "../../media/main_banner.svg";

const style_text = {
  alignContent: "center",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
};

const MainBanner = () => {
  return (
    <div style={{ margin: "0 10px 0 10px" }}>
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
              <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                <h1 style={{ fontSize: "20px", textAlign: "center" }}>
                  <span style={{ fontSize: "30px" }}>بیلیگ؛</span>
                  <br />
                  <span style={{ color: "#ff9a00" }}>
                    {" "}
                    خریدار یا صاحب‌بسته{" "}
                  </span>
                  را به
                  <span style={{ color: "#067fc8" }}> مسافر </span>وصل می‌کند.
                </h1>
                <Link to={"/how-billlig-work"}>
                  <Button
                    size="large"
                    style={{
                      borderRadius: "25px",
                      backgroundColor: "#edf2f0",
                      borderColor: "white",
                      fontSize: "13px",
                    }}
                  >
                    راهنمای استفاده از بیلیگ
                  </Button>
                </Link>
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
                  <span style={{ color: "#ff9a00" }}>
                    {" "}
                    خریدار یا صاحب‌بسته{" "}
                  </span>
                  را به
                  <span style={{ color: "#067fc8" }}> مسافر </span>وصل می‌کند.
                  <br />
                  <Link to={"/how-billlig-work"}>
                    <Button
                      size="large"
                      style={{
                        borderRadius: "25px",
                        backgroundColor: "#edf2f0",
                        borderColor: "white",
                        fontSize: "14px",
                      }}
                    >
                      راهنمای استفاده از بیلیگ
                    </Button>
                  </Link>
                </h1>
                <span></span>
              </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MainBanner;
