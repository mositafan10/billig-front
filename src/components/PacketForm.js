import React from 'react';
import { Form, Input, Button, Select, Checkbox, Divider, Row, Col } from 'antd';
import Axios from 'axios';
import UploadFile from '../components/UploadPicture';
import TextArea from 'antd/lib/input/TextArea';
import '../fonts/iransans.ttf'
import { Link } from 'react-router-dom';

const { Option } = Select;


class PackForm extends React.Component {
    
    state = {
        countries : [],
        cities_origin : [],
        cities_destination : [],
        city_origin_dis: true,
        city_destination_dis: true,
        pic_id : [],
        buy: false,
    }

    PacketCategory = [
        {value:'0', label:'مدارک و مستندات'},
        {value:'1', label:'کتاب و مجله'},
        {value:'2', label:'لوازم الکترونیکی'},
        {value:'3', label:'کفش و پوشاک'},
        {value:'4', label:'لوازم آرایشی و بهداشتی'},
        {value:'5', label:'سایر موارد'},
    ];

    callbackFunction = (childData) => {
        const pic = childData.map((pi) => this.setState((state) => {
           return {pic_id: state.pic_id.concat(pi.response) };
          }) ) 
        console.log(this.state.pic_id);
    }

    get_city_origin = (e) => {
        console.log('country', e);
        Axios.get(`http://127.0.0.1:8000/api/v1/account/cities/${e}`)
        .then(res => {
            this.setState({
                cities_origin: res.data,
                city_origin_dis : false
            });
            console.log(res.data);
        })
    }
    
    get_city_destination = (e) => {
        console.log('country', e);
        Axios.get(`http://127.0.0.1:8000/api/v1/account/cities/${e}`)
        .then(res => {
            this.setState({
                cities_destination: res.data,
                city_destination_dis : false
            });
            console.log(res.data);
        })
    }

    handleChange = () => {
        this.setState({buy:true})
    }
    
