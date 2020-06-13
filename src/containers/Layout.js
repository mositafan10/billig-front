import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, withRouter, Redirect} from 'react-router-dom';
import billigpost from '../media/billigpost.png';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {

  state = {
    toDashboard : false,
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
          <Header style={{backgroundColor:"white"}} >
            <div className="logo">
            <img style={{float:"right"}}
            width={60}
            alt="logo"
            src={billigpost}
          />          
            </div>
            <Menu theme="light" mode="horizontal" >
            {
            this.props.isAuthenticated ?
              <Menu.Item key="5" onClick={this.onClick}>خروج</Menu.Item>
              :
              <Menu.Item key="4"><Link to='/login'>ورود / ثبت نام</Link> </Menu.Item>
            }
              <Menu.Item key="1"><Link to='/'>لیست آگهی‌ها</Link></Menu.Item>
              <Menu.Item key="3"><Link to='/packet'>ثبت رایگان آگهی</Link> </Menu.Item>
            {
            this.props.isAuthenticated ?
              <Menu.Item key="2"><Link to='/profile'>پروفایل من</Link></Menu.Item>
              :
              <Menu.Item key="2"><Link></Link></Menu.Item>
            }
            </Menu>
          </Header>
          <Content style={{ padding: '20px 20px 20px 20px' }}>
                <Breadcrumb style={{ margin: '25px 0' }}>
                  {/* <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                  <Breadcrumb.Item><Link to='/'>List</Link></Breadcrumb.Item> */}
                </Breadcrumb>
                <div className="site-layout-content">
                  {this.props.children}
                </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}><b>Billigpost</b></Footer>
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



