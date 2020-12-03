import React, { Component } from "react";
import Axios from "axios";
import { Table, Popconfirm, Spin, Button, Row, Col, List } from "antd";
import { Link } from "react-router-dom";
import { config } from "../../Constant";
import DownloadPic from "../utils/DownloadPic";

var url = config.url.API_URL;
const style_center = { display: "flex", justifyContent: "center" };

class BookmarkPacket extends Component {
  state = {
    bookmarks: [],
    loading: true,
  };

  columns = [
    {
      title: "آگهی",
      dataIndex: "packet_title",
      key: "packet_slug",
      align: "right",
      render: (dataIndex, row) => (
        <Link to={`/packet/${row.packet_slug}`}>{dataIndex}</Link>
      ),
    },
    {
      title: "",
      dataIndex: "packet_slug",
      key: "packet_slug",
      width: 20,
      render: (dataIndex, row) => (
        <Popconfirm
          overlayStyle={{ fontFamily: "VazirD" }}
          title="آیا از حذف آگهی مطمئن هستید ؟"
          onConfirm={this.delete.bind(this, dataIndex, row.id)}
          onCancel={this.cancel}
          okText="بله"
          cancelText="خیر"
        >
          <Button
            size="middle"
            style={{
              border: "hidden",
              borderRadius: "10px",
              fontSize: "13px",
              backgroundColor: "red",
              color: "white",
            }}
          >
            <b>حذف</b>
          </Button>
        </Popconfirm>
      ),
    },
  ];

  delete = (dataIndex, id) => {
    const current_packet = this.state.bookmarks;
    const token = localStorage.getItem("token");
    Axios.delete(`${url}api/v1/advertise/bookmarks/${dataIndex}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        this.setState({
          bookmarks: current_packet.filter((bookmarks) => bookmarks.id !== id),
        });
      })
      .catch((error) => console.error(error));
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/advertise/bookmarks/`, {
      headers: { Authorization: `Token ${token}` },
    }).then((res) => {
      this.setState({
        bookmarks: res.data,
        loading: false,
      });
    });
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {this.state.loading ? (
          <div style={{ marginTop: "100px" }}>
            <Spin />
          </div>
        ) : (
          <div style={{ justifyContent: "center", justifyContent:"table-caption" }}
          >
          <List
            grid={{
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            // style={{ justifyContent: "center" }}
            locale={{ emptyText: "شما هنوز آگهی ثبت نکرده‌اید." }}
            dataSource={this.state.bookmarks}
            renderItem={(item) => (
              <div style={{textAlign:"center"}}>
                <Row
                  style={{
                    color: "black",
                    border: "1px solid",
                    borderRadius: "15px",
                    margin: "10px 20px 30px 20px",
                    padding: "20px 15px 20px 15px",
                    width: "220px",
                    height: "auto",
                    textAlign:"center",
                  }}
                >
                  <Col span={24}>
                    <Link
                      to={`/packet/${item.packet_slug}`}
                      style={{ color: "black" }}
                    >
                      <DownloadPic data={item.packet_picture} size={140} />
                    </Link>
                  <br/>
                  </Col>
                  <Col span={24} style={{ color: "black" }}>
                    <Link
                      to={`/packet/${item.packet_slug}`}
                      style={{ color: "black" }}
                    >
                      {item.packet_title}
                    </Link>
                  </Col>
                  <Col span={24}>
                  <br/>
                    <Button style={{borderRadius:"8px", backgroundColor:"red", color:"white"}} size="middle" ><b>حذف</b></Button>
                  </Col>
                </Row>
              </div>
            )}
          />
         </div>
        )}
      </div>
    );
  }
}

export default BookmarkPacket;
