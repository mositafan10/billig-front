import React from 'react';
import { List, Button } from 'antd';
import Axios from 'axios';

const token = localStorage.getItem('token');
class FriendList extends React.Component {

    state = {
        friend_list :[]
    }    

    componentDidMount(){
        Axios.get(`http://127.0.0.1:8000/api/v1/account/friend_list/`,
        { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then(res => 
            this.setState({
                friend_list: res.data
            }))
        .catch(error => console.log(error))
    }
    
    render(){
        return(
            <List
        // grid={{ gutter: 10, column: 1 }}
        // itemLayout="verical"
        size="small"
        dataSource={this.state.friend_list}
        renderItem={item => (
          <List.Item 
            key={item.title}
            actions={[
            //   <IconText1 icon={StarOutlined} onChange text={item.offer_count} key="list-vertical-star-o" />,
            //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            <Button style={{borderRadius:"8px",fontSize:"14px"}}>ارسال پیام</Button>
            ]}

            >
            <List.Item.Meta style={{textAlign:"left"}}
            //   avatar={<a  href={'/users/' + item.owner} > <Avatar src={item.avatar} /></a>}
            //   title={<a href={item.id}>{item.title}</a>}
              description={item.following}
            />
          </List.Item>
        )}
      />   
        )
    }
}

export default FriendList;