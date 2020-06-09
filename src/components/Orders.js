import React, { lazy } from 'react';

import { List, Avatar, Space, Col, Row } from 'antd';
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
    // bordered
    // loading={true}
    // loadMore={true}
    size={"small"}
    grid={{ gutter: 24, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4,}}
    dataSource={props.data}
    footer={<div></div>}
    itemLayout={"vertical"}
    renderItem={item => (
      
        <List.Item style={{border:"solid",borderRadius:"5px",boxShadow:"0 0 5px 1px"}}
         
          key={item.title}
          actions={[
              // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          ]}
          extra={
            <div>{item.suggested_price}</div>,
            <img style={{float:"center"},{marginLeft:"28%"}}
              width={70}
              // alt="logo"
              src={billigpost}
            />
          }
        >
        <List.Item.Meta 
          style = {{textAlign:"center"}}
          title = {<a href={`/${item.id}`}><b>{item.title}</b></a>}
          description = {item.origin_country}
        />  
      </List.Item>
      
    )}

    />
    )
}
export default Orders;

