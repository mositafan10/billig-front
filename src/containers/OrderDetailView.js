import React from "react";
import Axios from "axios";
import {
  Card,
  Row,
  Col,
  Spin,
  ConfigProvider,
  Button,
  Tooltip,
  Popconfirm,
} from "antd";
import { Link } from "react-router-dom";
import Report from '../components/packet/Report'
import OfferDetail from "../components/offer/OfferInDetail";
import DownloadPic from "../components/utils/DownloadPic";
import Bookmark from "../components/packet/Bookmark";
import { config } from "../Constant";
import { Breakpoint } from "react-socks";
import PageNotFound from "../components/errors/PageNotFound";
import { ShareAltOutlined, QuestionCircleOutlined } from "@ant-design/icons";
var url = config.url.API_URL;

const style_left = { display: "flex", justifyContent: "flex-end" };
const style_right = { display: "flex", justifyContent: "right" };
const style_center = { justifyContent: "center", display: "flex" }

class OrderDetail extends React.Component {
  state = {
    order: [],
    loading: true,
    phonenumbervisibility: false,
    error: "",
    visibleinfo: false,
  };
  myRef = React.createRef();

  componentDidMount() {
    window.scroll(0, 0);
    const orderID = this.props.match.params.orderID;
    Axios.get(`${url}api/v1/advertise/packet/${orderID}`)
      .then((res) => {
        this.setState({
          order: res.data,
          loading: false,
        });
        document.title = this.state.order.no_matter_origin
          ? this.state.order.title +
            "_" +
            this.state.order.category.name +
            "_بیلیگ"
          : this.state.order.title +
            "_" +
            this.state.order.category.name +
            "_" +
            this.state.order.origin_country.name +
            "_بیلیگ";
      })
      .catch((error) => {
        this.setState({ error: error.response.status });
      });
  }

  shareurl = () => {
    const shareurl =
      "https://billlig.com" + this.props.history.location.pathname;
    navigator.clipboard.writeText(shareurl);
  };

  phonenumbervisible = () => {
    this.setState({ phonenumbervisibility: true });
  };

  canclephonenumbervisible = () => {
    this.setState({ phonenumbervisibility: false });
  };

  currency = (value) => {
    const p = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return p;
  };

  showinfo = () => {
    this.setState({
      visibleinfo: true,
    });
  };
  
  closeinfo = () => {
    this.setState({
      visibleinfo: false,
    });
  };

