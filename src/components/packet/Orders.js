import React from "react";
import { Link } from "react-router-dom";
import { List, Row, Col, Divider, Spin, Card } from "antd";
import airplane from "../../media/airplane.png";
import DownloadPic from "../utils/DownloadPic";
import TimeDiff from "../utils/TimeDiff";
import { config } from "../../Constant";
import InfiniteScroll from "react-infinite-scroller";
import { LoadingOutlined, GlobalOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

var url = config.url.API_URL;
const style_center = { display: "flex", justifyContent: "center" , alignItems:"center"}


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
              style={style_center}
            />
          }
          useWindow={true}
          threshold={20}
        >
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 4,
            }}
            locale={{ emptyText: " " }}
            itemLayout="horizontal"
            loading={this.props.loading}
            dataSource={this.props.data}
            renderItem={(item) => (
              <List.Item>
              <Card>
              <Link to={"/packet/" + item.slug}>
                <Row
                  style={{
                    color: "black",
                  }}
                  >
                  <Col span={12}>
                    <Row style={style_center}>
                      <Col span={8} style={style_center}  >
                        {item.no_matter_origin == true ?
                        <GlobalOutlined style={{fontSize:"25px", marginRight:"10px"}} />
                        :
                        <img
                          loading="lazy"
                          src={`${url}dstatic/${item.origin_country.icon}`}
                          width="100%"
                          style={{ borderRadius: "5px" }}
                        />
                        }
                      </Col>
                      <Col span={8} style={style_center}>
                        <img
                          src={airplane}
                          width="100%"
                          style={{ marginRight: "5px" }}
                        />
                      </Col>
                      <Col span={8} style={style_center}>
                        <img
                          loading="lazy"
                          src={`${url}dstatic/${item.destination_country.icon}`}
                          width="100%"
                          style={{ borderRadius: "5px" }}
                        />
                      </Col>
                    </Row>
                    <br />
                    <Row style={{height:"70%"}}>
                      <Col style={{ color: "black", }} span={24}>{item.title}</Col>
                      <Col style={{ color: "black", display:"flex", alignItems:"end"}} span={24}>
                        <TimeDiff data={item.create_at} />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={10}>
                    <div style={style_center}>
                      <DownloadPic data={item.picture} size="100%" />
                    </div>
                  </Col>
                </Row>
              </Link>
              </Card>
              </List.Item>
            )}
          ></List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default Orders;
