import React from "react";
import { Link } from "react-router-dom";
import { List, Row, Col, Divider, Spin } from "antd";
import airplane from "../../media/airplane.png";
import DownloadPic from "../utils/DownloadPic";
import TimeDiff from "../utils/TimeDiff";
import { config } from "../../Constant";

var url = config.url.API_URL;
const style_right = { display: "flex", justifyContent: "right" };
const style_left = { display: "flex", justifyContent: "left" };
const style_center = { display: "flex", justifyContent: "center" };

class Orders extends React.Component {
  state = {
    offerModal: false,
    url: "",
  };

  showOffer = () => {
    this.setState({
      offerModal: true,
    });
  };

  handleCancel = () => {
    this.setState({
      offerModal: false,
    });
  };

  render() {
    return (
      <div>
        <List
          grid={{
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          locale={{ emptyText: "آگهی وجود ندارد" }}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            total: this.props.page,
            pageSize: this.props.pagesize,
            hideOnSinglePage: true,
            simple: true,
            hide: true,
          }}
          loading={this.props.loading}
          style={{ display: "flex", justifyContent: "center" }}
          dataSource={this.props.data}
          renderItem={(item) => (
            <Link style={{}} to={"/packet/" + item.slug}>
              <Row
                style={{
                  color: "black",
                  boxShadow: "0 0 9px 1px",
                  borderRadius: "10px",
                  margin: "15px 15px 15px 15px",
                  padding: "15px 15px 10px 5px",
                  width: "340px",
                  height: "170px",
                }}
              >
                <Col xs={11} sm={11} md={11} lg={11} xl={11} xxl={11}>
                  <Row>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <img
                        src={`${url}dstatic/${item.origin_country.icon}`}
                        width={50}
                        style={{ borderRadius: "5px" }}
                      />
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <img
                        src={airplane}
                        width={40}
                        style={{ marginRight: "5px" }}
                      />
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <img
                        src={`${url}dstatic/${item.destination_country.icon}`}
                        width={50}
                        style={{ borderRadius: "5px" }}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row style={{ height: "80px" }}>
                    <Col style={{ color: "black" }}>{item.title}</Col>
                  </Row>
                  <Row>
                    <Col style={{ color: "black" }}>
                      <TimeDiff data={item.create_at} />
                    </Col>
                  </Row>
                </Col>
                <Divider type="vertical" />
                <Col xs={11} sm={11} md={11} lg={11} xl={11} xxl={11}>
                  <div style={style_center}>
                    <DownloadPic data={item.picture} size={140} />
                  </div>
                </Col>
              </Row>
            </Link>
          )}
        />
      </div>
    );
  }
}

export default Orders;
