import React from 'react';

import { List, Avatar, Space, Button, Modal, Form, Input } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import billigpost from '../media/billigpost.png';
import OfferDetail from '../components/OfferInDetail';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const IconText1 = ({ icon, text }) => (
  <Space>
    {/* {React.createElement(icon)} */}
    {text}: تعداد پیشنهاد
  </Space>
);


class Orders extends React.Component {

  render(){
    return (
      <List
        // grid={{ gutter: 10, column: 1 }}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={this.props.data}
        renderItem={item => (
          <List.Item style={{textAlign:"right"}}
            key={item.title}
            actions={[
              <OfferDetail data={item.id}></OfferDetail>,
              <IconText1 icon={StarOutlined} onChange text={item.offer_count} key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <img
                width={100}
                alt="logo"
                src={billigpost}
              />
            }
            >
            <List.Item.Meta
              avatar={<a  href={'/users/' + item.owner} > <Avatar src={item.avatar} /></a>}
              title={<a href={item.id}>{item.title}</a>}
              description={item.description}
            />
            <br/>
            <h4> مشخصات بسته</h4>
            {item.origin_country} ({item.origin_city}) <span> به </span>{item.destination_country}  ({item.destination_city})<br/>
            <span> وزن حدودی </span> 
            {item.weight}  <span> کیلوگرم </span> <br/>
            {item.suggested_price}
            <span> تومان </span>  
          </List.Item>
        )}
      />   
    )
  }
}

export default Orders;

