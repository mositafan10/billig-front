import React from "react";
import Axios from "axios";
import { Row, Col, Button, Space, Divider, Select, Spin } from "antd";
import { Link } from "react-router-dom";
import Orders from "../components/packet/Orders";
import { config } from "../Constant";
import billliger from "../media/Billliger.svg";
import { LoadingOutlined } from "@ant-design/icons";

var url = config.url.API_URL;
const { Option } = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const style_text = {
  alignContent: "center",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  marginTop:"20px"
};

class OrderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      countries: [],
      filter: "none",
      loading: true,
      page: 1,
      count: 0,
      hasMore: true,
    };
  }

  PacketCategory = [
    { value: "مدارک و مستندات", label: "مدارک و مستندات" },
    { value: "کتاب و مجله", label: "کتاب و مجله" },
    { value: "لوازم الکترونیکی", label: "لوازم الکترونیکی" },
    { value: "کفش و پوشاک", label: "کفش و پوشاک" },
    { value: "لوازم آرایشی و بهداشتی", label: "لوازم آرایشی و بهداشتی" },
    { value: "سایر موارد", label: "سایر موارد" },
  ];

  order_type = [
    { label: "خرید", value: "خرید" },
    { label: "پست", value: "پست" },
  ];

  countryfilter = (e) => {
    this.setState({ loading: true });
    this.props.history.replace(`/orders/${e}`);
    Axios.get(`${url}api/v1/advertise/packets/${e}`)
      .then((res) => {
        this.setState({
          orders: res.data.results,
          loading: false,
          page: 2,
          hasMore: true,
          count: res.data.count,
        });
      })
      .catch((error) => console.error(error));
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    Axios.get(`${url}api/v1/account/countries/`).then((res) => {
      this.setState({
        countries: res.data,
      });
    });
  }

  canclefilter = () => {
    this.countryfilter("all");
  };

  showfilter = () => {
    if (this.state.filter === "none") {
      this.setState({ filter: "flex" });
    } else {
      this.setState({ filter: "none" });
    }
  };

  moreData = () => {
    this.setState({ hasMore: false,});
    setTimeout(() => {
      const page = this.state.page;
      const ini_filter = this.props.location.pathname;
      const country = ini_filter.replace("/orders", "");
      const p_country = country.replace("/", "");
      if (
        this.state.count == this.state.orders.length &&
        this.state.count != 0
      ) {
        this.setState({ hasMore: false, loading: false});
        return;
      }
      Axios.get(
        `${url}api/v1/advertise/packets/${
          p_country ? p_country : "all"
        }/?page=${page}`
      )
        .then((res) => {
          this.setState((state) => ({
            orders: state.orders.concat(res.data.results),
            count: res.data.count,
            page: state.page + 1,
            hasMore: true,
            loading: false
          }));
        })
        .catch((error) => console.error(error));
    }, 200);
  };

  render() {
    return (
      <div style={{ padding: "0 30px 0 30px", direction: "rtl" }}>
        <Row >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={12}
            xxl={12}
            style={{ textAlign: "center" }}
          >
            <img
              alt="billlig.com"
              src={billliger}
              style={{ width: "80%", height: "auto" }}
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={12}
            xxl={12}
            style={style_text}
          >
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col  xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={12} 
            style={{textAlign:"right"}}>
                <h1 style={{ textAlign: "right" }}>از سفرت درآمد کسب کن!</h1>
                <p style={{ fontSize: "18px", textAlign: "justify" }}>
                  با عضویت در پلتفرم بیلیگ می‌تونی به‌عنوان
                  <span style={{ color: "#46A0AE" }}> مسافر </span> برای دیگران
                  بسته جابه‌جا کنی و یا خرید انجام بدی و از سفرت درآمد کسب کنی.
                  فقط کافیه عضو سایت بشی، سفرت رو ثبت کنی و بعد روی آگهی‌ها،
                  دست‌مزدی که می‌خوای بگیری رو پیشنهاد بدی.
                </p>

                <Space>
                  <Link to="/traveler">
                    <Button size={"medium"} style={{ borderRadius: "15px" }}>
                      راهنمای مسافر
                    </Button>
                  </Link>
                  <Link to="/profile/mytravel">
                    <Button
                      size={"medium"}
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#46a0ae",
                        color: "white",
                      }}
                    >
                      ثبت سفر
                    </Button>
                  </Link>
                </Space>
                <Divider style={{ opacity: "0" }} />
                </Col>
            </Row>
          </Col>
          <br />
        </Row>
        <Divider />
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Space>
                <Select
                  placeholder="کشور"
                  style={{ width: "150px" }}
                  dropdownStyle={{ fontFamily: "VazirD" }}
                  onChange={this.countryfilter.bind(this)}
                >
                  {this.state.countries.map((e, key) => {
                    return (
                      <Option key={key} value={e.eng_name}>
                        {e.name}
                      </Option>
                    );
                  })}
                </Select>
                <Button
                  style={{ borderRadius: "10px", fontSize: "13px" }}
                  onClick={this.canclefilter.bind(this)}
                >
                  لغو فیلتر
                </Button>
              </Space>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={this.showfilter}> ‌فیلتر آگهی‌ها</Button>
              </div>
              <Divider />
              <div
                style={{ display: this.state.filter, justifyContent: "center" }}
              >
                <Select
                  placeholder="کشور"
                  dropdownStyle={{ fontFamily: "VazirD" }}
                  style={{ width: "100px" }}
                  onChange={this.countryfilter.bind(this)}
                >
                  {this.state.countries.map((e, key) => {
                    return (
                      <Option key={key} value={e.eng_name}>
                        {e.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Spin spinning={this.state.loading}>
            <Orders
              data={this.state.orders}
              moredata={this.moreData}
              hasMore={this.state.hasMore}
            />
          </Spin>
          <Divider style={{ opacity: 0 }} />
        </Row>
      </div>
    );
  }
}

export default OrderList;
