import React from 'react';   
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class Sider extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub2'],
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 256}}
      >
        <SubMenu key="sub2" title={
            <span>
              {/* <MailOutlined /> */}
              <span style={{float:"right"}}>آگهی‌های خرید</span>
            </span>
          }>
          <Menu.Item key="2"><span style={{float:"right"}}> لوازم الکترونیکی </span></Menu.Item>
          <Menu.Item key="3"><span style={{float:"right"}}> کتاب و مجلات </span></Menu.Item>
          <Menu.Item key="4"><span style={{float:"right"}}> کفش و پوشاک </span></Menu.Item>
          <Menu.Item key="5"><span style={{float:"right"}}> دارو </span></Menu.Item>
          <Menu.Item key="6"><span style={{float:"right"}}> سایر موارد </span></Menu.Item>
          {/* <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item> */}
          {/* <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu> */}
        </SubMenu>
        <SubMenu
          key="sub1"
          title={
            <span>
              {/* <MailOutlined /> */}
              <span style={{float:"right"}}>آگهی‌های پستی</span>
            </span>
          }
        >
          <Menu.Item key="1"><span style={{float:"right"}}> مدارک - </span></Menu.Item>
          <Menu.Item key="2"><span style={{float:"right"}}> کتاب -</span></Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default Sider;