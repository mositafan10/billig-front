import React from 'react';
import { List, Row, Col, Card, Divider } from 'antd';
import { Link } from 'react-router-dom';
import airplane from '../media/airplane.png';
import germany from '../media/Flag-icon/germany.png';
import OfferListModal from '../components/OfferListModal';
import OfferInListView from '../components/OfferInListView';
import DownloadPic from './DownloadPic';
import TimeDiff from './TimeDiff';



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
        // gutter: 50,
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
              padding:"15px 20px 10px 5px",
              width:"350px",
              height:"170px",
              display:"flex",
              justifyContent:"center",
              }}>
              <Col xs={11} sm={11} md={11} lg={11} xl={11} xxl={11}>
                <Row>
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <img src={`http://127.0.0.1/dstatic/${item.origin_country.icon}`} width={50} style={{borderRadius:"5px"}} />
                  </Col>
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <img src={airplane} width={40} style={{marginRight:"5px"}} />
                  </Col>
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <img src={`http://127.0.0.1/dstatic/${item.destination_country.icon}`} width={50} style={{borderRadius:"5px"}}  />
                  </Col>
                </Row>
                <br/>
                <Row style={{height:"80px"}}>
                  <Col>
                    <Link to={'/packet/' + item.slug}><h4>{item.title}</h4></Link>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TimeDiff data={item.create_at} />
                  </Col>
                </Row>
              </Col>
              <Divider type="vertical"/>
              {/* <Col xs={0} sm={0} md={0} lg={2} xl={2} xxl={2}></Col> */}
              <Col xs={11} sm={11} md={11} lg={11} xl={11} xxl={11}>
                <div style={style_center}>
                  <DownloadPic data={item.picture} size={140}/>
                </div>
              </Col>
            </Row>
        )}
      />   
    )
  }
}

export default Orders;

