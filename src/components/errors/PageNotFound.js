import React, { Component } from "react";
import { Button, Row, Col, Divider } from "antd";
import { Link } from "react-router-dom";
import NotFound from "../../media/NotFound.jpg";

const style = {
  borderRadius: "10px",
};

class PageNotFound extends Component {
  render() {
    return (
      <div style={{ textAlign: "center", margin: "5px" }}>
        <Row>
            <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
          <img
            alt="billlig.com"
            src={NotFound}
            style={{ width: "40%", height: "auto" }}
          />
          </Col>
            <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
          <img
            alt="billlig.com"
            src={NotFound}
            style={{ width: "100%", height: "auto" }}
          />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Link to="/"><Button size="medium" style={{borderRadius:"10px", color:"white", backgroundColor:"green"}}>بازگشت به صفحه اصلی</Button></Link>
          </Col>
          <Divider/>
        </Row>
      </div>

      // />
    );
  }
}

export default PageNotFound;
