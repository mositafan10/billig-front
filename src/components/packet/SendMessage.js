import React from 'react';
import Axios from 'axios';
import { Button, Modal, Form, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { config } from '../../Constant'

var url = config.url.API_URL

class SendMessage extends React.Component {

    state = {
        messageModal:false,
        chatID: ""
    }

    show_modal = () => {
        const token = localStorage.getItem('token');
        const receiver = this.props.data;
        Axios.post(`${url}api/v1/chat/conversation/`,
        {
          receiver : receiver,
          offer: this.props.slug,
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            this.setState({
                chatID: res.data.id,
                messageModal: true
            });
        })
        .catch(error => console.error(error));
    }

    handleCancel = () => {
        this.setState({
            messageModal: false,
        });
    };

    handleOk = (values) => {
        const token = localStorage.getItem('token');
        Axios.post(`${url}api/v1/chat/message/add/`,
        {
          text: values.text,
          chat_id: this.state.chatID,
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            this.setState({
                messageModal: false
            });
            message.success("پیام ارسال شد. پیام‌ها را در صندوق پیام خود مشاهده کنید")
        })
        .catch(error => console.error(error));
    }

    render(){
        return(
            <div>
            <Button onClick={this.show_modal} style={{fontSize:"12px", backgroundColor:"white", color:"black", borderRadius:"10px"}}>چت</Button>
            <Modal
                visible={this.state.messageModal}
                title=" ارسال پیام"
                onCancel={this.handleCancel}
                okText="ارسال"
                cancelText="انصراف"
                okButtonProps={{form:'sendmessage', key: 'submit', htmlType: 'submit'}}
                style={{fontFamily:"IRANSans", textAlign:"center", overflow:"hidden", borderRadius:"10px"}}
                width="50%">
                <Form
                    name="sendmessage"
                    onFinish={this.handleOk}
                    >
                     <Form.Item 
                        name="text" 
                        rules={[
                            {
                            required: true,
                            message:"پیام خود را وارد کنید"
                            },
                        ]}>
                        <TextArea style={{boxSizing:"border-box", textAlign:"right"}} />
                    </Form.Item>
                </Form>
            </Modal>
            </div>
            );
    }
}

export default SendMessage;