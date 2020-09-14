import React from 'react';
import { Layout, Menu, Row, Col, Button, Divider } from 'antd';
import {
  ContainerOutlined,
  CommentOutlined,
  DollarCircleOutlined,
  ShoppingOutlined,
  HeartOutlined,
  AimOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import HeaderSection from '../containers/HeaderSection';

const { Header, Sider, Content, Footer } = Layout;

class ProfileLayout extends React.Component {

  render() {
    return (
      <div style={{fontFamily:"VazirD", overflow:"hidden"}}>
        <Layout style={{backgroundColor:"white"}}>
          <Header style={{backgroundColor:'white', padding:"0", height:"auto"}} >
            <HeaderSection {...this.props}/>
          </Header>
          <Divider style={{opacity:"0"}}/>
        
          <Content style={{backgroundColor:'white', textAlign:"center"}}>
              <Row>
                <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}></Col>
                <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
                  <div className="site-layout-content">
                    {this.props.children}
                  </div>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}></Col>
              </Row>
            </Content>
      </Layout>
      </div>
    );
  }
}

export default ProfileLayout;

