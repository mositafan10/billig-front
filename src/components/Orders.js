import React, { lazy } from 'react';

import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import billigpost from '../media/billigpost.png';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


const Orders = (props) => {
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
  dataSource={props.data}
  
  renderItem={item => (
    <List.Item style={{textAlign:"right"}}
      key={item.title}
      actions={[
        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
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
        avatar={<Avatar src={item.avatar} />}
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
export default Orders;

