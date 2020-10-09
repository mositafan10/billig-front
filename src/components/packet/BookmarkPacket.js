import React, { Component } from "react";
import Axios from "axios";
import { Table, Popconfirm, Spin, Button } from "antd";
import { Link } from "react-router-dom";
import { config } from "../../Constant";

var url = config.url.API_URL;

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
      width:140,
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
              border:"hidden",
              borderRadius: "10px",
              fontSize: "13px",
            }}
          >
            حذف
          </Button>
        </Popconfirm>
      ),
    },
  ];

  delete = (dataIndex, id) => {
    const current_packet = this.state.bookmarks;
    const token = localStorage.getItem("token");
    Axios.delete(`${url}api/v1/advertise/bookmarks/${dataIndex}/`, {
      headers: { Authorization: `Bearer ${token}` },
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
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      this.setState({
        bookmarks: res.data,
        loading: false,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div style={{ marginTop: "100px" }}>
            <Spin />
          </div>
        ) : (
          <Table
            scroll={{ x: 300 }}
            locale={{ emptyText: "نشانی وجود ندارد" }}
            style={{ padding: "30px 0 30px 0" }}
            columns={this.columns}
            dataSource={this.state.bookmarks}
          />
        )}
      </div>
    );
  }
}

export default BookmarkPacket;
