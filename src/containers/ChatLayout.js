import React from 'react';
import { Layout, Menu, Breadcrumb, Tabs } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { TabPane } = Tabs;

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class ChatLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor:"white" }}>
        <Sider  collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
          </Menu> */}
        </Sider>
        <Layout>
          <Header style={{ padding: 0, }} />
          <Content style={{ margin: '0 0px', backgroundColor:"white" }}>
          </Content>
          <Footer style={{ textAlign: 'center', backgroundColor:"white" }}></Footer>
        </Layout>
      </Layout>
    );
  }
}

export default ChatLayout;