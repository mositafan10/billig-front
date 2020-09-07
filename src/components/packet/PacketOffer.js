import React from 'react'; 
import { Button, Popconfirm, Table, message, Tooltip } from 'antd';
import Axios from 'axios';
import SendMessage from './SendMessage';
import { Link } from 'react-router-dom';
import SendTransactionInfo from '../payment/SendTransactionInfo';
import { config } from '../../Constant'
import RateAndComment from '../rating/RateAndComment';
import PayTraveler from '../payment/PayTraveler';

var url = config.url.API_URL


class PacketOffer extends React.Component { 
  
  state = {
    packet_offer: [],
    disablepayment: true,
    disableconfirm: false
  }

  columns = [
    { 
      title: 'وضعیت',
      dataIndex: 'status', 
      key: 'status',
      width:150,
      align:"center",
    },
    { 
      title: 'پیشنهاد دهنده',
      dataIndex: 'sender', 
      key: 'sender',
      width:150,
      align:"center",
      render: (key, row) => <Link to={'/users/' + row.sender_id}>{key}</Link>
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
            {if(row.status === "در انتظار پاسخ") {return <Button onClick={this.accept.bind(this, dataIndex)} style={{fontSize:"12px", border:"hidden", color:"white", backgroundColor:"green", borderRadius:"10px"}}><b>قبول</b></Button>} 
            else if( row.status === "در انتظار پرداخت"){ return <Button disabled={this.state.disableconfirm} onClick={this.confirmpayment.bind(this)} style={{fontSize:"12px", border:"hidden", color:"white", backgroundColor:"green", borderRadius:"10px"}}><b>تایید</b></Button> }
            else if( row.status === "در انتظار تایید خریدار"){ return <Button onClick={this.receiveconfirm.bind(this, dataIndex)} style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}>تایید تحویل</Button> }
            else if( row.status === "انجام شده"){ return <RateAndComment /> }
            else { return  <Button style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}></Button>}}
    },
    { 
      title: ' ',
      dataIndex: 'slug',
      key: '',
      align:"center",
      render: (dataIndex, row) =>
            {if( row.status === "در انتظار پرداخت"){ return <SendTransactionInfo disabled={this.state.disablepayment} amount={row.price} factorNumber={row.slug} /> }
            else { return  <Button style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}></Button>}}
          },
    // {
    //   title: '',
    //   dataIndex: 'sender_id',
    //   data: 'slug',
    //   key: 'sender_id',
    //   align:"center",
    //   width:30,
    // render: (dataIndex, row) => { if(row.status === "عدم تایید") { return <Tooltip title="شما این پیشنهاد را رد کرده‌اید"><Button disabled={true} style={{fontSize:"12px", border:"hidden", borderRadius:"10px", color: "transparent", textShadow:"0 0 5px rgba(0,0,0,0.5)"}}><b>چت</b></Button></Tooltip> }
    //                                   else if (row.status === "تایید") {return <Popconfirm  onConfirm={this.cancle.bind(this, row.slug, row.packet_slug)} title="از بازگشت پیشنهاد مطمئن هستید؟" okText="بله" cancelText="خیر"><Button style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}>انصراف</Button></Popconfirm>}
    //                                   else if (row.status === "نهایی‌شدن مبلغ") { return <SendMessage data={dataIndex} slug={row.slug} /> }
    //                                   else { return <SendMessage data={dataIndex} slug={row.slug} /> }}
    // },
    // {
    //   title: '',
    //   dataIndex: '',
    //   key: 'x',
    //   width:20,
    //   align:"center",
    //   render: (dataIndex, row) => { if(row.status === "عدم تایید") {return <Tooltip title="شما این پیشنهاد را رد کرده‌اید"><Button disabled={true} onClick={this.accept.bind(this, dataIndex, row.packet_slug)} style={{fontSize:"12px", border:"hidden", backgroundColor:"green", borderRadius:"10px", color: "transparent", textShadow:"0 0 5px rgba(0,0,0,0.5)"}}><b>قبول</b></Button></Tooltip>} 
    //                                 else if (row.status === "نهایی‌شدن مبلغ") {return <Button style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}>در انتظار تایید مبلغ توسط مسافر</Button>}
    //                                 else if (row.status === "در حال انجام") {return <Button style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}>در حال انجام توسط مسافر</Button>}
    //                                 else if (row.status === "تایید مبلغ") {return <SendTransactionInfo amount={row.price} factorNumber={row.slug} /> }
    //                                 else { return <Popconfirm  onConfirm={this.accept.bind(this, dataIndex, row.packet_slug)} title=" از قبول پیشنهاد مطمئن هستید؟ در صورت قبول پیشنهاد، دیگر پیشنهاد‌ها غیرفعال خواهند شد" okText="بله" cancelText="خیر"><Button style={{fontSize:"12px", border:"hidden", backgroundColor:"green", color:"white", borderRadius:"10px"}}><b>قبول</b></Button></Popconfirm>}}
    // },
  ];

  accept(data){
    const token = localStorage.getItem('token');
    Axios.post(`${url}api/v1/advertise/offer/update/`,
        {
          slug: data,
          status: 1
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(() => {
            message.success("تغییر وضعیت با موفقیت انجام شد")
            this.componentDidMount();
        })
        .catch(error => console.error(error));
  }

  // reject(dataIndex, slug){
  //   const token = localStorage.getItem('token');
  //   Axios.post(`${url}api/v1/advertise/offer/update`,
  //       {
  //         slug: data,
  //         status: 2
  //       },
  //       { headers: {"Authorization" : `Bearer ${token}`} })
  //       .then(res => {
  //           message.success("پیشنهاد توسط شما لغو شد")
  //           this.componentDidMount();
  //       })
  //       .catch(error => console.error(error));
  // }

  // cancle(slug, packet_slug){
  //   const token = localStorage.getItem('token');
  //   Axios.put(`${url}api/v1/advertise/offer/`,
  //       {
  //         type: "CANCLE",
  //         slug: slug,
  //         packet: packet_slug
  //       },
  //       { headers: {"Authorization" : `Bearer ${token}`} })
  //       .then(res => {
  //           message.success("پیشنهاد توسط شما لغو شد")
  //           this.componentDidMount();
  //       })
  //       .catch(error => console.error(error));
  // }

  confirmpayment = () => {
    message.success("پیشنهاد توسط شما تایید شد. حال می‌توانید هزینه را پرداخت کنید")
    this.componentDidMount()
    this.setState({
      disableconfirm: true,
      disablepayment: false,
    })
  }

  receiveconfirm = (data) => {
    const token = localStorage.getItem('token');
    Axios.post(`${url}api/v1/advertise/offer/update/`,
      {
        slug: data,
        status: 6
      },
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then( message.success("اعلام وضعیت پیشنهاد با موفقیت ثبت شد"), this.componentDidMount()
      )
      .catch(error => console.error(error));
  }
  componentDidMount(){
    const token = localStorage.getItem('token');
    const orderID = this.props.data;
    Axios.get(`${url}api/v1/advertise/offer/${orderID}/`,
        { headers: {"Authorization" : `Bearer ${token}`} })
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
        scroll={{ x:900}}
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