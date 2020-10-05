import React from "react";
import {
  Button,
  Popconfirm,
  Table,
  message,
  Tooltip,
  List,
  Row,
  Col,
  Avatar,
  Space,
  Divider,
  Spin
} from "antd";
import Axios from "axios";
import SendMessage from "./SendMessage";
import { Link } from "react-router-dom";
import SendTransactionInfo from "../payment/SendTransactionInfo";
import { config } from "../../Constant";
import RateAndComment from "../rating/RateAndComment";
import PayTraveler from "../payment/PayTraveler";
import ChatDetail from '../chat/ChatDetail';
import { Breakpoint } from 'react-socks';

var url = config.url.API_URL;
const token = localStorage.getItem("token");

class PacketOffer extends React.Component {
  state = {
    packet_offer: [],
    disablepayment: true,
    disableconfirm: false,
    visible: false,
    loading: true
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
              // onClick={()=>this.setState({visible:true})}
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
          return <SendMessage dir={false} data={row.sender_id} slug={dataIndex} />;
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
            <Button
              onClick={this.accept.bind(this, dataIndex)}
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
          );
        } else if (row.status === "در انتظار پرداخت") {
          return (
            <Button
              disabled={this.state.disableconfirm}
              onClick={this.confirmpayment.bind(this)}
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
          );
        } else if (row.status === "در انتظار تایید خریدار") {
          return (
            <Button
              onClick={this.receiveconfirm.bind(this, dataIndex)}
              style={{
                fontSize: "12px",
                border: "hidden",
                backgroundColor: "aliceblue",
                borderRadius: "10px",
              }}
            >
              تایید تحویل
            </Button>
          );
        } else if (row.status === "انجام شده") {
          return (
            <RateAndComment
              signal={this.callbackFunction}
              data={dataIndex}
              receiver={row.receiver_id}
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
      key: "",
      align: "center",
      render: (dataIndex, row) => {
        if (row.status === "در انتظار پرداخت") {
          return (
            <SendTransactionInfo
              disabled={this.state.disablepayment}
              amount={row.price+row.parcel_price}
              factorNumber={row.slug}
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
    message.success(
      "پیشنهاد توسط شما تایید شد. حال می‌توانید هزینه را پرداخت کنید"
    );
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
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        message.success("تغییر وضعیت با موفقیت انجام شد");
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
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        message.success("اعلام وضعیت پیشنهاد با موفقیت ثبت شد");
        this.componentDidMount();
      })
      .catch((error) => console.error(error));
  };

  componentDidMount() {
    const orderID = this.props.data;
    Axios.get(`${url}api/v1/advertise/offer/${orderID}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        this.setState({
          packet_offer: res.data,
          loading: false
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
            scroll={{ x: 900 }}
            pagination={{
              onChange: (page) => {
              },
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
                    boxShadow: "0 0 8px 0px",
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
                    <p> وضعیت : {item.status}</p>
                    <hr />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Avatar
                      src={`${url}dstatic/media/${item.sender_avatar}`}
                    ></Avatar>
                    <span>
                      <Link
                        to={`/users/${item.sender_id}`}
                        style={{ color: "black", fontSize:"14px" }}
                      >
                        {" "}
                        {item.sender}{" "}
                      </Link>
                    </span>
                    <Divider style={{ marginTop: "5px", opacity: "0" }} />
                    <p>{item.description}</p>
                    <br />
                    <p style={{textAlign:"left"}}> {item.price} تومان </p>
                  </Col>
                    <Col style={{display:"flex", justifyContent:"center"}}>
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
                      <SendMessage data={item.sender_id} slug={item.slug} />
                      )}
                    </Col>
                    <Col>
                      {item.status === "در انتظار پاسخ" && (
                        <Button
                          onClick={this.accept.bind(this, item.slug)}
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
                      )}
                      {item.status === "در انتظار پرداخت" && (
                        <Button
                          disabled={this.state.disableconfirm}
                          onClick={this.confirmpayment.bind(this)}
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
                      )}
                      {item.status === "در انتظار تایید خریدار" && (
                        <Button
                          onClick={this.receiveconfirm.bind(this, item.slug)}
                          style={{
                            fontSize: "12px",
                            border: "hidden",
                            backgroundColor: "aliceblue",
                            borderRadius: "10px",
                          }}
                        >
                          تایید تحویل
                        </Button>
                      )}
                      {item.status === "انجام شده" && (
                        <RateAndComment
                          signal={this.callbackFunction}
                          data={item.slug}
                          receiver={item.receiver_id}
                        />
                      )}
                    </Col>
                    <Col>
                      {item.status === "در انتظار پرداخت" && (
                        <SendTransactionInfo
                          disabled={this.state.disablepayment}
                          amount={item.price+item.parcel_price}
                          factorNumber={item.slug}
                        />
                      )}
                    </Col>
                  </Space>
                    </Col>
                </Row>
                <Divider/>
              </div>
            )}
          />
        </Breakpoint>
      </div>
    );
  }
}

export default PacketOffer;
