import React from 'react';
import { Layout, Menu, Breadcrumb, Row, Col  } from 'antd';
import { Link, withRouter} from 'react-router-dom';
import billigpost from '../media/billigpost.png';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import Sider from '../components/LandingPageSidebar';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
  render() {
    return(
        <Layout className="layout" style={{backgroundColor:'white'}}>
          <Header >
            <div className="logo">
            <img style={{float:"right"}}
            width={60}
            alt="logo"
            src={billigpost}
          />          
            </div>
            <Menu theme="dark" mode="horizontal" >
            {
            this.props.isAuthenticated ?

              <Menu.Item key="5" onClick={this.props.logout}>خروج</Menu.Item>
              :
              <Menu.Item key="4"><Link to='/login'>ورود / ثبت نام</Link> </Menu.Item>
            }
              <Menu.Item key="1"><Link to='/'>لیست آگهی‌ها</Link></Menu.Item>
              <Menu.Item key="2"><Link to='/profile'>پروفایل من</Link></Menu.Item>
              <Menu.Item key="3"><Link to='/packet'>ثبت رایگان آگهی</Link> </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '20px 20px 20px 20px' }}>
            <Row>
            </Row>
            <Row>
              <Col span={20}>
                <Breadcrumb style={{ margin: '25px 0' }}>
                  {/* <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                  <Breadcrumb.Item><Link to='/'>List</Link></Breadcrumb.Item> */}
                </Breadcrumb>
                <div className="site-layout-content">
                  {this.props.children}
                </div>
              </Col>
              <Col span={8} > 
                  <Sider/>
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: 'center' }}><b>Billigpost</b></Footer>
        </Layout>
    );
}
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));



