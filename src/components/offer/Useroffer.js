import React from "react";
import Axios from "axios";
import {
  Table,
  Popconfirm,
  Button,
  notification,
  List,
  Col,
  Row,
  Avatar,
  Spin,
  Space,
} from "antd";
import { Link } from "react-router-dom";
import ConfirmPrice from "../profile/ConfirmPrice";
import SendMessage from "../packet/SendMessage";
import { config } from "../../Constant";
import RateAndComment from "../rating/RateAndComment";
import { Breakpoint } from "react-socks";
var url = config.url.API_URL;

class UserOffer extends React.Component {
  state = {
    offer: [],
    loading: true,
  };

  currency = (value) => {
    const p = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return p;
  };

  columns = [
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "slug",
      width: 200,
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
      title: "آگهی",
      dataIndex: "packet_title",
      key: "slug",
      width: 300,
      align: "right",
      render: (dataIndex, row) => (
        <Link to={"/packet/" + row.packet_slug}>{dataIndex}</Link>
      ),
    },
    {
      title: " پیشنهاد به",
      dataIndex: "receiver",
      key: "slug",
      width: 150,
      align: "center",
      render: (dataIndex, row) => (
        <Link to={"/users/" + row.receiver_slug}>{dataIndex}</Link>
      ),
    },
    {
      title: "دستمزد (تومان)",
      dataIndex: "price",
      key: "slug",
      width: 150,
      align: "center",
      render: (dataIndex) => this.currency(dataIndex),
    },
    {
      title: "قیمت کالا (تومان)",
      dataIndex: "parcel_price_offer",
      key: "slug",
      width: 150,
      align: "center",
      render: (dataIndex, row) => (row.buy ? this.currency(dataIndex) : 0),
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
        if (row.status === "در انتظار تایید مسافر") {
          return (
            <ConfirmPrice
              parcel_price={row.parcel_price_offer}
              data={dataIndex}
              price1={row.price}
              parentfunction={this.callbackfunction}
              buy={row.buy}
            />
          );
        } else if (row.status === "در انتظار خرید") {
          return (
            <Popconfirm
              overlayStyle={{ fontFamily: "VazirD" }}
              title={
                row.buy ? (
                  <div>آیا کالای مورد نظر را خریداری کرده‌اید ؟</div>
                ) : (
                  <div>"آیا بسته مورد نظر را تحویل گرفته‌اید ؟" </div>
                )
              }
              onConfirm={this.buydone.bind(this, dataIndex)}
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
                خریداری کردم
              </Button>
            </Popconfirm>
          );
        } else if (row.status === "در انتظار تحویل") {
          return (
            <Popconfirm
              overlayStyle={{ fontFamily: "VazirD" }}
              title={
                row.buy ? (
                  <div>آیا کالای مورد نظر را تحویل داده‌اید ؟</div>
                ) : (
                  <div>"آیا بسته مورد نظر را تحویل داده‌اید ؟" </div>
                )
              }
              onConfirm={this.receivedone.bind(this, dataIndex)}
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
                تحویل دادم
              </Button>
            </Popconfirm>
          );
        } else if (row.status === "انجام شده") {
          return (
            <RateAndComment
              signal={this.callbackfunction}
              data={row.slug}
              receiver={row.receiver_slug}
              loc={"آگهی‌دهنده"}
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
        if (row.status != "تمام شده") {
          return (
            <Popconfirm
              overlayStyle={{ fontFamily: "VazirD" }}
              title="آیا از حذف پیشنهاد مطمئن هستید ؟"
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
                    color: "white",
                    backgroundColor: "red",
                  }}
                  onClick={this.offerlistmodal}
                >
                  <b>حذف</b>
                </Button>
              </a>
            </Popconfirm>
          );
        }
      },
    },
  ];

  buydone = (data) => {
    const token = localStorage.getItem("token");
    Axios.post(
      `${url}api/v1/advertise/offer/update/`,
      {
        slug: data,
        status: 4,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then(() => {
        notification["success"]({
          message: "خریداری کالا با موفقیت انجام شد",
          description: "حالا باید کالا را به بیلیگر تحویل دهید",
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
  };

  receivedone = (data) => {
    const token = localStorage.getItem("token");
    Axios.post(
      `${url}api/v1/advertise/offer/update/`,
      {
        slug: data,
        status: 5,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then(() => {
        notification["success"]({
          message: "تحویل کالا با موفقیت انجام شد",
          description: (
            <div>
              حالا از بیلیگر بخواهید که تحویل کالا را تایید کند.
              <br />
              تسویه حساب سفر شما بعد از تایید بیلیگر انجام می‌گیرد
            </div>
          ),
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 10,
        });
        this.componentDidMount();
      })
      .catch((error) => console.error(error));
  };

  delete = (data) => {
    const token = localStorage.getItem("token");
    Axios.delete(
      `${url}api/v1/advertise/offer/${data}/`,
      { headers: { Authorization: `Token ${token}` } }
    )
      .then(() => {
        notification["success"]({
          message: "پیشنهاد با موفقیت حذف شد",
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
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/advertise/getuseroffer/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) =>
        this.setState({
          offer: res.data,
          loading: false,
        })
      )
  }

  componentWillUnmount(){
    this.componentDidMount();
  }

  callbackfunction = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Breakpoint medium up>
          {this.state.loading ? (
            <div style={{ marginTop: "100px" }}>
              <Spin />
            </div>
          ) : (
            <Table
              pagination={{
                hideOnSinglePage: true,
                size: "small",
              }}
              locale={{ emptyText: "در حال حاضر پیشنهادی وجود ندارد" }}
              columns={this.columns}
              dataSource={this.state.offer}
            />
          )}
        </Breakpoint>
        <Breakpoint small down>
          {this.state.loading ? (
            <div style={{ marginTop: "100px" }}>
              <Spin />
            </div>
          ) : (
            <div
              style={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <List
                locale={{ emptyText: "پیشنهادی وجود ندارد" }}
                pagination={{
                  onChange: (page) => {},
                  hideOnSinglePage: true,
                  simple: true,
                  hide: true,
                }}
                dataSource={this.state.offer}
                renderItem={(item) => (
                  <div>
                    <Row
                      style={{
                        color: "black",
                        boxShadow: "0 0 8px 0px",
                        border: "1px solid",
                        borderRadius: "10px",
                        margin: "25px 0px 25px 0px",
                        padding: "15px 15px 15px 15px",
                        width: "100%",
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
                    وضعیت : {" "}‌
                          <span style={{ color: "#46a0ae" }}>
                            {item.status}
                          </span>
                        </p>
                        <hr />
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Avatar
                          src={`${url}dstatic/media/${item.receiver_avatar}`}
                        ></Avatar>
                        <span> {item.receiver} </span>
                        <p style={{ margin: "8px 8px" }}>{item.description}</p>
                        <p style={{ textAlign: "left", marginTop: "20px" }}>
                          {this.currency(item.price)} تومان
                        </p>
                        <hr />
                      </Col>
                      <Col>
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
                            {item.status === "در انتظار تایید مسافر" && (
                              <ConfirmPrice
                                parcel_price={item.parcel_price_offer}
                                data={item.slug}
                                price1={item.price}
                                parentfunction={this.callbackfunction}
                                buy={item.buy}
                              />
                            )}
                            {item.status === "در انتظار خرید" && (
                              <Popconfirm
                                overlayStyle={{ fontFamily: "VazirD" }}
                                title={
                                  item.buy ? (
                                    <div>
                                      آیا کالای مورد نظر را خریداری کرده‌اید ؟
                                    </div>
                                  ) : (
                                    <div>
                                      "آیا بسته مورد نظر را تحویل گرفته‌اید ؟"{" "}
                                    </div>
                                  )
                                }
                                onConfirm={this.buydone.bind(this, item.slug)}
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
                                  خریداری کردم
                                </Button>
                              </Popconfirm>
                            )}
                            {item.status === "در انتظار تحویل" && (
                              <Popconfirm
                                overlayStyle={{ fontFamily: "VazirD" }}
                                title={
                                  item.buy ? (
                                    <div>
                                      آیا کالای مورد نظر را تحویل داده‌اید ؟
                                    </div>
                                  ) : (
                                    <div>
                                      "آیا بسته مورد نظر را تحویل داده‌اید ؟"{" "}
                                    </div>
                                  )
                                }
                                onConfirm={this.receivedone.bind(
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
                                    color: "white",
                                    backgroundColor: "green",
                                    borderRadius: "10px",
                                  }}
                                >
                                  تحویل دادم
                                </Button>
                              </Popconfirm>
                            )}
                            {item.status === "انجام شده" && (
                              <RateAndComment
                                signal={this.callbackfunction}
                                data={item.slug}
                                receiver={item.receiver_slug}
                                loc={"آگهی‌دهنده"}
                              />
                            )}
                          </Col>
                          <Col>
                            {item.status != "تمام شده" && (
                              <Popconfirm
                                overlayStyle={{ fontFamily: "VazirD" }}
                                title="آیا از حذف پیشنهاد مطمئن هستید ؟"
                                onConfirm={this.delete.bind(this, item.slug)}
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
                                      color: "white",
                                      backgroundColor: "red",
                                    }}
                                    onClick={this.offerlistmodal}
                                  >
                                    <b>حذف</b>
                                  </Button>
                                </a>
                              </Popconfirm>
                            )}
                          </Col>
                        </Space>
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

export default UserOffer;
