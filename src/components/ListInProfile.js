import React from 'react';
import { Button, Popconfirm, message, Table } from 'antd';
import Axios from 'axios';
import PacketOffer from './PacketOffer';
import OfferListModal from '../components/OfferListModal';



class PacketUserList extends React.Component {

    state = {
        packet_user: [],
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
        title: '',
        dataIndex: 'slug',
        key: 'y',
        width:30,
        render: (dataIndex) => <OfferListModal data={dataIndex}/>,
      },
      { 
        title: 'وضعیت',
        dataIndex: 'status',
        key: 'status',
        // colSpan:10
        width:80,
        align:"center",
      },
      { 
        title: 'پیشنهاد',
        dataIndex: 'offer_count',
        key: 'offer_count',
        // colSpan:10
        width:50,
        align:"center",
      },
      { 
        title: ' قیمت (تومان)',
        dataIndex: 'suggested_price',
        key: 'suggested_price',
        align:"center",
        width:150,
      },
      { 
        title: ' عنوان آگهی',
        dataIndex: 'title', 
        key: 'title',
    
        align:"right"
      },
    ];

    componentDidMount(){
      const token = localStorage.getItem('token');
        Axios.get('http://127.0.0.1:8000/api/v1/advertise/user_packet/',{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                this.setState({
                    packet_user: res.data
                });
                console.log(res.data);  
            })
            .catch(error => console.error(error));
    }

    cancel(e) {
      console.log(e);
      message.error('درخواست لغو شد');
    }

    delete = (slug) => {
      const current_packet = this.state.packet_user;
      const token = localStorage.getItem('token');
      Axios.delete(`http://127.0.0.1:8000/api/v1/advertise/packet/${slug}`,{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
              this.setState({
                packet_user: current_packet.filter(packet_user => packet_user.slug !== slug),
              });
              console.log(res.data);  
          })
          .catch(error => console.error(error));
    }

    render (){
    return (
        <div>
          <Table 
          style={{padding:"30px 30px 30px 30px"}}
          columns={this.columns}
          dataSource={this.state.packet_user} />
        </div>
    );
    }
}

export default PacketUserList;