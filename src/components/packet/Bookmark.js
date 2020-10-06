import React, { Component } from "react";
import { Button, message } from "antd";
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
            message.success("آگهی شما با موفقیت ثبت شد");
        }, 2000);
      })
      .catch((err) => message.warn(err.response.data.detail));
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
