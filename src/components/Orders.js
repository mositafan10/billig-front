import React from 'react';

import { List,  Space, Row, Col } from 'antd';
import billigpost from '../media/billigpost.png';
import OfferListModal from '../components/OfferListModal';
import OfferInListView from '../components/OfferInListView';
import Axios from 'axios';
import DownloadPic from './DownloadPic';


class Orders extends React.Component {

  state = {
    offerModal: false,
    url: ""
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
        gutter: 15,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
        itemLayout="vertical"
        size="small"
        style={{fontSize:"13px", 
        // paddingLeft:"130px"
      }}
        locale={{emptyText:"آگهی وجود ندارد"}}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          total: this.props.page,
          pageSize: this.props.pagesize,
          hideOnSinglePage:true,
          simple:true,
          hide:true
        }}
        dataSource={this.props.data}
        renderItem={item => (
            <Row
            style={{
            boxShadow:"0 0 10px 1px",
            margin:"15px 15px 15px 15px", 
            borderRadius:"10px", 
            padding:"0 20px 0 100px",
            }}>
            <Row>
              <Col span={8} border="true" style={{textAlign:"right"}}>
                <DownloadPic data={item.picture} size={120}/>
              </Col>
            <Col span={16} >
              <List.Item style={{textAlign:"right"}}
                key={item.title}
                actions={[
                  <OfferInListView data={item}/>
                ]}
                >
                <List.Item.Meta
                  // avatar={<a  href={'/users/' + item.owner} > <Avatar src={item.avatar} /></a>}
                  title={<a href={item.slug}>{item.title}</a>}
                />
                {/* <h4> مشخصات بسته</h4>
                {item.origin_country} ({item.origin_city}) <span> به </span>{item.destination_country}  ({item.destination_city})<br/>
                <span> وزن حدودی </span> 
                {item.weight}  <span> کیلوگرم </span> <br/>
                <span> تومان </span>   */}
                <Row style={{display:"flex", justifyContent:"right" }}>
                    <Col style={{display:"flex", justifyContent:"right"}} span={5} >
                    <span>تومان</span><span style={{marginLeft:"5px"}}>{item.suggested_price}</span>
                    </Col>
                </Row>
              </List.Item>
            </Col>
            </Row>
          </Row>
        )}
      />   
    )
  }
}

export default Orders;

