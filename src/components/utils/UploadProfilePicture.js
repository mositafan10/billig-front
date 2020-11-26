import React from "react";
import { Upload, message, Row, Col, Spin, Button } from "antd";
import { LoadingOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { config } from "../../Constant";
import { Image } from "react-bootstrap";

var url = config.url.API_URL;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class UploadProfilePicture extends React.Component {
  state = {
    loading: false,
    imageUrl: this.props.data,
  };

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
              <div style={{width:"auto", height:"100%"}}>
              <img
                src={`${url}dstatic/${this.props.data}`}
                alt="avatar"
                width={200}
                style={{ borderRadius: "10px", marginTop: "30px" }}
              />
              </div> )
              : (
              <UserOutlined style={{fontSize:"100px"}} />
            ))}
            <br />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Upload
              name="billlig"
              className="avatar-uploader"
              showUploadList={false}
              action={`${url}api/v1/account/upload/`}
              headers={{ Authorization: `Token ${token}` }}
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              <br />
              <Button style={{fontSize:"14px", borderRadius:"10px"}}>تغییر تصویر</Button>
            </Upload>
            </Col>
        </Row>
      </div>
    );
  }
}

export default UploadProfilePicture;
