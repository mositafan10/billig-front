import React from "react";
import Axios from "axios";
import airplane from "../../media/airplane.png";
import { Link } from "react-router-dom";
import {
  Button,
  Radio,
  Popconfirm,
  Row,
  Col,
  List,
  Spin,
  notification,
  Card,
  Tooltip,
  Divider,
  Modal,
  Input,
} from "antd";
import moment from "moment";
import EditTravel from "./EditTravel";
import { config } from "../../Constant";
import PayTraveler from "../payment/PayTraveler";

const { TextArea } = Input; 
var url = config.url.API_URL;

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};
const style_left = {
  display: "flex",
  justifyContent: "flex-end",
  paddingLeft: "10px",
};
const style_right = { display: "flex", justifyContent: "right" };
const style_center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

class TravelList extends React.Component {
  state = {
    visible: false,
    removeReason: false,
    value: 1,
    slug: ""
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

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };


  delete = (slug) => {
    this.setState({ removeReason: true, slug: slug });
  };


  handleCancel = () => {
    this.setState({ removeReason: false });
  };


  sendReason = () => {
    const current_packet = this.state.packet_user;
    const slug = this.state.slug;
    const token = localStorage.getItem("token");
    Axios.post(
      `${url}api/v1/advertise/travelRemoveReason/${slug}/`,
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
    Axios.delete(`${url}api/v1/advertise/travel/${slug}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        this.props.parentCallback();
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

  editsignal = () => {
    this.props.parentCallback();
  };

  // delete = (id) => {
  //   const token = localStorage.getItem("token");
  //   Axios.delete(`${url}api/v1/advertise/travel/${id}/`, {
  //     headers: { Authorization: `Token ${token}` },
  //   })
  //     .then((res) => {
  //       this.props.parentCallback();
  //     })
  //     .catch((error) => {
  //       notification["error"]({
  //         message: error.response.data.detail,
  //         style: {
  //           fontFamily: "VazirD",
  //           textAlign: "right",
  //           float: "right",
  //           width: "max-content",
  //         },
  //         duration: 2,
  //       });
  //     });
  // };

  offermodal = () => {
    this.setState({ visible: true });
  };

  offermodalcancle = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <div>
        {this.props.loading ? (
          <div style={{ marginTop: "100px" }}>
            <Spin />
          </div>
        ) : (
          <div>
            <Divider>سفرهای جاری</Divider>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3,
                xxl: 4,
              }}
              locale={{ emptyText: "با بیلیگ هزینه سفرتان را کاهش دهید" }}
              dataSource={this.props.data}
              renderItem={(item) => (
                <List.Item key={item.slug}>
                  <Card style={{ borderRadius: "8px" }}>
                    <Row>
                      <Col span={8} style={style_center}>
                        <div>
                          <img
                            src={`${url}dstatic/${item.departure.icon}`}
                            alt={item.departure.name}
                            width="90%"
                            style={{ borderRadius: "50%" }}
                          />
                          <p style={{ margin: "10px 25px" }}>
                            {item.departure_city.name}
                          </p>
                        </div>
                      </Col>
                      <Col span={8} style={style_center}>
                        <div>
                          <img src={airplane} alt="billlig.com" width="60%" />
                          <p style={{ color: "white" }}>.</p>
                        </div>
                      </Col>
                      <Col span={8} style={style_center}>
                        <div>
                          <img
                            src={`${url}dstatic/${item.destination.icon}`}
                            alt={item.destination.name}
                            width="90%"
                            style={{ borderRadius: "50%" }}
                          />
                          <p style={{ margin: "10px 25px" }}>
                            {item.destination_city.name}
                          </p>
                        </div>
                      </Col>
                      <hr style={{ marginBottom: "20px", color: "white" }} />
                      <Row>
                        <Col span={24}>
                          <Row style={style_right}>
                            <Col style={style_right} span={12}>
                              <h4>تاریخ سفر</h4>
                            </Col>
                            <Col style={style_left} span={12}>
                              {moment(item.flight_date_start).format("D MMM")}
                            </Col>
                          </Row>
                        </Col>
                        <hr
                          style={{ backgroundColor: "white", color: "white" }}
                        />
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                          <Row style={style_right}>
                            <Col style={style_right} span={22}>
                              <h4>تعداد بسته‌های پذیرش شده</h4>
                            </Col>
                            <Col style={style_left} span={2}>
                              {item.approved_packet}
                            </Col>
                          </Row>
                        </Col>
                        <hr
                          style={{ backgroundColor: "white", color: "white" }}
                        />
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                          <Row style={style_right}>
                            <Col style={style_right} span={20}>
                              <h4>مجموع درآمد</h4>
                            </Col>
                            <Col style={style_left} span={4}>
                              <p> {item.income} </p>
                              {item.income !== 0 && (
                                <p style={{ marginRight: "5px" }}> تومان </p>
                              )}
                            </Col>
                          </Row>
                          <Row style={style_center}>
                            <Link to={`/profile/mytravel/${item.slug}`}>
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
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <br />
                            {item.income != 0 && item.status == 4 && (
                              <div></div>
                            )}
                          </Row>
                          <hr style={{ margin: "15px 0 15px 0" }} />
                          <Row style={{ display: "block" }}>
                            <Col>
                              {item.status == 4 ? (
                                <PayTraveler
                                  travel={item.slug}
                                  amount={item.income}
                                />
                              ) : (
                                item.status == 8 && <span>در انتظار تسویه</span>
                              )}
                            </Col>
                            <Col>
                              {item.status == 2 && (
                                <EditTravel
                                  signal={this.editsignal}
                                  data={item.slug}
                                />
                              )}
                            </Col>
                            <Col style={{ float: "left" }}>
                              {item.status == 0 || item.status == 2 ? (
                                <Popconfirm
                                  overlayStyle={{ fontFamily: "VazirD" }}
                                  title="آیا از حذف سفر مطمئن هستید ؟"
                                  onConfirm={this.delete.bind(this, item.slug)}
                                  onCancel={this.cancel}
                                  okText="بله"
                                  cancelText="خیر"
                                >
                                  <Button
                                    style={{
                                      borderRadius: "10px",
                                      fontSize: "12px",
                                      backgroundColor: "red",
                                      color: "white",
                                    }}
                                  >
                                    <b>حذف</b>
                                  </Button>
                                </Popconfirm>
                              ) : (
                                <Tooltip
                                  overlayStyle={{ fontFamily: "VazirD" }}
                                  title="چنانچه سفر پیشنهاد داشته باشد، امکان حذف آن وجود ندارد"
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
                    </Row>
                  </Card>
                </List.Item>
              )}
            />
            <Modal
              title="چرا می‌خواهید سفر را حذف کنید؟"
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
                  آگهی مناسبی پیدا نکردم
                </Radio>
                <Radio style={radioStyle} value={1}>
                  سفرم کنسل شد
                </Radio>
                <Radio style={radioStyle} value={2}>
                هیچ کدوم از پیشنهاداتم قبول نشد 
                </Radio>
                <Radio style={radioStyle} value={3}>
                دستمزدها کم بود 
                </Radio>
                <Radio style={radioStyle} value={4}>
                  به دلایل دیگر
                </Radio>
              </Radio.Group>
              {this.state.value === 4 ? (
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
        {this.props.data1.length != 0 && <Divider>سفرهای انجام شده</Divider>}
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 4,
          }}
          locale={{ emptyText: " " }}
          dataSource={this.props.data1}
          renderItem={(item) => (
            <List.Item key={item.slug}>
              <Card style={{ borderRadius: "8px" }}>
                <Row>
                  <Col span={8} style={style_center}>
                    <div>
                      <img
                        src={`${url}dstatic/${item.departure.icon}`}
                        alt={item.departure.name}
                        width="90%"
                        style={{ borderRadius: "50%" }}
                      />
                      <p style={{ margin: "10px 25px" }}>
                        {item.departure_city.name}
                      </p>
                    </div>
                  </Col>
                  <Col span={8} style={style_center}>
                    <div>
                      <img src={airplane} alt="billlig.com" width="60%" />
                      <p style={{ color: "white" }}>.</p>
                    </div>
                  </Col>
                  <Col span={8} style={style_center}>
                    <div>
                      <img
                        src={`${url}dstatic/${item.destination.icon}`}
                        alt={item.destination.name}
                        width="90%"
                        style={{ borderRadius: "50%" }}
                      />
                      <p style={{ margin: "10px 25px" }}>
                        {item.destination_city.name}
                      </p>
                    </div>
                  </Col>
                </Row>
                <hr style={{ marginBottom: "20px", color: "white" }} />
                <Row>
                  <Col span={24}>
                    <Row style={style_right}>
                      <Col style={style_right} span={12}>
                        <h4>تاریخ سفر</h4>
                      </Col>
                      <Col style={style_left} span={12}>
                        {moment(item.flight_date_start).format("D MMM")}
                      </Col>
                    </Row>
                  </Col>
                  <hr style={{ backgroundColor: "white", color: "white" }} />
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row style={style_right}>
                      <Col style={style_right} span={22}>
                        <h4>تعداد بسته‌های پذیرش شده</h4>
                      </Col>
                      <Col style={style_left} span={2}>
                        {item.approved_packet}
                      </Col>
                    </Row>
                  </Col>
                  <hr style={{ backgroundColor: "white", color: "white" }} />
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row style={style_right}>
                      <Col style={style_right} span={20}>
                        <h4>مجموع درآمد</h4>
                      </Col>
                      <Col style={style_left} span={4}>
                        <p> {item.income} </p>
                        {item.income !== 0 && (
                          <p style={{ marginRight: "5px" }}> تومان </p>
                        )}
                      </Col>
                    </Row>
                    <Row style={style_center}>
                      <Col>
                        <Link to={`/profile/mytravel/${item.slug}`}>
                          <Button
                            style={{
                              border: "hidden",
                              fontSize: "12px",
                              borderRadius: "10px",
                            }}
                          >
                            پیشنهادها
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <br />
                      {item.income != 0 && item.status == 4 && <div></div>}
                    </Row>
                    <hr style={{ margin: "15px 0 15px 0" }} />
                    <Row style={{ display: "block" }}>
                      <Col span={10}>
                        {item.status == 4 ? (
                          <PayTraveler
                            travel={item.slug}
                            amount={item.income}
                          />
                        ) : item.status == 8 ? (
                          <span style={{
                            border: "hidden",
                            backgroundColor: "green",
                            color:"white",
                            borderRadius: "10px",
                            fontSize:"14px",
                            padding:"3px 10px"
                          }}>در انتظار تسویه</span>
                        ) : (
                          <EditTravel
                            signal={this.editsignal}
                            data={item.slug}
                          />
                        )}
                      </Col>
                      <Col span={12} style={{ float: "left" }}>
                        {item.status == 6 &&
                        <Popconfirm
                          overlayStyle={{ fontFamily: "VazirD" }}
                          title="آیا از حذف آگهی مطمئن هستید ؟"
                          onConfirm={this.delete.bind(this, item.slug)}
                          onCancel={this.cancel}
                          okText="بله"
                          cancelText="خیر"
                        >
                          <Button
                            style={{
                              borderRadius: "10px",
                              fontSize: "12px",
                              backgroundColor: "red",
                              color: "white",
                            }}
                          >
                            <b>حذف</b>
                          </Button>
                        </Popconfirm>
                        }
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

export default TravelList;
