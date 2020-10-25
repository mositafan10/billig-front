import React, { Component } from 'react';
import { Form , Col, Button, Row, Divider, Select, DatePicker, notification } from 'antd';
import Axios from 'axios';
import moment from 'moment';
import { config } from '../../Constant';

var url = config.url.API_URL

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
        Axios.get(`${url}api/v1/account/cities/${e}`)
        .then(res => {
            this.setState({
                cities_destination: res.data,
                city_destination_dis : false
            });
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
        Axios.get(`${url}api/v1/account/cities/${e}`)
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

        Axios.put(`${url}api/v1/advertise/travel/${travel_id}/`,
            { 
            departure: departure,
            departure_city: departure_city,
            destination: destination,
            destination_city: destination_city,
            flight_date_start: flight_date_start,
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
        .then( () => {
            this.props.cancle();
            this.props.signal();
            notification['success']({
                message: 'سفر شما با موفقیت ویرایش شد',
                style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content", marginTop:"30%",fontSizeAdjust:"0.5"},
                duration:2,
              });
    })
        .catch(error => {
            notification['error']({
                message: error.response.data.detail,
                style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content", marginTop:"30%", fontSizeAdjust:"0.5"},
                duration:2,
              });
            });
    }
    
    componentDidMount = () => {
        Axios.get(`${url}api/v1/account/countries/`)
        .then(res => {
            this.setState({
                countries: res.data
            });
        })
    }

    render() {
        const flight_date_start = moment(this.props.data.flight_date_start);
        return (
            <div style={{fontFamily:"VazirD"}}>
            <Row style={{padding:"10px"}}>
            <Col span={24}>
                <Form onFinish={(values) => this.handleFormSubmit(values)} id="edit">
                    <Row>
                        <Col span={24}>
                        <Divider plain orientation="center">کشور مبدا</Divider>
                            <Form.Item name="departure" style={{textAlign:"right"}} >
                                <Select defaultValue={this.props.data.departure ? this.props.data.departure.name : ""} onChange={this.get_city_origin.bind()}>
                                    {this.state.countries.map((e, key) => {
                                    return <Option key={key} value={e.id}>{e.name}</Option>;})}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
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
                        <Col span={24}>
                        <Divider plain orientation="center">کشور مقصد</Divider>
                            <Form.Item  name="destination" style={{textAlign:"right"}} >
                                <Select defaultValue={this.props.data.destination ? this.props.data.destination.name : ""} onChange={this.get_city_destination.bind()}>
                                    {this.state.countries.map((e, key) => {
                                    return <option key={key} value={e.id}>{e.name}</option>;})}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
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
                        <Col span={24}>
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
            </Row>
        </div>

        );
    }
}

export default TravelEditForm;