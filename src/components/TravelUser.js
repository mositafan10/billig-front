import React from 'react';
import Axios from 'axios';
import airplane from '../media/airplane.png';
import { Button , Popconfirm , message, Table, List, Row,  Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import EditTravel from './EditTravel';

const style_left = {display:"flex", justifyContent:"left", paddingLeft:"10px"};
const style_right = {display:"flex", justifyContent:"right"};

class TravelList extends React.Component {

    state = {
        travel_user: [],
    }

    // columns = [
    //   { 
    //     title: ' مبدا',
    //     dataIndex: 'departure', 
    //     key: 'departure',
    //     align:"center",
    //     width:80,
    //     rowSpan:2,

    //   },
    //   { 
    //     title: '',
    //     dataIndex: 'departure_city', 
    //     key: 'departure_city',
    //     align:"center",
    //     width:80,
    //   },
    //   { 
    //     title: 'مقصد',
    //     dataIndex: 'destination',
    //     key: 'destination',
    //     rowSpan:2,
    //     width:80,
    //     align:"center",
    //   },
    //   { 
    //     title: '',
    //     dataIndex: 'destination_city',
    //     key: 'destination_city',
    //     // colSpan:10
    //     width:80,
    //     align:"center",
    //   },
    //   { 
    //     title: 'تاریخ پرواز',
    //     dataIndex: 'flight_date_start',
    //     key: 'flight_date_start',
    //     align:"center",
    //   },
    //   {
    //     title: '',
    //     dataIndex: 'slug',
    //     key: 'y',
    //     width:10,
    //     render: (dataIndex) => <Link to={'travel/' + `${dataIndex}`}><Button style={{fontSize:"12px", border:"hidden", borderRadius:"5px"}}>جزئیات</Button></Link>,
    //   },
    //   {
    //     title: '',
    //     dataIndex: '',
    //     key: 'y',
    //     width:10,
    //     render: () => <Button style={{fontSize:"12px", border:"hidden", borderRadius:"5px"}}>ویرایش</Button>,
    //   },
    //   {
    //     title: '',
    //     dataIndex: 'slug',
    //     key: 'x',
    //     width:10,
    //     render: (dataIndex) => 
    //       <Popconfirm
    //         title="آیا از حذف آگهی مطمئن هستید ؟"
    //         onConfirm={this.delete.bind(this,dataIndex)}
    //         onCancel={this.cancel}
    //         okText="بله"
    //         cancelText="خیر"
    //         >
    //         <a href="#">حذف</a>
    //       </Popconfirm> ,
    //   },
    // ];

    cancel(e) {
      console.log(e);
      message.error('درخواست لغو شد');
    }

    editsignal = () => {
      this.props.parentCallback();
    }

    delete = (id) => {
      const current_packet = this.state.travel_user;
      const token = localStorage.getItem('token');
      Axios.delete(`http://127.0.0.1:8000/api/v1/advertise/travel/${id}/`,{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
              this.props.parentCallback(); 
          })
          .catch(error => console.error(error));
    }
    render(){
        return(
          <div>
          {/* <Table 
            scroll={{ x: 900 }} 
            locale={{emptyText:"سفری وجود ندارد"}}
            style={{padding:"30px 30px 30px 30px"}}
            columns={this.columns}
            dataSource={this.state.travel_user} /> */}
    <List
      grid={{
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
        locale={{emptyText:"سفری وجود ندارد"}}
        // pagination={{
        //   onChange: page => {
        //     console.log(page);
        //   },
        //   total: this.props.page,
        //   pageSize: this.props.pagesize,
        //   hideOnSinglePage:true,
        //   simple:true,
        //   hide:true
        // }}
        dataSource={this.props.data}
        renderItem={item => (
            <Row
              style={{
              border:"solid",
              borderWidth:"0.5px",
              // borderColor:"aliceblue",
              borderRadius:"30px 30px 15px 15px", 
              margin:"15px 15px 15px 15px", 
              padding:"20px 20px 20px 20px",
              width:"320px",
              height:"310px",
              }}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Row style={{textAlign:"center", height:"80px"}} >
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} >
                    <img src={`http://127.0.0.1/dstatic/${item.departure.icon}`} width={60} style={{borderRadius:"5px"}} />
                    <p style={{margin:"10px 5px"}}>{item.departure_city.name}</p>
                  </Col>
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <img src={airplane} width={60} />
                  </Col>
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <img src={`http://127.0.0.1/dstatic/${item.destination.icon}`} width={60} style={{borderRadius:"5px"}}  />
                  <p style={{margin:"10px 25px"}}>{item.destination_city.name}</p>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row style={style_right}>
                        <Col style={style_right} xs={12} sm={12} md={12} lg={12} xl={12} >
                            <h4>تاریخ سفر</h4>
                        </Col>
                        <Col style={style_left} xs={12} sm={12} md={12} lg={12} xl={12}>
                            {moment(item.flight_date_start).format('Do MMM YYYY')}
                        </Col>
                    </Row>
                  </Col>
                  <hr/>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Row style={style_right}>
                        <Col style={style_right} xs={22} sm={22} md={22} lg={22} xl={22} >
                            <h4>تعداد بسته‌های پذیرش شده</h4>
                        </Col>
                        <Col style={style_left} xs={2} sm={2} md={2} lg={2} xl={2}>
                            {item.approved_packet}
                        </Col>
                  </Row>
                  </Col>
                  <hr/>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Row style={style_right}>
                      <Col style={style_right} xs={20} sm={20} md={20} lg={20} xl={20} >
                          <h4>مجموع درآمد</h4>
                      </Col>
                      <Col style={style_left} xs={4} sm={4} md={4} lg={4} xl={4}>
                          {item.income}
                      </Col>
                  </Row>
                  <br/>
                  <Row style={style_right}>
                      <Col style={style_right} xs={20} sm={20} md={20} lg={20} xl={20} >
                        <Popconfirm
                            title="آیا از حذف آگهی مطمئن هستید ؟"
                            onConfirm={this.delete.bind(this,item.slug)}
                            onCancel={this.cancel}
                            okText="بله"
                            cancelText="خیر"
                            >
                          <Button style={{borderRadius:"10px"}}>حذف</Button>
                        </Popconfirm> 
                        </Col>
                      <Col style={style_left} xs={4} sm={4} md={4} lg={4} xl={4}>
                        <EditTravel signal={this.editsignal} data={item.slug} />
                      </Col>
                  </Row>
                  <br/>
                  </Col>
                </Row>
              </Col>
            </Row>
        )}
      />  
        </div>
        );
    }
}

export default TravelList;