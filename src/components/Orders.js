import React from 'react';
import { List, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import billigpost from '../media/billigpost.png';
import OfferListModal from '../components/OfferListModal';
import OfferInListView from '../components/OfferInListView';
import DownloadPic from './DownloadPic';

const style_right = {display:"flex", justifyContent:"right"};
const style_left = {display:"flex", justifyContent:"left"};
const style_center = {display:"flex", justifyContent:"center"};

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
        gutter: 20,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 3,
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
            borderRadius:"10px", 
            margin:"15px 15px 15px 15px", 
            padding:"10px 10px 10px 30px",
            }}>
             
              <Col xs={22} sm={22} md={22} lg={22} xl={14} xxl={14} >
                {/* <List.Item
                  key={item.title}
                  >
                  <List.Item.Meta
                    title={<Link to={'/' + item.slug}><h4>{item.title}</h4></Link>}
                  />
                    <OfferInListView data={item}/>
                </List.Item> */}
                <List.Item>
                  <Card bordered={false} title={item.title}>
                  <Row style={style_right}>
                                <Col style={style_right} xs={24} sm={24} md={24} lg={24} xl={24} >
                                    <h4></h4>
                                </Col>
                                <Col style={style_left} xs={24} sm={24} md={24} lg={24} xl={24}>
                                    
                                </Col>
                            </Row>
                  </Card>
                </List.Item>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
              <Col xs={22} sm={22} md={22} lg={22} xl={8} xxl={8} >
                <div style={style_center}>
                  <DownloadPic data={item.picture} size={120}/>
                </div>
              </Col>
          </Row>
        )}
      />   
    )
  }
}

export default Orders;

