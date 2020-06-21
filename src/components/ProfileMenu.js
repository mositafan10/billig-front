import React from 'react';
import { Tabs } from 'antd';
import PacketUserList from '../components/ListInProfile';
import CreateTravel from './CreateTravel';
import TravelList from '../components/TravelUser';
import UploadProfilePic from './ProfileEdit';
import FriendList from '../components/FriendList';

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
            <TravelList/>
            <CreateTravel/>
          </TabPane>
          <TabPane tab="نظرات" key="3">
            نظرات
          </TabPane>
          <TabPane tab="صندوق پیام" key="4">
           پیام ها
          </TabPane>
          <TabPane tab="دوستان من" key="5">
           <FriendList />
          </TabPane>
          <TabPane tab="تنظیمات" key="6">
              <Tabs tabPosition="right" style={{textAlign:"center"}} >
              <TabPane tab="ویرایش پروفایل" key="1">
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