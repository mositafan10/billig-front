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
        <Link to={"/users/" + row.receiver_id}>{dataIndex}</Link>
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
          return <SendMessage sender={row.sender_id} receiver={row.receiver_id} slug={dataIndex} />;
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
          return <ConfirmPrice parcel_price={row.parcel_price_offer} data={dataIndex} price1={row.price} parentfunction={this.callbackfunction} buy={row.buy} />;
        } else if (row.status === "در انتظار خرید") {
          return (
            <Popconfirm
          overlayStyle={{fontFamily:"VazirD"}}
          title="آیا کالای مورد نظر تحویل گرفته یا خریداری شده است ؟"
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
              خریداری شد
            </Button>
        </Popconfirm>
          );
        } else if (row.status === "در انتظار تحویل") {
          return (
            <Popconfirm
            overlayStyle={{fontFamily:"VazirD"}}
            title="آیا کالای مورد نظر تحویل داده شده است ؟"
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
              تحویل شد
            </Button>
          </Popconfirm>
            
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
            <Popconfirm
            overlayStyle={{fontFamily:"VazirD"}}
            title="آیا از قبول پیشنهاد مطمئن هستید ؟"
            onConfirm={this.confrim.bind(this, dataIndex, row.price)}
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
               تایید پیشنهاد
            </Button>
          </Popconfirm>
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
          overlayStyle={{fontFamily:"VazirD"}}
          title="آیا از حذف پیشنهاد مطمئن هستید ؟"
          onConfirm={this.delete.bind(this, dataIndex)}
          onCancel={this.cancel}
          okText="بله"
          cancelText="خیر"
        >
          <a ><Button
            style={{ border: "hidden", fontSize: "12px", borderRadius: "10px" }}
            onClick={this.offerlistmodal}
          >
            حذف
          </Button></a>
        </Popconfirm>
      ),
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
      .then(()=> {
        notification["success"]({
          message: "خریداری کالا با موفقیت انجام شد",
          description: "حالا باید کالا را به خریدار تحویل دهید",
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 5,
        });
        this.componentDidMount()
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
      .then(()=> {
        notification["success"]({
          message: "تحویل کالا با موفقیت انجام شد",
          description: "لطفا نسبت به تایید تحویل کالا توسط خریدار اطمینان حاصل نمایید تا سپس مراحل تسویه با شما انجام پذیرد",
          style: {
            fontFamily: "VazirD",
            textAlign: "right",
            float: "right",
            width: "max-content",
          },
          duration: 5,
        });
        this.componentDidMount()
      })
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
      { headers: { Authorization: `Token ${token}` } }
    )
      .then( ()=>{
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
      this.componentDidMount()
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
      .catch((error) => console.log(error));
  }

  callbackfunction = () => {
    this.componentDidMount();
  }

  render() {
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <Breakpoint medium up>
          {this.state.loading ? (
            <div style={{ marginTop: "100px" }}>
              <Spin />
            </div>
          ) : (
            <List
                locale={{ emptyText: <div>پیشنهادی وجود ندارد.<br/> برای ثبت پیشنهاد باید در لیست آگهی‌ها داخل‌ آگهی مورد نظر بروید.</div>  }}
                grid={{
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 3,
                  xl: 3,
                  xxl: 3,
                }}
                dataSource={this.state.offer}
                renderItem={(item) => (
                  <div>
                    <Row
                      style={{
                        color: "black",
                        border: "1px solid",
                        borderRadius: "15px",
                        margin: "15px 25px 15px 15px",
                        padding: "20px 20px 20px 20px",
                        width: "250px",
                        height: "230px",
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
                        <p>وضعیت :‌ <span style={{color:"#46a0ae"}}>{item.status}</span></p>
                        <hr />
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Avatar
                          src={`${url}dstatic/media/${item.receiver_avatar}`}
                        ></Avatar>
                        <span> {item.receiver} </span>
                        <p style={{ textAlign: "left", marginTop: "20px" }}>
                          {item.price} تومان{" "}
                        </p><hr/>
                      </Col>
                      <Col>
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
                              <SendMessage sender={item.sender_id} receiver={item.receiver_id} slug={item.slug} />
                            )}
                          </Col>
                          <Col>
                            {item.status === "در انتظار تایید مسافر" && (
                              <ConfirmPrice data={item.slug} price1={item.price} parentfunction={this.callbackfunction}
                               buy={item.buy} parcel_price={item.parcel_price_offer} />
                            )}
                            {item.status === "در انتظار خرید" && (
                              <Popconfirm
                              overlayStyle={{fontFamily:"VazirD"}}
                              title="آیا کالا خریداری شده است؟"
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
                                خریداری شد
                              </Button>
                            </Popconfirm>
                              
                            )}
                            {item.status === "در انتظار تحویل" && (
                              <Popconfirm
                              overlayStyle={{fontFamily:"VazirD"}}
                              title="آیا کالا تحویل شده است؟"
                              onConfirm={this.receivedone.bind(this, item.slug)}
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
                                تحویل شد
                              </Button>
                            </Popconfirm>
                            )}
                          </Col>
                          <Col>
                            {/* {item.status === "در انتظار تایید مسافر" && (
                              <Popconfirm
                              overlayStyle={{fontFamily:"VazirD"}}
                              title="آیا مبلغ نهایی مورد تایید است؟"
                              onConfirm={this.confrim.bind(
                                this,
                                item.slug,
                                item.price
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
                                تایید
                              </Button>
                            </Popconfirm>
                            )} */}
                            {item.status === "انجام شده" && (
                              <RateAndComment
                              signal={this.callbackfunction}
                              data={item.slug}
                              receiver={item.receiver_slug}
                              loc={"آگهی‌دهنده"}
                            />
                            )}
                          </Col>
                        </Space>
                      </Col>
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
                        <p>وضعیت :‌ <span style={{color:"#46a0ae"}}>{item.status}</span></p>
                        <hr />
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Avatar
                          src={`${url}dstatic/media/${item.receiver_avatar}`}
                        ></Avatar>
                        <span> {item.receiver} </span>
                        <p style={{margin:"8px 8px"}}>{item.description}</p>
                        <p style={{ textAlign: "left", marginTop: "20px" }}>
                          {item.price} تومان{" "}
                        </p><hr/>
                      </Col>
                      <Col>
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
                              <SendMessage sender={item.sender_id} receiver={item.receiver_id} slug={item.slug} />
                            )}
                          </Col>
                          <Col>
                            {item.status === "در انتظار تایید مسافر" && (
                              <ConfirmPrice parcel_price={item.parcel_price_offer} data={item.slug} price1={item.price} parentfunction={this.callbackfunction} buy={item.buy} />
                            )}
                            {item.status === "در انتظار خرید" && (
                              <Popconfirm
                              overlayStyle={{fontFamily:"VazirD"}}
                              title="آیا کالا خریداری شده است؟"
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
                                خریداری شد
                              </Button>
                            </Popconfirm>
                              
                            )}
                            {item.status === "در انتظار تحویل" && (
                              <Popconfirm
                              overlayStyle={{fontFamily:"VazirD"}}
                              title="آیا کالا تحویل شده است؟"
                              onConfirm={this.receivedone.bind(this, item.slug)}
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
                                تحویل شد
                              </Button>
                            </Popconfirm>
                            )}
                          </Col>
                          <Col>
                            {item.status === "در انتظار تایید مسافر" && (
                              <Popconfirm
                              overlayStyle={{fontFamily:"VazirD"}}
                              title="آیا مبلغ نهایی مورد تایید است؟"
                              onConfirm={this.confrim.bind(
                                this,
                                item.slug,
                                item.price
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
                                تایید
                              </Button>
                            </Popconfirm>
                            )}
                            {item.status === "انجام شده" && (
                              <RateAndComment
                              signal={this.callbackfunction}
                              data={item.slug}
                              receiver={item.receiver_slug}
                              loc={"آگهی‌دهنده"} />
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
