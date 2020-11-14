import React, { Component } from 'react';
import { Button, Modal, Form, Divider, notification } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Axios from 'axios';
import {config} from '../../Constant';
import { Breakpoint } from 'react-socks';

const url = config.url.API_URL;

class CommentBillligCreate extends Component {

    state = {
        visible: false,
        loading: false
    }

    comment_modal = () => {
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
        this.setState({loading:true});
        const token = localStorage.getItem('token');
        const text = values.rate_billlig;
        Axios.post(`${url}api/v1/account/comments_billlig/`,{
            text: text,
            token : token
        },)
        .then(
            setTimeout(()=>{
                notification['success']({
                    message: 'نظر شما با موفقیت ثبت شد',
                    style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content"},
                    duration:2,
                  })
                  
            },1000))
            setTimeout(()=>{this.setState({visible: false});},2000)
        .catch(err => console.log(err.data))
    }

    render() {
        return (
            <div>
                <Button onClick={this.comment_modal} style={{fontSize:"12px", borderRadius:"10px"}}> شما هم نظر خود را ثبت کنید</Button>
                <Breakpoint medium up>
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
                    confirmLoading={this.state.loading}
                    >
                    <Form
                        name="rating"
                        onFinish={this.handleOk}
                        >
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
                        <Divider>‌نظر، پیشنهاد، انتقاد خود را در مورد پلتفرم بیلیگ بیان کنید  </Divider>
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

export default CommentBillligCreate
;