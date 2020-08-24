import React from 'react';
import { Col, Row, Drawer } from 'antd';
import ChatContacs from '../components/chat/ChatContacs';
import ChatDetail from '../components/chat/ChatDetail';

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
                    <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
                        <ChatContacs parentCallback = {this.callbackFunction} />
                    </Col>
                    <Col xs={0} sm={0} md={1} lg={1} xl={1} xxl={1} ></Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18} >
                        <ChatDetail 
                        data={this.state.chatid} 
                        offer={this.state.offer} 
                        avatar1={this.state.avatar1}
                        avatar2={this.state.avatar2}
                        sender={this.state.sender}
                        receiver={this.state.receiver}
                         />
                    </Col>
                </Row>
            </div>
            )
    }
}

export default InboxLayout;
