import React from 'react';
import { Button, Modal, Input, Form} from 'antd'; 
import Axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';

const token = localStorage.getItem('token');

class CreateTravel extends React.Component {
    
    state = {
        createtravelvisible: false,
      }
    
    showcreatetravel = () => {
        this.setState({
        createtravelvisible: true,
        })
    }

    handleCancel = () => {
    this.setState({
    createtravelvisible: false,
    });
    };

    handleOkTravel = (values) => {
    Axios.post('http://127.0.0.1:8000/api/v1/advertise/travel/', {
            departure : values.origin_country, 
            departure_city : values.origin_city, 
            destination : values.destination_country, 
            destination_city : values.destination_city, 
            flight_date : values.flight_date, 
            description : values.description, 
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {console.log(res.data)
            this.setState({
                createtravelvisible: false,
                });
        })
        .catch(error => {console.log(error);
        })
    }
    
    render(){
        return(
            <div>
                <Button onClick={this.showcreatetravel} style={{borderRadius:"8px"}}><b>ثبت سفر</b></Button>
                <Modal
                visible={this.state.createtravelvisible}
                onCancel={this.handleCancel}
                okButtonProps={{form:'create_travel', key: 'submit', htmlType: 'submit'}}
                okText="ثبت"
                cancelText="انصراف"
                style={{borderRadius:"10px",fontFamily:"IRANSans", overflow:"hidden"}}
                >
                    <p style={{fontFamily:"IRANSans",textAlign:"center"}}> ثبت سفر </p>
                    <Form
                    name="create_travel"
                    onFinish={this.handleOkTravel}
                    >
                        <br/>
                        <label style={{fontFamily:"IRANSans", float:"right" ,textAlign:"right", marginTop:"-30px"}}>کشور مبدا</label>
                        <Form.Item 
                            name="origin_country" 
                            rules={[
                                {
                                required: true,
                                },
                        ]}>
                            <Input />
                        </Form.Item>
                        <br/>
                        <label style={{fontFamily:"IRANSans", float:"right" ,textAlign:"right", marginTop:"-30px"}}>شهر مبدا</label>
                        <Form.Item 
                            name="origin_city" 
                            rules={[
                                {
                                required: true,
                                },
                        ]}>
                            <Input />
                        </Form.Item>
                        <br/>
                        <label style={{fontFamily:"IRANSans", float:"right" ,textAlign:"right", marginTop:"-30px"}}>کشور مقصد</label>
                        <Form.Item 
                            name="destination_country" 
                            rules={[
                                {
                                required: true,
                                },
                        ]}>
                            <Input />
                        </Form.Item>
                        <br/>
                        <label style={{fontFamily:"IRANSans", float:"right" ,textAlign:"right", marginTop:"-30px"}}>شهر مقصد</label>
                        <Form.Item 
                            name="destination_city" 
                            rules={[
                                {
                                required: true,
                                },
                        ]}>
                            <Input />
                        </Form.Item>
                        <br/>
                        <label style={{fontFamily:"IRANSans", float:"right" ,textAlign:"right", marginTop:"-30px"}}>تاریخ سفر</label>
                        <Form.Item 
                            name="flight_date" 
                            rules={[
                                {
                                required: true,
                                },
                        ]}>
                            <Input type='date'/>
                        </Form.Item>
                        <br/>
                        <label style={{fontFamily:"IRANSans", float:"right" ,textAlign:"right", marginTop:"-30px"}}>توضیحات بیشتر</label>
                        <Form.Item 
                            name="description" 
                            rules={[
                                {
                                required: true,
                                },
                        ]}>
                            <TextArea/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default CreateTravel;