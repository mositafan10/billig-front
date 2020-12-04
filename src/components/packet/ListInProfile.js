import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Spin } from "antd";
import { Popconfirm, notification, List, Row, Col, Button, Card } from "antd";
import OfferListModal from "../offer/OfferListModal";
import EditPacket from "./EditPacket";
import { config } from "../../Constant";
import DownloadPic from "../utils/DownloadPic";
import { PlusOutlined } from "@ant-design/icons";

const style_center = {
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
};

var url = config.url.API_URL;

class PacketUserList extends React.Component {
  state = {
    packet_user: [],
    loading: true,
  };

  componentDidMount() {
    document.title = "بیلیگ - لیست آگهی‌های من";
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/advertise/user_packet/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        this.setState({
          packet_user: res.data,
          loading: false,
        });
      })
      .catch((error) => console.error(error));
  }

  cancel(e) {
    notification["error"]({
      message: "درخواست لغو شد",
      style: {
        fontFamily: "VazirD",
        textAlign: "right",
        float: "right",
        width: "max-content",
        fontSizeAdjust: "0.5",
      },
      duration: 2,
    });
  }

  delete = (slug) => {
    const current_packet = this.state.packet_user;
    const token = localStorage.getItem("token");
    Axios.delete(`${url}api/v1/advertise/packet/${slug}`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        this.setState({
          packet_user: current_packet.filter(
            (packet_user) => packet_user.slug !== slug
          ),
        });
      })
      .catch((error) => console.error(error));
  };

  callbackFunction = () => {
    this.componentDidMount();
  };

  update = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <div>
        <Link to="/create-packet">
          <br />
          <Button
            icon={<PlusOutlined />}
            style={{ borderRadius: "8px", marginBottom: "20px" }}
          >
            <b> ثبت آگهی جدید</b>
          </Button>
        </Link>
        {this.state.loading ? (
          <div style={{ marginTop: "100px" }}>
            <Spin />
          </div>
        ) : (
          <List
            grid={{
              gutter: 24,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 4,
            }}
            locale={{ emptyText: "شما هنوز آگهی ثبت نکرده‌اید." }}
            dataSource={this.state.packet_user}
            renderItem={(item) => (
              <List.Item>
                <Card>
                  <Row>
                    <Col span={24}>
                      <span
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        وضعیت آگهی :
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            color: "darkgreen",
                            marginRight: "3px",
                          }}
                        >
                          {item.status}
                        </span>
                      </span>
                      <br />
                      <Row style={style_center}>
                        <Col span={24}>
                          <Link
                            to={`/packet/${item.slug}`}
                            style={{ color: "black" }}
                          >
                            <DownloadPic data={item.picture} size="60%" />
                          </Link>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          textAlign: "center",
                          marginTop: "10px",
                          // height: "20%",
                        }}
                      >
                        <Col style={{ color: "black" }}>
                          <Link
                            to={`/packet/${item.slug}`}
                            style={{ color: "black" }}
                          >
                            {item.title}
                          </Link>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "10px",
                        }}
                      >
                        <OfferListModal
                          data={item.slug}
                          count={item.offer_count}
                          buy={item.buy}
                        />
                      </Row>
                      <hr />
                      <Row>
                        <Col
                          span={12}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            borderLeft: "1px solid",
                          }}
                        >
                          {item.status === "منتشر شده" ||
                          item.status === "دارای پیشنهاد" ||
                          item.status === "در انتظار تایید" ? (
                            <EditPacket data={item.slug} update={this.update} />
                          ) : (
                            <Button
                              style={{
                                border: "hidden",
                                fontSize: "14px",
                                borderRadius: "10px",
                              }}
                              disabled={true}
                            >
                              ویرایش
                            </Button>
                          )}
                        </Col>
                        <Col
                          span={12}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          {item.status === "منتشر شده" ||
                          item.status === "دارای پیشنهاد" ||
                          item.status === "در انتظار تایید" ? (
                            <Popconfirm
                              overlayStyle={{ fontFamily: "VazirD" }}
                              title="آیا از حذف آگهی مطمئن هستید ؟"
                              onConfirm={this.delete.bind(this, item.slug)}
                              onCancel={this.cancel}
                              okText="بله"
                              cancelText="خیر"
                            >
                              <a>
                                <Button
                                  style={{
                                    border: "hidden",
                                    fontSize: "14px",
                                    borderRadius: "10px",
                                  }}
                                  onClick={this.offerlistmodal}
                                >
                                  حذف
                                </Button>
                              </a>
                            </Popconfirm>
                          ) : (
                            <Button
                              style={{
                                border: "hidden",
                                fontSize: "14px",
                                borderRadius: "10px",
                              }}
                              disabled={true}
                            >
                              حذف
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }
}

export default PacketUserList;
