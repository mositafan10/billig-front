import React from 'react';
import { Button, Modal, Form, Select, DatePicker, Radio, message, Tooltip, Spin, notification} from 'antd'; 
import { PlusOutlined, WindowsFilled } from '@ant-design/icons';
import Axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { config } from '../../Constant';

var url = config.url.API_URL
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
        confirmLoading: false
      }

    componentDidMount(){
        Axios.get(`${url}api/v1/account/countries/`)
            .then(res => {
                this.setState({
                    countries: res.data
                });
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
        { this.state.radio_value
            ? 
            
        Axios.post(`${url}api/v1/advertise/travel/`, {
                departure : values.origin_country, 
                departure_city : values.origin_city, 
                destination : values.destination_country, 
                destination_city : values.destination_city, 
                flight_date_start : moment(values.flight_date2[0]).format('YYYY-MM-DD'), 
                flight_date_end : moment(values.flight_date2[1]).format('YYYY-MM-DD'),
                description : values.description, 
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                this.setState({confirmLoading:true})
                setTimeout(() => {
                    this.setState({
                      createtravelvisible: false,
                      confirmLoading: false,
                    });
                  }, 2000);
                    {this.props.loc === "offer" ?
                    this.props.parent() :
                    this.props.parentCallback(); }
                    notification['success']({
                        message: 'سفر شما با موفقیت ثبت شد',
                        style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content", marginTop:"30%"},
                        duration:2,
                      });
            })  
            .catch(error => message.warn(error.response.data.detail), this.setState({confirmLoading:false}))
            :
            Axios.post(`${url}api/v1/advertise/travel/`, {
                    departure : values.origin_country, 
                    departure_city : values.origin_city, 
                    destination : values.destination_country, 
                    destination_city : values.destination_city, 
                    flight_date_start : moment(values.flight_date._d).format('YYYY-MM-DD'), 
                    description : values.description, 
                },
                { headers: {"Authorization" : `Bearer ${token}`} })
                .then(res => {
                    this.setState({confirmLoading:true})
                    setTimeout(() => {
                        this.setState({
                          createtravelvisible: false,
                          confirmLoading: false,
                        });
                      }, 2000);
                        {this.props.loc === "offer" ?
                        this.props.parent() :
                        this.props.parentCallback(); }
                        notification['success']({
                            message: 'سفر شما با موفقیت ثبت شد',
                            style:{fontFamily:"VazirD", textAlign:"right", float:"right", width:"max-content", marginTop:"30%"},
                            duration:2,
                          });
                })  
                .catch(error => message.warn(error.response.data.detail), this.setState({confirmLoading:false}))
            }
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
    
    get_city_destination = (e) => {
        Axios.get(`${url}api/v1/account/cities/${e}`)
        .then(res => {
            this.setState({
                cities_destination: res.data,
                city_destination_dis : false
            });
        })
    }

    radioonChange = e => {
        this.setState({
            radio_value: e.target.value,
        });
      };

    render(){
        return(
            <div>
                <Button icon={<PlusOutlined/>} onClick={this.showcreatetravel} style={{borderRadius:"8px", marginTop:"40px", marginBottom:"20px"}}><b> ثبت سفر جدید</b></Button>
                <Modal
                visible={this.state.createtravelvisible}
                onCancel={this.handleCancel}
                okButtonProps={{form:'create_travel', key:'submit', htmlType:'submit'}}
                okText={"ثبت"}
                confirmLoading={this.state.confirmLoading}
                cancelText="انصراف"
                style={{borderRadius:"10px",fontFamily:"VazirD", overflow:"hidden"}}
                >
                    <p style={{fontFamily:"VazirD",textAlign:"center"}}> ثبت سفر </p>
                    <Form
                    name="create_travel"
                    onFinish={this.handleOkTravel}
                    scrollToFirstError="true"
                    >
                        <br/>
                        <label style={{fontFamily:"VazirD", float:"right" ,textAlign:"right", marginTop:"-30px"}}>کشور مبدا</label>
                        <Form.Item 
                            name="origin_country" 
                            style={{textAlign:"right"}}
                            rules={[
                                {
                                required: true,
                                message:"کشور مبدا را انتخاب کنید"
                                },
                        ]}>
                            <Select onChange={this.get_city_origin.bind()}>
                                {this.state.countries.map((e, key) => {
                                return <Option key={e.id}  value={e.id}>{e.name}</Option>;})}
                            </Select>
                        </Form.Item>
                        <br/>
                        <label style={{fontFamily:"VazirD", float:"right" ,textAlign:"right", marginTop:"-30px"}}>شهر مبدا</label>
                        <Form.Item
                            name="origin_city"
                            locale={{emptyText:"سفری وجود ندارد"}}
                            style={{textAlign:"right"}}
                            rules={[
                                {
                                required: true,
                                message:"شهر مبدا را انتخاب کنید"
                                },
                        ]}>
                            <Select disabled={this.state.city_origin_dis}>
                                {this.state.cities_origin.map((e, key) => {
                                return <option key={e.id} value={e.id}>{e.name}</option>;})}
                            </Select>
                        </Form.Item>
                        <br/>
                        <label style={{fontFamily:"VazirD", float:"right" ,textAlign:"right", marginTop:"-30px"}}>کشور مقصد</label>
                        <Form.Item 
                            name="destination_country"
                            style={{textAlign:"right"}}
                            rules={[
                                {
                                required: true,
                                message:"کشور مقصد را انتخاب کنید"
                                },
                        ]}>
                            <Select onChange={this.get_city_destination.bind()}>
                                {this.state.countries.map((e, key) => {
                                return <Option key={key} value={e.id}>{e.name}</Option>;})}
                                </Select>
                        </Form.Item>
                        <br/>
                        <label style={{fontFamily:"VazirD", float:"right" ,textAlign:"right", marginTop:"-30px"}}>شهر مقصد</label>
                        <Form.Item 
                            name="destination_city" 
                            style={{textAlign:"right"}}
                            rules={[
                                {
                                required: true,
                                message:"شهر مقصد را انتخاب کنید"
                                },
                        ]}>
                            <Select disabled={this.state.city_destination_dis}>
                                {this.state.cities_destination.map((e, key) => {
                                return <option key={key} value={e.id}>{e.name}</option>;})}
                            </Select>
                        </Form.Item>
                        
                        <div style={{textAlign:"center"}}>
                        <Radio.Group optionType="button" onChange={this.radioonChange.bind(this)} value={this.state.radio_value}>
                            <Radio value={false}>یک طرفه</Radio>
                            <Tooltip title="در صورت انتخاب این گزینه، دو سفر برای شما ثبت خواهد شد."><Radio value={true}>دو طرفه</Radio></Tooltip>
                        </Radio.Group>
                        </div>
                        <br/> 
                        <label style={{fontFamily:"VazirD", float:"right" ,textAlign:"right", marginTop:"-30px"}}>تاریخ سفر</label>
                        {this.state.radio_value ?
                        <Form.Item 
                            name="flight_date2"
                            style={{textAlign:"center"}}
                            rules={[
                                {
                                required: true,
                                message:"تاریخ پرواز خود را انتخاب کنید"
                                },
                        ]}>
                            <RangePicker placeholder="" style={{display:"flex"}}/>
                        </Form.Item> 
                        :
                        <Form.Item 
                            name="flight_date"
                            style={{textAlign:"center"}}
                            rules={[
                                {
                                required: true,
                                message:"تاریخ پرواز خود را انتخاب کنید"
                                },
                        ]}>
                            <DatePicker placeholder="" style={{display:"flex"}}/>
                        </Form.Item> 
                        }
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default CreateTravel;