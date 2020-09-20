import React from "react";
import Axios from "axios";
import { Card, Row, Col, Spin } from "antd";
import OfferDetail from "../components/offer/OfferInDetail";
import DownloadPic1 from "../components/utils/DownloadPic1";
import Bookmark from "../components/packet/Bookmark";
import { Link } from "react-router-dom";
import { config } from "../Constant";

var url = config.url.API_URL;

const style_left = { display: "flex", justifyContent: "left" };
const style_right = { display: "flex", justifyContent: "right" };

class OrderDetail extends React.Component {
  state = {
    order: [],
    loading: true,
  };

  componentDidMount() {
    const orderID = this.props.match.params.orderID;
    Axios.get(`${url}api/v1/advertise/packet/${orderID}`)
      .then((res) => {
        this.setState({
          order: res.data,
          loading: false,
        });
      })
      .catch((error) => {});
  }
  render() {
    const picID = this.state.order && this.state.order.picture;
    const user = localStorage.getItem("user");
    return (
      <div style={{ textAlign: "center", padding: "0 50px 0 50px" }}>
        {this.state.loading ? (
          <div style={{ margin: "100px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row width="500">
            <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
              <Card
                style={{ borderRadius: "20px" }}
                title={this.state.order.title}
              >
                <Row style={style_right}>
                  <Col
                    style={style_right}
                    xs={14}
                    sm={14}
                    md={14}
                    lg={14}
                    xl={14}
                  >
                    <h4>دسته بندی</h4>
                  </Col>
                  <Col
                    style={style_left}
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    {this.state.order.category}
                  </Col>
                </Row>
                <hr style={{ color: "aliceblue" }} />
                <Row style={style_right}>
                  <Col
                    style={style_right}
                    xs={14}
                    sm={14}
                    md={14}
                    lg={14}
                    xl={14}
                  >
                    <h4>دریافت کالا در </h4>
                  </Col>
                  <Col
                    style={style_left}
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    {this.state.order.origin_country
                      ? this.state.order.origin_country.name
                      : ""}{" "}
                    ,{" "}
                    {this.state.order.origin_city
                      ? this.state.order.origin_city.name
                      : ""}
                  </Col>
                </Row>
                <hr style={{ color: "aliceblue" }} />
                <Row style={style_right}>
                  <Col
                    style={style_right}
                    xs={14}
                    sm={14}
                    md={14}
                    lg={14}
                    xl={14}
                  >
                    <h4>تحویل کالا در</h4>
                  </Col>
                  <Col
                    style={style_left}
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    {this.state.order.destination_country
                      ? this.state.order.destination_country.name
                      : ""}{" "}
                    ,{" "}
                    {this.state.order.destination_city
                      ? this.state.order.destination_city.name
                      : ""}
                  </Col>
                </Row>
                <hr style={{ color: "aliceblue" }} />
                <Row style={style_right}>
                  <Col
                    style={style_right}
                    xs={14}
                    sm={14}
                    md={14}
                    lg={14}
                    xl={14}
                  >
                    <h4>آگهی دهنده</h4>
                  </Col>
                  <Col
                    style={style_left}
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    <Link to={"users/" + user}>
                      {" "}
                      {this.state.order.owner_name}{" "}
                    </Link>
                  </Col>
                </Row>
                <hr style={{ color: "aliceblue" }} />
                {this.state.order.buy ? (
                  <div>
                    <Row style={style_right}>
                      <Col
                        style={style_right}
                        xs={14}
                        sm={14}
                        md={14}
                        lg={14}
                        xl={14}
                      >
                        <h4>قابلیت خریداری</h4>
                      </Col>
                      <Col
                        style={style_left}
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        xl={10}
                      >
                        دارد
                      </Col>
                    </Row>
                    <hr style={{ color: "aliceblue" }} />
                    <Row style={style_right}>
                      <Col
                        style={style_right}
                        xs={14}
                        sm={14}
                        md={14}
                        lg={14}
                        xl={14}
                      >
                        <h4>قیمت کالا</h4>
                      </Col>
                      <Col
                        style={style_left}
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        xl={10}
                      >
                        <span style={{ marginLeft: "5px" }}> ۱/۰۰۰/۰۰۰ </span>
                        <span> تومان </span>
                      </Col>
                    </Row>
                    <hr style={{ color: "aliceblue" }} />
                    <Row style={style_right}>
                      <Col
                        style={style_right}
                        xs={14}
                        sm={14}
                        md={14}
                        lg={14}
                        xl={14}
                      >
                        <h4>لینک خرید</h4>
                      </Col>
                      <Col
                        style={style_left}
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        xl={10}
                      >
                        <a href="https://www.amazon.com">www.amazon.com</a>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <Row style={style_right}>
                    <Col
                      style={style_right}
                      xs={14}
                      sm={14}
                      md={14}
                      lg={14}
                      xl={14}
                    >
                      <h4>قابلیت خریداری</h4>
                    </Col>
                    <Col
                      style={style_left}
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      xl={10}
                    >
                      ندارد
                    </Col>
                  </Row>
                )}
                <hr style={{ color: "aliceblue" }} />
                <br />
                <p style={{ textAlign: "right" }}>
                  {this.state.order.description}
                </p>
                <br />
                <hr style={{ color: "aliceblue" }} />
                <br />
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    border: "1px",
                  }}
                >
                  <Col
                    style={style_right}
                    xs={14}
                    sm={14}
                    md={14}
                    lg={14}
                    xl={14}
                  >
                    درآمد شما
                  </Col>
                  <Col
                    style={style_left}
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    <h3 style={{ marginLeft: "5px" }}> ۲۰۰/۰۰۰ </h3>
                    <h3> تومان </h3>
                  </Col>
                </Row>
                <OfferDetail
                  style
                  data={this.state.order.slug}
                  {...this.props}
                ></OfferDetail>
              </Card>
              <br />
            </Col>
            <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
              <br />
              <br />
              <DownloadPic1 data={picID} size={300} />
              <br />
              <br />
              <p s>
                با مطالعه‌ی <a>راهنمای خرید امن</a> آسوده‌تر خرید کنید
              </p>
              <Bookmark data={this.state.order.slug} />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default OrderDetail;
