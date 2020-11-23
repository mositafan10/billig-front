import React from 'react';
import { Layout, Row, Col, Breadcrumb } from 'antd';
import { Redirect } from 'react-router-dom';
import FooterSection from '../containers/FooterSection';
import HeaderSection from '../containers/HeaderSection';

const { Header, Content, Footer } = Layout;


class CustomLayout extends React.Component {

  state = {
    toDashboard : false,
    user:"",
    user_profile:{}
  }

  user = localStorage.getItem('user');

  render() {
    if (this.state.toDashboard){
      this.setState({
        toDashboard: false,
      })
      return <Redirect to='/login'/>
    }
    return(
      <div style={{fontFamily:"VazirD", overflow:"hidden"}}>
        <Layout style={{backgroundColor:'white', height:"auto"}}>
          <Header style={{ position: 'fixed', zIndex: 2, width: '100%', backgroundColor:"white", padding:"0", height:"auto"  }} >
            <HeaderSection {...this.props} />
          </Header>
          <Content style={{margin:"0 15px 0 15px", backgroundColor:"white"}}>
              <Row style={{marginTop:"100px"}}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <div className="site-layout-content">
                    {this.props.children}
                  </div>
                </Col>
              </Row>
          </Content>
          <Footer style={{ textAlign: 'right', backgroundColor:"#edf2f0" }}>
            <FooterSection />  
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default CustomLayout;

