import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import Axios from 'axios';


class TravelForm extends React.Component {

    handleFormSubmit = (values, requestType, orderID) => {
        const departure = values.departure;
        const departure_city = values.departure_city;
        const destination = values.destination;
        const destination_city = values.destination_city;
        const empty_weight = values.empty_weight;
        const description = values.description;   
        const flight_date = values.flight_date;   
        const owner = '1'
        switch ( requestType ) {

            case 'post':
                return Axios.post('http://127.0.0.1:8000/api/v1/advertise/travel/', {
                    departure: departure,
                    departure_city: departure_city,
                    destination: destination,
                    destination_city: destination_city,
                    empty_weight: empty_weight,
                    description: description,
                    flight_date: flight_date,
                    owner: owner
                })
                .then(res => console.log(res))
                .catch(error => console.error(error)),
                console.log(values, owner);
                
            case 'put':
                return Axios.put(`http://127.0.0.1:8000/api/v1/advertise/travel/update/${orderID}/`, {
                    departure: departure,
                    departure_city: departure_city,
                    destination: destination,
                    destination_city: destination_city,
                    empty_weight: empty_weight,
                    description: description,
                })
                .then(res => console.log(res))
                .catch(error => console.error(error));
        }
    }

    render(){
    return (
        <div>
            <Form onFinish={(values) => this.handleFormSubmit(
                values,
                this.props.requestType,
                this.props.orderID
            )}>
                <Form.Item label="کشور مبدا" name="departure">
                    <Select>
                       <option>Canada</option>
                       <option>Iran</option>
                   </Select>
                </Form.Item>
                <Form.Item label="شهر مبدا" name="departure_city">
                    <Input />
                </Form.Item>
                <Form.Item label="کشور مقصد" name="destination">
                    <Input />
                </Form.Item>
                <Form.Item label="شهر مقصد" name="destination_city">
                    <Input />
                </Form.Item>
                <Form.Item label="وزن خالی بار ( کیلوگرم )" name="empty_weight">
                    <Input />
                </Form.Item>
                <Form.Item label="تاریخ پرواز" name="flight_date">
                    <Input />
                </Form.Item>
                <Form.Item label="توضیحات" name="description">
                    <Input />
                </Form.Item> 
                <Form.Item>
                    <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                </Form.Item> 
            </Form>
        </div>
        );
    }
}

export default TravelForm;

