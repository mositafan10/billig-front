import React, { Component } from "react";
import Axios from "axios";
import { Popconfirm, Spin, Button, Row, Col, List, Card } from "antd";
import { Link } from "react-router-dom";
import { config } from "../../Constant";
import DownloadPic from "../utils/DownloadPic";

var url = config.url.API_URL;
const style_center = {
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
};

class BookmarkPacket extends Component {
  state = {
    bookmarks: [],
    loading: true,
  };

  delete = (dataIndex,) => {
    console.log(dataIndex)
    const current_packet = this.state.bookmarks;
    const token = localStorage.getItem("token");
    Axios.delete(`${url}api/v1/advertise/bookmarks/${dataIndex}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        this.setState({
          bookmarks: current_packet.filter((bookmark) => bookmark.packet_slug !== dataIndex),
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
      <div >
        {this.state.loading ? (
          <div style={{ marginTop: "100px" }}>
            <Spin />
          </div>
        ) : (
          <div>
            <List
              grid={{
                gutter: 24,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 4,
              }}
              locale={{ emptyText: "موردی نشان نشده است." }}
              dataSource={this.state.bookmarks}
              renderItem={(item) => (
                <List.Item>
                  <Card>
                    <Row style={style_center}>
                      <Col span={24}>
                        <Link
                          to={`/packet/${item.packet_slug}`}
                          style={{ color: "black" }}
                        >
                          <DownloadPic data={item.packet_picture} size="60%" />
                        </Link>
                        <br />
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
                        <br />
                        <Button
                        onClick={this.delete.bind(this, item.packet_slug)}
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "red",
                            color: "white",
                            padding: "0 10px 0 10px",
                          }}
                        >
                          حذف
                        </Button>
                      </Col>
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

export default BookmarkPacket;
