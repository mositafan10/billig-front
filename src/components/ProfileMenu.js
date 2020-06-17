import React from 'react';
import { Tabs } from 'antd';
import PacketUserList from '../components/ListInProfile';

const { TabPane } = Tabs;

class ProfileMenu extends React.Component {

  render() {
    return (
      <div>
        {/* <Space style={{ marginBottom: 16 }}>
        </Space> */}
        <Tabs tabPosition="top" style={{textAlign:"center"}} >
          <TabPane style={{textAlign:"left"}} tab="لیست آگهی‌های من" key="1">
            <PacketUserList />
          </TabPane>
          <TabPane tab="لیست سفرهای من" key="2">
            Content of Tab 2
          </TabPane>
          <TabPane tab="نظرات دیگران" key="3">
            Content of Tab 3
          </TabPane>
          <TabPane tab="صندوق پیام" key="4">
            Content of Tab 4
          </TabPane>
          <TabPane tab="تنظیمات" key="5">
            Content of Tab 5
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ProfileMenu;