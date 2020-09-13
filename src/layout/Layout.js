import React from 'react';
import { Layout, Row, Col } from 'antd';
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
      <div style={{fontFamily:"IRANSans"}}>
        <Layout className="layout" style={{backgroundColor:'white'}}>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor:"white" }} >
            <HeaderSection {...this.props} />
          </Header>
          <Content>
              <Row style={{marginTop:"100px"}}>
                {/* <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}></Col> */}
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <div className="site-layout-content">
                    {this.props.children}
                  </div>
                </Col>
                {/* <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}></Col> */}
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
