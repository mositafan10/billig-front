import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Button, Dropdown, Menu, Row, Col, Badge } from 'antd';
import logo from '../media/logo.svg';
import { UserOutlined, MenuOutlined, BellOutlined } from '@ant-design/icons';


class HeaderMobile extends Component {

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
                        <div style={{float:"left", margin:"5px 0 0 20px", width:"200px", display:"flex"}}>
                            <div style={{borderRadius:"25px", borderColor:"aliceblue" ,border:"solid", borderWidth:"1px", height:"45px", width:"100px", marginTop:"10px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <Dropdown overlay={this.menu_login} trigger={['click']}>
                                    <div>
                                        <Button 
                                            icon={<MenuOutlined />}
                                            style={{border:"hidden",color:"black", borderRadius:"15px", }}>
                                        </Button>
                                        <Button 
                                            icon={<UserOutlined/>}
                                            // icon={<Avatar src = {`http://127.0.0.1/dstatic/media/${this.state.user_profile.picture}`} />} 
                                            style={{ borderRadius:"15px"}}>
                                        </Button>
                                    </div>
                                </Dropdown>
                            </div>
                            <div>
                                <Badge dot={true}>
                                    <Button 
                                        icon={<BellOutlined />}
                                        style={{border:"hidden",border:"1px solid" ,borderRadius:"15px", marginLeft:"10px"}}>
                                    </Button>
                                </Badge>
                                </div>
                        </div>
                        :
                        <div style={{float:"left", margin:"5px 0 0 20px", width:"200px", display:"flex"}}>
                        <div style={{borderRadius:"25px", borderColor:"aliceblue" ,border:"solid", borderWidth:"1px", height:"45px", width:"100px", marginTop:"10px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <Dropdown overlay={this.menu_logout} trigger={['click']}>
                                    <div>
                                        <Button 
                                            icon={<MenuOutlined />}
                                            style={{border:"hidden",color:"black", borderRadius:"15px", }}>
                                        </Button>
                                        <Button 
                                            icon={<UserOutlined/>}
                                            // icon={<Avatar src = {`http://127.0.0.1/dstatic/media/${this.state.user_profile.picture}`} />} 
                                            style={{ borderRadius:"15px"}}>
                                        </Button>
                                    </div>
                                </Dropdown>
                            </div>
                        </div>
                        }
                        <Row style={{marginTop:"5px"}}>
                            <Col xs={0} sm={24} md={20} lg={20} xl={20} xxl={20}>
                            <Menu mode="horizontal" >
                                <Menu.Item key="1"><Link to='/createpacket'><b>ثبت رایگان آگهی</b></Link></Menu.Item>
                                <Menu.Item key="2"><Link to='/orders'><b>کسب درآمد از سفر</b></Link></Menu.Item>
                            </Menu>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={0} sm={0} md={4} lg={4} xl={4} xxl={4}>
                        <Link to="/">
                        <img style={{float:"right", margin:"5px 8px 5px"}}
                        width={40}  
                        alt="billlig"
                        src={logo}
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

export default withRouter(connect(null, mapDispatchToProps)(HeaderMobile    ));
