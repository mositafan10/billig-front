import React, { Component } from "react";
import { Button, notification } from "antd";
import Axios from "axios";
import { config } from "../../Constant";
var url = config.url.API_URL;

class Bookmark extends Component {
  state = {
    loading: false,
    bookmark: false,
  };

  componentDidUpdate = (prevProps) => {
    const token = localStorage.getItem("token");
    if (this.props.packet !== prevProps.packet) {
      Axios.get(`${url}api/v1/advertise/bookmarks/${this.props.packet}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        if (res.data.bookmark == true) {
          this.setState({ bookmark: true });
        }
      });
    }
  };

  bookmark = () => {
    this.setState({ loading: true });
    const token = localStorage.getItem("token");
    Axios.post(
      `${url}api/v1/advertise/bookmarks/`,
      { packet: this.props.packet },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        // setTimeout(() => {
          this.setState({ loading: false });
          notification["success"]({
            message: "آگهی با موفقیت نشان شد",
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
              marginTop: "30%",
            },
            duration: 2,
          });
        // }, 2000);
      })
      .catch(
        (error) =>
          notification["error"]({
            message: error.response.data.detail,
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              marginTop: "50px",
              width: "max-content",
              fontSizeAdjust: "0.5 ",
            },
            duration: 2,
          }),
        this.setState({ loading: false })
      );
  };
  render() {
    return (
      <div>
        {this.state.bookmark ? (
          <Button
            style={{ fontSize: "13px", borderRadius: "10px", backgroundColor:"green", color:"white" }}
            onClick={this.bookmark.bind(this)}
            loading={this.state.loading}
          >
            نشان شده است
          </Button>
        ) : (
          <Button
            style={{ fontSize: "13px", borderRadius: "10px" }}
            onClick={this.bookmark.bind(this)}
            loading={this.state.loading}
          >
            نشان کردن آگهی
          </Button>
        )}
      </div>
    );
  }
}

export default Bookmark;
