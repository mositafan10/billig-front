import React from "react";
import { Spin, Modal, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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
    loading: true,
    visible: false,
  };

  showmodal = () => {
    this.setState({ visible: true });
  };

  handlecancle = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <div>
        {this.props.data ? (
          <img
            onClick={this.showmodal}
            loading="lazy"
            alt="chatPicture"
            src={`${url}dstatic/${this.props.data}`}
            style={{ borderRadius: "10px" }}
            width={this.props.size}
          ></img>
        ) : (
          <Spin indicator={antIcon}></Spin>
        )}
        <Modal
          visible={this.state.visible}
          closable
          closeIcon=" "
          onCancel={this.handlecancle}
          footer={false}
          width="40%"
          bodyStyle={{ opacity:"1", position:"absolute", zIndex:"1", maxWidth:"100%", maxHeight:"100%"}}
          >
            <Row style={{display:"flex", justifyContent:"center"}}>
                <img
                loading="lazy"
                src={`${url}dstatic/${this.props.data}`}
                style={{ borderRadius: "10px", width:"100%",height:"100%" }}
            />
            </Row>
        </Modal>
      </div>
    );
  }
}

export default DownloadPic;
