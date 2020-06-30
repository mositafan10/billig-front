import React from 'react';
import { Form, Input, Button, Select, Checkbox, Divider, Row, Col } from 'antd';
import Axios from 'axios';
import UploadFile from '../components/UploadPicture';
import TextArea from 'antd/lib/input/TextArea';
import '../fonts/iransans.ttf'




class PackForm extends React.Component {
    
    state = {
        countries : [],
        cities : [], 
        pic_id : [],
        buy: false,
    }

    callbackFunction = (childData) => {

        const pic = childData.map((pi) => this.setState((state) => {
           return {pic_id: state.pic_id.concat(pi.response) };
          }) ) 
        console.log(this.state.pic_id);
    }


    handleChange = () => {
        this.setState({buy:true})
    }
    
    handleFormSubmit = (values, requestType, orderID) => {
        
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
        // console.log("pic_id", this.state.pic_id)

        switch ( requestType ) {

            case 'post':
                return Axios.post('http://127.0.0.1:8000/api/v1/advertise/packet/',
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
                .then(function (res) { if (res.status == 201){ console.log(values)}})
                .catch(error => console.error(error));

            case 'put':
                return Axios.put(`http://127.0.0.1:8000/api/v1/advertise/packet/update/${orderID}/`, {
                    title: title,
                    origin_country: origin_country,
                    origin_city: origin_city,
                    destination_country: destination_country,
                    destination_city: destination_city,
                    category: category,
                    weight: weight,
                    suggested_price: suggested_price,
                    description: description,
                })
                .then(res => console.log(res))
                .catch(error => console.error(error));
        }
    }
    
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

    render(){  
    const PacketCategory = [
        {value:'0', label:'مدارک و مستندات'},
        {value:'1', label:'کتاب و مجله'},
        {value:'2', label:'لوازم الکترونیکی'},
        {value:'3', label:'کفش و پوشاک'},
        {value:'4', label:'لوازم آرایشی و بهداشتی'},
        {value:'5', label:'سایر موارد'},
    ];
    return (
        <div>
            <div className="col-md-2">
            <Form size="middle" onFinish={(values) => this.handleFormSubmit(
                values,
                this.props.requestType,
                this.props.orderID
            )}>
                <Divider plain orientation="center">عنوان آگهی</Divider>
                <Form.Item  name="title" style={{textAlign:"right"}} rules={[{required: true, message:"عنوان آگهی را وارد نمایید"}]}>
                    <Input style={{textAlign:"right"}} />
                </Form.Item>
                <Row>
                    <Col span={12}>
                    <Divider plain orientation="center">شهر مبدا</Divider>
                        <Form.Item name="origin_city" style={{textAlign:"right"}} rules={[{required: true, message:"شهر مبدا را انتخاب کنید"}]}>
                        <Select>
                                {this.state.cities.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;})}
                            </Select>   
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Divider plain orientation="center">کشور مبدا</Divider>
                        <Form.Item  name="origin_country" style={{textAlign:"right"}} rules={[{required: true, message:"کشور مبدا را انتخاب کنید"}]}>
                            <Select>
                                {this.state.countries.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;})}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <Divider plain orientation="center">شهر مقصد</Divider>
                        <Form.Item name="destination_city" style={{textAlign:"right"}} rules={[{required: true, message:"شهر مقصد را انتخاب کنید"}]}>
                        <Select>
                                {this.state.cities.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;})}
                            </Select>   
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Divider plain orientation="center">کشور مقصد</Divider>
                        <Form.Item  name="destination_country" style={{textAlign:"right"}} rules={[{required: true, message:"کشور مقصد را انتخاب کنید"}]}>
                            <Select>
                                {this.state.countries.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;})}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider plain orientation="center">نوع بسته</Divider>
                <Form.Item name="category" style={{textAlign:"right"}} rules={[{required: true, message:"نوع بسته را انتخاب کنید"}]}>
                <Select options={PacketCategory}/>  
                </Form.Item>
                <Divider plain orientation="center">وزن بسته</Divider>  
                <Form.Item  name="weight" style={{textAlign:"right"}} rules={[{required: true, message: "وزن بسته را وارد کنید"}]}>
                    <Input style={{textAlign:"right"}} placeholder="به کیلوگرم وارد کنید" ></Input>
                </Form.Item>
                <Divider plain orientation="center" >مبلغ پیشنهادی</Divider>
                <Form.Item  name="suggested_price" style={{textAlign:"right"}} rules={[{required: true, message:"مبلغ پیشنهادی خود را وارد کنید"}]}>
                    <Input style={{textAlign:"right"}} placeholder="به تومان وارد کنید"/>
                </Form.Item>
                <Form.Item name="buy" style={{textAlign:"center"}}>
                    <Checkbox onChange={this.handleChange.bind()}>
                   بسته می‌تواند توسط مسافر خریداری شود
                    </Checkbox>
                </Form.Item>
                <Divider plain orientation="center">توضیحات</Divider>
                <Form.Item name="description">
                    <TextArea style={{textAlign:"right"}} />
                </Form.Item> 
                <Form.Item rules={[{required: true}]} style={{textAlign:"center"}}>
                    <Checkbox style={{textAlign:"right"}} rules={[{required: true, message:"قوانین را مطالعه بفرمایید"}]}>
                    با <a>قوانین و مقررات </a>بیلیگ پست موافقم
                    </Checkbox>
                </Form.Item>
                <Form.Item name="picture" style={{textAlign:"center"}}> 
                    <UploadFile parentCallback = {this.callbackFunction} />
                    <p>   </p>
                    {/* <Input
                    type="file"
                    id="picture"
                    accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/> */}
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button style={{ borderRadius: '8px' }} type="primary" htmlType="submit">ثبت آگهی</Button>
                </Form.Item> 
            </Form>
            </div>
        </div>
        );
    }
}

export default PackForm;
