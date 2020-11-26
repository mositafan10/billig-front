import React from 'react';
import { Col, Row } from 'antd';
import ChatContacs from '../components/chat/ChatContacs';
import ChatDetail from '../components/chat/ChatDetail';
import chat from '../media/chat.svg';

class InboxLayout extends React.Component {

    state = {
        chatid : "",
        offer : "",
        sender_avatar : "",
        receiver_avatar : "",
        sender_name: "",
        receiver_name: "",
        sender_slug: "",
        receiver_slug: "",
        packet_title: "",
        visible : false,
    }

    callbackFunction = (chatid, offer, sender_avatar, receiver_avatar, sender_slug, receiver_slug, sender_name, receiver_name, packet_title) => {
        this.setState({
            chatid: chatid,
            offer: offer,
            sender_avatar: sender_avatar,
            receiver_avatar: receiver_avatar,
            sender_slug: sender_slug,
            receiver_slug: receiver_slug,
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
                    <Col xs={24} sm={24} md={24} lg={7} xl={7} xxl={7}>
                        <ChatContacs parentCallback = {this.callbackFunction} />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={1} xl={1} xxl={1} >
                        <ChatDetail 
                        data = {this.state.chatid}   
                        offer = {this.state.offer} 
                        sender_avatar = {this.state.sender_avatar}
                        receiver_avatar = {this.state.receiver_avatar}
                        sender_slug = {this.state.sender_slug}
                        receiver_slug = {this.state.receiver_slug}
                        sender_name = {this.state.sender_name}
                        receiver_name = {this.state.receiver_name}
                        packet_title = {this.state.packet_title}
                        visible = {this.state.visible}
                        parentCallback = {this.callbackFunction1}
                         />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={16} xl={16} xxl={16} >
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
