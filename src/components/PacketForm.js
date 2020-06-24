import React from 'react';
import { Form, Input, Button, Select, Checkbox, Divider, Row, Col, InputNumber} from 'antd';
import Axios from 'axios';
import UploadFile from '../components/UploadPicture';
import TextArea from 'antd/lib/input/TextArea';
import '../fonts/iransans.ttf'




class PackForm extends React.Component {
    
    state = {
        countries : [],
        cities : [], 
        pic_id : [],
    }

    callbackFunction = (childData) => {
        this.setState({pic_id: childData});
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
        const token = localStorage.getItem('token');

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
                    picture : [1]
                    },
                    { headers: {"Authorization" : `Bearer ${token}`} })
                .then(function (res) { if (res.status == 201){ window.location.href = '/profile'; console.log(values)}})
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
        {value:'0', label:'مدارک'},
        {value:'1', label:'کتاب'},
        {value:'2', label:'سایر موارد'}
    ];
    return (
        <div>
            <div className="col-md-2">
            <Form size="middle" onFinish={(values) => this.handleFormSubmit(
                values,
                this.props.requestType,
                this.props.orderID
            )}>
                <Divider plain orientation="right">عنوان آگهی</Divider>
                <Form.Item  name="title" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Row>
                    <Col span={12}>
                    <Divider plain orientation="center">شهر مبدا</Divider>
                        <Form.Item name="origin_city" rules={[{required: true}]}>
                        <Select>
                                {this.state.cities.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;})}
                            </Select>   
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Divider plain orientation="center">کشور مبدا</Divider>
                        <Form.Item  name="origin_country">
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
                        <Form.Item name="destination_city" rules={[{required: true}]}>
                        <Select>
                                {this.state.cities.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;})}
                            </Select>   
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Divider plain orientation="center">کشور مقصد</Divider>
                        <Form.Item  name="destination_country">
                            <Select>
                                {this.state.countries.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;})}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                    <Divider plain orientation="center">مبلغ پیشنهادی</Divider>
                        <Form.Item  name="suggested_price" style={{textAlign:"center"}} rules={[{required: true}]}>
                            <InputNumber min={0.1} max={30}> </InputNumber>  
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Divider plain orientation="center">نوع بسته</Divider>
                        <Form.Item name="category" rules={[{required: true}]}>
                        <Select options={PacketCategory}/>  
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Divider plain orientation="center">وزن بسته</Divider>
                        <Form.Item  name="weight" style={{textAlign:"center"}} rules={[{required: true}]}>
                            <InputNumber min={0.1} max={30} step={0.5}> </InputNumber>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider plain orientation="center">توضیحات</Divider>
                <Form.Item name="description" rules={[{required: true}]}>
                    <TextArea />
                </Form.Item> 
                <Form.Item rules={[{required: true}]} style={{textAlign:"center"}}>
                    <Checkbox>
                    با <a>قوانین و مقررات </a>بیلیگ پست موافقم
                    </Checkbox>
                </Form.Item>
                <Form.Item name="picture" style={{textAlign:"center"}}> 
                    <UploadFile parentCallback = {this.callbackFunction} /> </Form.Item>
                    <p>  </p>
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button style={{ borderRadius: '8px' }} type="primary" htmlType="submit">ثبت آگهی</Button>
                </Form.Item> 
            </Form>
                                        {/* <List
                                        dataSource={this.state.pic_id}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                        description={item}
                                        />
                                            </List.Item>
                                        )}
                                        /> */}
            </div>
        </div>
        );
    }
}

export default PackForm;
