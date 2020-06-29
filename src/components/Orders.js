import React from 'react';

import { List,  Space, Row, Col } from 'antd';
import billigpost from '../media/billigpost.png';
import OfferListModal from '../components/OfferListModal';
import OfferInListView from '../components/OfferInListView';


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
        gutter: 12,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
        itemLayout="vertical"
        size="small"
        style={{fontSize:"13px"}}
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
            margin:"15px 15px 15px 15px", 
            borderRadius:"10px",
            paddingTop:"8px",
            }}>
            <Col width="60%" border="true" style={{textAlign:"right"}}>
              <img
                    width={150}
                    // alt="عکس آگهی"
                    // src={billigpost}
                    style={{verticalAlign:"middle"}}
                  />
            </Col>
            <Col width="40%" >
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

