import React, { Component } from 'react';
import Axios from 'axios';
import { Table, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';


class Bookmark_packet extends Component {

    state = {
        bookmarks: [],
    }

    columns = [
        {
          title: '',
          dataIndex: 'packet_slug',
          key: 'packet_slug',
          render: (dataIndex, row) => 
            <Popconfirm
              title="آیا از حذف آگهی مطمئن هستید ؟"
              onConfirm={this.delete.bind(this, dataIndex, row.id)}
              onCancel={this.cancel}
              okText="بله"
              cancelText="خیر"
              >
              <a href="#">حذف</a>
            </Popconfirm> ,
        },
        { 
            title: 'آگهی',
            dataIndex: 'packet_title', 
            key: 'departure',
            align:"right",
        render: (dataIndex, row) => <Link to={row.packet_slug}>{dataIndex}</Link>
        },
      ];

    delete = (dataIndex, id) => {
        const current_packet = this.state.bookmarks;
        console.log("id",id);
        console.log("dataIndex",dataIndex);
        const token = localStorage.getItem('token');
        Axios.delete(`http://127.0.0.1:8000/api/v1/advertise/packet/bookmark/${dataIndex}/`,      
        { headers: {"Authorization" : `Bearer ${token}`} })
              .then(res => {
                this.setState({
                  bookmarks: current_packet.filter(bookmarks => bookmarks.id !== id),
                });
                console.log(res.data);  
            })
            .catch(error => console.error(error));
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        Axios.get(`http://127.0.0.1:8000/api/v1/advertise/packet/bookmark/list/`,
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
                this.setState({
                    bookmarks: res.data
                })
            })
    }

    render() {
        return (
            <div>
          <Table 
            locale={{emptyText:"نشانی وجود ندارد"}}
            style={{padding:"30px 30px 30px 30px"}}
            columns={this.columns}
            dataSource={this.state.bookmarks} />
        </div>
        );
    }
}

export default Bookmark_packet;