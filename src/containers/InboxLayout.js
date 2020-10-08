import React from 'react';
import { Col, Row, Drawer } from 'antd';
import ChatContacs from '../components/chat/ChatContacs';
import ChatDetail from '../components/chat/ChatDetail';
import chat from '../media/chat.svg';

class InboxLayout extends React.Component {

    state = {
        chatid : "",
        offer : "",
        sender_avatar : "",
        receiver_avatar : "",
        visible : false,
        sender_name: "",
        receiver_name: "",
        sender: "",
        receiver: "",
        packet_title: "",
    }

    callbackFunction = (chatid, offer, sender_avatar, receiver_avatar, sender, receiver, sender_name, receiver_name, packet_title) => {
        this.setState({
            chatid: chatid,
            offer: offer,
            sender_avatar: sender_avatar,
            receiver_avatar: receiver_avatar,
            sender: sender,
            receiver: receiver,
            sender_name: sender_name,
            receiver_name: receiver_name,
            packet_title: packet_title,
            visible: true
        })
    }
    
    callbackFunction1 = () => {
        this.setState({visible:false})
    }

    render(){
        return(
            <div style={{backgroundColor:"white"}}>
                <Row>
                    <Col xs={24} sm={24} md={7} lg={7} xl={7} xxl={7}>
                        <ChatContacs parentCallback = {this.callbackFunction} />
                    </Col>
                    <Col xs={24} sm={24} md={1} lg={1} xl={1} xxl={1} >
                        <ChatDetail 
                        data={this.state.chatid}   
                        offer={this.state.offer} 
                        sender_avatar={this.state.sender_avatar}
                        receiver_avatar={this.state.receiver_avatar}
                        sender={this.state.sender}
                        receiver={this.state.receiver}
                        sender_name={this.state.sender_name}
                        receiver_name={this.state.receiver_name}
                        packet_title = {this.state.packet_title}
                        visible={this.state.visible}
                        parentCallback = {this.callbackFunction1}
                         />
                    </Col>
                    <Col xs={0} sm={0} md={16} lg={16} xl={16} xxl={16} >
                        <div style={{alignContent:"center", margin:"40px 0"}}>
                            <img
                            alt = "billlig.com"
                            src = {chat}
                            style={{width:"70%", height:"auto"}}
                        /> 
                        </div>
                    </Col>
                </Row>
            </div>
            )
    }
}

export default InboxLayout;
