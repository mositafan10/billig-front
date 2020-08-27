import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Button, Dropdown, Menu } from 'antd';
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
          <Menu.Item key="1">آگهی‌های من</Menu.Item>
          <Menu.Item key="2">صندوق پیام</Menu.Item>
          <Menu.Item key="3" onClick={this.onClick}>خروج</Menu.Item>
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
                {/* logo */}
                <Link to="/">
                <img style={{float:"right", marginTop:"5px"}}
                width={60}  
                alt="logo"
                src={billigpost}
                />    
                </Link>
                {this.props.isAuthenticated ?
                <div style={{float:"left", margin:"5px 10px"}}>
                    <Dropdown overlay={this.menu_login} trigger={['click']}>
                    <Button 
                        icon={<MenuOutlined />}
                        // icon={<Avatar src = {`http://127.0.0.1/dstatic/media/${this.state.user_profile.picture}`} />} 
                        style={{border:"hidden", color:"white",color:"black", borderRadius:"15px"}}>
                    </Button>
                    </Dropdown>
                    <Dropdown overlay={this.menu_login} trigger={['click']}>
                    <Button 
                        icon={<UserOutlined />}
                        // icon={<Avatar src = {`http://127.0.0.1/dstatic/media/${this.state.user_profile.picture}`} />} 
                        style={{border:"hidden", color:"white", backgroundColor:"#46a0ae", borderRadius:"15px"}}>
                    </Button>
                    </Dropdown>
                    
                </div>
                :
                <div style={{float:"left", margin:"5px 10px"}}>
                    <Dropdown overlay={this.menu_logout} trigger={['click']}>
                    <Button icon={<UserOutlined />} style={{border:"hidden", color:"white", backgroundColor:"#46a0ae", borderRadius:"15px"}}></Button>
                    </Dropdown>
                </div>
                }
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
