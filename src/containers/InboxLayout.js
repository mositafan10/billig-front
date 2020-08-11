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
                    <Col span={4}>
                        <ChatContacs parentCallback = {this.callbackFunction} />
                    </Col>
                    <Col span={20}>
                        <ChatDetail data={this.state.chatid} offer={this.state.offer} />
                    </Col>
                </Row>
            </div>
            )
    }
}

export default InboxLayout;
