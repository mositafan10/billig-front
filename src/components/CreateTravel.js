import React from 'react';
import { Button, Modal, Input, Form, Select, DatePicker, Radio} from 'antd'; 
import Axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';

const { RangePicker } = DatePicker;
const { Option } = Select;

class CreateTravel extends React.Component {
    
    state = {
        createtravelvisible: false,
        countries : [],
        cities_origin : [],
        cities_destination : [],
        city_origin_dis: true,
        city_destination_dis: true,
        radio_value: true,
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
    const token = localStorage.getItem('token');
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
                createtravelvisible : false,
                });
        })  
        .catch(error => {console.log(error);
        })
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

    radioonChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            radio_value: e.target.value,
        });
        console.log('radio', this.state.radio_value )
      };

    render(){
        return(
            <div>
                <Button onClick={this.showcreatetravel} style={{borderRadius:"8px"}}><b> ثبت سفر جدید</b></Button>
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
                    scrollToFirstError="true"
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
                            <Select onChange={this.get_city_origin.bind()}>
                                {this.state.countries.map((e, key) => {
                                return <Option key={e.id}  value={e.id}>{e.name}</Option>;})}
                                
                            </Select>
                        </Form.Item>
                        <br/>
                        <label style={{fontFamily:"IRANSans", float:"right" ,textAlign:"right", marginTop:"-30px"}}>شهر مبدا</label>
                        <Form.Item
                            name="origin_city"
                            locale={{emptyText:"سفری وجود ندارد"}}
                            rules={[
                                {
                                required: true,
                                
                                },
                        ]}>
                            <Select disabled={this.state.city_origin_dis}>
                                {this.state.cities_origin.map((e, key) => {
                                return <option key={e.id} value={e.id}>{e.name}</option>;})}
                            </Select>
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
                            <Select onChange={this.get_city_destination.bind()}>
                                {this.state.countries.map((e, key) => {
                                return <Option key={key} value={e.id}>{e.name}</Option>;})}
                                </Select>
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
                            <Select disabled={this.state.city_destination_dis}>
                                {this.state.cities_destination.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;})}
                            </Select>
                        </Form.Item>
                        
                        <div style={{textAlign:"center"}}>
                        <Radio.Group onChange={this.radioonChange.bind(this)} value={this.state.radio_value}>
                            <Radio value={false}>یک طرفه</Radio>
                            <Radio value={true}>دو طرفه</Radio>
                        </Radio.Group>
                        </div>
                        <br/> 
                        <label style={{fontFamily:"IRANSans", float:"right" ,textAlign:"right", marginTop:"-30px"}}>تاریخ سفر</label>
                        {this.state.radio_value ?
                        <Form.Item 
                            name="flight_date"
                            
                            rules={[
                                {
                                required: true,
                                },
                        ]}>
                            <RangePicker style={{display:"flex"}}/>
                        </Form.Item> 
                        :
                        <Form.Item 
                            name="flight_date" 
                            rules={[
                                {
                                required: true,
                                },
                        ]}>
                            <DatePicker style={{display:"flex"}}/>
                        </Form.Item> 
                        }
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