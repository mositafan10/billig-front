import React from "react";
import { Link } from "react-router-dom";
import { List, Row, Col, Divider, Spin, message } from "antd";
import airplane from "../../media/airplane.png";
import DownloadPic from "../utils/DownloadPic";
import TimeDiff from "../utils/TimeDiff";
import { config } from "../../Constant";
import InfiniteScroll from "react-infinite-scroller";
import { LoadingOutlined, GlobalOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

var url = config.url.API_URL;
const style_center = { display: "flex", justifyContent: "center" };

class Orders extends React.Component {
  render() {
    return (
      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.props.moredata}
          hasMore={this.props.hasMore}
          loader={
            <Spin
              indicator={antIcon}
              style={{ display: "flex", justifyContent: "center" }}
            />
          }
          useWindow={true}
          threshold={20}
        >
          <List
            grid={{
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            locale={{ emptyText: " " }}
            itemLayout="horizontal"
            loading={this.props.loading}
            dataSource={this.props.data}
            renderItem={(item) => (
              <Link to={"/packet/" + item.slug}>
                <Row
                  style={{
                    color: "black",
                    border: "1px solid",
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
                        {item.origin_country == null ?
                        <GlobalOutlined style={{fontSize:"25px", marginRight:"10px"}} />
                        :
                        <img
                          src={`${url}dstatic/${item.origin_country.icon}`}
                          width={50}
                          style={{ borderRadius: "5px" }}
                        />
                        }
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
          ></List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default Orders;
