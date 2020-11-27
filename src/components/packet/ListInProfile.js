import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Spin } from "antd";
import {
  Popconfirm,
  notification,
  List,
  Row,
  Col,
  Button,
} from "antd";
import OfferListModal from "../offer/OfferListModal";
import EditPacket from "./EditPacket";
import { config } from "../../Constant";
import { Breakpoint } from "react-socks";
import DownloadPic from "../utils/DownloadPic";
import { PlusOutlined } from "@ant-design/icons";

const style_center = { display: "flex", justifyContent: "center" };

var url = config.url.API_URL;

class PacketUserList extends React.Component {
  state = {
    packet_user: [],
    loading: true,
  };

  columns = [
    {
      title: " عنوان آگهی",
      dataIndex: "title",
      key: "title",
      align: "right",
      render: (dataIndex, row) => (
        <Link to={"/packet/" + row.slug}>{dataIndex}</Link>
      ),
    },
    {
      title: " قیمت (تومان)",
      dataIndex: "suggested_price",
      key: "suggested_price",
      align: "center",
      width: 150,
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 150,
      align: "center",
      render: (dataIndex) => (
        <span style={{ fontSize: "12px" }}>{dataIndex}</span>
      ),
    },
    {
      title: "پیشنهاد",
      dataIndex: "offer_count",
      key: "offer_count",
      width: 50,
      align: "center",
    },
    {
      title: "",
      dataIndex: "slug",
      key: "slug",
      width: 10,
      render: (row, dataIndex) => <OfferListModal data={dataIndex} buy={row.buy} count={row.offer_count} />,
    },
    {
      title: "",
      dataIndex: "slug",
      key: "slug",
      width: 10,
      render: (dataIndex) => <EditPacket data={dataIndex} update={this.update} />,
    },
    {
      title: "",
      dataIndex: "slug",
      key: "slug",
      width: 10,
      render: (dataIndex) => (
        <Popconfirm
          overlayStyle={{ fontFamily: "VazirD" }}
          title="آیا از حذف آگهی مطمئن هستید ؟"
          onConfirm={this.delete.bind(this, dataIndex)}
          onCancel={this.cancel}
          okText="بله"
          cancelText="خیر"
        >
          <a>
            <Button
              style={{
                border: "hidden",
                fontSize: "12px",
                borderRadius: "10px",
              }}
              onClick={this.offerlistmodal}
            >
              حذف
            </Button>
          </a>
        </Popconfirm>
      ),
    },
  ];

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
        marginTop: "30%",
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
    this.componentDidMount()
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Breakpoint medium up>
          <Link to="/create-packet">
            <br />
            <br />
            <Button
              icon={<PlusOutlined />}
              style={{ borderRadius: "8px", marginBottom: "10px" }}
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
                xs: 1,
                sm: 1,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 3,
              }}
              style={{ display: "flex" }}
              locale={{ emptyText: "شما هنوز آگهی ثبت نکرده‌اید." }}
              dataSource={this.state.packet_user}
              renderItem={(item) => (
                <div>
                  <Row
                    style={{
                      color: "black",
                      border: "1px solid",
                      borderRadius: "15px",
                      margin: "25px 15px 25px 15px",
                      padding: "15px 15px 15px 15px",
                      width: "300px",
                      height: "auto",
                    }}
                  >
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
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
                      <hr />
                      <Row
                        style={style_center}
                      >
                        <Col>
                          <div>
                            <Link to={`/packet/${item.slug}`}
                            style={{ color: "black" }}>
                            <DownloadPic data={item.picture} size={140} />
                            </Link>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          marginTop: "10px",
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
                          { (item.status === "منتشر شده" || item.status === "دارای پیشنهاد" || item.status === "در انتظار تایید") ?
                          <EditPacket data={item.slug} update={this.update}/>
                          :
                          <Button style={{
                            border: "hidden",
                            fontSize: "14px",
                            borderRadius: "10px"}} disabled={true}>ویرایش</Button>
                          }
                        </Col>
                        <Col
                          span={12}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          { (item.status === "منتشر شده" || item.status === "دارای پیشنهاد" || item.status === "در انتظار تایید" ) ?
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
                          :
                          <Button style={{
                            border: "hidden",
                            fontSize: "14px",
                            borderRadius: "10px"}} disabled={true}>حذف</Button>
                          }
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}></Col>
                  </Row>
                </div>
              )}
            />
          )}
        </Breakpoint>
        <Breakpoint small down>
          {this.state.loading ? (
            <div style={{ marginTop: "100px" }}>
              <Spin />
            </div>
          ) : (
            <div>
              <Link to="/create-packet">
                <Button
                  icon={<PlusOutlined />}
                  style={{
                    borderRadius: "10px",
                    marginTop: "40px",
                    fontSize: "14px",
                  }}
                >
                  <b> ثبت آگهی جدید</b>
                </Button>
              </Link>
              <List
                locale={{ emptyText: "آگهی وجود ندارد" }}
                dataSource={this.state.packet_user}
                renderItem={(item) => (
                  <div>
                    <Row
                      style={{
                        color: "black",
                        border: "1px solid",
                        borderRadius: "10px",
                        margin: "25px 15px 25px 15px",
                        padding: "15px 15px 15px 15px",
                        width: "300px",
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Col span={24}>
                        <Row style={{display: "flex", justifyContent: "center" }}>
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
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
                        </Row>
                        <Row
                          style={style_center}
                        >
                          <Col>
                            <div>
                            <Link to={`/packet/${item.slug}`}
                            style={{ color: "black" }}>
                              <DownloadPic data={item.picture} size={140} />
                              </Link>
                            </div>
                          </Col>
                        </Row>
                        <Row
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            marginTop: "10px",
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
                            <EditPacket data={item.slug} update={this.update} />
                          </Col>
                          <Col
                            span={12}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
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
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                )}
              />
            </div>
          )}
        </Breakpoint>
      </div>
    );
  }
}

export default PacketUserList;
