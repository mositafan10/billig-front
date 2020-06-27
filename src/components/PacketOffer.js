import React from 'react'; 
import { List, Avatar, Button, Popconfirm, Table } from 'antd';
import Axios from 'axios';
import OfferDetailView from '../components/OfferDetailView';


class PacketOffer extends React.Component { 
  
  state = {
    packet_offer: []
  }
  
  columns = [

      {
        title: '',
        dataIndex: '',
        key: 'y',
        width:20,
        render: () => <Button style={{fontSize:"12px", border:"hidden"}}>رد</Button>,
      },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width:20,
      render: () => <Button style={{fontSize:"12px", border:"hidden"}}>قبول</Button>,
    },
    {
      title: '',
      dataIndex: '',
      key: 'z',
      width:30,
      render: () => <Button style={{fontSize:"12px", border:"hidden"}}>پیام به کاربر</Button>,
    },
    // { 
      //   title: 'ثبت شده در',
      //   dataIndex: 'create_at',
      //   key: 'age'
      // },
    { 
      title: 'توضیحات',
      dataIndex: 'description',
      key: 'offer_count',
      align:"center"
    },
    {
      title: 'قیمت',
      dataIndex: 'price',
      key: 'y',
      width:80,
      align:"center"
    },
    { 
      title: 'پیشنهاد دهنده',
      dataIndex: 'owner', 
      key: 'owner',
      width:150,
      align:"center",
    render: (dataIndex) => <a href={'/users/' + dataIndex}>{dataIndex}</a>
    },
  ];

  componentDidMount(){
    const orderID = this.props.data;
    const token = localStorage.getItem('token');
    Axios.get(`http://127.0.0.1:8000/api/v1/advertise/offer/${orderID}/`,{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            this.setState({
                packet_offer: res.data
            });
            console.log(res.data);  
        })
        .catch(error => console.error(error));
}
    render(){
    return (
  //   <List
  //   itemLayout="horizontal"
  //   dataSource={this.state.packet_offer}
  //   locale={{emptyText:".پیشنهادی وجود ندارد"}}
  //   renderItem={item => (
  //     <List.Item
  //     actions={[
  //       // <Button style={{borderRadius:"8px", fontSize:"10px"}}> قبول </Button>,
  //       // <Button style={{borderRadius:"8px", fontSize:"10px"}}>رد </Button>,
  //       // <Button style={{borderRadius:"8px", fontSize:"10px"}}>جزئیات پیشنهاد </Button>,
  //       <OfferDetailView />
  //     ]}  
  //     >
  //       <List.Item.Meta
  //         avatar={<a  href={'/users/' + item.owner} > <Avatar src={item.avatar} /></a>}
  //         title={<a href="https://ant.design">{item.price}</a>}
  //         description={item.description}
  //       />
  //     </List.Item>
  //   )}
  // />
      <Table 
      
      pagination={{
        onChange: page => {
          console.log(page);
        },
        // pageSize: 50,
        hideOnSinglePage:true,
        size:"small",
        
      }}      
      locale={{emptyText:"پیشنهادی وجود ندارد"}}
      // tableLayout="unset"
      // style={{padding:"30px 30px 30px 30px"}}
      columns={this.columns}
      dataSource={this.state.packet_offer} />
    );
    }
}

export default PacketOffer;