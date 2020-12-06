import React from "react";
import Axios from "axios";
import airplane from "../../media/airplane.png";
import {
  Button,
  Popconfirm,
  Row,
  Col,
  List,
  Spin,
  notification,
  Space,
  Card,
} from "antd";
import moment from "moment";
import EditTravel from "./EditTravel";
import { config } from "../../Constant";
import PayTraveler from "../payment/PayTraveler";
import Modal from "antd/lib/modal/Modal";
import UserOffer from "../offer/Useroffer";
import Experience from "./Experience";

var url = config.url.API_URL;
const style_left = {
  display: "flex",
  justifyContent: "flex-end",
  paddingLeft: "10px",
};
const style_right = { display: "flex", justifyContent: "right" };
const style_center = { display: "flex", justifyContent: "center", alignItems:"center", textAlign:"center" };

class TravelList extends React.Component {
  state = {
    travel_user: [],
    visible: false,
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

  editsignal = () => {
    this.props.parentCallback();
  };

  delete = (id) => {
    const token = localStorage.getItem("token");
    Axios.delete(`${url}api/v1/advertise/travel/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        this.props.parentCallback();
      })
      .catch((error) => console.error(error));
  };

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
              locale={{ emptyText: "شما هنوز سفری ثبت نکرده‌اید" }}
              dataSource={this.props.data}
              style={{ display: "flex" }}
              renderItem={(item) => (
                <List.Item key={item.slug}>
                  <Card>
                    <Row>
                        <Row style={style_center} >
                          <Col span={8} style={style_center}>
                            <div>
                            <img
                              src={`${url}dstatic/${item.departure.icon}`}
                              alt={item.departure.name}
                              width="80%"
                              style={{ borderRadius: "5px" }}
                            />
                            <p style={{ margin: "10px 5px" }}>
                              {item.departure_city.name}
                            </p>
                            </div>
                          </Col>
                          <Col span={8} style={style_center}>
                            <div>
                              <img src={airplane} alt="billlig.com" width="80%" />
                              <p style={{color:"white"}}>.</p>
                            </div>  
                          </Col>
                          <Col span={8} style={style_center}>
                            <div>
                            <img
                              src={`${url}dstatic/${item.destination.icon}`}
                              alt={item.destination.name}
                              width="80%"
                              style={{ borderRadius: "5px" }}
                            />
                            <p style={{ margin: "10px 25px" }}>
                              {item.destination_city.name}
                            </p>
                            </div>
                          </Col>
                        </Row>
                      <hr style={{ marginBottom: "20px", color:"white" }} />
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
                            <Col >
                                <Button
                                  onClick={this.offermodal}
                                  style={{
                                    borderRadius: "10px",
                                    fontSize: "12px",
                                    border:"hidden"
                                  }}
                                >
                                  پیشنهادها  <span style={{marginRight:"10px"}}>{item.offer_count}</span>
                                </Button>
                              </Col>
                              <Modal
                                visible={this.state.visible}
                                onCancel={this.offermodalcancle}
                                closable={true}
                                title=" پیشنهادهای ارسالی"
                                width="90%"
                                cancelText="بازگشت"
                                okButtonProps={{ hidden: "true" }}
                                style={{
                                  fontFamily: "VazirD",
                                  textAlign: "center",
                                  overflow: "hidden",
                                  borderRadius: "20px",
                                }}
                              >
                                <UserOffer />
                              </Modal>
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
                          <Row  style={{display:"block"}}>
                              <Col>
                                {item.status == 4 ? (
                                  <PayTraveler
                                    travel={item.slug}
                                    amount={item.income}
                                  />
                                ) : item.status == 8 ? (
                                  <span>در انتظار تسویه</span>
                                ) : (
                                  <EditTravel
                                    signal={this.editsignal}
                                    data={item.slug}
                                  />
                                )}
                              </Col>
                              <Col style={{float:"left"}}>
                                {(item.status == 0 ||
                                  item.status == 2 ||
                                  item.status == 3) && (
                                  <Popconfirm
                                    overlayStyle={{ fontFamily: "VazirD" }}
                                    title="آیا از حذف آگهی مطمئن هستید ؟"
                                    onConfirm={this.delete.bind(
                                      this,
                                      item.slug
                                    )}
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
          </div>
        )}
      </div>
    );
  }
}

export default TravelList;
