import React from 'react';
import { Layout, Menu, Row, Col, Button, Dropdown } from 'antd';
import { Link, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import FooterSection from './FooterSection';
import HeaderSection from './HeaderSection';

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
                <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}></Col>
                <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
                  <div className="site-layout-content">
                    {this.props.children}
                  </div>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}></Col>
              </Row>
          </Content>
          <Footer style={{ textAlign: 'right', backgroundColor:"aliceblue" }}>
            <FooterSection />  
          </Footer>
        </Layout>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//       logout: () => dispatch(actions.logout())
//   }
// }

// export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));

export default CustomLayout;

