import React from 'react';
import Axios from 'axios';
import { Table, Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import ConfirmPrice from './ConfirmPrice';

class UserOffer extends React.Component {
    state = {
        offer: []
    }

    columns = [
      { 
        title: 'آگهی',
        dataIndex: 'packet_title', 
        key: 'packet_title',
        width:300,
        align:"right",
      },
      { 
        title: ' پیشنهاد به',
        dataIndex: 'receiver', 
        key: 'receiver',
        width:150,
        align:"center",
      render : (dataIndex, row) => <Link to={'users/' + row.receiver_id}>{dataIndex}</Link>
      },
      {
        title: 'قیمت (تومان)',
        dataIndex: 'price',
        key: 'y',
        width:150,
        align:"center"
      },
      { 
        title: 'متن پیشنهاد',
        dataIndex: 'description',
        key: 'offer_count',
        align:"center"
      },
      { 
        title: 'وضعیت',
        dataIndex: 'status', 
        key: 'status',
        width:150,
        align:"center",
      },
      { 
        title: ' ',
        dataIndex: 'slug',
        key: '',
        align:"center",
        render: (dataIndex, row) => {if( row.status == "نهایی‌کردن مبلغ"){ return <ConfirmPrice data={dataIndex} />}},
      },
      { 
        title: ' ',
        dataIndex: 'slug',
        key: '',
        align:"center",
        render: (dataIndex) => 
          <Popconfirm
            title="آیا از حذف آگهی مطمئن هستید ؟"
            onConfirm={this.delete.bind(this, dataIndex)}
            onCancel={this.cancel}
            okText="بله"
            cancelText="خیر"
            >
            <a href="#">حذف</a>
          </Popconfirm> ,
      },
    ];

    delete = (slug) => {
      const token = localStorage.getItem('token');
      const current_offer = this.state.offer;
      Axios.delete(`http://127.0.0.1:8000/api/v1/advertise/offer/delete/${slug}`,
      { 
        headers: {"Authorization" : `Bearer ${token}`}
      }
      )
      .then(res => {
        this.setState({
          offer: current_offer.filter(offer => offer.slug !== slug),
        });
        console.log(res.data);  
      })
        .catch(error => console.error(error));
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        Axios.get('http://127.0.0.1:8000/api/v1/advertise/getuseroffer/',
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res) => this.setState({
            offer: res.data
        }))
        .catch((error) => console.log(error))
    }

    render(){
        return(
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
            dataSource={this.state.offer} />
        )
    }
}

export default UserOffer;