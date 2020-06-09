import React from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class ProfileMenu extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" style={{textAlign:"center"}}>
        <Menu.Item key="mail" icon={<MailOutlined />}>
          لیست آگهی‌ها
        </Menu.Item>
        <Menu.Item key="app" icon={<AppstoreOutlined />}>
          لیست سفرها
        </Menu.Item>
        <Menu.Item icon={<SettingOutlined />}>
        نظرات دیگران
        </Menu.Item>
      </Menu>
    );
  }
}

export default ProfileMenu;