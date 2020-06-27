import React from 'react';
import { List, Button, Popconfirm, message, Table, Modal } from 'antd';
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
        render: (dataIndex) => <Popconfirm
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
        render: () => <Button style={{fontSize:"12px", border:"hidden"}}>ویرایش</Button>,
      },
      {
        title: '',
        dataIndex: 'slug',
        key: 'y',
        width:30,
        render: (dataIndex) => <OfferListModal data={dataIndex}/>,
      },
      { 
        title: 'تعداد پیشنهاد',
        dataIndex: 'offer_count',
        key: 'offer_count',
        // colSpan:10
        width:50,
        align:"center"
      },
      { 
        title: ' قیمت (تومان)',
        dataIndex: 'suggested_price',
        key: 'suggested_price',
        align:"center",
        width:80,
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
        {/* <List
          itemLayout="horizontal"
          locale={{emptyText:".آگهی وجود ندارد"}}
          dataSource={this.state.packet_user}
          renderItem={item => (
            <List.Item 
              actions={[
                // <Button style={{border:"hidden", fontSize:"12px"}} > پیشنهادها </Button>,
                  <OfferListModal data={item.slug}/>,
                  <Button style={{border:"hidden", fontSize:"12px"}} > ویرایش </Button>,
                  // <Button onClick={this.confirmdelete(item.id)} style={{borderRadius:"8px"}} > حذف </Button>,
                  <Popconfirm
                      title="آیا از حذف آگهی مطمئن هستید ؟"
                      onConfirm={this.delete.bind(this, item.slug)}
                      onCancel={this.cancel}
                      okText="بله"
                      cancelText="خیر"
                      >
                      <a href="#">حذف</a>
                  </Popconfirm>
              ]}
              >
              <List.Item.Meta
              //   style={{textAlign:"right"}}
              //   avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href={item.slug}>{item.title}</a>}
              description = {item.offer_count}
              // description = {item.offer_count}
              //   description={item.description}
              
              >
              </List.Item.Meta>
            </List.Item>
          )}
        /> */}
          <Table 
          // bordered
          // tableLayout="unset"
          style={{padding:"30px 30px 30px 30px"}}
          columns={this.columns}
          dataSource={this.state.packet_user} />
        </div>
    );
    }
}

export default PacketUserList;