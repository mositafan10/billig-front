import React from 'react';
import Axios from 'axios';
import { Table, Popconfirm, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import ConfirmPrice from '../profile/ConfirmPrice';
import SendMessage from '../packet/SendMessage';
import { config } from '../../Constant';
import RateAndComment from '../rating/RateAndComment';
import PayTraveler from '../payment/PayTraveler';
var url = config.url.API_URL;

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
        width:180,
        align:"center",
      },
      { 
        title: ' ',
        dataIndex: 'slug',
        key: '',
        align:"center",
        render: (dataIndex, row) =>
            {if( row.status === "انجام شده"){ return <Button disabled={true} style={{fontSize:"12px", backgroundColor:"white",color: "transparent", textShadow:"0 0 5px rgba(0,0,0,0.5)", borderRadius:"10px"}}>چت</Button>}
            else { return <SendMessage data={dataIndex} slug={dataIndex} /> }}
},
      { 
        title: ' ',
        dataIndex: 'slug',
        key: '',
        align:"center",
        render: (dataIndex, row) =>
              {if( row.status === "در انتظار تایید مسافر"){ return <ConfirmPrice data={dataIndex} /> }
              else if( row.status === "در انتظار خرید"){ return <Button onClick={this.buydone.bind(this, dataIndex)} style={{fontSize:"12px", border:"hidden", color:"white", backgroundColor:"green", borderRadius:"10px"}}>خریداری شد</Button> }
              else if( row.status === "انجام شده"){ return <RateAndComment /> }
              else if( row.status === "در انتظار تحویل"){ return <Button onClick={this.receiverdone.bind(this, dataIndex)} style={{fontSize:"12px", border:"hidden", color:"white", backgroundColor:"green", borderRadius:"10px"}}>تحویل شد</Button> }
              else { return <Button style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}></Button>}}
            },
      { 
        title: ' ',
        dataIndex: 'slug',
        key: '',
        align:"center",
        render: (dataIndex, row) =>
              {if( row.status === "در انتظار تایید مسافر"){ return <Button onClick={this.confrim.bind(this, dataIndex, row.price)} style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}>تایید</Button> }
              else if (row.status === "انجام شده") {return <PayTraveler data={dataIndex}/> }
              else { return <Button style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}></Button>}}
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

    buydone = (data) => {
      const token = localStorage.getItem('token');
      Axios.post(`${url}api/v1/advertise/offer/update/`,
        {
          slug: data,
          status: 4
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then( message.success("اعلام وضعیت پیشنهاد با موفقیت ثبت شد"), this.componentDidMount())
        .catch(error => console.error(error));
    }

    receiverdone = (data) => {
      const token = localStorage.getItem('token');
      Axios.post(`${url}api/v1/advertise/offer/update/`,
        {
          slug: data,
          status: 5
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then( message.success("اعلام وضعیت پیشنهاد با موفقیت ثبت شد"),this.componentDidMount())
        .catch(error => console.error(error));
    }

    confrim = (data, price) => {
      const token = localStorage.getItem('token');
      Axios.post(`${url}api/v1/advertise/offer/update/`,
       {
           slug :  data,
           price : price
       },
       { headers: {"Authorization" : `Bearer ${token}`} })
       .then( message.success("پیشنهاد توسط شما تایید شد"), this.componentDidMount())
       .catch((error) => console.log(error))
    }

    delete = (slug) => {
      const token = localStorage.getItem('token');
      const current_offer = this.state.offer;
      Axios.delete(`${url}api/v1/advertise/offer/delete/${slug}`,
      { 
        headers: {"Authorization" : `Bearer ${token}`}
      }
      )
      .then(res => {
        this.setState({
          offer: current_offer.filter(offer => offer.slug !== slug),
        });
      })
        .catch(error => console.error(error));
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        Axios.get(`${url}api/v1/advertise/getuseroffer/`,
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