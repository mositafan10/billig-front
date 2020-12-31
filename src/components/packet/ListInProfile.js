import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Divider, Spin, Modal, Radio, Input, Tooltip, Popconfirm, notification, List, Row, Col, Button, Card } from "antd";
import EditPacket from "./EditPacket";
import { config } from "../../Constant";
import DownloadPic from "../utils/DownloadPic";
import { socket } from "../../socket";

const style_center = {
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
};

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

var url = config.url.API_URL;
const { TextArea } = Input;

class PacketUserList extends React.Component {
  state = {
    packet_user: [],
    packet_user_completed: [],
    loading: true,
    removeReason: false,
    value: 1,
    slug: "",
    text: "",
  };

  componentDidMount() {
    document.title = "بیلیگ - لیست آگهی‌های من";
    this.getUserPacket();
    socket.on("shouldUpdateOffer", () => {
      this.getUserPacket();
    });
  }

  getUserPacket = () => {
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/advertise/user_packet/`, {
      headers: { Authorization: `Token ${token}` },
    }).then((res) => {
      this.setState({
        packet_user: res.data,
        loading: false,
      });
    });
    Axios.get(`${url}api/v1/advertise/user_packet/completed`, {
      headers: { Authorization: `Token ${token}` },
    }).then((res) => {
      this.setState({
        packet_user_completed: res.data,
        loading: false,
      });
    });
  };

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

  handleCancel = () => {
    this.setState({ removeReason: false });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  delete = (slug) => {
    this.setState({ removeReason: true, slug: slug });
  };

  sendReason = () => {
    const current_packet = this.state.packet_user;
    const slug = this.state.slug;
    const token = localStorage.getItem("token");
    Axios.post(
      `${url}api/v1/advertise/removeReason/${slug}/`,
      {
        type_remove: this.state.value,
        description: this.state.text,
      },
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((res) => {
        this.setState({
          packet_user: current_packet.filter(
            (packet_user) => packet_user.slug !== slug
          ),
        });
        notification["success"]({
          message: "از شما متشکریم",
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
            fontSizeAdjust: "0.5",
          },
          duration: 2,
        });
      })
      .catch((error) => console.error(error));
    Axios.delete(`${url}api/v1/advertise/packet/${slug}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        notification["success"]({
          message: "آگهی با موفقیت حذف شد",
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
            fontSizeAdjust: "0.5",
          },
          duration: 2,
        });
      })
      .catch((error) => console.error(error));
    this.setState({ removeReason: false });
  };

  delete1 = (slug) => {
    const current_packet = this.state.packet_user_completed;
    const token = localStorage.getItem("token");
    Axios.delete(`${url}api/v1/advertise/packet/${slug}`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        this.setState({
          packet_user_completed: current_packet.filter(
            (packet_user_completed) => packet_user_completed.slug !== slug
          ),
        });
      })
      .catch((error) => console.error(error));
  };

  update = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <div>
        <Link to="/create-packet">
          <br />
          <Button style={{ borderRadius: "8px", marginBottom: "20px" }}>
            <b>+ ثبت آگهی جدید</b>
          </Button>
        </Link>
        {this.state.loading ? (
          <div style={{ marginTop: "100px" }}>
            <Spin />
          </div>
        ) : (
          <div>
            <Divider>آگهی‌های جاری</Divider>
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
                              <DownloadPic
                                title={item.title}
                                category={item.category}
                                origin_country={item.origin_country.name}
                                destination_country={
                                  item.destination_country.name
                                }
                                origin_city={item.origin_city.name}
                                destination_city={item.destination_city.name}
                                no_matter_origin={item.no_matter_origin}
                                data={item.picture}
                                size="60%"
                              />
                            </Link>
                          </Col>
                        </Row>
                        <Row
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            textAlign: "center",
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
                          <Link to={`/profile/mypacket/${item.slug}`}>
                            <Button
                              style={{
                                border: "hidden",
                                fontSize: "12px",
                                borderRadius: "10px",
                              }}
                            >
                              پیشنهادها ( {item.offer_count} )
                            </Button>
                          </Link>
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
                              <EditPacket
                                data={item.slug}
                                update={this.update}
                              />
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
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {item.status === "منتشر شده" ? (
                              <Popconfirm
                                overlayStyle={{ fontFamily: "VazirD" }}
                                title="آیا از حذف آگهی مطمئن هستید ؟"
                                onConfirm={this.delete.bind(this, item.slug)}
                                onCancel={this.cancel}
                                okText="بله"
                                cancelText="خیر"
                              >
                                <a href="#">
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
                              <Tooltip
                                overlayStyle={{ fontFamily: "VazirD" }}
                                title="چنانچه آگهی پیشنهاد داشته باشد، امکان حذف آن وجود ندارد"
                              >
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
                              </Tooltip>
                            )}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              )}
            />
            <Modal
              title="چرا می‌خواهید آگهی را حذف کنید؟"
              onCancel={this.handleCancel}
              onOk={this.sendReason.bind(this.state.slug)}
              cancelText="انصراف"
              okText="حذف"
              confirmLoading={this.state.loading}
              // okButtonProps={{
              //   form: "offering",
              //   key: "submit",
              //   htmlType: "submit",
              // }}
              visible={this.state.removeReason}
              style={{ fontFamily: "VazirD" }}
            >
              <Radio.Group
                name="value"
                onChange={this.onChange}
                value={this.state.value}
              >
                <Radio style={radioStyle} value={0}>
                  بسته از طریق دیگری ارسال شد.
                </Radio>
                <Radio style={radioStyle} value={1}>
                  پیشنهادی دریافت نکردم
                </Radio>
                <Radio style={radioStyle} value={2}>
                  منصرف شدم
                </Radio>
                <Radio style={radioStyle} value={3}>
                  به دلایل دیگر
                </Radio>
              </Radio.Group>
              {this.state.value === 3 ? (
                <TextArea
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  style={{ borderRadius: "10px", marginTop: "20px" }}
                  rows={5}
                />
              ) : null}
            </Modal>
          </div>
        )}
        {this.state.packet_user_completed.length != 0 && (
          <Divider>آگهی‌های تمام شده</Divider>
        )}
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
          locale={{ emptyText: " " }}
          dataSource={this.state.packet_user_completed}
          renderItem={(item) => (
            <List.Item>
              <Card>
                <Row>
                  <Col span={24}>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "darkseagreen",
                        padding: "5px 0 5px",
                        borderRadius: "5px",
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
                        تمام شده
                      </span>
                    </span>
                    <br />
                    <Row style={style_center}>
                      <Col span={24}>
                        <Link
                          to={`/packet/${item.slug}`}
                          style={{ color: "black" }}
                        >
                          <DownloadPic
                            data={item.picture}
                            category={item.category}
                            size="60%"
                          />
                        </Link>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        textAlign: "center",
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
                    <br />
                    <Row>
                      <Col
                        span={24}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Popconfirm
                          overlayStyle={{ fontFamily: "VazirD" }}
                          title="آیا از حذف آگهی مطمئن هستید ؟"
                          onConfirm={this.delete1.bind(this, item.slug)}
                          onCancel={this.cancel}
                          okText="بله"
                          cancelText="خیر"
                        >
                          <a>
                            <Button
                              style={{
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
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default PacketUserList;
