import React from "react";
import Axios from "axios";
import {
  Table,
  Popconfirm,
  Button,
  message,
  List,
  Col,
  Row,
  Avatar,
  Spin
} from "antd";
import { Link } from "react-router-dom";
import ConfirmPrice from "../profile/ConfirmPrice";
import SendMessage from "../packet/SendMessage";
import { config } from "../../Constant";
import RateAndComment from "../rating/RateAndComment";
import PayTraveler from "../payment/PayTraveler";
import { Breakpoint } from "react-socks";
var url = config.url.API_URL;

class UserOffer extends React.Component {
  state = {
    offer: [],
    loading: true,
  };

  columns = [
    {
      title: "آگهی",
      dataIndex: "packet_title",
      key: "slug",
      width: 300,
      align: "right",
    },
    {
      title: " پیشنهاد به",
      dataIndex: "receiver",
      key: "slug",
      width: 150,
      align: "center",
      render: (dataIndex, row) => (
        <Link to={"users/" + row.receiver_id}>{dataIndex}</Link>
      ),
    },
    {
      title: "قیمت (تومان)",
      dataIndex: "price",
      key: "slug",
      width: 150,
      align: "center",
    },
    {
      title: "متن پیشنهاد",
      dataIndex: "description",
      key: "slug",
      align: "center",
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "slug",
      width: 180,
      align: "center",
    },
    {
      title: " ",
      dataIndex: "slug",
      key: "slug",
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
      key: "slug",
      align: "center",
      render: (dataIndex, row) => {
        if (row.status === "در انتظار تایید مسافر") {
          return <ConfirmPrice data={dataIndex} />;
        } else if (row.status === "در انتظار خرید") {
          return (
            <Button
              onClick={this.buydone.bind(this, dataIndex)}
              style={{
                fontSize: "12px",
                border: "hidden",
                color: "white",
                backgroundColor: "green",
                borderRadius: "10px",
              }}
            >
              خریداری شد
            </Button>
          );
        } else if (row.status === "انجام شده") {
          return <RateAndComment />;
        } else if (row.status === "در انتظار تحویل") {
          return (
            <Button
              onClick={this.receivedone.bind(this, dataIndex)}
              style={{
                fontSize: "12px",
                border: "hidden",
                color: "white",
                backgroundColor: "green",
                borderRadius: "10px",
              }}
            >
              تحویل شد
            </Button>
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
      title: " ",
      dataIndex: "slug",
      key: "slug",
      align: "center",
      render: (dataIndex, row) => {
        if (row.status === "در انتظار تایید مسافر") {
          return (
            <Button
              onClick={this.confrim.bind(this, dataIndex, row.price)}
              style={{
                fontSize: "12px",
                border: "hidden",
                backgroundColor: "aliceblue",
                borderRadius: "10px",
              }}
            >
              تایید
            </Button>
          );
        } else if (row.status === "انجام شده") {
          return <PayTraveler data={dataIndex} />;
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
      title: " ",
      dataIndex: "slug",
      key: "slug",
      align: "center",
      render: (dataIndex) => (
        <Popconfirm
          title="آیا از حذف آگهی مطمئن هستید ؟"
          onConfirm={this.delete.bind(this, dataIndex)}
          onCancel={this.cancel}
          okText="بله"
          cancelText="خیر"
        >
          <a href="#">حذف</a>
        </Popconfirm>
      ),
    },
  ];

  confrim = (data, price) => {
    const token = localStorage.getItem("token");
    Axios.post(
      `${url}api/v1/advertise/offer/update/`,
      {
        slug: data,
        price: price,
        status: 2,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(
        message.success("پیشنهاد توسط شما تایید شد"),
        this.componentDidMount()
      )
      .catch((error) => console.log(error));
  };

  buydone = (data) => {
    const token = localStorage.getItem("token");
    Axios.post(
      `${url}api/v1/advertise/offer/update/`,
      {
        slug: data,
        status: 4,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(
        message.success("اعلام وضعیت پیشنهاد با موفقیت ثبت شد"),
        this.componentDidMount()
      )
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
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(
        message.success("اعلام وضعیت پیشنهاد با موفقیت ثبت شد"),
        this.componentDidMount()
      )
      .catch((error) => console.error(error));
  };

  delete = (data) => {
    const token = localStorage.getItem("token");
    Axios.post(
      `${url}api/v1/advertise/offer/update/`,
      {
        slug: data,
        status: 8,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(message.success("پیشنهاد شما حذف شد"), this.componentDidMount())
      .catch((error) => console.error(error));
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/advertise/getuseroffer/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) =>
        this.setState({
          offer: res.data,
          loading: false,
        })
      )
      .catch((error) => console.log(error));
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
                onChange: (page) => {
                  console.log(page);
                },
                hideOnSinglePage: true,
                size: "small",
              }}
              locale={{ emptyText: "پیشنهادی وجود ندارد" }}
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
            <div>
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
            </div>
          )}
        </Breakpoint>
      </div>
    );
  }
}

export default UserOffer;
