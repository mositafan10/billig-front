import React from 'react';
import { Col, Row, Drawer } from 'antd';
import ChatContacs from '../components/chat/ChatContacs';
import ChatDetail from '../components/chat/ChatDetail';
import chat from '../media/chat.svg';

class InboxLayout extends React.Component {

    state = {
        chatid : "",
        offer : "",
        avatar1 : "",
        avatar2 : "",
    }

    callbackFunction = (chatid, offer, avatar1, avatar2, sender, receiver) => {
        this.setState({
            chatid: chatid,
            offer: offer,
            avatar1: avatar1,
            avatar2: avatar2,
            sender: sender,
            receiver: receiver
        })
    }

    render(){
        return(
            <div style={{backgroundColor:"white"}}>
                <Row>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <ChatContacs parentCallback = {this.callbackFunction} />
                    </Col>
                    <Col xs={24} sm={24} md={2} lg={2} xl={2} xxl={2} >
                        <ChatDetail 
                        data={this.state.chatid} 
                        offer={this.state.offer} 
                        avatar1={this.state.avatar1}
                        avatar2={this.state.avatar2}
                        sender={this.state.sender}
                        receiver={this.state.receiver}
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
