import React from 'react';
import Axios from 'axios';
import { List , Button , Popconfirm , message, Avatar } from 'antd';
import Modal from 'antd/lib/modal/Modal';

class TravelList extends React.Component {

    state = {
        travel_user: [],
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        Axios.get('http://127.0.0.1:8000/api/v1/advertise/travellist/',{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                this.setState({
                    travel_user: res.data
                });
                console.log(res.data);  
            })
            .catch(error => console.error(error));
    }

    cancel(e) {
      console.log(e);
      message.error('درخواست لغو شد');
    }

    delete = (id) => {
      const current_packet = this.state.travel_user;
      const token = localStorage.getItem('token');
      Axios.delete(`http://127.0.0.1:8000/api/v1/advertise/travel/${id}/`,{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
              this.setState({
                travel_user: current_packet.filter(travel_user => travel_user.id !== id),
              });
              console.log(res.data);  
          })
          .catch(error => console.error(error));
    }
    render(){
        return(
            <List
            itemLayout="horizontal"
            locale={{emptyText:".سفری ثبت نکرده‌اید"}}
            dataSource={this.state.travel_user}
            renderItem={item => (
              <List.Item 
                actions={[
                    <Button style={{borderRadius:"8px", fontSize:"12px"}} > ویرایش </Button>,
                    <Button style={{borderRadius:"8px", fontSize:"12px"}} > پیشنهادها </Button>,
                    // <Button onClick={this.confirmdelete(item.id)} style={{borderRadius:"8px"}} > حذف </Button>,
                    <Popconfirm
                        title="آیا از حدف آگهی مطمئن هستید ؟"
                        onConfirm={this.delete.bind(this, item.id)}
                        onCancel={this.cancel}
                        okText="بله"
                        cancelText="خیر"
                        style={{fontSize:"12px"}}
                        >
                        <a href="#">حذف</a>
                    </Popconfirm>
                ]}
                >
                <List.Item.Meta
                  style={{textAlign:"left"}}
                  // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href={item.id}>{item.title}</a>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        );
    }
}

export default TravelList;