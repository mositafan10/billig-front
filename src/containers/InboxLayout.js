import React from 'react';
import { Col, Row } from 'antd';
import ChatContacs from '../components/chat/ChatContacs';
import ChatDetail from '../components/chat/ChatDetail';

class InboxLayout extends React.Component {
    
    render(){
        return(
            <div>
                <Row>
                    <Col span={4}>
                        <ChatContacs />
                    </Col>
                    <Col span={20}>
                        <ChatDetail />
                    </Col>
                </Row>
            </div>
            )
    }
}

export default InboxLayout;
