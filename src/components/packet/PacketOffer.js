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
} from "antd";
import Axios from "axios";
import SendMessage from "./SendMessage";
import { Link } from "react-router-dom";
import SendTransactionInfo from "../payment/SendTransactionInfo";
import { config } from "../../Constant";
import RateAndComment from "../rating/RateAndComment";
import PayTraveler from "../payment/PayTraveler";
import { Breakpoint } from "react-socks";

var url = config.url.API_URL;

class PacketOffer extends React.Component {
  state = {
    packet_offer: [],
    disablepayment: true,
    disableconfirm: false,
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
    },
    {
      title: " ",
      dataIndex: "slug",
      key: "",
      align: "center",
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
          return <SendMessage data={dataIndex} slug={dataIndex} />;
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
              amount={row.price}
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
    const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
    const orderID = this.props.data;
    Axios.get(`${url}api/v1/advertise/offer/${orderID}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        this.setState({
          packet_offer: res.data,
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <div>
        <Breakpoint medium up>
          <Table
            scroll={{ x: 900 }}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              hideOnSinglePage: true,
              size: "small",
            }}
            locale={{ emptyText: "پیشنهادی وجود ندارد" }}
            columns={this.columns}
            dataSource={this.state.packet_offer}
          />
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
                    // boxShadow: "0 0 5px 1px",
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
                    <p s>{item.status}</p>
                    <hr />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Avatar></Avatar>
                    <span> {item.sender} </span>
                    <p>{item.description}</p>
                    <hr />
                    <p>{item.price} تومان </p>
                  </Col>
                  <Col></Col>
                </Row>
              </div>
            )}
          />
        </Breakpoint>
      </div>
    );
  }
}

export default PacketOffer;
