import React from 'react';

import { List, Avatar, Space, Button, Modal, Form, Input, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import billigpost from '../media/billigpost.png';
import OfferListModal from '../components/OfferListModal';
import OfferDetail from '../components/OfferInDetail';
import PacketOfferPublic from '../components/PacketOfferPublic';

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
    offerModal: false
  }

  showOffer = () => {
    this.setState({
      offerModal: true
    })
  }


  handleCancel = () => {
    this.setState({
      offerModal: false,
    });
    };

  render(){
    return (
      <List
      grid={{
        gutter: 10,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
        itemLayout="vertical"
        size="large"
        locale={{emptyText:"آگهی وجود ندارد"}}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 21,
        }}
        dataSource={this.props.data}
        renderItem={item => (
          <Row style={{
            boxShadow:"0 0 10px 1px",
            margin:"6px 6px 6px 6px", 
            paddingTop:"10px",
            borderRadius:"10px"
            }}>
            <Col span={24} border="true" style={{textAlign:"center"}}><img
                    width={90}
                    alt="logo"
                    src={billigpost}
                  />
            </Col>
            <hr width={100} style={{borderWidth:"10"}}/><br/>
            <Col span={24}>
              <List.Item style={{textAlign:"center"}}
                key={item.title}
                actions={[
                  <OfferDetail data={item.slug}></OfferDetail>,
                  <Button 
                  onClick={this.showOffer}
                  style={{border:"hidden"}}
                  >{item.offer_count}
                  </Button>,
                  <IconText1 icon={LikeOutlined}  key="list-vertical-like-o" />,
                  <Modal
                    visible={this.state.offerModal}
                    width='80%'
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    okText="بازگشت"
                    okButtonProps={{textAlign:"center",}}
                    cancelButtonProps={{hidden:"true"}}
                    style={{fontFamily:"IRANSans", overflow:"hidden", borderRadius:"20px"}}
                    >
                    <PacketOfferPublic data={item.slug} />
                  </Modal>,
                  // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                  // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
                // extra={
                //   <img
                //     width={100}
                //     alt="logo"
                //     src={billigpost}
                //   />
                // }
                >
                <List.Item.Meta
                  // avatar={<a  href={'/users/' + item.owner} > <Avatar src={item.avatar} /></a>}
                  title={<a href={item.slug}>{item.title}</a>}
                  description={item.description}
                />
                <h4> مشخصات بسته</h4>
                {item.origin_country} ({item.origin_city}) <span> به </span>{item.destination_country}  ({item.destination_city})<br/>
                <span> وزن حدودی </span> 
                {item.weight}  <span> کیلوگرم </span> <br/>
                <span> قیمت پیشنهادی </span>
                {item.suggested_price} 
                <span> تومان </span>  
              </List.Item>
              </Col>
          </Row>
        )}
      />   
    )
  }
}

export default Orders;

