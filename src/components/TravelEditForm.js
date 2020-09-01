import React, { Component } from 'react';
import { Form , Col, Button, Row, Divider, Select, Input, Checkbox, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';
import moment from 'moment';

const { Option } = Select;

class TravelEditForm extends Component {

    state = {   
        countries : [],
        cities_origin : [],
        cities_destination : [],
        city_origin_dis: true,
        city_destination_dis: true,
        pic_id : [],
        buy: false,
        travel: {},
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

    handleChangevalue = (event) => {
        const target = event.target;
        const name = target.name;
        this.setState({[name]: target.value}); 
    }

    get_city_origin = (e) => {
        Axios.get(`http://127.0.0.1:8000/api/v1/account/cities/${e}`)
        .then(res => {
            this.setState({
                cities_origin: res.data,
                city_origin_dis : false
            });
        })
    }

    handleFormSubmit = (values) => {
        const travel_id = this.props.data.slug;
        const departure = (values.departure ? values.departure : this.props.data.departure.id );
        const departure_city = (values.departure_city ? values.departure_city : this.props.data.departure_city.id );
        const destination = (values.destination ? values.destination : this.props.data.destination.id );
        const destination_city = (values.destination_city ? values.destination_city : this.props.data.destination_city.id );
        const flight_date_start = moment(values.flight_date_start ? values.flight_date_start : this.props.data.flight_date_start ).format('YYYY-MM-DD');
        const token = localStorage.getItem('token');

        Axios.put(`http://127.0.0.1:8000/api/v1/advertise/travel/${travel_id}/`,
            { 
            departure: departure,
            departure_city: departure_city,
            destination: destination,
            destination_city: destination_city,
            flight_date_start: flight_date_start,
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
        .then( res => { if (res.status == 200){
            this.props.cancle();
            this.props.signal();
        }})
        .catch(error => console.error(error));
    }
    
    componentDidMount = () => {
        Axios.get('http://127.0.0.1:8000/api/v1/account/countries/')
        .then(res => {
            this.setState({
                countries: res.data
            });
        })
    }

    render() {
        const flight_date_start = moment(this.props.data.flight_date_start);
        return (
            <div>
            <Row>
            <Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={6}></Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                <Form onFinish={(values) => this.handleFormSubmit(values)} id="edit">
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Divider plain orientation="center">کشور مبدا</Divider>
                            <Form.Item name="departure" style={{textAlign:"right"}} >
                                <Select defaultValue={this.props.data.departure ? this.props.data.departure.name : ""} onChange={this.get_city_origin.bind()}>
                                    {this.state.countries.map((e, key) => {
                                    return <Option key={key} value={e.id}>{e.name}</Option>;})}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Divider plain orientation="center">شهر مبدا</Divider>
                            <Form.Item name="departure_city" style={{textAlign:"right"}}>
                            <Select disabled={this.state.city_origin_dis} defaultValue={this.props.data.departure_city.name}>
                                    {this.state.cities_origin.map((e, key) => {
                                    return <Option key={key} value={e.id}>{e.name}</Option>;})}
                                </Select>   
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Divider plain orientation="center">کشور مقصد</Divider>
                            <Form.Item  name="destination" style={{textAlign:"right"}} >
                                <Select defaultValue={this.props.data.destination ? this.props.data.destination.name : ""} onChange={this.get_city_destination.bind()}>
                                    {this.state.countries.map((e, key) => {
                                    return <option key={key} value={e.id}>{e.name}</option>;})}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Divider plain orientation="center">شهر مقصد</Divider>
                            <Form.Item name="destination_city" style={{textAlign:"right"}} >
                            <Select disabled={this.state.city_destination_dis} defaultValue={this.props.data.destination_city.name}>
                                    {this.state.cities_destination.map((e, key) => {
                                    return <Option key={key} value={e.id}>{e.name}</Option>;})}
                                </Select>   
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Divider plain orientation="center" >تاریخ پرواز</Divider>
                        <Form.Item name="flight_date_start" style={{textAlign:"center"}} >
                            <DatePicker defaultValue={moment(flight_date_start)} style={{textAlign:"center"}}/>
                        </Form.Item>
                        </Col>
                    </Row>
                    <br/>
                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button style={{borderRadius:'8px'}} type="primary" htmlType="submit">ویرایش سفر</Button>
                    </Form.Item> 
                </Form>
            </Col>
            <Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={6}></Col>
            </Row>
        </div>

        );
    }
}

export default TravelEditForm;