import React from 'react';
import { Col, Row } from 'antd';
import ChatContacs from '../components/chat/ChatContacs';
import ChatDetail from '../components/chat/ChatDetail';

class InboxLayout extends React.Component {

    state = {
        chatid : "",
        offer: ""
    }

    callbackFunction = (chatid, offer) => {
        this.setState({
            chatid: chatid,
            offer: offer
        })
    }

    render(){
        return(
            <div style={{backgroundColor:"white"}}>
                <Row>
                    <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={8}>
                        <ChatContacs parentCallback = {this.callbackFunction} />
                    </Col>
                    <Col xs={0} sm={0} md={1} lg={1} xl={1} xxl={1}></Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={14}>
                        <ChatDetail data={this.state.chatid} offer={this.state.offer} />
                    </Col>
                </Row>
            </div>
            )
    }
}

export default InboxLayout;
