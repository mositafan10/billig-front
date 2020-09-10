import React from 'react';
import { Layout, Menu, Row, Col, Button } from 'antd';
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
      <div style={{fontFamily:"IRANSans"}}>
      <Layout style={{backgroundColor:'white'}}>
        <Layout style={{backgroundColor:'white'}} className="site-layout">
          <Header style={{backgroundColor:'white', margin:"10px"}} className="site-layout-background">
            <HeaderSection {...this.props}/>
          </Header>
        </Layout>
        <Layout>
          <Content style={{backgroundColor:'white', textAlign:"center", padding:"30px 0"}}>
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
          <Sider  width={250} trigger={null} style={{backgroundColor:'white', padding:"20px", }}>
            <div style={{position:"fixed"}}>
              <Menu
                mode="inline"
                theme="light"
                style={{textAlign:"right" }}
                >
                <Menu.Item key="1" >
                  <Link to='/profile/mypacket'> آگهی‌های من </Link> <ShoppingOutlined />
                </Menu.Item>
                <Menu.Item key="2">
                <Link to='/profile/mytravel'> سفرهای من </Link> <AimOutlined />
                </Menu.Item>
                <Menu.Item key="3" >
                <Link to='/profile/myoffer'> پیشنهاد من </Link> <ContainerOutlined />
                </Menu.Item>
                <Menu.Item key="4" >
                  <Link to='/profile/editprofile'>ویرایش پروفایل</Link> <ContainerOutlined />
                </Menu.Item>
                <Menu.Item key="5" >
                  <Link to='/profile/inbox'> صندوق پیام </Link> <CommentOutlined />
                </Menu.Item>
                <Menu.Item key="6" >
                  <Link to='/profile/payment' >پرداخت </Link> <DollarCircleOutlined />
                </Menu.Item>
                <Menu.Item key="7" >
                  <Link to='/profile/bookmark' >آگهی‌های نشان شده </Link> <HeartOutlined />
                </Menu.Item>
              </Menu>
            </div>
          </Sider>
        </Layout>
      </Layout>
      </div>
    );
  }
}

export default ProfileLayout;

