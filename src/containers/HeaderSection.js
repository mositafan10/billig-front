import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Button, Dropdown, Menu, Row, Col } from 'antd';
import billigpost from '../media/billigpost.png';
import { UserOutlined, MenuOutlined} from '@ant-design/icons';


class HeaderSection extends Component {

    state = {
        toDashboard : false,
        user:"",
        user_profile:{}
    }
      
    onClick = () => {
        console.log("logout")
        this.props.logout();
        this.setState({
        toDashboard: true
        })
    }

    menu_login = (
        <Menu >
          <Menu.Item key="1"><Link to='/profile'>پروفایل من</Link></Menu.Item>
          <Menu.Item key="2">صندوق پیام</Menu.Item>
          <Menu.Item key="3">ثبت آگهی</Menu.Item>
          <Menu.Item key="4">ثبت سفر</Menu.Item>
          <Menu.Item key="5" onClick={this.onClick}>خروج</Menu.Item>
        </Menu>
    );
      
    menu_logout = (
        <Menu >
        <Menu.Item key="1"><Link to='/login'>ورود</Link></Menu.Item>
        <Menu.Item key="2"><Link to='/signup'>ثبت نام</Link></Menu.Item>
      </Menu>
    );
    

    render() {
        if (this.state.toDashboard){
            this.setState({
              toDashboard: false,
            })
            return <Redirect to='/login'/>
        }
        return (
            <div>
                <Row>
                    <Col xs={24} sm={24} md={20} lg={20} xl={20} xxl={20}>
                        {this.props.isAuthenticated ?
                        <div style={{float:"left", margin:"5px 10px"}}>
                            <Dropdown overlay={this.menu_login} trigger={['click']}>
                            <Button 
                                icon={<MenuOutlined />}
                                // icon={<Avatar src = {`http://127.0.0.1/dstatic/media/${this.state.user_profile.picture}`} />} 
                                style={{border:"hidden", color:"white",color:"black", borderRadius:"15px"}}>
                            </Button>
                            </Dropdown>
                            <Button 
                                icon={<UserOutlined />}
                                // icon={<Avatar src = {`http://127.0.0.1/dstatic/media/${this.state.user_profile.picture}`} />} 
                                style={{border:"hidden", color:"white", backgroundColor:"#46a0ae", borderRadius:"15px"}}>
                            </Button>
                        </div>
                        :
                        <div style={{float:"left", margin:"5px 10px"}}>
                            <Dropdown overlay={this.menu_logout} trigger={['click']}>
                            <Button icon={<UserOutlined />} style={{border:"hidden", color:"white", backgroundColor:"#46a0ae", borderRadius:"15px"}}></Button>
                            </Dropdown>
                        </div>
                        }
                        <Row>
                            <Col xs={0} sm={24} md={20} lg={20} xl={20} xxl={20}>
                                <div style={{float:"left", margin:"5px 10px"}}>
                                    <Link to='/createpacket'>
                                        <Button style={{border:"hidden", color:"white", backgroundColor:"#46a0ae", borderRadius:"15px"}}><b>ثبت رایگان آگهی</b></Button>
                                    </Link>
                                </div>
                                <div style={{float:"left", margin:"5px 10px"}}>
                                    <Link to='/profile'>
                                        <Button style={{border:"hidden", color:"white", backgroundColor:"#46a0ae", borderRadius:"15px"}}><b>کسب درآمد از سفر</b></Button>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={0} sm={0} md={4} lg={4} xl={4} xxl={4}>
                        <Link to="/">
                        <img style={{float:"right", marginTop:"5px"}}
                        width={60}  
                        alt="logo"
                        src={billigpost}
                        />    
                        </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
  }

export default withRouter(connect(null, mapDispatchToProps)(HeaderSection));
