import React from "react";
import Axios from "axios";
import {
  Card,
  Row,
  Col,
  Spin,
  ConfigProvider,
  notification,
  Button,
  Tooltip,
} from "antd";
import OfferDetail from "../components/offer/OfferInDetail";
import DownloadPic from "../components/utils/DownloadPic";
import DownloadPic1 from "../components/utils/DownloadPic1";
import Bookmark from "../components/packet/Bookmark";
import { Link } from "react-router-dom";
import { config } from "../Constant";
import { Breakpoint } from "react-socks";
import { ShareAltOutlined } from "@ant-design/icons";
var url = config.url.API_URL;

const style_left = { display: "flex", justifyContent: "flex-end" };
const style_right = { display: "flex", justifyContent: "right" };

class OrderDetail extends React.Component {
  state = {
    order: [],
    loading: true,
  };
  myRef = React.createRef();

  componentDidMount() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const orderID = this.props.match.params.orderID;
    Axios.get(`${url}api/v1/advertise/packet/${orderID}`)
      .then((res) => {
        this.setState({
          order: res.data,
          loading: false,
        });
        document.title =
          this.state.order.title +
          "_" +
          this.state.order.category +
          "_" +
          this.state.order.origin_country.name +
          "_بیلیگ";
        this.props.history.push(`/packet/${document.title}/${orderID}/`);
      })
      .catch((error) => {
        notification["success"]({
          message: error.response.data.detail,
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 5,
        });
      });
  }

  shareurl = () => {
    const shareurl =
      "https://billlig.com" + this.props.history.location.pathname;
    navigator.clipboard.writeText(shareurl);
  };

  render() {
    const picID = this.state.order && this.state.order.picture;
    const user = localStorage.getItem("user");
    return (
      <div style={{ textAlign: "center" }}>
        <ConfigProvider direction="rtl">
          <Breakpoint medium up>
            {this.state.loading ? (
              <div style={{ margin: "100px" }}>
                <Spin size="large" />
              </div>
            ) : (
              <Row style={{ margin: "50px" }}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
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
                        <Link to={"/users/" + this.state.order.owner_slug}>
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
                            <span style={{ marginLeft: "5px" }}>
                              {" "}
                              {this.state.order.parcel_price}{" "}
                            </span>
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
                            <a href="https://www.amazon.com">
                              {this.state.order.parcel_link}
                            </a>
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
                        درآمد
                      </Col>
                      <Col
                        style={style_left}
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        xl={10}
                      >
                        <p style={{ marginLeft: "5px" }}>
                          {" "}
                          {this.state.order.suggested_price}
                        </p>
                        <p> تومان </p>
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
                <Col lg={12} xl={12} xxl={12}>
                  <br />
                  <DownloadPic data={picID} size={400} />
                  <br />
                  <Row style={{ justifyContent: "center", display: "flex" }}>
                    <Bookmark data={this.state.order.slug} />
                    <Tooltip
                      title="کپی شد"
                      trigger="click"
                      overlayStyle={{ fontFamily: "VazirD" }}
                    >
                      <Button
                        icon={
                          <ShareAltOutlined
                            style={{ fontSize: "24px" }}
                            onClick={this.shareurl}
                          />
                        }
                        style={{ border: "hidden" }}
                      />
                    </Tooltip>
                  </Row>
                </Col>
              </Row>
            )}
          </Breakpoint>
          <Breakpoint small down>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col>
                <DownloadPic1 data={picID} size={200} />
                <br />
                <Row style={{ justifyContent: "center", display: "flex" }}>
                  <Bookmark data={this.state.order.slug} />
                  <Tooltip
                    title="کپی شد"
                    trigger="click"
                    overlayStyle={{ fontFamily: "VazirD" }}
                  >
                    <Button
                      icon={
                        <ShareAltOutlined
                          style={{ fontSize: "24px" }}
                          onClick={this.shareurl}
                        />
                      }
                      style={{ border: "hidden" }}
                    />
                  </Tooltip>
                </Row>
                <br />
              </Col>
              <Col>
                <Card
                  style={{ borderRadius: "20px", width: "300px" }}
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
                      <Link to={"/users/" + this.state.order.owner_slug}>
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
                          <span style={{ marginLeft: "5px" }}>
                            {" "}
                            {this.state.order.parcel_price}{" "}
                          </span>
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
                          <a href="https://www.amazon.com">
                            {this.state.order.parcel_link}
                          </a>
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
                      درآمد
                    </Col>
                    <Col
                      style={style_left}
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      xl={10}
                    >
                      <p style={{ marginLeft: "5px" }}>
                        {" "}
                        {this.state.order.suggested_price}
                      </p>
                      <p> تومان </p>
                    </Col>
                  </Row>
                  <OfferDetail data={this.state.order.slug} {...this.props} />
                </Card>
                <br />
              </Col>
            </Row>
          </Breakpoint>
        </ConfigProvider>
      </div>
    );
  }
}

export default OrderDetail;
