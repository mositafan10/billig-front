import React from 'react';
import { Button, Modal, Input, Form, Divider } from 'antd';
import Axios from 'axios'; 
import { config } from '../../Constant'

var url = config.url.API_URL

class ConfirmPrice extends React.Component {

    state = {
        price_visible: false,
    }

    pricelistmodal = () => {
        this.setState({
          price_visible: true
        });
    }
    
    handleCancel = () => {
        this.setState({
          price_visible: false,
        });
    };

    onFinish = values => {
       const price  = values.price;
       const token = localStorage.getItem('token');
       Axios.post(`${url}api/v1/advertise/offer/update/`,
       {
           slug : this.props.data,
           price : price
       },
       { headers: {"Authorization" : `Bearer ${token}`} })
       .then( this.setState({
            price_visible: false
       }))
       .catch((error) => console.log(error))
    }
    
    render(){
        return(
            <div>
                <Button onClick={this.pricelistmodal} style={{fontSize:"12px", border:"hidden", borderRadius:"10px"}}>ویرایش مبلغ</Button>
                <Modal
                    visible={this.state.price_visible}
                    title="تایید مبلغ نهایی"
                    onCancel={this.handleCancel}
                    okText="ارسال"
                    cancelText="انصراف"
                    okButtonProps={{form:'confirm_price', key: 'submit', htmlType: 'submit',}}
                    style={{fontFamily:"IRANSans", textAlign:"center", overflow:"hidden", borderRadius:"10px"}}
                    width="50%"
                    bodyStyle={{borderRadius:"20px"}}
                    maskStyle={{borderRadius:"20px"}}
                    >
                    <Form 
                        size="middle"
                        layout="vertical"
                        name="confirm_price"
                        initialValues={{
                        remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}>
                        <Divider > مبلغ نهایی</Divider>
                        <Form.Item
                            name="price"
                            size="large"
                            rules={[
                                {
                                    required: true,
                                    message: 'مبلغ نهایی را وارد کنید',
                                },
                                ]}
                            >
                            <Input type='number' style={{width:"50%"}}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default ConfirmPrice;