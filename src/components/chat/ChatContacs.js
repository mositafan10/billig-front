import React, { Component } from 'react';
import { List , Avatar } from 'antd';
import Axios from 'axios';

class ChatContacs extends Component {
    state = {
        contacs:[]
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        Axios.get('http://127.0.0.1:8000/api/v1/chat/chatlist/',
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res) => this.setState({
            contacs: res.data,
        }))
        .catch((error) => console.log(error))
    }

    render() {
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.contacs}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a>{item.receiver}</a>}
                        />
                </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default ChatContacs;