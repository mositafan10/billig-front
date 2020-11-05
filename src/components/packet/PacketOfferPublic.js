import React from 'react'; 
import { Table } from 'antd';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { config } from '../../Constant'

var url = config.url.API_URL


class PacketOffer extends React.Component { 
  
  state = {
    packet_offer: []
  }
  
  columns = [
    { 
      title: 'پیشنهاد دهنده',
      dataIndex: 'sender', 
      key: 'sender_id',
      width:150,
      align:"center",
      render: (dataIndex, key) => <Link to={'/users/' +`${key}`}>{dataIndex}</Link>,
    },
    {
      title: 'قیمت (تومان)',
      dataIndex: 'price',
      key: 'y',
      width:150,
      align:"center"
    },
    { 
      title: 'توضیحات',
      dataIndex: 'description',
      key: 'offer_count',
      align:"center"
    },
  ];

  componentDidMount(){
    const token = localStorage.getItem('token');
    const orderID = this.props.data;
    Axios.get(`${url}api/v1/advertise/offer/${orderID}/`,
        { headers: {"Authorization" : `Token ${token}`} })
        .then(res => {
          this.setState({
            packet_offer: res.data
          })
        })
        .catch(error => console.error(error));
  }
    render(){
    return (
      <Table 
      pagination={{
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