  render() {
    const picID = this.state.order && this.state.order.picture;
    return (
      <div style={{ textAlign: "center" }}>
        <ConfigProvider direction="rtl">
          <Breakpoint medium up>
            {this.state.error == 404 ? (
              <PageNotFound />
            ) : this.state.loading ? (
              <div style={{ margin: "100px" }}>
                <Spin size="large" />
              </div>
            ) : (
              <Row style={{ margin: "50px" }}>
                <Col span={8}>
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
                        {this.state.order.category
                          ? this.state.order.category.name
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
                        {this.state.order.buy ? (
                          <h4>خرید کالا از </h4>
                        ) : (
                          <h4>دریافت کالا در </h4>
                        )}
                      </Col>
                      <Col
                        style={style_left}
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        xl={10}
                      >
                        {this.state.order.no_matter_origin ? (
                          <div>
                            <Popconfirm
                              overlayStyle={{ fontFamily: "VazirD" }}
                              visible={this.state.visibleinfo}
                              onConfirm={this.closeinfo}
                              cancelButtonProps={{ hidden: "true" }}
                              okText="متوجه شدم"
                              title="برای آگهی‌دهنده فرقی نمی‌کند که کالا از کدام کشور خریداری شود"
                            >
                              <Button style={{border:"hidden", padding:"initial"}} onClick={this.showinfo}>
                                <QuestionCircleOutlined />
                              </Button>
                            </Popconfirm>
                            <span style={{ paddingRight: "5px" }}>
                              فرقی نمی‌کند
                            </span>
                          </div>
                        ) : (
                          <div>
                            <Link to={`/orders/${this.state.order.origin_country.eng_name}`}>
                            {this.state.order.origin_country
                              ? this.state.order.origin_country.name
                              : ""}{" "}
                            {" "}
                            </Link>{" "},{" "}
                            {this.state.order.origin_city
                              ? this.state.order.origin_city.name
                              : ""}
                          </div>
                        )}
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
                        <div>
                      <Link to={`/orders/${this.state.order.destination_country.eng_name}`}>
                        {this.state.order.destination_country
                          ? this.state.order.destination_country.name
                          : ""}{" "}
                            {" "}
                            </Link>{" "},{" "}
                        {this.state.order.destination_city
                          ? this.state.order.destination_city.name
                          : ""}
                          </div>
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
                        <h4>وزن حدودی</h4>
                      </Col>
                      <Col
                        style={style_left}
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        xl={10}
                      >
                        {this.state.order.weight}
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
                        <h4>ابعاد بسته</h4>
                      </Col>
                      <Col
                        style={style_left}
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        xl={10}
                      >
                        {this.state.order.dimension}
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
                        <h4>بیلیگر</h4>
                      </Col>
                      <Col
                        style={style_left}
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        xl={10}
                      >
                        <Link
                          to={`/users/` + this.state.order.owner_slug}
                        >
                          {this.state.order.owner_name}
                        </Link>
                      </Col>
                    </Row>
                    {this.state.order.buy && (
                      <div>
                        {this.state.order.parcel_price != 0 && 
                        <div>
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
                            <span style={{ marginLeft: "5px" }}>
                              {this.currency(this.state.order.parcel_price)}
                            </span>
                            <span> تومان </span>
                          </Col>
                        </Row>
                        </div>
                        }
                        {this.state.order.parcel_link &&
                        <div>
                        <hr style={{ color: "aliceblue" }} />
                        <Row style={style_right}>
                          <Col
                            style={style_right}
                            xs={6}
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}
                          >
                            <h4>لینک کالا</h4>
                          </Col>
                          <Col
                            style={style_left}
                            xs={18}
                            sm={18}
                            md={18}
                            lg={18}
                            xl={18}
                          >
                            <a rel="nofollow" target="_blank" href={this.state.order.parcel_link}>
                            <span style={{border:"hidden", }}>لینک</span>
                            </a>
                          </Col>
                        </Row>
                        </div>
                      }
                      </div>
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
                        دستمزد این بسته
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
                          {this.currency(this.state.order.suggested_price)}
                        </p>
                        <p> تومان </p>
                      </Col>
                    </Row>
                    <Row>
                    <Col
                        style={style_right}
                        xs={18}
                        sm={18}
                        md={18}
                        lg={18}
                        xl={18}
                      >
                        تعداد داوطلبان حمل مرسوله
                      </Col>
                      <Col
                        style={style_left}
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                      >
                        {this.state.order.offer_count}
                        </Col>
                    </Row>
                    <br/>
                    <OfferDetail
                      data={this.state.order.slug}
                      buy={this.state.order.buy}
                      {...this.props}
                    />
                  </Card>
                  <br />
                </Col>
                <Col span={16}>
                  <br />
                  <DownloadPic 
                  title={this.state.order.title} 
                  category={this.state.order.category} 
                  origin_country={this.state.order.origin_country.name}
                  destination_country={this.state.order.destination_country.name}
                  origin_city={this.state.order.origin_city.name}
                  destination_city={this.state.order.destination_city.name}
                  no_matter_origin={this.state.order.no_matter_origin}
                  data={picID}
                  size={400} />
                  <br />
                  <Row style={{ justifyContent: "center", display: "flex" }}>
                    <Bookmark data={this.state.order.slug} />
                    <Tooltip
                      title="لینک آگهی کپی شد"
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
                    <Report data={this.state.order.slug}/>
                  </Row>
                  <br/>
                   <Row style={style_center}>
                  <p> خواندن و مرور<Link to='/advices'> این مطلب</Link> قبل از انجام معامله توصیه می‌شود</p>
                  </Row>
                <br />
                  <br/>
                </Col>
              </Row>
            )}
          </Breakpoint>
          <Breakpoint small down>
            <Row style={{ display: "flex", justifyContent: "center", marginTop:"10px" }}>
              <Col>
                <DownloadPic 
                  title={this.state.order.title} 
                  category={this.state.order.category} 
                  origin_country={this.state.order.origin_country && this.state.order.origin_country.name}
                  destination_country={this.state.order.destination_country && this.state.order.destination_country.name}
                  origin_city={this.state.order.origin_city && this.state.order.origin_city.name }
                  destination_city={this.state.order.destination_city && this.state.order.destination_city.name}
                  no_matter_origin={this.state.order.no_matter_origin}
                  data={picID}
                  size={250} 
                  />
                <br/>
                <Row style={{ justifyContent: "center", display: "flex" }}>
                  <Bookmark data={this.state.order.slug} />
                  <Tooltip
                    title="لینک آگهی کپی شد"
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
                  <Report data={this.state.order.slug}/>
                </Row>
                <br/>
              </Col>
              <Col span={22}>
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
                      {this.state.order.category
                        ? this.state.order.category.name
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
                      {this.state.order.buy ? (
                        <h4>خرید کالا از </h4>
                      ) : (
                        <h4>دریافت کالا در </h4>
                      )}
                    </Col>
                    <Col
                      style={style_left}
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      xl={10}
                    >
                      {this.state.order.no_matter_origin ? (
                        <div>
                          <div>
                            <Popconfirm
                              overlayStyle={{ fontFamily: "VazirD" }}
                              cancelButtonProps={{ hidden: "true" }}
                              okText="متوجه شدم"
                              title="برای آگهی‌دهنده فرقی نمی‌کند که کالا از کدام کشور خریداری شود"
                            >
                              <QuestionCircleOutlined />
                            </Popconfirm>
                            <span style={{ paddingRight: "5px" }}>
                              فرقی نمی‌کند
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div>
                        <Link to={`/orders/${this.state.order.origin_country && this.state.order.origin_country.eng_name}`}>
                            {this.state.order.origin_country
                              ? this.state.order.origin_country.name
                              : ""}{" "}
                            {" "}
                            </Link>{" "},{" "}
                            {this.state.order.origin_city
                              ? this.state.order.origin_city.name
                              : ""}
                        </div>
                      )}
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
                      <div>
                      <Link to={`/orders/${this.state.order.destination_country && this.state.order.destination_country.eng_name}`}>
                        {this.state.order.destination_country
                          ? this.state.order.destination_country.name
                          : ""}{" "}
                            {" "}
                            </Link>{" "},{" "}
                        {this.state.order.destination_city
                          ? this.state.order.destination_city.name
                          : ""}
                        </div>
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
                      <h4>وزن حدودی</h4>
                    </Col>
                    <Col
                      style={style_left}
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      xl={10}
                    >
                      {this.state.order.weight}
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
                      <h4>ابعاد بسته</h4>
                    </Col>
                    <Col
                      style={style_left}
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      xl={10}
                    >
                      {this.state.order.dimension}
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
                      <h4>بیلیگر</h4>
                    </Col>
                    <Col
                      style={style_left}
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      xl={10}
                    >
                     <Link
                          to={`/users/` + this.state.order.owner_slug}
                        >
                          {this.state.order.owner_name}
                        </Link>
                    </Col>
                  </Row>
                  {this.state.order.buy && (
                    <div>
                      {this.state.order.parcel_price != 0 &&
                      <div>
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
                          <span style={{ marginLeft: "5px" }}>
                            {this.currency(this.state.order.parcel_price)}
                          </span>
                          <span> تومان </span>
                        </Col>
                      </Row>
                      </div>
                      }
                      {this.state.order.parcel_link &&
                      <div>
                      <hr style={{ color: "aliceblue" }} />
                      <Row style={style_right}>
                      <Col
                          style={style_right}
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          xl={6}
                        >
                          <h4>لینک کالا</h4>
                        </Col>
                        <Col
                          style={style_left}
                          xs={18}
                          sm={18}
                          md={18}
                          lg={18}
                          xl={18}
                        >
                          <br/>
                          <a target="_blank" rel="nofollow" href={this.state.order.parcel_link}>
                          <span>لینک</span>
                          </a>
                        </Col>
                      </Row>
                      </div>
                  }
                    </div>
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
                      دستمزد این بسته
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
                        {this.currency(this.state.order.suggested_price)}
                      </p>
                      <p> تومان </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                        style={style_right}
                        xs={18}
                        sm={18}
                        md={18}
                        lg={18}
                        xl={18}
                      >
                        تعداد داوطلبان حمل مرسوله
                      </Col>
                      <Col
                        style={style_left}
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                      >
                        {this.state.order.offer_count}
                        </Col>
                    </Row>
                    <br/>
                  <OfferDetail
                    data={this.state.order.slug}
                    buy={this.state.order.buy}
                    {...this.props}
                  />
                </Card>
                <br />
                <Row style={style_center}>
                    <p> خواندن و مرور<Link to='/advices'> این مطلب</Link> قبل از انجام معامله توصیه می‌شود</p>
                  </Row>
              </Col>
            </Row>
          </Breakpoint>
        </ConfigProvider>
      </div>
    );
  }
}

export default OrderDetail;
