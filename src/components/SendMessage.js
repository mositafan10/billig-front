import React from 'react';
import { Button, Modal, Form, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Axios from 'axios';

class SendMessage extends React.Component {

    state = {
        messageModal:false
    }

    show_modal = () => {
        this.setState({
            messageModal: true
        })
    }

    handleCancel = () => {
        this.setState({
            messageModal: false,
        });
    };

    handleOk = (values) => {
        const token = localStorage.getItem('token');
        const receiver = this.props.data;
        Axios.post(`http://127.0.0.1:8000/api/v1/chat/message/`,
        {
          text: values.text,
          receiver : receiver,
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            console.log(res.data); 
            this.setState({
                messageModal: false
            });
            message.success("ارسال شد")
        })
        .catch(error => console.error(error));
    }

    render(){
        return(
            <div>
            <Button onClick={this.show_modal} style={{fontSize:"12px", backgroundColor:"white", color:"black", borderRadius:"10px"}}>پیام به کاربر</Button>
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