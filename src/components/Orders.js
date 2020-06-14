import React from 'react';

import { List, Avatar, Space, Button, Modal, Form, Input } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import billigpost from '../media/billigpost.png';
import Axios from 'axios';

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
  
  state = {
    visible: false,
    price: ""
  }

  offer = () => {
    {this.showModal()}
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = values => {
    this.setState({
      visible: false,
      price: values.otp,
    });

    const price = this.state.price;

    console.log("Hi:", price, this.state.flight_date)
  //   Axios.post('http://127.0.0.1:8000/api/v1/advertise/offer/', {
  //           price: this.state.price,
  //           flight_date: this.state.flight_date,
  //           packet: '1'
  //       })
  //       .then(res => console.log(res))
  //       .catch(error => console.error(error));
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

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
              <div style={{display:'flex', justifyContent:'left'}}>
              <Button onClick={this.offer}> ثبت پیشنهاد </Button>
              </div>,
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
}

export default Orders;

