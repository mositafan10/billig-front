import React from 'react';
import { List, Avatar, Button } from 'antd';
import Axios from 'axios';

const token = localStorage.getItem('token');

class PacketUserList extends React.Component {

    state = {

        packet_user: []
    }

    componentDidMount(){
        Axios.get('http://127.0.0.1:8000/api/v1/advertise/user_packet/',{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                this.setState({
                    packet_user: res.data
                });
                console.log(res.data);  
            })
            .catch(error => console.error(error));
    }

    render (){
    return (
  <List
    itemLayout="horizontal"
    dataSource={this.state.packet_user}
    renderItem={item => (
      <List.Item 
        actions={[
         
            <Button style={{borderRadius:"8px"}} > ویرایش </Button>,
            <Button style={{borderRadius:"8px"}} > حذف </Button>,
            <Button style={{borderRadius:"8px"}} > پیشنهادها </Button>
           
        ]}
        >
        
        <List.Item.Meta
        //   style={{textAlign:"right"}}
        //   avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href={item.id}>{item.title}</a>}
        //   description={item.description}
        
        />
      </List.Item>
    )}
  />
    );
    }
}

export default PacketUserList;