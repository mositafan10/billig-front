import React, { Component } from "react";
import { Button, notification } from "antd";
import Axios from "axios";
import { config } from "../../Constant";
var url = config.url.API_URL;

class Bookmark extends Component {
  state = {
    loading: false,
  };
  bookmark = () => {
    this.setState({ loading: true });
    const token = localStorage.getItem("token");
    Axios.post(
      `${url}api/v1/advertise/bookmarks/`,
      { packet: this.props.data },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => { 
        setTimeout(() => {
          this.setState({ loading: false });
          notification['success']({
            message: 'آگهی با موفقیت نشان شد',
            style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content", marginTop:"30%"},
            duration:2,
          });
        }, 2000);
      })
      .catch((err) => notification['error']({
        message: err.response.data.detail,
        style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content", marginTop:"30%"},
        duration:2,
      }));
  };
  render() {
    return (
      <div>
        <Button
          style={{ fontSize: "13px", borderRadius: "10px" }}
          onClick={this.bookmark.bind(this)}
          loading={this.state.loading}
        >
          نشان کردن آگهی
        </Button>
      </div>
    );
  }
}

export default Bookmark;
