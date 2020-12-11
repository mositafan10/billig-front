import React from "react";
import Axios from "axios";
import { Row, Col, Divider, Button } from "antd";
import { Link } from "react-router-dom";
import Orders from "../components/packet/Orders";
import { config } from "../Constant";
import CommentsBilllig from "../components/rating/CommentsBilllig";
import CommentBillligCreate from "../components/rating/CommentBillligCreate";
import MainBanner from "../components/landingpage/MainBanner";
import BillligStrength from "../components/landingpage/BillligStrength";
import BillligerLanding from "../components/landingpage/BillligerLanding";

var url = config.url.API_URL;


class LandingPage extends React.Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = "بیلیگ-پلتفرم خرید و پست اشتراکی";
    Axios.get(`${url}api/v1/advertise/packets/all`)
      .then((res) => {
        this.setState({
          orders: res.data.results,
          loading: false,
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <div>
        <MainBanner/>
        <Divider style={{ opacity: "0" }} />
        <BillligerLanding/>
        <Divider>آخرین آگهی‌ها</Divider>
        <Row style={{display:"flex", justifyContent:"center", padding: "0 20px 0 20px"}}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Orders data={this.state.orders} loading={this.state.loading} />
          </Col>
          <Link to="/orders">
            <Button style={{ borderRadius: "8px" }}>نمایش همه آگهی</Button>
          </Link>
        </Row>
        <BillligStrength />
        <Divider>آخرین نظرات</Divider>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col span={22}>
            <CommentsBilllig count={5} />
          </Col>
        </Row>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Divider style={{ opacity: 0 }} />
          <CommentBillligCreate />
        </Row>
        <Divider />
      </div>
    );
  }
}

export default LandingPage;
