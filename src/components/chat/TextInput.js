import React, { Component } from 'react';
import { Input } from 'antd';
import Axios from 'axios';
import { LeftOutlined } from '@ant-design/icons';
import { config } from '../../Constant';

var url = config.url.API_URL

const { Search } = Input;

const suffix = (
    <LeftOutlined
      style={{
        fontSize: 16,
      }}
    />
  );

  
class TextInput extends Component {

        state = {
            search: ""
        }

    handleReset = () => {
        Array.from(document.querySelectorAll("Search")).forEach(
          input => (input.value = "")
        );
        this.setState({
          itemvalues: [{}]
        });
      };

    send = (value) => {
        const token = localStorage.getItem('token');
        const owner = localStorage.getItem('user');
        Axios.post(`${url}api/v1/chat/message/add/`,
        {
            chat_id: this.props.data,
            owner: owner,
            text: value
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then( res => (
            this.props.handler()
             )
             )
        .catch(error => console.error(error));
        this.setState({
            search: ""
        })
    }

    handleFields = e => this.setState({ [e.target.name]: e.target.value }); 

    render() {
        return (
            <div>
                <Search
                id="search" 
                name="search" 
                value={this.state.search} 
                onChange={this.handleFields} 
                placeholder="پیام خود را وارد کنید" 
                onSearch={(value) => this.send(value)} 
                enterButton={"ارسال"} 
                autoSize
                autoFocus
                />
            </div>
        );
    }
}

export default TextInput;