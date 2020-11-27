import React from "react";
import Axios from "axios";
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
    url: "",
    loading: true,
    visible: false,
  };

  showmodal = () => {
    this.setState({ visible: true });
  };

  handlecancle = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    Axios.get(`${url}api/v1/advertise/get_picture/${this.props.data}`).then(
      (res) =>
        this.setState({
          url: res.data.image_file,
        })
    );
  }

  render() {
    return (
      <div>
        {this.props.data ? (
          <img
            onClick={this.showmodal}
            loading="lazy"
            src={`${url}dstatic/${this.state.url}`}
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
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          width="40%"
          bodyStyle={{backgroundColor:"transparent",}}
        >
            <Row style={{display:"flex", justifyContent:"center"}}>
                <img
                loading="lazy"
                src={`${url}dstatic/${this.state.url}`}
                style={{ borderRadius: "10px" }}
            />
            </Row>
          
        </Modal>
      </div>
    );
  }
}

export default DownloadPic;
