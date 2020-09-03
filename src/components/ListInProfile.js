import React from 'react';
import { Button, Popconfirm, message, Table, Avatar, List, } from 'antd';
import Axios from 'axios';
import PacketOffer from './PacketOffer';
import OfferListModal from '../components/OfferListModal';
import EditPacket from '../components/Order/EditPacket';
import DownloadPic from '../components/DownloadPic';
import moment from 'moment';
import { Link } from 'react-router-dom';


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
              <a href="#">حذف</a>
          </Popconfirm> ,
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
            {/* <List
              itemLayout="vertical"
              size="large"
              dataSource={this.state.packet_user}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  actions={[
                    <EditPacket update={this.callbackFunction} data={item.slug}/>,
                    <Popconfirm
                      title="آیا از حذف آگهی مطمئن هستید ؟"
                      onConfirm={this.delete.bind(this,item.slug)}
                      onCancel={this.cancel}
                      okText="بله"
                      cancelText="خیر"
                    >
                          حذف  
                    </Popconfirm> ,
                    <OfferListModal data={item.slug} count={item.offer_count}/>,
                  ]}
                  extra={[
                    <DownloadPic data={item.picture} size={100}/>,
                    // moment(item.create_at, "YYYYMMDD").fromNow()
                  ]
                  }
                >
                  <List.Item.Meta
                    title={<Link to={'/packet/' + item.slug}>{item.title}</Link>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            /> */}
        </div>
      );
    }
}

export default PacketUserList;