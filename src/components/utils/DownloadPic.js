import React from "react";
import Axios from "axios";
import { Spin, Modal, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Breakpoint } from "react-socks";
import { config } from "../../Constant";

var url = config.url.API_URL;
const antIcon = (
  <LoadingOutlined
    type="loading"
    style={{ fontsize: 24, textAlign: "center" }}
    spin
  />
);

class DownloadPic extends React.Component {
  state = {
    url: "",
    loading: false,
    visible: false,
  };

  showmodal = () => {
    this.setState({ visible: true });
  };

  handlecancle = () => {
    this.setState({ visible: false });
  };
  d;

  componentDidMount() {
    this.setState({ url: this.props.category.picture});
    if (this.props.data == 1) {
      this.setState({
        loading: false,
      });
    } else {
      // this.setState({ loading: true})
      setTimeout(() => {
        Axios.get(`${url}api/v1/advertise/get_picture/${this.props.data}`).then(
          (res) =>
            this.setState({
              url: res.data.image_file,
              // loading: false,
            })
        );
      }, 800);
    }
  }

  render() {
    var alt = this.props.no_matter_origin
      ? `${this.props.title}|${this.props.category.name}|${this.props.destination_country}|${this.props.destination_city}`
      : `${this.props.title}|${this.props.category.name}|${this.props.origin_country}|${this.props.origin_city}`;

    return (
      <div>
        {this.state.loading ? (
          <div
            style={{
              margin: "50px",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Spin indicator={antIcon} size="large" />
          </div>
        ) : (
          <img
            onClick={this.showmodal}
            loading="lazy"
            src={`${url}dstatic/${this.state.url}`}
              // this.props.data == 1
              //   ? this.props.category.picture
              //   : this.state.url
            alt={alt}
            style={{ borderRadius: "10px" }}
            width={this.props.size}
            height="auto"
          />
        )}
        <Breakpoint small down>
          <Modal
            visible={this.state.visible}
            closable
            closeIcon=" "
            onCancel={this.handlecancle}
            footer={false}
            width="100%"
            okButtoops={{ hidden: true }}
            bodyStyle={{
              opacity: "1",
              position: "absolute",
              zIndex: "1",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <img
                loading="lazy"
                alt={alt}
                src={`${url}dstatic/${this.state.url}`}
                style={{ borderRadius: "10px", width: "100%", height: "100%" }}
              />
            </Row>
          </Modal>
        </Breakpoint>
        <Breakpoint medium up>
          <Modal
            visible={this.state.visible}
            closable
            closeIcon=" "
            onCancel={this.handlecancle}
            footer={false}
            width="100%"
            bodyStyle={{
              opacity: "1",
              position: "absolute",
              zIndex: "1",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <img
                alt={alt}
                loading="lazy"
                src={`${url}dstatic/${this.state.url}`}
                style={{ borderRadius: "10px", width: "100%", height: "100%" }}
              />
            </Row>
          </Modal>
        </Breakpoint>
      </div>
    );
  }
}

export default DownloadPic;
