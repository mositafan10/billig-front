import React from 'react';
import { Tabs, Button } from 'antd';
import PacketUserList from '../components/ListInProfile';
import CreateTravel from './CreateTravel';
import TravelList from '../components/TravelUser';
import FriendList from '../components/FriendList';
import EditProfile from '../components/EditProfile';
import UserOffer from '../components/Useroffer';
import InboxLayout from '../containers/InboxLayout';
import Bookmark_packet from './Bookmark_packet';
import { MailOutlined, BookOutlined, DollarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ChangePassword from './ChangePassword';

const { TabPane } = Tabs;

class ProfileMenu extends React.Component {


  render() {
    return (
      <div>
        <Tabs tabPosition="right" style={{textAlign:"center"}} >
          <TabPane style={{textAlign:"left"}} tab=" آگهی‌های من" key="1">
            <PacketUserList />
            <div style={{textAlign:"center"}}>
            <Link to="/createpacket"><Button style={{borderRadius:"10px"}}>ثبت آگهی جدید</Button></Link>
            </div>
          </TabPane>
          <TabPane tab=" سفرهای من" key="2">
            <TravelList/>
            <CreateTravel/>
          </TabPane>
          <TabPane tab="نظرات دیگران" key="3">
            نظرات
          </TabPane>
          <TabPane tab={<span><DollarOutlined style={{fontSize:"16px"}} />پرداخت‌های من</span>} key="4">
              پرداخت‌ها
          </TabPane>
          <TabPane tab={<span><BookOutlined style={{fontSize:"16px"}} />آگهی‌های نشان‌شده</span>} key="5">
              <Bookmark_packet />
          </TabPane>
          <TabPane tab="پیشنهادهای من" key="6">
            <UserOffer />
          </TabPane>
          <TabPane key="7" tab={ <span><MailOutlined style={{fontSize:"16px"}}/> صندوق پیام</span>}>
            <InboxLayout />
          </TabPane>
          <TabPane tab="ویرایش پروفایل" key="10">
                <EditProfile />
          </TabPane>
          <TabPane tab="تغییر رمز عبور" key="9">
                <ChangePassword />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ProfileMenu;