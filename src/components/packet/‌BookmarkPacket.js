import React from 'react';
import { Button, message } from 'antd';
import Axios from 'axios';

class Bookmark extends React.Component {

    handlebookmark = () => {
        const token = localStorage.getItem('token');
        const slug = this.props.data;
        Axios.get(`http://127.0.0.1:8000/api/v1/advertise/packet/bookmark/${slug}/`,
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
                if(res.data == true)
                    this.setbookmark();
                else
                (message.info("قبلا نشان شده است"))
            })
    }

    setbookmark = () => {   
        const token = localStorage.getItem('token');
        const slug = this.props.data;
        Axios.post(`http://127.0.0.1:8000/api/v1/advertise/packet/bookmark/${slug}/`,{},
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(message.success("آگهی نشان شد"))
    }

    render(){
        return(
            <div>
            <Button onClick={this.handlebookmark} style={{fontSize:"13px", borderRadius:"10px"}}>نشان کردن آگهی</Button><br/><br/>
            </div>
            )
    }
}

export default Bookmark;