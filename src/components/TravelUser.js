import React from 'react';
import Axios from 'axios';
import { Button , Popconfirm , message, Table } from 'antd';

class TravelList extends React.Component {

    state = {
        travel_user: [],
    }

    columns = [
      {
        title: '',
        dataIndex: 'slug',
        key: 'x',
        width:30,
        render: (dataIndex) => 
          <Popconfirm
            title="آیا از حذف آگهی مطمئن هستید ؟"
            onConfirm={this.delete.bind(this,dataIndex)}
            onCancel={this.cancel}
            okText="بله"
            cancelText="خیر"
            >
            <a href="#">حذف</a>
          </Popconfirm> ,
      },
      {
        title: '',
        dataIndex: '',
        key: 'y',
        width:30,
        render: () => <Button style={{fontSize:"12px", border:"hidden", borderRadius:"5px"}}>ویرایش</Button>,
      },
      { 
        title: 'تاریخ پرواز',
        dataIndex: 'flight_date',
        key: 'flight_date',
        // colSpan:10
        width:80,
        align:"center",
      },
      { 
        title: 'مقصد',
        dataIndex: 'destination',
        key: 'destination',
        // colSpan:10
        width:80,
        align:"center",
      },
      { 
        title: ' مبدا',
        dataIndex: 'departure', 
        key: 'departure',
        align:"right",
        width:80,
      },
    ];

    componentDidMount(){
        const token = localStorage.getItem('token');
        Axios.get('http://127.0.0.1:8000/api/v1/advertise/travellist/',{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                this.setState({
                    travel_user: res.data
                });
                console.log(res.data);  
            })
            .catch(error => console.error(error));
    }

    cancel(e) {
      console.log(e);
      message.error('درخواست لغو شد');
    }

    delete = (id) => {
      const current_packet = this.state.travel_user;
      const token = localStorage.getItem('token');
      Axios.delete(`http://127.0.0.1:8000/api/v1/advertise/travel/${id}/`,{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
              this.setState({
                travel_user: current_packet.filter(travel_user => travel_user.id !== id),
              });
              console.log(res.data);  
          })
          .catch(error => console.error(error));
    }
    render(){
        return(
          //   <List
          //   itemLayout="horizontal"
          //   locale={{emptyText:".سفری ثبت نکرده‌اید"}}
          //   dataSource={this.state.travel_user}
          //   renderItem={item => (
          //     <List.Item 
          //       actions={[
          //           <Button style={{borderRadius:"8px", fontSize:"12px"}} > ویرایش </Button>,
          //           <Button style={{borderRadius:"8px", fontSize:"12px"}} > پیشنهادها </Button>,
          //           // <Button onClick={this.confirmdelete(item.id)} style={{borderRadius:"8px"}} > حذف </Button>,
          //           <Popconfirm
          //               title="آیا از حدف آگهی مطمئن هستید ؟"
          //               onConfirm={this.delete.bind(this, item.id)}
          //               onCancel={this.cancel}
          //               okText="بله"
          //               cancelText="خیر"
          //               style={{fontSize:"12px"}}
          //               >
          //               <a href="#">حذف</a>
          //           </Popconfirm>
          //       ]}
          //       >
          //       <List.Item.Meta
          //         style={{textAlign:"left"}}
          //         // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          //         title={<a href={item.id}>{item.title}</a>}
          //         description={item.description}
          //       />
          //     </List.Item>
          //   )}
          // />
          <div>
          <Table 
            style={{padding:"30px 30px 30px 30px"}}
            columns={this.columns}
            dataSource={this.state.travel_user} />
        </div>
        );
    }
}

export default TravelList;