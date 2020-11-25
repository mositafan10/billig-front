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
import moment from 'moment';

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
      render: (dataIndex) => {
        if (dataIndex == "تمام شده") {
          return (
            <div style={{ backgroundColor: "green", color: "white" }}>
              {dataIndex}
            </div>
          );
        }
        else { return dataIndex}
      },
    },
    {
      title: "پیشنهاد دهنده",
      dataIndex: "sender",
      key: "sender",
      width: 150,
      align: "center",
      render: (key, row) => <a target="blank" href={`${url}users/` + row.sender_slug}>{key}</a>,
    },
    {
      title: "اطلاعات سفر",
      dataIndex: "travel_info",
      key: "slug",
      width: 300,
      align: "center",
      render: (dataIndex) => <div>{dataIndex.origin} / {dataIndex.origin_city} به {dataIndex.destination} / {dataIndex.destination_city} در {moment(dataIndex.flight_date).format("DD MMM")}</div>,
    },
    {
      title: "دستمزد (تومان)",
      dataIndex: "price",
      key: "y",
      width: 150,
      align: "center",
      render: (dataIndex) => this.currency(dataIndex)
    },
    {
      title: this.props.buy && "قیمت کالا (تومان)",
      dataIndex: "parcel_price_offer",
      key: "y",
      width: 150,
      align: "center",
      render: (dataIndex) => this.props.buy && this.currency(dataIndex)
    },
    {
      title: " ",
      dataIndex: "slug",
      key: "slug",
      align: "center",
      render: (dataIndex, row) => {
        if (row.status != "تمام شده") {
          return (
            <SendMessage
              sender={row.sender_slug}
              receiver={row.receiver_slug}
              slug={dataIndex}
            />
          );
        }
      },
    },
    {
      title: " ",
      dataIndex: "slug",
      key: "slug",
      align: "center",
      render: (dataIndex, row) => {
        if (row.status === "در انتظار پاسخ") {
          return (
            <Popconfirm
              overlayStyle={{ fontFamily: "VazirD" }}
              title="آیا از تایید اولیه پیشنهاد مطمئن هستید ؟"
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
                <b>تایید اولیه</b>
              </Button>
            </Popconfirm>
          );
        } else if (row.status === "در انتظار پرداخت") {
          return (
            <Popconfirm
              overlayStyle={{ fontFamily: "VazirD" }}
              title={<div>با رد شدن مبلغ، پیشنهاد به مرحله قبل بازمی‌گردد تا مسافر مبلغ را مجدد وارد نماید<br/>آیا پیشنهاد به مرحله قبل باز گردد؟</div>}
              onConfirm={this.rejectpayment.bind(this,row.slug)}
              onCancel={this.cancel}
              okText="بله"
              cancelText="خیر"
            >
              <Button
                style={{
                  fontSize: "12px",
                  border: "hidden",
                  color: "white",
                  backgroundColor: "red",
                  borderRadius: "10px",
                }}
              >
                <b>رد مبلغ پیشنهادی</b>
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
                  backgroundColor: "green",
                  color:"white",
                  borderRadius: "10px",
                }}
              >
               تحویل گرفتم
              </Button>
            </Popconfirm>
          );
        } else if (row.status === "انجام شده") {
          return (
            <RateAndComment
              signal={this.callbackFunction}
              data={dataIndex}
              receiver={row.receiver_slug}
              loc={"مسافر"}
            />
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
              amount={row.price + row.parcel_price}
              factorNumber={dataIndex}
            />
          );
        }
      },
    },
  ];

  currency = (value) => {
    const p =  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return p
}

  callbackFunction = () => {
    this.componentDidMount();
  };

  rejectpayment = (data) => {
    Axios.post(
      `${url}api/v1/advertise/offer/update/`,
      {
        slug: data,
        status: 1,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then(() => {
        notification["warn"]({
          message: "مبلغ پیشنهاد شده تایید نشد",
          description: "در مورد مبلغ مورد نظر خودتان با مسافر مذاکره کنید تا مبلغ پیشنهادی اصلاح شود",
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 5,
        });
        this.componentDidMount();
      })
      .catch((error) => console.error(error));
  }

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
          description:<div>حال می‌توانید نظر خود را در مورد مسافر بیان کنید و به ایشان امتیاز دهید. <br/>امتیاز شما می‌تواند به کاربران دیگر کمک کند</div>,
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 8,
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
                      وضعیت :
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
                        to={`/users/${item.sender_slug}`}
                        style={{ color: "black", fontSize: "14px" }}
                      >
                        {item.sender}
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
                      {item.status != "تمام شده" && (
                              <SendMessage
                                sender={item.sender_slug}
                                receiver={item.receiver_slug}
                                slug={item.slug}
                              />
                            )}
                      </Col>
                      <Col>
                        {item.status === "در انتظار پاسخ" && (
                          <Popconfirm
                            overlayStyle={{ fontFamily: "VazirD" }}
                            title="آیا از تایید اولیه پیشنهاد مطمئن هستید ؟"
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
                              <b>تایید اولیه</b>
                            </Button>
                          </Popconfirm>
                        )}
                        {item.status === "در انتظار پرداخت" && (
                          <Popconfirm
                          overlayStyle={{ fontFamily: "VazirD" }}
                          title={<div>با رد شدن مبلغ، پیشنهاد به مرحله قبل بازمی‌گردد تا مسافر مبلغ را مجدد وارد نماید<br/>آیا پیشنهاد به مرحله قبل باز گردد؟</div>}
                          onConfirm={this.rejectpayment.bind(this,item.slug)}
                          onCancel={this.cancel}
                          okText="بله"
                          cancelText="خیر"
                        >
                          <Button
                            style={{
                              fontSize: "12px",
                              border: "hidden",
                              color: "white",
                              backgroundColor: "red",
                              borderRadius: "10px",
                            }}
                          >
                            <b>رد مبلغ پیشنهادی</b>
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
                                backgroundColor: "green",
                                color: "white",
                                borderRadius: "10px",
                              }}
                            >
                              تحویل گرفتم
                            </Button>
                          </Popconfirm>
                        )}
                        {item.status === "انجام شده" && (
                          <RateAndComment
                            signal={this.callbackFunction}
                            data={item.slug}
                            receiver={item.receiver_slug}
                            loc={"مسافر"}
                          />
                        )}
                      </Col>
                      <Col>
                        {item.status === "در انتظار پرداخت" && (
                          <SendTransactionInfo
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
