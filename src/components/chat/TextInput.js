import React, { Component } from "react";
import { Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Axios from "axios";
import { config } from "../../Constant";

var url = config.url.API_URL;

const { Search } = Input;

class TextInput extends Component {
  state = {
    search: "",
    loading: false,
    disable: false
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
    return (
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
              <LoadingOutlined style={{ margin: "5px 7px" }} />
            ) : (
              "ارسال"
            )
          }
          autoComplete={false}
          disabled={this.state.disabled}
          autoSize
        />
    );
  }
}

export default TextInput;
