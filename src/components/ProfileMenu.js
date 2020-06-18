import React from 'react';
import { Tabs } from 'antd';
import PacketUserList from '../components/ListInProfile';
import CreateTravel from './CreateTravel';
import TravelList from '../components/TravelUser';

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
            <CreateTravel/>
            <TravelList/>
          </TabPane>
          <TabPane tab="نظرات دیگران" key="3">
            نظرات دیگران
          </TabPane>
          <TabPane tab="صندوق پیام" key="4">
           پیام ها
          </TabPane>
          <TabPane tab="تنظیمات" key="5">
              <Tabs tabPosition="right" style={{textAlign:"center"}} >
              <TabPane tab="ویرایش پروفایل" key="1">
                <li>عکس پروفایل</li>
                <li>ایمیل</li>
                <li>بیو</li>
                <li>لینک شبکه‌های اجتماعی</li>
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ProfileMenu;