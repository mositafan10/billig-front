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
        width:10,
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
        width:10,
        render: () => <Button style={{fontSize:"12px", border:"hidden", borderRadius:"5px"}}>ویرایش</Button>,
      },
      {
        title: '',
        dataIndex: 'slug',
        key: 'y',
        width:10,
        render: (dataIndex) => <Button href={'travel/' + `${dataIndex}`} style={{fontSize:"12px", border:"hidden", borderRadius:"5px"}}>جزئیات</Button>,
      },
      { 
        title: 'تاریخ پرواز',
        dataIndex: 'flight_date',
        key: 'flight_date',
        // colSpan:10 ,
        // width:80,
        align:"center",
      },
      { 
        title: '',
        dataIndex: 'destination_city',
        key: 'destination_city',
        // colSpan:10
        width:80,
        align:"center",
      },
      { 
        title: 'مقصد',
        dataIndex: 'destination',
        key: 'destination',
        rowSpan:2,
        width:80,
        align:"center",
      },
      { 
        title: '',
        dataIndex: 'departure_city', 
        key: 'departure_city',
        align:"center",
        width:80,
      },
      { 
        title: ' مبدا',
        dataIndex: 'departure', 
        key: 'departure',
        align:"center",
        width:80,
        rowSpan:2,

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
          <div>
          <Table 
            locale={{emptyText:"سفری وجود ندارد"}}
            style={{padding:"30px 30px 30px 30px"}}
            columns={this.columns}
            dataSource={this.state.travel_user} />
        </div>
        );
    }
}

export default TravelList;