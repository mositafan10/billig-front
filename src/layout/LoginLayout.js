import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import HeaderSection from '../containers/HeaderSection';
import login from '../media/login.svg';

const { Header, Content } = Layout;


class LoginLayout extends Component {
    render() {
        return (
            <div style={{fontFamily:"VazirD", backgroundColor:"white", overflow:"hidden"}}>
                <Layout style={{backgroundColor:"white"}}>
                    <Header style={{backgroundColor:"white", padding:"0", height:"auto"}}>
                        <HeaderSection {...this.props}/>
                    </Header>
                    <Content>
                        <Row style={{overflow:"hidden"}}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} style={{textAlign:"center", marginTop:"40px"}}>
                            <img
                                alt = "billlig.com"
                                src = {login}
                                style={{width:"70%", height:"auto", marginTop:"50px"}}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} style={{display:"flex", justifyContent:"center", alignItems:"center"}}  > 
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

export default LoginLayout;