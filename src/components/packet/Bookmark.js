import React, { Component } from "react";
import { Button, notification } from "antd";
import { BookOutlined } from "@ant-design/icons"; 
import Axios from "axios";
import { config } from "../../Constant";
import Modal from "antd/lib/modal/Modal";
var url = config.url.API_URL; 
const token = localStorage.getItem("token");


class Bookmark extends Component {
  state = {
    loading: false,
    bookmark: false,
    visible: false
  };

  // componentDidUpdate = (prevProps) => {
  //   if (this.props.data !== prevProps.data) {
  //     Axios.get(`${url}api/v1/advertise/bookmarks/${this.props.data}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     }).then((res) => {
  //       if (res.data.bookmark == true) {
  //         this.setState({ bookmark: true });
  //       }
  //     });
  //   }
  // };

  componentDidMount (){
    Axios.get(`${url}api/v1/advertise/bookmarks/${this.props.data}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.data.bookmark == true) {
        this.setState({ bookmark: true });
      }
    });
  }

  bookmark = () => {
    this.setState({ loading: true });
    const token = localStorage.getItem("token");

    if (token == null){
      this.setState({visible: true, loading:false})
    }
    else {
    Axios.post(
      `${url}api/v1/advertise/bookmarks/`,
      { packet: this.props.data },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
          this.setState({ loading: false});
          if (res.status == 201) {
          notification["success"]({
            message: "آگهی با موفقیت نشان شد",
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
            },
            duration: 2,
          });
        this.setState({bookmark:true})
        }
          else if(res.status ==204) {
            notification["success"]({
              message: "از لیست نشان حذف شد",
              style: {
                fontFamily: "VazirD",
                textAlign: "right",
                float: "right",
                width: "max-content",
              },
              duration: 2,
            });
          this.setState({bookmark:false})
          }
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
      }
  };

  handlecance = () => {
    this.setState({visible:false})
  }

  handleok = () => {
    window.location.replace("/login")
  }

  render() {
    return (
      <div>
        {this.state.bookmark ? (
          <Button
            style={{ fontSize: "13px", borderRadius: "10px", color:"white", border:"hidden" }}
            onClick={this.bookmark.bind(this)}
            loading={this.state.loading}
          >
            <BookOutlined  style={{fontSize:"20px", color:"red"}}/>
          </Button>
        ) : (
          <Button
            style={{ fontSize: "13px", borderRadius: "10px", border:"hidden"}}
            onClick={this.bookmark.bind(this)}
            loading={this.state.loading}
          >
            <BookOutlined  style={{fontSize:"20px"}}/>
          </Button>
        )}
        <Modal 
        style={{fontFamily:"VazirD"}}
        visible={this.state.visible}
        onCancel={this.handlecance.bind(this)}
        onOk={this.handleok.bind(this)}
        okText="ورود به حساب کاربری"
        cancelText="انصراف"
        >
            <p style={{textAlign:"center"}}>برای نشان کردن آگهی ابتدا باید وارد حساب کاربری خود شوید</p>
            </Modal>
      </div>
    );
  }
}

export default Bookmark;
