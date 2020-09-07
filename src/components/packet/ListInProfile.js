import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { Popconfirm, message, Table } from 'antd';
import OfferListModal from '../offer/OfferListModal';
import EditPacket from './EditPacket';
import { config } from '../../Constant'

var url = config.url.API_URL


class PacketUserList extends React.Component {

    state = {
        packet_user: [],
    }

    columns = [
      { 
        title: ' عنوان آگهی',
        dataIndex: 'title', 
        key: 'title',
        align:"right",
        render : (dataIndex, row) => <Link to={"packet/" + row.slug}>{dataIndex}</Link>
      },
      { 
        title: ' قیمت (تومان)',
        dataIndex: 'suggested_price',
        key: 'suggested_price',
        align:"center",
        width:150,
      },
      { 
        title: 'وضعیت',
        dataIndex: 'status',
        key: 'status',
        width:150,
        align:"center",
        render: (dataIndex) => <span style={{fontSize:"12px"}}>{dataIndex}</span>,
      },
      { 
        title: 'پیشنهاد',
        dataIndex: 'offer_count',
        key: 'offer_count',
        width:50,
        align:"center",
      },
      {
        title: '',
        dataIndex: 'slug',
        key: 'y',
        width:10,
        render: (dataIndex) => <OfferListModal data={dataIndex}/>,
      },
      {
        title: '',
        dataIndex: 'slug',
        key: 'y',
        width:10,
        render: (dataIndex) => <EditPacket data={dataIndex}/>,
      },
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
              حذف
          </Popconfirm> ,
      },
    ];

    componentDidMount(){
      const token = localStorage.getItem('token');
        Axios.get(`${url}api/v1/advertise/user_packet/`,{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                this.setState({
                    packet_user: res.data
                });
            })
            .catch(error => console.error(error));
    }

    cancel(e) {
      message.error('درخواست لغو شد');
    }

    delete = (slug) => {
      const current_packet = this.state.packet_user;
      const token = localStorage.getItem('token');
      Axios.delete(`${url}api/v1/advertise/packet/${slug}`,{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
              this.setState({
                packet_user: current_packet.filter(packet_user => packet_user.slug !== slug),
              });
          })
          .catch(error => console.error(error));
    }

    callbackFunction = () => {
      this.componentDidMount()
    }
    
    render (){
    return (
        <div>
          <Table
          scroll={{ x: 900 }} 
          style={{padding:"30px 30px 30px 30px"}}
          columns={this.columns}
          dataSource={this.state.packet_user}
          locale={{emptyText:"آگهی وجود ندارد"}}
          />
        </div>
      );
    }
}

export default PacketUserList;