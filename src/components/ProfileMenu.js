import React from 'react';
import { Tabs, Button, Row, Col } from 'antd';
import PacketUserList from '../components/ListInProfile';
import CreateTravel from './CreateTravel';
import TravelList from '../components/TravelUser';
import UploadProfilePic from './ProfileEdit';
import FriendList from '../components/FriendList';
import EditProfile from '../components/EditProfile';
import UserOffer from '../components/Useroffer';
import InboxLayout from '../containers/InboxLayout';
import Bookmark_packet from './Bookmark_packet';

const { TabPane } = Tabs;

class ProfileMenu extends React.Component {

  render() {
    return (
      <div>
        {/* <Space style={{ marginBottom: 16 }}>
        </Space> */}
        <Tabs tabPosition="right" style={{textAlign:"center"}} >
          <TabPane style={{textAlign:"left"}} tab=" آگهی‌های من" key="1">
            <PacketUserList />
            <div style={{textAlign:"center"}}>
              <Button href={'/packet'} style={{borderRadius:"10px"}}>ثبت آگهی جدید</Button>
            </div>
          </TabPane>
          <TabPane tab=" سفرهای من" key="2">
            <TravelList/>
            <CreateTravel/>
          </TabPane>
          <TabPane tab="نظرات دیگران" key="3">
            نظرات
          </TabPane>
          {/* <TabPane tab="دوستان من" key="5">
            <FriendList />
          </TabPane> */}
          <TabPane tab="پرداخت‌های من" key="6">
              پرداخت‌ها
          </TabPane>
          <TabPane tab="آگهی‌های نشان‌شده" key="10">
              <Bookmark_packet />
          </TabPane>
          <TabPane tab="پیشنهادهای من" key="9">
            <UserOffer />
          </TabPane>
          <TabPane tab="صندوق پیام" key="4">
            <InboxLayout />
          </TabPane>
          {/* <TabPane tab="پشتیبانی" key="8">
              پشتیبانی
          </TabPane> */}
          <TabPane tab=" تنظیمات پروفایل" key="7">
              <Tabs tabPosition="right" style={{textAlign:"center"}} >
              <TabPane tab="ویرایش پروفایل" key="1">
                <EditProfile />
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ProfileMenu;