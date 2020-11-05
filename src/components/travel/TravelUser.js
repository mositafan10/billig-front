import React from "react";
import Axios from "axios";
import airplane from "../../media/airplane.png";
import {
  Button,
  Popconfirm,
  message,
  Row,
  Col,
  List,
  ConfigProvider,
  Spin,
  Divider,
  notification,
} from "antd";
import moment from "moment";
import EditTravel from "./EditTravel";
import { config } from "../../Constant";
import PayTraveler from "../payment/PayTraveler";

var url = config.url.API_URL;
const style_left = {
  display: "flex",
  justifyContent: "flex-end",
  paddingLeft: "10px",
};
const style_right = { display: "flex", justifyContent: "right" };

class TravelList extends React.Component {
  state = {
    travel_user: [],
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
                xs: 1,
                sm: 1,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 3,
              }}
              locale={{ emptyText: "سفری وجود ندارد" }}
              dataSource={this.props.data}
              style={{ display: "flex" }}
              renderItem={(item) => (
                <Row
                  style={{
                    border: "solid",
                    borderWidth: "0.5px",
                    borderRadius: "15px 15px 15px 15px",
                    margin: "15px 25px 15px 15px",
                    padding: "20px 20px 20px 20px",
                    width: "320px",
                    height: "auto",
                  }}
                >
                  <List.Item key={item.slug}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <Row style={{ textAlign: "center", height: "80px" }}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                          <img
                            src={`${url}dstatic/${item.departure.icon}`}
                            alt={item.departure.name}
                            width={60}
                            style={{ borderRadius: "5px" }}
                          />
                          <p style={{ margin: "10px 5px" }}>
                            {item.departure_city.name}
                          </p>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                          <img src={airplane} alt="billlig.com" width={60} />
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                          <img
                            src={`${url}dstatic/${item.destination.icon}`}
                            alt={item.destination.name}
                            width={60}
                            style={{ borderRadius: "5px" }}
                          />
                          <p style={{ margin: "10px 25px" }}>
                            {item.destination_city.name}
                          </p>
                        </Col>
                      </Row>
                      <hr style={{ marginBottom: "20px" }} />
                      <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                          <Row style={style_right}>
                            <Col
                              style={style_right}
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                            >
                              <h4>تاریخ سفر</h4>
                            </Col>
                            <Col
                              style={style_left}
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                            >
                              {moment(item.flight_date_start).format("D MMM")}
                            </Col>
                          </Row>
                        </Col>
                        <hr style={{backgroundColor:"white", color:"white"}}/>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                          <Row style={style_right}>
                            <Col
                              style={style_right}
                              xs={22}
                              sm={22}
                              md={22}
                              lg={22}
                              xl={22}
                            >
                              <h4>تعداد بسته‌های پذیرش شده</h4>
                            </Col>
                            <Col
                              style={style_left}
                              xs={2}
                              sm={2}
                              md={2}
                              lg={2}
                              xl={2}
                            >
                              {item.approved_packet}
                            </Col>
                          </Row>
                        </Col>
                        <hr style={{backgroundColor:"white", color:"white"}}/>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                          <Row style={style_right}>
                            <Col
                              style={style_right}
                              xs={20}
                              sm={20}
                              md={20}
                              lg={20}
                              xl={20}
                            >
                              <h4>مجموع درآمد</h4>
                            </Col>
                            <Col
                              style={style_left}
                              xs={4}
                              sm={4}
                              md={4}
                              lg={4}
                              xl={4}
                            >
                              <p> {item.income} </p>
                              {item.income !== 0 && (
                                <p style={{ marginRight: "5px" }}> تومان </p>
                              )}
                            </Col>
                          </Row>
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <br />
                            { item.income != 0 ?
                            (item.status != 4 && item.status != 8 ? (
                              <PayTraveler
                                travel={item.slug}
                                amount={item.income}
                              />
                            ) : (
                              <span
                                style={{
                                  border: "hidden",
                                  padding: "5px",
                                  borderRadius: "10px",
                                  backgroundColor: "aliceblue",
                                }}
                              >
                                در انتظار تسویه
                              </span>
                            ))
                            :
                            <Button
                                style={{
                                  border: "hidden",
                                  padding: "5px",
                                  borderRadius: "10px",
                                  backgroundColor: "aliceblue",
                                }}
                              >
                              </Button>
                            }
                          </Row>
                          <hr style={{ margin: "15px 0 15px 0" }} />
                          <Row style={style_right}>
                            <Col style={style_right} span={12}>
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
                                    fontSize: "14px",
                                  }}
                                >
                                  حذف
                                </Button>
                              </Popconfirm>
                            </Col>
                            <Col style={style_left} span={12}>
                              <EditTravel
                                signal={this.editsignal}
                                data={item.slug}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </List.Item>
                </Row>
              )}
            />
          </div>
        )}
      </div>
    );
  }
}

export default TravelList;
