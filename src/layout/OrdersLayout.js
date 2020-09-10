import React, { Component } from 'react';
import { Layout, Row, Col, Dropdown, Button, Space } from 'antd';
import HeaderSection from '../containers/HeaderSection';
import login from '../media/login.svg';
import { UserAddOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;


class OrdersLayout extends Component {

    filter = (key) => {
        
    }

    render() {
        return (
            <div style={{fontFamily:"IRANSans", backgroundColor:"white"}}>
                <Layout style={{backgroundColor:"white"}}>
                    <Header style={{backgroundColor:"white"}}>
                        <HeaderSection {...this.props}/>
                    </Header>
                    <Content>
                        <Row >
                            <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0} style={{textAlign:"center"}}>
                                <Dropdown>
                                    <Button> دسته‌بندی‌ها</Button>
                                </Dropdown>
                            </Col>
                            <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4} style={{textAlign:"center"}}>
                                <Space direction="vertical" size={1}>
                                    <p style={{textAlign:"center", marginTop:"5px"}}><b>دسته بندی‌ها</b></p>
                                    <Button onClick={this.filter.bind(this, 1)} style={{border:"hidden"}} icon={<UserAddOutlined />}>مدارک و مستندات</Button><br/>
                                    <Button onClick={this.filter.bind(this, 2)} style={{border:"hidden"}} icon={<UserAddOutlined />}>لوازم الکتریکی</Button><br/>
                                    <Button onClick={this.filter.bind(this, 3)} style={{border:"hidden"}} icon={<UserAddOutlined />}>قطعات صنعتی</Button><br/>
                                    <Button onClick={this.filter.bind(this, 4)} style={{border:"hidden"}} icon={<UserAddOutlined />}>کفش و پوشاک</Button><br/>
                                    <Button onClick={this.filter.bind(this, 5)} style={{border:"hidden"}} icon={<UserAddOutlined />}>کتاب و مجله</Button><br/>
                                </Space>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20} style={{marginTop:"100px"}} >
                                <Row style={{display:"flex", justifyContent:"center"}}>
                                {this.props.children}
                                </Row>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default OrdersLayout;