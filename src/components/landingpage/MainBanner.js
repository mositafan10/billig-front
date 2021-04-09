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
                <div>
                <br/>
                <h1 style={{ fontSize: "20px", textAlign: "center" }}>
                خرید سریع و ارزان از فروشگاه‌های دنیا
                </h1>
                <p style={{ fontSize: "15px", marginTop: "10px"}}>کالای خود را از هر فروشگاهی که می‌خواهید، توسط مسافر تهیه کنید.</p>
                </div>
                <Link to={"/how-billlig-work"}>
                  <Button
                    size="large"
                    style={{
                      borderRadius: "25px",
                      backgroundColor: "#edf2f0",
                      borderColor: "white",
                      fontSize: "16px",
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
                <h1 style={{ fontSize: "40px", textAlign: "right" }}>
                    خرید سریع و ارزان از فروشگاه‌های دنیا
                    <br/>
                    <p style={{ fontSize: "18px", marginTop: "10px"}}>کالای خود را از هر فروشگاهی که می‌خواهید، توسط مسافر تهیه کنید.</p>
                  <Link to={"/how-billlig-work"}>
                    <Button
                      style={{
                        borderRadius: "25px",
                        padding: "10px 40px 50px 40px",
                        backgroundColor: "#edf2f0",
                        borderColor: "white",
                        fontSize: "24px",
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
