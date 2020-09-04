import React, { Component } from 'react';
import Axios from 'axios';
import { Modal, Button } from 'antd';
import TravelEditForm from './TravelEditForm';
import { config } from '../../Constant';

var url = config.url.API_URL

class EditTravel extends Component {
    
    state = {
        offer_visible: false,
        travel: {}
    }

    offerlistmodal = () => {
        const token = localStorage.getItem('token');
        const travel_id = this.props.data;

        Axios.get(`${url}api/v1/advertise/travel/${travel_id}/`,
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            this.setState({
                travel: res.data,
                offer_visible: true
            });
            console.log(res.data);  
        })
        .catch(error => console.error(error));
    }
  
    handleCancel = () => {
        console.log("hi");
        this.setState({
          offer_visible: false,
        });
    };

    editsignal = () => {
        this.props.signal();
    }
    
    render() {
        return (
            <div>
                <Button style={{fontSize:"12px", borderRadius:"10px"}} onClick={this.offerlistmodal}>ویرایش</Button>
                <Modal
                    visible={this.state.offer_visible}
                    title="ویرایش سفر"
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    okText="بازگشت"
                    okButtonProps={{textAlign:"center",}}
                    cancelButtonProps={{hidden:"true"}}
                    style={{fontFamily:"IRANSans", textAlign:"center", overflow:"hidden", borderRadius:"10px"}}
                    width="50%"
                    bodyStyle={{borderRadius:"20px"}}
                    maskStyle={{borderRadius:"20px"}}
                    >
                <TravelEditForm cancle={this.handleCancel} signal={this.editsignal} data={this.state.travel}/>
                </Modal>
            </div>
        );
    }
}

export default EditTravel;

