import React, { Component } from 'react';
import { Button, Modal, Form, Rate, Divider, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Axios from 'axios';
import {config} from '../../Constant';

const url = config.url.API_URL;

class RateAndComment extends Component {

    state = {
        visible: false,
    }

    offerlistmodal = () => {
        this.setState({
          visible: true
        });
    }
  
    handleCancel = () => {
        this.setState({
          visible: false,
        });
    }

    handleOk = values => {
        const token = localStorage.getItem('token');    
        const score = values.score ? values.score : 2;
        const text = values.text;
        this.setState({
            visible: false
        });

        Axios.post(`${url}api/v1/account/rating/`,{
            score: score,
            text: text,
            receiver: this.props.receiver,
            slug: this.props.data
        },
        { headers: {"Authorization" : `Bearer ${token}`}})
        .then( message.success("نظر شما با موفقیت ثبت شد."), this.props.signal())
        .catch(err => console.log(err.data))
    }

    render() {
        return (
            <div>
                <Button onClick={this.offerlistmodal} style={{fontSize:"12px", border:"hidden", color:"white", backgroundColor:"green", borderRadius:"10px"}}>امتیازدهی</Button>
                <Modal
                    visible={this.state.visible}
                    title="امتیازدهی"
                    cancelText="انصراف"
                    okText="ارسال"       
                    okButtonProps={{form:'rating', key: 'submit', htmlType: 'submit',}}
                    onCancel={this.handleCancel}
                    style={{fontFamily:"IRANSans", textAlign:"center", overflow:"hidden", borderRadius:"10px"}}
                    width="40%"
                    bodyStyle={{borderRadius:"20px"}}
                    maskStyle={{borderRadius:"20px"}}
                    >
                    <Form
                        name="rating"
                        onFinish={this.handleOk}
                        >
                        <Divider> امتیازی که به مسافر می‌دهید </Divider>
                        <Form.Item name="score">
                            <Rate defaultValue={2}/>
                        </Form.Item>
                        <Divider> نقطه‌نظر خود را در مورد مسافر بیان کنید </Divider>
                        <Form.Item 
                            name="text" 
                            style={{textAlign:"right"}}
                            rules={[
                                {
                                required: true,
                                message: "کد تایید را وارد کنید"
                                },
                            ]}>
                            <TextArea style={{borderRadius:"10px"}} autoFocus="true" rows={5}/>
                        </Form.Item>    
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default RateAndComment;