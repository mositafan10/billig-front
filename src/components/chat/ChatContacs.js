import React, { Component } from 'react';
import { List , Avatar, message, Button } from 'antd';
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

    sendData = (chatid, offer) => { 
        this.props.parentCallback(chatid, offer); 
    }

    render() {
        const user = localStorage.getItem('user');
        return (
            <div>
                <br/><br/>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.contacs}
                    renderItem={item => (
                    <List.Item style={{borderRight:"solid", borderRightColor:"aliceblue",margin:"0 20px 0 0"}}>
                        <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={
                        (user == item.sender) ? 
                        <Button style={{border:"hidden", fontSize:"12px"}} onClick={() => this.sendData(item.id, item.offer_state)}>{item.receiver_name}</Button>
                            :
                        <Button style={{border:"hidden", fontSize:"12px"}} onClick={() => this.sendData(item.id, item.offer_state)}>{item.sender_name}</Button>
                        }
                        />
                    </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default ChatContacs;