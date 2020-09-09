import React from 'react';
import { Tabs, Row, Col } from 'antd';
import { BookOutlined, DollarOutlined, MailOutlined, } from '@ant-design/icons';
import PacketUserList from '../packet/ListInProfile';
import EditProfile from './EditProfile';
import UserOffer from '../offer/Useroffer';
import InboxLayout from '../../containers/InboxLayout';
import BookmarkPacket from '../packet/BookmarkPacket';
import ChangePassword from './ChangePassword';
import TravelProfile from '../../containers/TravelProfile';
import TransactionList from '../payment/TransactionList';

const { TabPane } = Tabs;

class ProfileMenu extends React.Component {

  state = {
    visible: true,
    mode:"",
    key: ""
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
          <Col xs={0} sm={0} md={24} lg={24} xl={24} xxl={24}>
            <Tabs tabPosition="right" style={{textAlign:"center"}} >
              <TabPane style={{textAlign:"left"}} tab=" آگهی‌های من" key="1" >
                <PacketUserList />
              </TabPane>
                <TabPane tab=" سفرهای من" key="2" >
                  <TravelProfile />
                </TabPane>
              <TabPane tab="پیشنهادهای من" key="3">
                <UserOffer/>
              </TabPane>
              <TabPane tab="نظرات دیگران" key="4">
                نظرات
              </TabPane>
              <TabPane tab={<span><DollarOutlined style={{fontSize:"16px"}} />پرداخت‌های من</span>} key="5">
                <TransactionList />
              </TabPane>
              <TabPane tab={<span><BookOutlined style={{fontSize:"16px"}} />آگهی‌های نشان‌شده</span>} key="6">
                  <BookmarkPacket />
              </TabPane>
              <TabPane key="7" tab={ <span><MailOutlined style={{fontSize:"16px"}}/> صندوق پیام</span>}>
                <InboxLayout />
              </TabPane>
              <TabPane tab="ویرایش پروفایل" key="8">
                    <EditProfile />
              </TabPane>
              <TabPane tab="تغییر رمز عبور" key="9">
                    <ChangePassword />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProfileMenu;