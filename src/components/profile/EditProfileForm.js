import React from 'react';
import Axios from 'axios';
import { Row, Col, Form, Divider, Select, Button, Input, message } from 'antd';
import { 
    InstagramOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    FacebookOutlined,
    IeOutlined,
    UserOutlined,
    DollarCircleOutlined
    } from '@ant-design/icons';

import { config } from '../../Constant';
var url = config.url.API_URL

const Option = { Select };

class EditProfileForm extends React.Component {
    state = {
        countries: [],
        cities:[],
        city_dis: true,
    }

    componentDidMount(){
    Axios.get(`${url}api/v1/account/countries/`)
        .then(res => {
            this.setState({
                countries: res.data
            });
        })
        .catch(err => console.log(err))

    Axios.get(`${url}api/v1/account/cities/`)
        .then(res => {
            this.setState({
                cities: res.data
            });
        })
        .catch(err => console.log(err))
    }

    get_city = (e) => {
        Axios.get(`${url}api/v1/account/cities/${e}`)
        .then(res => {
            this.setState({
                cities: res.data,
                city_dis : false
            });
        })
    }
    
    handleFormSubmit = (values) => {    
        const token = localStorage.getItem('token');
        Axios.put(`${url}api/v1/account/users/update/`,
                    {
                    facebook_id: (values.facebook_id ? values.facebook_id : this.props.data.facebook_id ),
                    twitter_id: (values.twitter_id ? values.twitter_id : this.props.data.twitter_id ),
                    instagram_id: (values.instagram_id ? values.instagram_id : this.props.data.instagram_id ),
                    linkdin_id : (values.linkdin_id ? values.linkdin_id : this.props.data.linkdin_id ),
                    email: (values.email ? values.email : this.props.data.email ),
                    bio: (values.bio ? values.bio : this.props.data.bio ),
                    country: (values.living_country ? values.living_country : this.props.data.country ),
                    city : (values.living_city ? values.living_city : this.props.data.city),
                    first_name: (values.first_name ? values.first_name : this.props.data.first_name ),
                    last_name: (values.last_name ? values.last_name : this.props.data.last_name ),
                    account_number: (values.account_number ? values.account_number : this.props.data.account_number )
                    },
                    { headers: {"Authorization" : `Bearer ${token}`} })
        .then( res => {  message.success("تغییر با موفقیت انجام شد"); this.props.update(); })
        .catch(error => console.error(error));
    }

    render(){
        return(
            <div>
                
                <Form size="middle" onFinish={(values) => this.handleFormSubmit(values)} id="edit">
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <UserOutlined style={{fontSize:"30px"}} />
                            <Divider plain orientation="center">بیوگرافی</Divider>
                            <Form.Item  name="bio">
                                <textarea defaultValue={this.props.data.bio} placeholder="... آنچه دوست دارید دیگران در مورد شما بدانند" style={{borderRadius:"8px", textAlign:"center", padding:"10px", width:"-moz-available"}} rows="2" cols="44" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}></Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                            <IeOutlined style={{fontSize:"30px"}} />
                            <Divider plain orientation="center">ایمیل</Divider>
                            <Form.Item name="email">
                                <Input defaultValue={this.props.data.email} type="email" style={{borderRadius:"8px"}} />
                            </Form.Item>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}></Col>
                    </Row>
                    <Divider plain orientation="center">اکانت شبکه‌های اجتماعی</Divider>
                    <p>این موارد جهت شناخت بیشتر کاربران از یکدیگر هنگام بازدید آنها از صفحه پروفایل شما نمایش داده می‌شوند</p>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={11} xxl={11}>
                            <LinkedinOutlined style={{fontSize:"30px"}} />
                            <Divider plain orientation="center"> لینکدین</Divider>
                            <Form.Item name="linkdin_id">
                                <Input style={{borderRadius:"8px"}} />
                            </Form.Item>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={2} xl={2} xxl={2}></Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={11} xxl={11}>
                            <InstagramOutlined style={{fontSize:"30px"}} />
                            <Divider plain orientation="center"> اینستاگرام</Divider>
                            <Form.Item name="instagram_id">
                                <Input style={{borderRadius:"8px"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={11} xxl={11}>
                            <TwitterOutlined style={{fontSize:"30px"}}/>
                            <Divider plain orientation="center"> توییتر</Divider>
                            <Form.Item name="twitter_id">
                                <Input style={{borderRadius:"8px"}} />
                            </Form.Item>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={2} xl={2} xxl={2}></Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={11} xxl={11}>
                            <FacebookOutlined style={{fontSize:"30px"}}/>
                            <Divider plain orientation="center"> فیسبوک</Divider>
                            <Form.Item name="facebook_id">
                                <Input style={{borderRadius:"8px"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider plain orientation="center"> محل اقامت</Divider>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={11} xxl={11}>
                            <Divider plain orientation="center">کشور</Divider>
                            <Form.Item name="living_country">
                            <Select defaultValue={this.props.data.country ? this.props.data.country.name : ""} onChange={this.get_city.bind()}>
                                {this.state.countries.map((e, key) => {
                                return <Option key={key} value={e.id}>{e.name}</Option>;})}
                            </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={2} xl={2} xxl={2}></Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={11} xxl={11}>
                        <Divider plain orientation="center"> شهر</Divider>
                            <Form.Item name="living_city">
                                <Select disabled={this.state.city_dis}>
                                    {this.state.cities.map((e, key) => {
                                    return <Option key={key} value={e.id}>{e.name}</Option>;})}
                                </Select>   
                            </Form.Item>
                        </Col>
                    </Row>
                    <br/>
                    <Divider plain orientation="center">اطلاعات بانکی</Divider>
                    <p>این گزینه مربوط به تسویه حساب با مسافرانی که بسته جابه‌جا می ‌کنند،‌ می‌باشد.</p>
                    <Row>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}></Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                            <DollarCircleOutlined style={{fontSize:"30px"}} />
                            <Divider plain orientation="center">شماره شبا</Divider>
                            <Form.Item name="account_numbrt">
                                <Input defaultValue={this.props.data.account_number} type='number' style={{borderRadius:"8px"}} />
                            </Form.Item>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item style={{ textAlign: 'center' }}>
                                <Button style={{borderRadius:"8px"}} type="primary" htmlType="submit"> ویرایش</Button>
                            </Form.Item> 
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default EditProfileForm;