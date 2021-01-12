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
  Card,
} from "antd";
import moment from "moment";
import Axios from "axios";
import { Link } from "react-router-dom";
import SendTransactionInfo from "../payment/SendTransactionInfo";
import { config } from "../../Constant";
import RateAndComment from "../rating/RateAndComment";
import { Breakpoint } from "react-socks";
import { socket } from "../../socket";
import OfferAdvices from '../offer/OfferAdvices';

var url = config.url.API_URL;
const token = localStorage.getItem("token");

class PacketOffer extends React.Component {
  state = {
    disableconfirm: false,
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
        } else {
          return dataIndex;
        }
      },
    },
    {
      title: "پیشنهاد دهنده",
      dataIndex: "sender",
      key: "sender",
      width: 150,
      align: "center",
      render: (key, row) => (
        <a target="blank" href={`${url}users/` + row.sender_slug}>
          {key}
        </a>
      ),
    },
    {
      title: "اطلاعات سفر",
      dataIndex: "travel_info",
      key: "slug",
      width: 300,
      align: "center",
      render: (dataIndex) => (
        <div>
          {dataIndex.origin} / {dataIndex.origin_city} به{" "}
          {dataIndex.destination} / {dataIndex.destination_city} در{" "}
          {moment(dataIndex.flight_date).format("DD MMM")}
        </div>
      ),
    },
    {
      title: "دستمزد (تومان)",
      dataIndex: "price",
      key: "y",
      width: 150,
      align: "center",
      render: (dataIndex) => this.currency(dataIndex),
    },
    {
      title: this.props.buy && "قیمت کالا (تومان)",
      dataIndex: "parcel_price_offer",
      key: "y",
      width: 150,
      align: "center",
      render: (dataIndex) => this.props.buy && this.currency(dataIndex),
    },
    {
      title: " ",
      dataIndex: "slug",
      key: "slug",
      align: "center",
      render: (dataIndex, row) => {
        if (row.status != "تمام شده") {
          return (
            <Link to={`/profile/inbox/${dataIndex}`}>
            <Button
            style={{
              fontSize: "12px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "10px",
            }}
          >
            چت
          </Button>
          </Link>
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
              title={
                <div>
                  با رد شدن مبلغ، پیشنهاد به مرحله قبل بازمی‌گردد تا مسافر مبلغ
                  را مجدد وارد نماید
                  <br />
                  آیا پیشنهاد به مرحله قبل باز گردد؟
                </div>
              }
              onConfirm={this.rejectpayment.bind(this, row.slug)}
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
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                تحویل گرفتم
              </Button>
            </Popconfirm>
          );
        } else if (row.status === "انجام شده" || row.status === "در انتظار خرید" || row.status === "در انتظار تحویل") {
          return (
            <RateAndComment
              signal={this.callbackFunction.bind(this, row.slug)}
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
              amount={row.price + row.parcel_price_offer}
              factorNumber={dataIndex}
            />
          );
        }
      },
    },
    {
      title: "",
      dataIndex: "status",
      key: "slug",
      align: "center",
      render: (dataIndex, row) => {
          return (
            <div>
              <OfferAdvices data={dataIndex} buy={row.buy} type={"billliger"} />
            </div>
          );
      },
    },
  ];

  
  currency = (value) => {
    const p = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return p;
  };

  callbackFunction = (data) => {
    socket.emit("offerChanged", data);
  };

  rejectpayment = (slug) => {
    Axios.post(
      `${url}api/v1/advertise/offer/update/${slug}/`,
      {
        status: 1,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then(() => {
        notification["warn"]({
          message: "مبلغ پیشنهاد شده تایید نشد",
          description:
            "در مورد مبلغ مورد نظر خودتان با مسافر مذاکره کنید تا مبلغ پیشنهادی اصلاح شود",
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 5,
        });
        socket.emit("offerChanged", slug);
      })
      .catch((error) => console.error(error));
  };

  accept(slug) {
    Axios.post(
      `${url}api/v1/advertise/offer/update/${slug}/`,
      {
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
        socket.emit("offerChanged", slug);
      })
      .catch((error) => console.error(error));
  }

  receiveconfirm = (slug) => {
    Axios.post(
      `${url}api/v1/advertise/offer/update/${slug}/`,
      {
        status: 6,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then(() => {
        notification["success"]({
          message: "دریافت کالا از سوی شما تایید شد",
          description: (
            <div>
              حال می‌توانید نظر خود را در مورد مسافر بیان کنید و به ایشان امتیاز
              دهید. <br />
              امتیاز شما می‌تواند به کاربران دیگر کمک کند
            </div>
          ),
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 8,
        });
        socket.emit("offerChanged", slug);
      })
      .catch((error) => console.error(error));
  };

  render() {
    return (
      <div>
        <Breakpoint medium up>
          {this.props.loading ? (
            <div style={{ marginTop: "100px" }}>
              <Spin />
            </div>
          ) : (
            <Table
            pagination={{
              hideOnSinglePage: true,
              size: "small",
            }}
              locale={{ emptyText: "پیشنهادی وجود ندارد" }}
              columns={this.columns}
              dataSource={this.props.data}
              scroll={{x:"800px",scrollToFirstRowOnChange:"true"}}
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
            dataSource={this.props.data}
            renderItem={(item) => (
              <List.Item>
                <Card style={{borderRadius:"8px"}}>
                  <Row>
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
                        <span style={{ color: "blue" }}> {item.status} </span>
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
                      <br />
                      <p>
                        {item.travel_info.origin} (
                        {item.travel_info.origin_city}) به{" "}
                        {item.travel_info.destination} (
                        {item.travel_info.destination_city}) در{" "}
                        {moment(item.travel_info.flight_date).format("DD MMM")}{" "}
                      </p>
                      <p style={{ textAlign: "left" }}> {this.currency(item.price)} تومان </p>
                      <hr />
                    </Col>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                      <Space>
                        <Col>
                          {item.status != "تمام شده" && (
                            <Link to={`/profile/inbox/${item.slug}`}>
                             <Button
                             style={{
                               fontSize: "12px",
                               backgroundColor: "white",
                               color: "black",
                               borderRadius: "10px",
                             }}
                           >
                             چت
                           </Button>
                           </Link>
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
                              title={
                                <div>
                                  با رد شدن مبلغ، پیشنهاد به مرحله قبل
                                  بازمی‌گردد تا مسافر مبلغ را مجدد وارد نماید
                                  <br />
                                  آیا پیشنهاد به مرحله قبل باز گردد؟
                                </div>
                              }
                              onConfirm={this.rejectpayment.bind(
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
                          {(item.status === "انجام شده" || item.status === "در انتظار خرید" || item.status === "در انتظار تحویل" ) && (
                            <RateAndComment
                              signal={this.callbackFunction.bind(
                                this,
                                item.slug
                              )}
                              data={item.slug}
                              receiver={item.receiver_slug}
                              loc={"مسافر"}
                            />
                          )}
                        </Col>
                        <Col>
                          {item.status === "در انتظار پرداخت" && (
                            <SendTransactionInfo
                              amount={item.price + item.parcel_price_offer}
                              factorNumber={item.slug}
                              fee={item.fee}
                            />
                          )}
                        </Col>
                      </Space>
                    </Col>
                  </Row>
                  <Divider />
                  <Row style={{display:"flex",justifyContent: "center" }}>
                  <OfferAdvices data={item.status} buy={item.buy} type="billliger"/>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        </Breakpoint>
      </div>
    );
  }
}

export default PacketOffer;
