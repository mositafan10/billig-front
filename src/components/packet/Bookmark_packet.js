import React, { Component } from 'react';
import Axios from 'axios';
import { Table, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { config } from '../../Constant'

var url = config.url.API_URL


class Bookmark_packet extends Component {

    state = {
        bookmarks: [],
    }

    columns = [
      { 
        title: 'آگهی',
        dataIndex: 'packet_title', 
        key: 'departure',
        align:"right",
        render: (dataIndex, row) => <Link to={row.packet_slug}>{dataIndex}</Link>
      },
      {
          title: '',
          dataIndex: 'packet_slug',
          key: 'packet_slug',
          width:20,
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
    ];

    delete = (dataIndex, id) => {
        const current_packet = this.state.bookmarks;
        console.log("id",id);
        console.log("dataIndex",dataIndex);
        const token = localStorage.getItem('token');
        Axios.delete(`${url}api/v1/advertise/packet/bookmark/${dataIndex}/`,      
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
        Axios.get(`${url}api/v1/advertise/packet/bookmark/list/`,
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
            scroll={{ x:300}}
            locale={{emptyText:"نشانی وجود ندارد"}}
            style={{padding:"30px 30px 30px 30px"}}
            columns={this.columns}
            dataSource={this.state.bookmarks} />
        </div>
        );
    }
}

export default Bookmark_packet;