    handleFormSubmit = (values) => {
        console.log("Hi ");
        const title = values.title;
        const origin_country = values.origin_country;
        const origin_city = values.origin_city;
        const destination_country = values.destination_country;
        const destination_city = values.destination_city;
        const category = values.category;
        const weight = values.weight;
        const suggested_price = values.suggested_price;
        const description = values.description;
        const buy = this.state.buy;
        const token = localStorage.getItem('token');
        const pic_id = this.state.pic_id[2].id;

        Axios.post('http://127.0.0.1:8000/api/v1/advertise/packet/',
            { 
            title: title,
            origin_country: origin_country,
            origin_city: origin_city,
            destination_country: destination_country,
            destination_city: destination_city,
            category: category,
            weight: weight,
            suggested_price: suggested_price,
            description: description,
            buy: buy,
            picture : [pic_id]
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
        .then(function (res) { if (res.status == 201){ window.location = "/profile" }})
        .catch(error => console.error(error));
    }
    
    componentDidMount(){
        Axios.get('http://127.0.0.1:8000/api/v1/account/countries/')
            .then(res => {
                this.setState({
                    countries: res.data
                });
                console.log(res.data);
            })
    }

    render(){  
    return (
        <div>
            <Link style={{fontSize:"14px", display:"flex", justifyContent:"center"}}> راهنمای ثبت آگهی </Link><br/>
            <Row>
            <Col xs={0} sm={0} md={0} lg={6} xl={6} xxl={6}></Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Form onFinish={(values) => this.handleFormSubmit(values)}>
                    <Divider plain orientation="center">عنوان آگهی</Divider>
                    <Form.Item name="title" style={{textAlign:"right",}} rules={[{required: true, message:"عنوان آگهی را وارد نمایید"}]}>
                        <Input style={{textAlign:"right"}} />
                    </Form.Item>
                    <Row>
                        <Col span={12}>
                        <Divider plain orientation="center">شهر مبدا</Divider>
                            <Form.Item name="origin_city" style={{textAlign:"right"}} rules={[{required: true, message:"شهر مبدا را انتخاب کنید"}]}>
                            <Select disabled={this.state.city_origin_dis} >
                                    {this.state.cities_origin.map((e, key) => {
                                    return <Option key={key} value={e.id}>{e.name}</Option>;})}
                                </Select>   
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                        <Divider plain orientation="center">کشور مبدا</Divider>
                            <Form.Item  name="origin_country" style={{textAlign:"right"}} rules={[{required: true, message:"کشور مبدا را انتخاب کنید"}]}>
                                <Select onChange={this.get_city_origin.bind()}>
                                    {this.state.countries.map((e, key) => {
                                    return <Option key={key} value={e.id}>{e.name}</Option>;})}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                        <Divider plain orientation="center">شهر مقصد</Divider>
                            <Form.Item name="destination_city" style={{textAlign:"right"}} rules={[{required: true, message:"شهر مقصد را انتخاب کنید"}]}>
                            <Select disabled={this.state.city_destination_dis}>
                                    {this.state.cities_destination.map((e, key) => {
                                    return <Option key={key} value={e.id}>{e.name}</Option>;})}
                                </Select>   
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                        <Divider plain orientation="center">کشور مقصد</Divider>
                            <Form.Item  name="destination_country" style={{textAlign:"right"}} rules={[{required: true, message:"کشور مقصد را انتخاب کنید"}]}>
                                <Select onChange={this.get_city_destination.bind()}>
                                    {this.state.countries.map((e, key) => {
                                    return <option key={key} value={e.id}>{e.name}</option>;})}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Divider plain orientation="center">ابعاد بسته</Divider>  
                            <Form.Item name="dimension" style={{textAlign:"right"}} rules={[{required: true, message: "وزن بسته را وارد کنید"}]}>
                                <Select>
                                    <Option value="بزرگ">بزرگ</Option>
                                    <Option value="متوسط">متوسط</Option>
                                    <Option value="کوچک">کوچک</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Divider plain orientation="center">نوع بسته</Divider>
                            <Form.Item name="category" style={{textAlign:"right"}} rules={[{required: true, message:"نوع بسته را انتخاب کنید"}]}>
                            <Select options={this.PacketCategory}/>  
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                        <Divider plain orientation="center" >مبلغ پیشنهادی</Divider>
                        <Form.Item  name="suggested_price" style={{textAlign:"right"}} rules={[{required: true, message:"مبلغ پیشنهادی خود را وارد کنید"}]}>
                            <Input style={{textAlign:"right"}} placeholder="به تومان وارد کنید"/>
                        </Form.Item>
                        </Col>
                        <Col span={12}>
                        <Divider plain orientation="center">وزن بسته</Divider>  
                        <Form.Item  name="weight" style={{textAlign:"right"}} rules={[{required: true, message: "وزن بسته را وارد کنید"}]}>
                            <Input style={{textAlign:"right"}} placeholder="به کیلوگرم وارد کنید" ></Input>
                        </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="buy" style={{textAlign:"center"}}>
                        <Checkbox onChange={this.handleChange.bind()}>
                    بسته می‌تواند توسط مسافر خریداری شود
                        </Checkbox><br/>
                        <Link style={{fontSize:"12px"}}>( نحوه خرید بسته توسط مسافر ) </Link>
                    </Form.Item>
                    <Divider plain orientation="center"> توضیحات تکمیلی</Divider>
                    <Form.Item name="description">
                        <TextArea style={{textAlign:"right"}} />
                    </Form.Item> 
                    <Form.Item rules={[{required: true, message:"قوانین را مطالعه بفرمایید"}]} style={{textAlign:"center"}}>
                        <Checkbox style={{textAlign:"right"}}>
                        با <a>قوانین و مقررات </a>بیلیگ پست موافقم
                        </Checkbox>
                    </Form.Item>
                    <Form.Item name="picture" style={{textAlign:"center"}}> 
                        <UploadFile parentCallback = {this.callbackFunction} />
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button style={{borderRadius:'8px'}} type="primary" htmlType="submit">ثبت آگهی</Button>
                    </Form.Item> 
                </Form>
            </Col>
            <Col xs={0} sm={0} md={0} lg={6} xl={6} xxl={6}></Col>
            </Row>
        </div>
        );
    }
}

export default PackForm;
