import React, { Component } from 'react';
import { Button, Modal, Form, Rate, Divider, notification } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Axios from 'axios';
import {config} from '../../Constant';
import { Breakpoint } from 'react-socks';

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
        const text1 = values.rate_billlig;
        this.setState({
            visible: false
        });
        Axios.post(`${url}api/v1/account/comments_billlig/`,{
            text: text1,
        },
        { headers: {"Authorization" : `Token ${token}`}})
        
        Axios.post(`${url}api/v1/account/rating/`,{
            score: score,
            text: text,
            receiver: this.props.receiver,
            slug: this.props.data
        },
        { headers: {"Authorization" : `Token ${token}`}})
        .then( 
            notification['success']({
                message: 'نظر شما با موفقیت ثبت شد',
                style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content"},
                duration:2,
              }),
            this.props.signal(),
            window.location.reload())
        .catch(err => console.log(err.data))
    }

    render() {
        return (
            <div>
                <Breakpoint medium up>
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
                        <Divider> امتیازی که به {this.props.loc} می‌دهید </Divider>
                        <Form.Item name="score">
                            <Rate defaultValue={0}/>
                        </Form.Item>
                        <Divider> نظر خود را در مورد {this.props.loc} بیان کنید </Divider>
                        <Form.Item 
                            name="text" 
                            style={{textAlign:"right"}}
                            >
                            <TextArea style={{borderRadius:"10px"}} autoFocus="true" rows={5}/>
                        </Form.Item>   
                        <Divider> ‌نظر، پیشنهاد، انتقاد خود را در مورد پلتفرم بیلیگ بیان کنید </Divider>
                        <Form.Item 
                            name="rate_billlig" 
                            style={{textAlign:"right"}}>
                            <TextArea style={{borderRadius:"10px"}} autoFocus="true" rows={5}/>
                        </Form.Item>     
                    </Form>
                </Modal>
                </Breakpoint>
                <Breakpoint small down>
                <Button onClick={this.offerlistmodal} style={{fontSize:"12px", border:"hidden", color:"white", backgroundColor:"green", borderRadius:"10px"}}>امتیازدهی</Button>
                <Modal
                    visible={this.state.visible}
                    title="امتیازدهی"
                    cancelText="انصراف"
                    okText="ارسال"       
                    okButtonProps={{form:'rating', key: 'submit', htmlType: 'submit',}}
                    onCancel={this.handleCancel}
                    style={{fontFamily:"IRANSans", textAlign:"center", overflow:"hidden", borderRadius:"10px"}}
                    width="90%"
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
                        <Divider> ‌نظر خود را در مورد مسافر بیان کنید </Divider>
                        <Form.Item 
                            name="text" 
                            style={{textAlign:"right"}}>
                            <TextArea style={{borderRadius:"10px"}} autoFocus="true" rows={5}/>
                        </Form.Item>
                        <Divider> ‌نظر خود را در مورد پلتفرم بیلیگ بیان کنید </Divider>
                        <Form.Item 
                            name="rate_billlig" 
                            style={{textAlign:"right"}}>
                            <TextArea style={{borderRadius:"10px"}} autoFocus="true" rows={5}/>
                        </Form.Item>    
                    </Form>
                </Modal>
                </Breakpoint>
            </div>
        );
    }
}

export default RateAndComment;