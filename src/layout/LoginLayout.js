import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import HeaderSection from '../containers/HeaderSection';
import login from '../media/login.svg';

const { Header, Content, Footer } = Layout;


class LoginLayout extends Component {
    render() {
        return (
            <div style={{fontFamily:"IRANSans", backgroundColor:"white"}}>
                <Layout style={{backgroundColor:"white"}}>
                    <Header style={{backgroundColor:"white"}}>
                        <HeaderSection {...this.props}/>
                    </Header>
                    <Content>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} style={{textAlign:"center"}}>
                            <img
                                alt = "billlig.com"
                                src = {login}
                                style={{width:"70%", height:"auto", margin:"80px"}}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} style={{marginTop:"100px"}} >
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