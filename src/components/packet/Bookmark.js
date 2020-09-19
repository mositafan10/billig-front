import React, { Component } from 'react';
import { Button, message } from 'antd';
import Axios from 'axios';
import { config } from '../../Constant';
var url = config.url.API_URL;


class Bookmark extends Component {
    bookmark = () => {
        const token = localStorage.getItem('token');
        Axios.post(`${url}api/v1/advertise/bookmarks/`,
        { packet: this.props.data},
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => { if(res.status === 201){return message.success("آگهی نشان شد")}})
        .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <Button style={{fontSize:"13px", borderRadius:"10px"}} onClick={this.bookmark.bind(this)}>نشان کردن آگهی</Button>
            </div>
        );
    }
}

export default Bookmark;