import React from 'react';
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import { Link, withRouter, Redirect} from 'react-router-dom';
import billigpost from '../media/billigpost.png';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {

  state = {
    toDashboard : false,
    user:""
  }
  
  onClick = () => {
     this.props.logout()
     this.setState({
       toDashboard: true
     })
  }

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
            <div className="logo">
            <img style={{float:"right", marginTop:"5px"}}
            width={60}
            alt="logo"
            src={billigpost}
          />          
            </div>
            <div style={{float:"right", margin:"5px 10px"}}>{}به بیلیگ پست خوش آمدید</div>
            <Menu theme="light" mode="horizontal" >
            {
            this.props.isAuthenticated ?
              <Menu.Item key="5" onClick={this.onClick}>خروج</Menu.Item>
              :
              <Menu.Item key="4"><Link to='/login'>ورود / ثبت نام</Link> </Menu.Item>
            }
              <Menu.Item key="1"><Link to='/'>لیست آگهی‌ها</Link></Menu.Item>
              <Menu.Item key="3"><Link to='/packet'>ثبت رایگان آگهی</Link> </Menu.Item>
              <Menu.Item key="6"><Link to='/social'>شبکه اطلاع‌رسانی</Link></Menu.Item>
              <Menu.Item key="7"><Link >درباره ما</Link></Menu.Item>
            {
            this.props.isAuthenticated ?
              <Menu.Item key="2"><Link to='/profile'>پروفایل من</Link></Menu.Item>
              :
              <Menu.Item key="2"><Link></Link></Menu.Item>
            }
            </Menu>
          </Header>
          <Content style={{ padding:"100px 200px 200px 200px" }}>
                <Breadcrumb style={{ margin: '25px 0' }}>
                  {/* <Breadcrumb.Item><Link to='/'>خانه</Link></Breadcrumb.Item>
                  <Breadcrumb.Item><Link to='/'>آگهی‌ها</Link></Breadcrumb.Item> */}
                </Breadcrumb>
                <div className="site-layout-content">
                  {this.props.children}
                </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <b>بیلیگ پست ، پلتفرم ارسال بسته</b>
            {/* <Row>
              <Col >
                <a style={{display:"flex", justifyContent:"right", float:"right"}}>سوالات متداول</a>
              </Col>
            </Row> */}
            </Footer>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));



