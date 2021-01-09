import React from "react";
import Axios from "axios";
import { Row, Col, Button, Space, Divider, Select, Spin } from "antd";
import { Link, Redirect } from "react-router-dom";
import Orders from "../components/packet/Orders";
import { config } from "../Constant";
import billliger from "../media/Billliger.svg";

var url = config.url.API_URL;
const { Option } = Select;
const style_text = {
  alignContent: "center",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  marginTop: "20px",
};

class OrderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      filterOrders: [],
      countries: [],
      categories: [],
      filter: "none",
      loading: true,
      page: 1,
      count: 0,
      hasMore: true,
      country: "all",
      category: "all",
      changeUrll: false,
      buy: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const country = this.props.match.params.country;
    const category = this.props.match.params.category;
    if (category !== undefined) {
      this.setState({ category: category });
    }
    if (country !== undefined) {
      this.setState({ country: country });
    }
    Axios.get(`${url}api/v1/account/countries/`).then((res) => {
      this.setState({
        countries: res.data,
      });
    });
    Axios.get(`${url}api/v1/advertise/categoryList/`).then((res) => {
      this.setState({
        categories: res.data,
      });
    });
  }

  countryfilter = (e) => {
    this.setState({ loading: true, country: e, changeUrll: "true" });
    Axios.get(`${url}api/v1/advertise/packets/${e}/${this.state.category}`)
      .then((res) => {
        this.setState({
          orders: res.data.results,
          filterOrders: res.data.results,
          loading: false,
          page: 2,
          hasMore: true,
          count: res.data.count,
          buy: "all"
        });
      })
      .catch((error) => console.error(error));
  };

  categoryfilter = (e) => {
    this.setState({ loading: true, category: e, changeUrll: "true" });
    Axios.get(`${url}api/v1/advertise/packets/${this.state.country}/${e}`)
      .then((res) => {
        this.setState({
          orders: res.data.results,
          filterOrders: res.data.results,
          loading: false,
          page: 2,
          hasMore: true,
          count: res.data.count,
          buy: "all"
        });
      })
      .catch((error) => console.error(error));
  };

  buyhandle = (e) => {
    this.setState({ buy: e });
    const orders = this.state.filterOrders;
    if (e === "buy") {
      this.setState({
        buy: "buy",
        orders: orders.filter((order) => order.buy === true),
      });
    } else {
      this.setState({
        buy: "post",
        orders: orders.filter((order) => order.buy === false),
      });
    }
  };

  canclefilter = () => {
    this.setState({ country: "all", category: "all", changeUrll: "true" });
    Axios.get(`${url}api/v1/advertise/packets/all/all`)
      .then((res) => {
        this.setState({
          orders: res.data.results,
          filterOrders: res.data.results,
          loading: false,
          page: 2,
          hasMore: true,
          count: res.data.count,
          buy: "all"
        });
      })
      .catch((error) => console.error(error));
  };

  showfilter = () => {
    if (this.state.filter === "none") {
      this.setState({ filter: "flex" });
    } else {
      this.setState({ filter: "none" });
    }
  };

  moreData = () => {
    this.setState({ hasMore: false });
    setTimeout(() => {
      const page = this.state.page;
      if (
        this.state.count == this.state.orders.length &&
        this.state.count != 0
      ) {
        this.setState({ hasMore: false, loading: false });
        return;
      }
      Axios.get(
        `${url}api/v1/advertise/packets/${this.state.country}/${this.state.category}/?page=${page}`
      )
        .then((res) => {
          this.setState((state) => ({
            orders: state.orders.concat(res.data.results),
            filterOrders: state.filterOrders.concat(res.data.results),
            count: res.data.count,
            page: state.page + 1,
            hasMore: true,
            loading: false,
          }));
        })
        .catch((error) => console.error(error));
    }, 200);
  };

  render() {
    if (this.state.changeUrll) {
      return (
        this.setState({ changeUrll: false }),
        (
          <Redirect
            to={`/orders/${this.state.country}/${this.state.category}`}
          />
        )
      );
    }
    return (
      <div style={{ padding: "0 30px 0 30px", direction: "rtl" }}>
        <Row>
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
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={12}
                xl={12}
                xxl={12}
                style={{ textAlign: "right" }}
              >
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
                        backgroundColor: "#067fc8",
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
                  style={{ width: "150px", borderRadius:"10px" }}
                  dropdownStyle={{ fontFamily: "VazirD", borderRadius:"10px" }}
                  onChange={this.countryfilter.bind(this)}
                  value={
                    this.state.country == "all" ? "کشور" : this.state.country
                  }
                >
                  {this.state.countries.map((e, key) => {
                    return (
                      <Option key={key} value={e.eng_name}>
                        {e.name}
                      </Option>
                    );
                  })}
                </Select>
                <Select
                  placeholder="دسته‌بندی"
                  style={{ width: "150px", borderRadius:"10px" }}
                  dropdownStyle={{ fontFamily: "VazirD", borderRadius:"10px" }}
                  onChange={this.categoryfilter.bind(this)}
                  value={
                    this.state.category == "all" ? "دسته‌بندی" : this.state.category
                  }
                >
                  {this.state.categories.map((e, key) => {
                    return (
                      <Option key={key} value={e.eng_name}>
                        {e.name}
                      </Option>
                    );
                  })}
                </Select>
                {/* <Select
                  placeholder="نوع آگهی"
                  style={{ width: "150px", borderRadius:"10px" }}
                  dropdownStyle={{ fontFamily: "VazirD", borderRadius:"10px" }}
                  onChange={this.buyhandle.bind(this)}
                  value={
                    this.state.buy == "buy"
                      ? "buy"
                      : this.state.buy == "post"
                      ? "post"
                      : "همه"
                  }
                >
                  <Option key="post" value="post">
                    پست
                  </Option>
                  <Option key="buy" value="buy">
                    خرید
                  </Option>
                </Select> */}
                <Button
                  style={{ borderRadius: "10px", fontSize: "13px", padding:"0 45px 0 45px"  }}
                  onClick={this.canclefilter.bind(this)}
                >
                  لغو فیلترها
                </Button>
              </Space>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button style={{borderRadius:"8px"}} onClick={this.showfilter}> ‌فیلتر آگهی‌ها</Button>
              </div>
              <Divider />
              <div
                style={{ display: this.state.filter, justifyContent: "center", textAlign:"center" }}
              >
                <Space direction="vertical">
                <Select
                
                  placeholder="کشور"
                  style={{ width: "150px" }}
                  dropdownStyle={{ fontFamily: "VazirD", borderRadius:"10px", borderRadius:"10px" }}
                  onChange={this.countryfilter.bind(this)}
                  value={
                    this.state.country == "all" ? "کشور" : this.state.country
                  }
                >
                  {this.state.countries.map((e, key) => {
                    return (
                      <Option key={key} value={e.eng_name}>
                        {e.name}
                      </Option>
                    );
                  })}
                </Select>
                <Select
                  placeholder="دسته‌بندی"
                  style={{ width: "250px" }}
                  dropdownStyle={{ fontFamily: "VazirD", borderRadius:"10px" }}
                  onChange={this.categoryfilter.bind(this)}
                  value={
                    this.state.category == "all" ? "دسته‌بندی" : this.state.category
                  }
                >
                  {this.state.categories.map((e, key) => {
                    return (
                      <Option key={key} value={e.eng_name}>
                        {e.name}
                      </Option>
                    );
                  })}
                </Select>
                {/* <Select
                  placeholder="نوع آگهی"
                  style={{ width: "150px" }}
                  dropdownStyle={{ fontFamily: "VazirD", borderRadius:"10px" }}
                  onChange={this.buyhandle.bind(this)}
                  value={
                    this.state.buy == "buy"
                      ? "buy"
                      : this.state.buy == "post"
                      ? "post"
                      : "همه"
                  }
                >
                  <Option key="post" value="post">
                    پست
                  </Option>
                  <Option key="buy" value="buy">
                    خرید
                  </Option>
                </Select> */}
                <Button
                  style={{ borderRadius: "5px", fontSize: "13px", padding:"0 45px 0 45px" }}
                  onClick={this.canclefilter.bind(this)}
                >
                  لغو فیلترها
                </Button>
                </Space>
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <Row >
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
