import React, { Component } from "react";
import { Input, Upload } from "antd";
import { SendOutlined, LoadingOutlined, CameraOutlined, CameraTwoTone } from "@ant-design/icons";
import Axios from "axios";
import { config } from "../../Constant";

var url = config.url.API_URL;
const { Search } = Input;

class TextInput extends Component {
  state = {
    search: "",
    loading: false,
    disable: false,
    fileList: [],
  };

  onChange = ({ fileList: newFileList }) => {
    this.setState({
      fileList: newFileList,
      loading: true,
    });
    let msg = newFileList[0].response
    console.log(msg);
    if (msg !== undefined){
      this.props.handler(msg);
      this.setState({fileList:[], loading: false});
    } 
  };

  send = (value) => {
    if (value != "") {
      const token = localStorage.getItem("token");
      const owner = localStorage.getItem("user");
      this.setState({ loading: true, disable: true });
      Axios.post(
        `${url}api/v1/chat/messages/${this.props.data}`,
        {
          owner: owner,
          text: value,
        },
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => {
        this.props.handler(res.data)
        this.setState({ loading: false, disable: false});
      })
      .catch((err) => console.log(err));
      this.setState({
        search: "",
      });
    }
  };

  handleFields = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const token = localStorage.getItem("token");
    return (
      <div >
        <Search
          size="large"
          id="search"
          name="search"
          value={this.state.search}
          onChange={this.handleFields}
          placeholder="پیام خود را وارد کنید"
          onSearch={(value) => this.send(value)}
          enterButton={
            this.state.loading ? (
              <LoadingOutlined />
            ) : (
              <SendOutlined rotate={180}/>
            )
          }
          autoComplete="off"
          disabled={this.state.disabled}
          autoSize
          suffix={
          <Upload
            action={`${url}api/v1/chat/messages/${this.props.data}`}
            name="billig"
            headers={{ Authorization: `Token ${token}` }}
            onChange={this.onChange}
            fileList={this.state.fileList}
            accept=".png,.jpeg"
            showUploadList={false}
          >
              <CameraTwoTone style={{ marginTop: "5px" }} />
          </Upload>}
        />
        </div>
    );
  }
}

export default TextInput;
