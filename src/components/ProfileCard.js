import React from 'react'; 
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;


class ProfileCard extends React.Component {

  render() {
    return (
        <div >
        <Card
            style={{ width: 300, marginLeft:"41%"}}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                style={{textAlign:"center"}}
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title="BilligMan"
              description="This is the bio of user"
            />
        </Card>,
      </div>
    );
  }
}

export default ProfileCard;