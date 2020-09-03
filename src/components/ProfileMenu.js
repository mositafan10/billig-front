import React from 'react';
import PacketUserList from '../components/ListInProfile';
import ChangePassword_mobile from './ChangePassword_mobile';
import EditProfile from '../components/EditProfile';
import UserOffer from '../components/Useroffer';
import InboxLayout from '../containers/InboxLayout';
import Bookmark_packet from './Bookmark_packet';
import ChangePassword from './ChangePassword';
import { Tabs, Row, Col } from 'antd';
import { BookOutlined, DollarOutlined, MailOutlined, } from '@ant-design/icons';
import TravelProfile from '../containers/TravelProfile';
import { Link, Route } from 'react-router-dom';

const { TabPane } = Tabs;

class ProfileMenu extends React.Component {

  state = {
    visible: true,
  }


  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Row>

           {/* for desktop */}
          <Col xs={0} sm={0} md={24} lg={24} xl={24} xxl={24}>
            <Tabs tabPosition="right" style={{textAlign:"center"}} >
              <TabPane style={{textAlign:"left"}} tab=" آگهی‌های من" key="1">
                <PacketUserList />
              </TabPane>
                <TabPane tab=" سفرهای من" key="2" >
                  <TravelProfile />
                </TabPane>
              <TabPane tab="پیشنهادهای من" key="6">
                <UserOffer/>
              </TabPane>
              <TabPane tab="نظرات دیگران" key="3">
                نظرات
              </TabPane>
              <TabPane tab={<span><DollarOutlined style={{fontSize:"16px"}} />پرداخت‌های من</span>} key="4">
                پرداخت ها
              </TabPane>
              <TabPane tab={<span><BookOutlined style={{fontSize:"16px"}} />آگهی‌های نشان‌شده</span>} key="5">
                  <Bookmark_packet />
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
          </Col>

          {/* for mobile */}
          <Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0}>
            <Tabs tabPosition="right" style={{textAlign:"center"}} >
              <TabPane style={{textAlign:"left"}} tab=" آگهی‌های من" key="1">
                {/* <PacketUserList_mobile /> */}
              </TabPane>
              <TabPane tab=" سفرهای من" key="2" >
                {/* <TravelList_mobile/>
                <CreateTravel_mobile/> */}
              </TabPane>
              <TabPane tab="نظرات دیگران" key="3">
                نظرات
              </TabPane>
              <TabPane tab={<span><DollarOutlined style={{fontSize:"16px"}} />پرداخت‌های من</span>} key="4">
                پرداخت ها
              </TabPane>
              <TabPane tab={<span><BookOutlined style={{fontSize:"16px"}} />آگهی‌های نشان‌شده</span>} key="5">
                  {/* <Bookmark_packet /> */}
              </TabPane>
              <TabPane tab="پیشنهادهای من" key="6">
                {/* <UserOffer /> */}
              </TabPane>
              <TabPane key="7" tab={ <span><MailOutlined style={{fontSize:"16px"}}/> صندوق پیام</span>}>
                {/* <InboxLayout /> */}
              </TabPane>
              <TabPane tab="ویرایش پروفایل" key="10">
                    {/* <EditProfile /> */}
              </TabPane>
              <TabPane tab="تغییر رمز عبور" key="9">
                    <ChangePassword_mobile />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProfileMenu;