import React from 'react';
import { Input, Row, Col, Form, Divider, Select, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Axios from 'axios';

const token = localStorage.getItem('token');

class EditProfile extends React.Component {

    
    componentDidMount(){
        Axios.get('http://127.0.0.1:8000/api/v1/account/countries/')
            .then(res => {
                this.setState({
                    countries: res.data
                });
                console.log(res.data);
            })
        Axios.get('http://127.0.0.1:8000/api/v1/account/cities/')
            .then(res => {
                this.setState({
                    cities: res.data
                });
                console.log(res.data);
            })
    }

    handleFormSubmit = (values) => {

        Axios.put('http://127.0.0.1:8000/api/v1/account/users/update/',
                    {
                    facebook_id: values.facebook_id,
                    twitter_id: values.twitter_id,
                    instagram_id: values.instagram_id,
                    linkdin_id : values.linkdin_id,
                    email: values.email,
                    bio: values.bio
                    },
                    { headers: {"Authorization" : `Bearer ${token}`} })
                        .then(function (res) { if (res.status == 201){ window.location.href = '/profile'; console.log(values)}})
                        .catch(error => console.error(error));
    }

    render(){
        return(
            <div style={{display:"flex", justifyContent:"center", size:"50px"}}>
                <Form size="middle" onFinish={(values) => this.handleFormSubmit(
                values)}>
                <Divider plain orientation="center">بیوگرافی</Divider>
                <Form.Item  name="bio">
                    <TextArea style={{borderRadius:"8px"}} />
                </Form.Item>
                <Row>
                    <Col span={24}>
                    <Divider plain orientation="center">آیدی لینکدین</Divider>
                        <Form.Item name="linkdin_id">
                            <Input style={{borderRadius:"8px"}} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <Divider plain orientation="center">ایمیل</Divider>
                        <Form.Item name="email">
                            <Input type="email" style={{borderRadius:"8px"}} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <Divider plain orientation="center">آیدی اینستاگرام</Divider>
                        <Form.Item name="instagram_id">
                            <Input style={{borderRadius:"8px"}} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <Divider plain orientation="center">آیدی توییتر</Divider>
                        <Form.Item name="twitter_id">
                            <Input style={{borderRadius:"8px"}} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <Divider plain orientation="center">آیدی فیسبوک</Divider>
                        <Form.Item name="facebook_id">
                            <Input style={{borderRadius:"8px"}} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button style={{borderRadius:"8px"}} type="primary" htmlType="submit"> ویرایش</Button>
                </Form.Item> 
            </Form>
            </div>
        );
    }
}

export default EditProfile;