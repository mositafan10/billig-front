import React, { Component } from "react";
import { Input } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Axios from "axios";
import { config } from "../../Constant";

var url = config.url.API_URL;

const { Search } = Input;

class TextInput extends Component {
  state = {
    search: "",
    loading: false
  };

  handleReset = () => {
    Array.from(document.querySelectorAll("Search")).forEach(
      (input) => (input.value = "")
    );
    this.setState({
      itemvalues: [{}],
    });
  };

  send = (value) => {
    if (value != ""){
    this.setState({loading:true})
    const token = localStorage.getItem("token");
    const owner = localStorage.getItem("user");
    Axios.post(
      `${url}api/v1/chat/messages/${this.props.data}`,
      {
        owner: owner,
        text: value,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then((res) => 
      this.setState({loading:false}),
      this.props.handler()
      )
      .catch((error) => console.error(error));
    this.setState({
      search: "",
    });
  }};

  handleFields = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <Search
          size="large"
          id="search"
          name="search"
          value={this.state.search}
          onChange={this.handleFields}
          placeholder="پیام خود را وارد کنید"
          onSearch={(value) => this.send(value)}
          enterButton={this.state.loading ? <LoadingOutlined style={{margin:"5px 7px"}}/> : "ارسال"}
          autoSize
          autoFocus
        />
      </div>
    );
  }
}

export default TextInput;
