import React from 'react'; 
import { List, Avatar, Button, Popconfirm, Table, message } from 'antd';
import Axios from 'axios';
import OfferDetailView from '../components/OfferDetailView';
import SendMessage from './SendMessage';
import { Link } from 'react-router-dom';


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
      dataIndex: 'sender_id',
      data: 'slug',
      key: 'sender_id',
      width:30,
      render: (dataIndex, data) => <SendMessage data={dataIndex} slug={data} />
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
      dataIndex: 'sender', 
      key: 'sender',
      width:150,
      align:"center",
      render: (key) => <Link to={'/users/' + key}>{key}</Link>
    },
    { 
      title: 'وضعیت',
      dataIndex: 'status', 
      key: 'status',
      width:150,
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
      <Table 
      pagination={{
        onChange: page => {
          console.log(page);
        },
        hideOnSinglePage:true,
        size:"small",
      }}   
      locale={{emptyText:"پیشنهادی وجود ندارد"}}
      columns={this.columns}
      dataSource={this.state.packet_offer} />
    );
    }
}

export default PacketOffer;