import React from 'react'; 
import { Table } from 'antd';
import Axios from 'axios';
import { Link } from 'react-router-dom';


class PacketOffer extends React.Component { 
  
  state = {
    packet_offer: []
  }
  
  columns = [
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
      key: 'sender_id',
      width:150,
      align:"center",
      render: (dataIndex, key) => <Link to={'/users/' +`${key}`}>{dataIndex}</Link>,
    },
  ];

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