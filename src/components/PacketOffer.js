import React from 'react'; 
import { List, Avatar, Button } from 'antd';
import Axios from 'axios';


class PacketOffer extends React.Component { 
  
  state = {
    packet_offer: []
  }
  
  
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
    <List
    itemLayout="horizontal"
    dataSource={this.state.packet_offer}
    locale={{emptyText:".پیشنهادی وجود ندارد"}}
    renderItem={item => (
      <List.Item
      actions={[
        <Button style={{borderRadius:"8px", fontSize:"12px"}}> قبول </Button>,
        <Button style={{borderRadius:"8px", fontSize:"12px"}}>رد </Button>,
        <Button style={{borderRadius:"8px", fontSize:"12px"}}>حذف </Button>
      ]}
      >
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">{item.price}</a>}
          description={item.description}
        />
      </List.Item>
    )}
  />
    );
    }
}

export default PacketOffer;