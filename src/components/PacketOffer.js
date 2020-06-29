import React from 'react'; 
import { List, Avatar, Button, Popconfirm, Table, message } from 'antd';
import Axios from 'axios';
import OfferDetailView from '../components/OfferDetailView';
import SendMessage from './SendMessage';


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
      render: (dataIndex) => <Button onClick={this.reject.bind(this, dataIndex)} style={{fontSize:"12px", border:"hidden", backgroundColor:"red", color:"white", borderRadius:"10px"}}><b>رد</b></Button>,
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width:20,
      render: (dataIndex) => <Button onClick={this.accept.bind(this, dataIndex)} style={{fontSize:"12px", border:"hidden", backgroundColor:"green", color:"white", borderRadius:"10px"}}><a>قبول</a></Button>,
    },
    {
      title: '',
      dataIndex: 'owner',
      key: 'z',
      width:30,
      render: (dataIndex) => <SendMessage data={dataIndex} />
    },
    { 
      title: 'توضیحات',
      dataIndex: 'description',
      key: 'offer_count',
      align:"center"
    },
    {
      title: 'قیمت (تومان)',
      dataIndex: 'price',
      key: 'y',
      width:150,
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
    { 
      title: 'وضعیت',
      dataIndex: 'status', 
      key: 'status',
      width:50,
      align:"center",
    },
  ];

  accept(dataIndex){
    const token = localStorage.getItem('token');
    const current_packet = this.state.packet_offer;
    Axios.put(`http://127.0.0.1:8000/api/v1/advertise/offer/`,
        {
          type: "ACCEPT",
          slug: dataIndex.slug
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            message.success("شما پیشنهادی را قبول کرده‌اید. الان برو پرداخت کن")
            console.log(dataIndex.slug);  
            this.componentDidMount(); //: i dont know this is the 
        })
        .catch(error => console.error(error));
  }

  reject(dataIndex){
    const token = localStorage.getItem('token');
    const current_packet = this.state.packet_offer;
    Axios.put(`http://127.0.0.1:8000/api/v1/advertise/offer/`,
        {
          type: "REJECT",
          slug: dataIndex.slug
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            message.success("پیشنهاد توسط شما لغو شد")
            console.log(dataIndex.slug);
            this.componentDidMount();
        })
        .catch(error => console.error(error));
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    const orderID = this.props.data;
    Axios.get(`http://127.0.0.1:8000/api/v1/advertise/offer/${orderID}/`,
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          this.setState({
            packet_offer: res.data
          })
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