import React from 'react';
import Axios from 'axios';
import { Row, Col, Input, Menu, Button, Space, Dropdown, Divider, Select, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import Orders from '../components/packet/Orders';
import Sider from '../components/LandingPageSidebar';
import { config } from '../Constant';
import billliger from '../media/Billliger.svg';
import Icon, { UserAddOutlined, DownOutlined  } from '@ant-design/icons';

var url = config.url.API_URL
const {Search} = Input
const { Option } = Select;


const style_text = {
    alignContent:"center",
    textAlign:"center",
    display:"flex",
    alignItems:"center",
}

class OrderList extends React.Component {

    state = {
        orders : [],
        countries: [],
        filter: "none",
        filteritems: []
    }

    PacketCategory = [
        {value:'مدارک و مستندات', label:'مدارک و مستندات'},
        {value:'کتاب و مجله', label:'کتاب و مجله'},
        {value:'لوازم الکترونیکی', label:'لوازم الکترونیکی'},
        {value:'کفش و پوشاک', label:'کفش و پوشاک'},
        {value:'لوازم آرایشی و بهداشتی', label:'لوازم آرایشی و بهداشتی'},
        {value:'سایر موارد', label:'سایر موارد'},
    ]

    order_type = [
        { label: 'خرید', value: 'خرید' },
        { label: 'پست', value: 'پست' },
      ];

    countryfilter = (id) => {
        const myItems = this.state.orders;
        const newArray = myItems.filter(item => item.origin_country.id === id || item.destination_country.id === id)
        this.setState({
            filteritems: newArray
        })
    }

    categoryfilter = (id) => {
        const myItems = this.state.orders;
        const newArray = myItems.filter(item => item.category === id);
        this.setState({
            filteritems: newArray
        })
    }
    
    
    componentDidMount(){
        window.scrollTo(0, 0);
        Axios.get(`${url}api/v1/advertise/packet/`)
            .then(res => {
                this.setState({
                    orders: res.data,
                    filteritems: res.data
            });
        })
        .catch(error => console.error(error));
    }


    countrylist = () => {
        Axios.get(`${url}api/v1/account/countries/`)
        .then(res => {
            this.setState({
                countries: res.data
            });
        })
    }

    canclefilter = () => {
        this.setState({
            filteritems: this.state.orders
        })
    }


    showfilter = () => {
        if (this.state.filter === "none"){this.setState({filter:"flex"})
        } else { this.setState({filter:"none"})}
    }

    
    render(){
        return(
            <div style={{padding:"0 30px 0 30px"}}>
                <Row >
                    <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} style={style_text}>
                        <Row>
                                {/* <Col>
                                <h1 style={{fontSize:"33px"}}>آگهی‌های خرید و پست</h1>
                                </Col> */}
                            <Col>
                                <p style={{fontSize:"18px"}}>در هر سفر می‌توانید هزینه‌های خود را با خرید و یا جابه‌جایی بسته‌ها هزینه خود را کاهش دهید</p>
                            </Col>
                            <Col>
                            <Space>
                                <Link to="/travel-guide"><Button size={"medium"} style={{borderRadius:"15px"}}>راهنمای پذیرش  آگهی</Button></Link>
                                <Link to="/profile/mytravel"><Button size={"medium"} style={{borderRadius:"15px", backgroundColor:"#46a0ae", color:"white"}}>ثبت سفر</Button></Link>
                            </Space>
                            <Divider style={{opacity:"0"}}/>
                            </Col>
                        </Row>
                    </Col>
                    <br/>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} style={{textAlign:"center"}}>
                    <img
                        alt = "billlig.com"
                        src = {billliger}
                        style={{width:"80%", height:"auto"}}
                        /> 
                    </Col>
                </Row>
                <Divider />
                <Row style={{display:"flex", justifyContent:"center"}}>
                    <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <Space>
                            <Checkbox.Group options={this.order_type} defaultValue={['پست','خرید']} onChange={this.onChange}  />
                            <Select placeholder="کشور" style={{width:"100px"}} onClick={this.countrylist} onChange={this.countryfilter.bind(this)}>
                                {this.state.countries.map((e, key) => {
                                return <Option key={key} value={e.id}>{e.name}</Option>;})}
                            </Select>
                            <Select placeholder="دسته بندی" options={this.PacketCategory} style={{width:"180px"}} onChange={this.categoryfilter}/> 
                            <Select placeholder="وزن" options={this.PacketCategory} style={{width:"180px"}}/> 
                            <Button style={{borderRadius:"10px", fontSize:"13px"}} onClick={this.canclefilter.bind(this)}>لغو فیلترها</Button> 
                            </Space>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                        <div>
                            <div style={{display:"flex", justifyContent:"center" }}>
                            <Button onClick={this.showfilter}> ‌فیلتر آگهی‌ها</Button>
                            </div>
                            <Divider />
                            <div style={{display:this.state.filter, justifyContent:"center" }}>
                                <Space direction="vertical">
                                <Select placeholder="کشور" style={{width:"180px"}}>
                                    {this.state.countries.map((e, key) => {
                                    return <Option key={key} value={e.id}>{e.name}</Option>;})}
                                </Select>
                                <Select placeholder="دسته بندی" options={this.PacketCategory} style={{width:"180px"}}/> 
                                <Select placeholder="وزن" options={this.PacketCategory} style={{width:"180px"}}/> 
                                <Checkbox.Group options={this.order_type} defaultValue={['پست','خرید']} onChange={this.onChange} />
                                </Space>
                            </div>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Row >
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Orders data={this.state.filteritems} page={100} pagesize={100}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default OrderList;