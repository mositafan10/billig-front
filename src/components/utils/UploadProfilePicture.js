import React from "react";
import { Upload, message, Row, Col, Spin, Button, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { config } from "../../Constant";
import ImgCrop from "antd-img-crop";
import imageCompression from "browser-image-compression";


var url = config.url.API_URL;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}


class UploadProfilePicture extends React.Component {
  state = {
    loading: false,
    imageUrl: this.props.data,
  };

  handleImageUpload = (file) => {
    return new Promise((resolve) => {
      var options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      imageCompression(file, options)
        .then(function (compressedFile) {
          var mayfile = new File([compressedFile], "adsPicture", {
            type: "image/png",
          });
          resolve(mayfile);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    });
  };
  
  beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      notification["error"]({
        message: "حجم تصویر باید کمتر از ۱۰ مگابایت باشد",
        style: {
          fontFamily: "VazirD",
          textAlign: "right",
          float: "right",
          width: "max-content",
        },
        duration: 2,
      });
    }
    return isJpgOrPng && isLt2M;
  }
  
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      this.setState({
        imageUrl: info.file.response,
        loading: false,
      });
      this.props.update();
      window.location.reload();
    }
  };

  render() {
    const token = localStorage.getItem("token");
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            {this.state.loading ? (
              <div style={{ margin: "100px" }}>
                <Spin size="large" />
              </div>
            ) : (
              this.props.data ? (
              <div style={{textAlign:"center"}}>
              <img
                src={`${url}dstatic/${this.props.data}`}
                alt="avatar"
                width="250px"
                height="250px"
                style={{ borderRadius: "50%", marginTop: "30px" }}
              />
              </div> )
              : (
              <UserOutlined style={{fontSize:"100px"}} />
            ))}
            <br />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <ImgCrop
          modalOk={<p style={{ fontFamily: "VazirD" }}>ارسال</p>}
          modalCancel={<p style={{ fontFamily: "VazirD" }}>انصراف</p>}
          modalTitle={
            <p style={{ fontFamily: "VazirD", textAlign: "center" }}>
              ویرایش تصویر
            </p>
          }
        >
            <Upload
              name="billlig"
              className="avatar-uploader"
              showUploadList={false}
              action={`${url}api/v1/account/upload/`}
              headers={{ Authorization: `Token ${token}` }}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
              transformFile={this.handleImageUpload}
            >
              <br />
              <Button style={{fontSize:"14px", borderRadius:"10px"}}>تغییر تصویر</Button>
            </Upload>
            </ImgCrop>
            </Col>
        </Row>
      </div>
    );
  }
}

export default UploadProfilePicture;
