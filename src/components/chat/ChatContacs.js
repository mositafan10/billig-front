import React, { Component } from 'react';
import { List , Avatar, message, Button, Badge } from 'antd';
import Axios from 'axios';

class  ChatContacs extends Component {

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

    sendData = (chatid, offer, avatar1, avatar2, sender, receiver ) => { 
        this.props.parentCallback(chatid, offer, avatar1, avatar2, sender, receiver); 
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
                    <List.Item style={{borderRight:"solid", borderRightColor:"aliceblue", margin:"0 20px 0 0"}}>
                        <List.Item.Meta
                        avatar={
                            (user == item.sender) ? 
                            // /be caraful , maybe should be edit addres
                            <Badge count={item.new_massage_sender} ><Avatar src = {`http://127.0.0.1/dstatic/media/${item.receiver_avatar}`} /></Badge>
                            :
                            <Badge count={item.new_massage_receiver} ><Avatar src = {`http://127.0.0.1/dstatic/media/${item.sender_avatar}`} /></Badge>
                        }
                        title={
                            (user == item.sender) ? 
                            <Button style={{border:"hidden", fontSize:"12px"}} onClick={() => this.sendData(item.id, item.offer_state, item.receiver_avatar, item.sender_avatar, item.sender, item.receiver)}>{item.receiver_name}</Button>
                                :
                            <Button style={{border:"hidden", fontSize:"12px"}} onClick={() => this.sendData(item.id, item.offer_state, item.receiver_avatar, item.sender_avatar, item.sender, item.receiver)}>{item.sender_name}</Button>
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