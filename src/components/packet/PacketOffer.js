import React from "react";
import {
  Button,
  Popconfirm,
  Table,
  List,
  Row,
  Col,
  Avatar,
  Space,
  Divider,
  Spin,
  notification,
} from "antd";
import Axios from "axios";
import SendMessage from "./SendMessage";
import { Link } from "react-router-dom";
import SendTransactionInfo from "../payment/SendTransactionInfo";
import { config } from "../../Constant";
import RateAndComment from "../rating/RateAndComment";
import { Breakpoint } from "react-socks";

var url = config.url.API_URL;
const token = localStorage.getItem("token");

class PacketOffer extends React.Component {
  state = {
    packet_offer: [],
    disablepayment: true,
    disableconfirm: false,
    visible: false,
    loading: true,
  };

  columns = [
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 150,
      align: "center",
    },
    {
      title: "پیشنهاد دهنده",
      dataIndex: "sender",
      key: "sender",
      width: 150,
      align: "center",
      render: (key, row) => <Link to={"/users/" + row.sender_id}>{key}</Link>,
    },
    {
      title: "قیمت (تومان)",
      dataIndex: "price",
      key: "y",
      width: 150,
      align: "center",
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      key: "offer_count",
      align: "center",
      width: 600,
    },
    {
      title: " ",
      dataIndex: "slug",
      key: "",
      align: "center",
      width: 50,
      render: (dataIndex, row) => {
        if (row.status === "انجام شده") {
          return (
            <Button
              disabled={true}
              style={{
                fontSize: "12px",
                backgroundColor: "white",
                color: "transparent",
                textShadow: "0 0 5px rgba(0,0,0,0.5)",
                borderRadius: "10px",
              }}
            >
              چت
            </Button>
          );
        } else {
          return (
            <SendMessage
              sender={row.sender_id}
              receiver={row.receiver_id}
              slug={dataIndex}
            />
          );
        }
      },
    },
    {
      title: " ",
      dataIndex: "slug",
      key: "",
      align: "center",
      render: (dataIndex, row) => {
        if (row.status === "در انتظار پاسخ") {
          return (
            <Popconfirm
              overlayStyle={{ fontFamily: "VazirD" }}
              title="آیا از قبول پیشنهاد مطمئن هستید ؟"
              onConfirm={this.accept.bind(this, dataIndex)}
              onCancel={this.cancel}
              okText="بله"
              cancelText="خیر"
            >
              <Button
                style={{
                  fontSize: "12px",
                  border: "hidden",
                  color: "white",
                  backgroundColor: "green",
                  borderRadius: "10px",
                }}
              >
                <b>قبول</b>
              </Button>
            </Popconfirm>
          );
        } else if (row.status === "در انتظار پرداخت") {
          return (
            <Popconfirm
              overlayStyle={{ fontFamily: "VazirD" }}
              title="آیا مبلغ نهایی مورد تایید است ؟"
              onConfirm={this.confirmpayment.bind(this)}
              onCancel={this.cancel}
              okText="بله"
              cancelText="خیر"
            >
              <Button
                disabled={this.state.disableconfirm}
                style={{
                  fontSize: "12px",
                  border: "hidden",
                  color: this.state.disableconfirm ? "transparent" : "white",
                  backgroundColor: "green",
                  borderRadius: "10px",
                  textShadow:
                    this.state.disableconfirm && "0 0 5px rgba(0,0,0,0.5)",
                }}
              >
                <b>تایید</b>
              </Button>
            </Popconfirm>
          );
        } else if (row.status === "در انتظار تایید خریدار") {
          return (
            <Popconfirm
              overlayStyle={{ fontFamily: "VazirD" }}
              title="آیا کالا را تحویل گرفته‌اید ؟"
              onConfirm={this.receiveconfirm.bind(this, dataIndex)}
              onCancel={this.cancel}
              okText="بله"
              cancelText="خیر"
            >
              <Button
                style={{
                  fontSize: "12px",
                  border: "hidden",
                  backgroundColor: "aliceblue",
                  borderRadius: "10px",
                }}
              >
                تایید تحویل
              </Button>
            </Popconfirm>
          );
        } else if (row.status === "انجام شده") {
          return (
            <RateAndComment
              signal={this.callbackFunction}
              data={dataIndex}
              receiver={row.receiver_id}
              loc={"صاحب کالا"}
            />
          );
        } else {
          return (
            <Button
              style={{
                fontSize: "12px",
                border: "hidden",
                backgroundColor: "aliceblue",
                borderRadius: "10px",
              }}
            ></Button>
          );
        }
      },
    },
    {
      title: "",
      dataIndex: "slug",
      key: "slug",
      align: "center",
      render: (dataIndex, row) => {
        if (row.status === "در انتظار پرداخت") {
          return (
            <SendTransactionInfo
              disabled={this.state.disablepayment}
              amount={row.price + row.parcel_price}
              factorNumber={dataIndex}
            />
          );
        } else {
          return (
            <Button
              style={{
                fontSize: "12px",
                border: "hidden",
                backgroundColor: "aliceblue",
                borderRadius: "10px",
              }}
            ></Button>
          );
        }
      },
    },
  ];

  callbackFunction = () => {
    this.componentDidMount();
  };

  confirmpayment = () => {
    notification["success"]({
      message: "مبلغ پرداخت توسط شما تایید شد",
      description: "حال می‌توانید پرداخت خود را انجام دهید",
      style: {
        fontFamily: "VazirD",
        textAlign: "right",
        float: "right",
        width: "max-content",
        marginTop: "50%",
      },
      duration: 5,
    });
    this.componentDidMount();
    this.setState({
      disableconfirm: true,
      disablepayment: false,
    });
  };

  accept(data) {
    Axios.post(
      `${url}api/v1/advertise/offer/update/`,
      {
        slug: data,
        status: 1,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then(() => {
        notification["success"]({
          message: "پیشنهاد با موفقیت تایید شد",
          description: "حال باید منتظر تایید مبلغ از سوی مسافر باشید",
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
            marginTop: "50%",
          },
          duration: 5,
        });
        this.componentDidMount();
      })
      .catch((error) => console.error(error));
  }

  receiveconfirm = (data) => {
    Axios.post(
      `${url}api/v1/advertise/offer/update/`,
      {
        slug: data,
        status: 6,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then(() => {
        notification["success"]({
          message: "دریافت کالا از سوی شما تایید شد",
          description:
            "حال می‌توانید نظر خود را در مورد مسافر بیان کنید و به ایشان امتیاز دهید. امتیاز شما می‌تواند به کابران دیگر کمک کند",
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
            marginTop: "50%",
          },
          duration: 5,
        });
        this.componentDidMount();
      })
      .catch((error) => console.error(error));
  };

  componentDidMount() {
    const orderID = this.props.data;
    Axios.get(`${url}api/v1/advertise/offer/${orderID}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        this.setState({
          packet_offer: res.data,
          loading: false,
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <div>
        <Breakpoint medium up>
          {this.state.loading ? (
            <div style={{ marginTop: "100px" }}>
              <Spin />
            </div>
          ) : (
            <Table
              pagination={{
                onChange: (page) => {},
                hideOnSinglePage: true,
                size: "small",
              }}
              locale={{ emptyText: "پیشنهادی وجود ندارد" }}
              columns={this.columns}
              dataSource={this.state.packet_offer}
            />
          )}
        </Breakpoint>
        <Breakpoint small down>
          <List
            locale={{ emptyText: "پیشنهادی وجود ندارد" }}
            pagination={{
              onChange: (page) => {},
              hideOnSinglePage: true,
              simple: true,
              hide: true,
            }}
            dataSource={this.state.packet_offer}
            renderItem={(item) => (
              <div>
                <Row
                  style={{
                    color: "black",
                    border: "1px solid",
                    borderRadius: "10px",
                    margin: "25px 15px 25px 15px",
                    padding: "15px 15px 15px 15px",
                    width: "90%",
                    height: "auto",
                  }}
                >
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    xxl={24}
                    style={{ textAlign: "center" }}
                  >
                    <p>
                      {" "}
                      وضعیت :{" "}
                      <span style={{ color: "blue" }}>{item.status}</span>
                    </p>
                    <hr />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Avatar
                      src={`${url}dstatic/media/${item.sender_avatar}`}
                    ></Avatar>
                    <span>
                      <Link
                        to={`/users/${item.sender_id}`}
                        style={{ color: "black", fontSize: "14px" }}
                      >
                        {" "}
                        {item.sender}{" "}
                      </Link>
                    </span>
                    <Divider style={{ marginTop: "5px", opacity: "0" }} />
                    <p>{item.description}</p>
                    <br />
                    <p style={{ textAlign: "left" }}> {item.price} تومان </p><hr/>
                  </Col>
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <Space>
                      <Col>
                        {item.status === "انجام شده" ? (
                          <Button
                            disabled={true}
                            style={{
                              fontSize: "12px",
                              backgroundColor: "white",
                              color: "transparent",
                              textShadow: "0 0 5px rgba(0,0,0,0.5)",
                              borderRadius: "10px",
                            }}
                          >
                            چت
                          </Button>
                        ) : (
                          <SendMessage
                            sender={item.sender_id}
                            receiver={item.receiver_id}
                            slug={item.slug}
                          />
                        )}
                      </Col>
                      <Col>
                        {item.status === "در انتظار پاسخ" && (
                          <Popconfirm
                            overlayStyle={{ fontFamily: "VazirD" }}
                            title="آیا از قبول پیشنهاد مطمئن هستید ؟"
                            onConfirm={this.accept.bind(this, item.slug)}
                            onCancel={this.cancel}
                            okText="بله"
                            cancelText="خیر"
                          >
                            <Button
                              style={{
                                fontSize: "12px",
                                border: "hidden",
                                color: "white",
                                backgroundColor: "green",
                                borderRadius: "10px",
                              }}
                            >
                              <b>قبول</b>
                            </Button>
                          </Popconfirm>
                        )}
                        {item.status === "در انتظار پرداخت" && (
                          <Popconfirm
                            overlayStyle={{ fontFamily: "VazirD" }}
                            title="آیا مبلغ نهایی مورد تایید شما است ؟"
                            onConfirm={this.confirmpayment.bind(this)}
                            onCancel={this.cancel}
                            okText="بله"
                            cancelText="خیر"
                          >
                            <Button
                              disabled={this.state.disableconfirm}
                              // onClick={this.confirmpayment.bind(this)}
                              style={{
                                fontSize: "12px",
                                border: "hidden",
                                color: "white",
                                backgroundColor: "green",
                                borderRadius: "10px",
                              }}
                            >
                              <b>تایید</b>
                            </Button>
                          </Popconfirm>
                        )}
                        {item.status === "در انتظار تایید خریدار" && (
                          <Popconfirm
                            overlayStyle={{ fontFamily: "VazirD" }}
                            title="آیا کالا را تحویل گرفته‌اید ؟"
                            onConfirm={this.receiveconfirm.bind(
                              this,
                              item.slug
                            )}
                            onCancel={this.cancel}
                            okText="بله"
                            cancelText="خیر"
                          >
                            <Button
                              style={{
                                fontSize: "12px",
                                border: "hidden",
                                backgroundColor: "aliceblue",
                                borderRadius: "10px",
                              }}
                            >
                              تایید تحویل
                            </Button>
                          </Popconfirm>
                        )}
                        {item.status === "انجام شده" && (
                          <RateAndComment
                            signal={this.callbackFunction}
                            data={item.slug}
                            receiver={item.receiver_id}
                            loc={"صاحب کالا"}
                          />
                        )}
                      </Col>
                      <Col>
                        {item.status === "در انتظار پرداخت" && (
                          <SendTransactionInfo
                            disabled={this.state.disablepayment}
                            amount={item.price + item.parcel_price}
                            factorNumber={item.slug}
                          />
                        )}
                      </Col>
                    </Space>
                  </Col>
                </Row>
                <Divider />
              </div>
            )}
          />
        </Breakpoint>
      </div>
    );
  }
}

export default PacketOffer;
