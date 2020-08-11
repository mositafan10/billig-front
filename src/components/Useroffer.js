import React from 'react';
import Axios from 'axios';
import { Table } from 'antd';

class UserOffer extends React.Component {
    state = {
        offer: []
    }

    columns = [
        { 
          title: 'متن پیشنهاد',
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
          title: ' پیشنهاد به',
          dataIndex: 'receiver', 
          key: 'receiver',
          width:150,
          align:"center",
        },
        { 
          title: 'وضعیت',
          dataIndex: 'status', 
          key: 'status',
          width:150,
          align:"center",
        },
      ];

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