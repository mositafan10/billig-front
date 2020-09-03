import React from 'react'; 
import { Button, Popconfirm, Table, message, Tooltip } from 'antd';
import Axios from 'axios';
import OfferDetailView from '../components/OfferDetailView';
import SendMessage from './SendMessage';
import { Link } from 'react-router-dom';
import SendTransactionInfo from '../components/payment/SendTransactionInfo';


class PacketOffer extends React.Component { 
  
  state = {
    packet_offer: []
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
    // { 
    //   title: '',
    //   dataIndex: 'slug',
    //   key: '',
    //   align:"center",
    //   render: () => <Button>چت</Button>
    // },
    {
      title: '',
      dataIndex: 'sender_id',
      data: 'slug',
      key: 'sender_id',
      align:"center",
      width:30,
    render: (dataIndex, row) => { if(row.status == "عدم تایید") { return <Tooltip title="شما این پیشنهاد را رد کرده‌اید"><Button disabled={true} style={{fontSize:"12px", border:"hidden", borderRadius:"10px", color: "transparent", textShadow:"0 0 5px rgba(0,0,0,0.5)"}}><b>چت</b></Button></Tooltip> }
                                      else if (row.status == "تایید") {return <Popconfirm  onConfirm={this.cancle.bind(this, row.slug, row.packet_slug)} title="از بازگشت پیشنهاد مطمئن هستید؟" okText="بله" cancelText="خیر"><Button style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}>انصراف</Button></Popconfirm>}
                                      else { return <SendMessage data={dataIndex} slug={row.slug} /> }}
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width:20,
      align:"center",
      render: (dataIndex, row) => { if(row.status == "عدم تایید") {return <Tooltip title="شما این پیشنهاد را رد کرده‌اید"><Button disabled={true} onClick={this.accept.bind(this, dataIndex, row.packet_slug)} style={{fontSize:"12px", border:"hidden", backgroundColor:"green", borderRadius:"10px", color: "transparent", textShadow:"0 0 5px rgba(0,0,0,0.5)"}}><b>قبول</b></Button></Tooltip>} 
                                    else if (row.status == "نهایی‌کردن مبلغ") {return <Button style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}>در انتظار تایید مبلغ توسط مسافر</Button>}
                                    else if (row.status == "تایید مبلغ") {return <SendTransactionInfo /> }
                                    else { return <Popconfirm  onConfirm={this.accept.bind(this, dataIndex, row.packet_slug)} title=" از قبول پیشنهاد مطمئن هستید؟ در صورت قبول پیشنهاد، دیگر پیشنهاد‌ها غیرفعال خواهند شد" okText="بله" cancelText="خیر"><Button style={{fontSize:"12px", border:"hidden", backgroundColor:"green", color:"white", borderRadius:"10px"}}><b>قبول</b></Button></Popconfirm>}}
    },
    // {
    //   title: '',
    //   dataIndex: '',
    //   key: 'y',
    //   width:20,
    //   render: (dataIndex, row) => { if(row.status == "عدم تایید") { return <Tooltip title="شما این پیشنهاد را رد کرده‌اید"><Button disabled={true} onClick={this.reject.bind(this, dataIndex, row.packet_slug)} style={{fontSize:"12px", border:"hidden", backgroundColor:"red", borderRadius:"10px", color: "transparent", textShadow:"0 0 5px rgba(0,0,0,0.5)"}}><b>رد</b></Button></Tooltip>}
    //                                 else if (row.status == "تایید") {return <Popconfirm  onConfirm={this.reject.bind(this, dataIndex, row.packet_slug)} title="از حذف پیشنهاد مطمئن هستید؟" okText="بله" cancelText="خیر"><Button style={{fontSize:"12px", border:"hidden", backgroundColor:"aliceblue", borderRadius:"10px"}}>انصراف</Button></Popconfirm>}
    //                                 else { return <Popconfirm  onConfirm={this.reject.bind(this, dataIndex, row.packet_slug)} title="از حذف پیشنهاد مطمئن هستید؟" okText="بله" cancelText="خیر"><Button style={{fontSize:"12px", border:"hidden", backgroundColor:"red", color:"white", borderRadius:"10px"}}><b>رد</b></Button></Popconfirm> }}
    // },
  ];

  accept(dataIndex, slug){
    const token = localStorage.getItem('token');
    const current_packet = this.state.packet_offer;
    Axios.put(`http://127.0.0.1:8000/api/v1/advertise/offer/`,
        {
          type: "ACCEPT",
          slug: dataIndex.slug,
          packet: slug
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            message.success("شما پیشنهادی را قبول کرده‌اید. الان برو پرداخت کن")
            this.componentDidMount(); //: i dont know this is the 
        })
        .catch(error => console.error(error));
  }

  reject(dataIndex, slug){
    const token = localStorage.getItem('token');
    const current_packet = this.state.packet_offer;
    Axios.put(`http://127.0.0.1:8000/api/v1/advertise/offer/`,
        {
          type: "REJECT",
          slug: dataIndex.slug,
          packet: slug
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            message.success("پیشنهاد توسط شما لغو شد")
            this.componentDidMount();
        })
        .catch(error => console.error(error));
  }

  cancle(slug, packet_slug){
    const token = localStorage.getItem('token');
    const current_packet = this.state.packet_offer;
    Axios.put(`http://127.0.0.1:8000/api/v1/advertise/offer/`,
        {
          type: "CANCLE",
          slug: slug,
          packet: packet_slug
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            message.success("پیشنهاد توسط شما لغو شد")
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