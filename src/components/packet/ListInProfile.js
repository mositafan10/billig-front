import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Popconfirm, message, Table, List, Row, Col, Space } from "antd";
import OfferListModal from "../offer/OfferListModal";
import EditPacket from "./EditPacket";
import { config } from "../../Constant";
import { Breakpoint } from "react-socks";
import DownloadPic from "../utils/DownloadPic";

const style_center = { display: "flex", justifyContent: "center" };

var url = config.url.API_URL;

class PacketUserList extends React.Component {
  state = {
    packet_user: [],
  };

  columns = [
    {
      title: " عنوان آگهی",
      dataIndex: "title",
      key: "title",
      align: "right",
      render: (dataIndex, row) => (
        <Link to={"/packet/" + row.slug}>{dataIndex}</Link>
      ),
    },
    {
      title: " قیمت (تومان)",
      dataIndex: "suggested_price",
      key: "suggested_price",
      align: "center",
      width: 150,
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 150,
      align: "center",
      render: (dataIndex) => (
        <span style={{ fontSize: "12px" }}>{dataIndex}</span>
      ),
    },
    {
      title: "پیشنهاد",
      dataIndex: "offer_count",
      key: "offer_count",
      width: 50,
      align: "center",
    },
    {
      title: "",
      dataIndex: "slug",
      key: "slug",
      width: 10,
      render: (dataIndex) => <OfferListModal data={dataIndex} />,
    },
    {
      title: "",
      dataIndex: "slug",
      key: "slug",
      width: 10,
      render: (dataIndex) => <EditPacket data={dataIndex} />,
    },
    {
      title: "",
      dataIndex: "slug",
      key: "slug",
      width: 10,
      render: (dataIndex) => (
        <Popconfirm
          title="آیا از حذف آگهی مطمئن هستید ؟"
          onConfirm={this.delete.bind(this, dataIndex)}
          onCancel={this.cancel}
          okText="بله"
          cancelText="خیر"
        >
          حذف
        </Popconfirm>
      ),
    },
  ];

  componentDidMount() {
    document.title = "لیست آگهی‌های من";
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/advertise/user_packet/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        this.setState({
          packet_user: res.data,
        });
      })
      .catch((error) => console.error(error));
  }

  cancel(e) {
    message.error("درخواست لغو شد");
  }

  delete = (slug) => {
    const current_packet = this.state.packet_user;
    const token = localStorage.getItem("token");
    Axios.delete(`${url}api/v1/advertise/packet/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        this.setState({
          packet_user: current_packet.filter(
            (packet_user) => packet_user.slug !== slug
          ),
        });
      })
      .catch((error) => console.error(error));
  };

  callbackFunction = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <div>
        {/* for desktop */}
        <Breakpoint medium up>
          <Table
            scroll={{ x: 900 }}
            columns={this.columns}
            dataSource={this.state.packet_user}
            locale={{ emptyText: "آگهی وجود ندارد" }}
          />
        </Breakpoint>
        {/* for mobile */}
        <Breakpoint medium down>
          <List
            grid={{
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            locale={{ emptyText: "آگهی وجود ندارد" }}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              hideOnSinglePage: true,
              simple: true,
              hide: true,
            }}
            dataSource={this.state.packet_user}
            renderItem={(item) => (
              <div>
                <Row
                  style={{
                    color: "black",
                    boxShadow: "0 0 9px 1px",
                    borderRadius: "10px",
                    margin: "15px 15px 15px 15px",
                    padding: "15px 5px 15px 5px",
                    width: "90%",
                    height: "auto",
                  }}
                >
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row style={{ justifyContent: "center", display: "flex" }}>
                      <Col>
                        <div>
                          <DownloadPic data={item.picture} size={140} />
                        </div>
                      </Col>
                    </Row>
                    <br />
                    <Row style={{ justifyContent: "center", display: "flex" }}>
                      <Col style={{ color: "black" }}>{item.title}</Col>
                    </Row>
                    <hr style={{ width: "70%" }} />
                    <Row style={{ justifyContent: "center", display: "flex" }}>
                      <Col style={{ color: "black" }}>
                        تعداد پیشنهاد :‌ {item.offer_count}
                      </Col>
                    </Row>
                    <br />
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row style={{ justifyContent: "center", display: "flex" }}>
                      <Col>
                        <Space>
                          <OfferListModal data={item.slug} />
                          <EditPacket data={item.slug} />
                          <Popconfirm
                            title="آیا از حذف آگهی مطمئن هستید ؟"
                            onConfirm={this.delete.bind(this, item.slug)}
                            onCancel={this.cancel}
                            okText="بله"
                            cancelText="خیر"
                          >
                            <a style={{color:"grey"}}>حذف</a>
                          </Popconfirm>
                        </Space>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            )}
          />
        </Breakpoint>
      </div>
    );
  }
}

export default PacketUserList;
