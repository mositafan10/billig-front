import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import PacketForEdit from './PacketForEdit';
import Axios from 'axios';


class EditPacket extends Component {

    state = {
        offer_visible: false,
        packet: {}
    }

    offerlistmodal = () => {
        const token = localStorage.getItem('token');
        const packet_id = this.props.data;

        Axios.get(`http://127.0.0.1:8000/api/v1/advertise/packet/${packet_id}/`,
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            this.setState({
                packet: res.data,
                offer_visible: true
            });
            console.log(res.data);  
        })
        .catch(error => console.error(error));
    }
  
    handleCancel = () => {
        
        this.setState({
          offer_visible: false,
        });
    };
  
    render() {
        return (
            <div>
                <Button style={{border:"hidden", fontSize:"12px", borderRadius:"10px"}} onClick={this.offerlistmodal}>ویرایش</Button>
                <Modal
                    visible={this.state.offer_visible}
                    title="ویرایش آگهی"
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    okText="بازگشت"
                    okButtonProps={{textAlign:"center",}}
                    cancelButtonProps={{hidden:"true"}}
                    style={{fontFamily:"IRANSans", textAlign:"center", overflow:"hidden", borderRadius:"10px"}}
                    width="60%"
                    bodyStyle={{borderRadius:"20px"}}
                    maskStyle={{borderRadius:"20px"}}
                    >
                <PacketForEdit data={this.state.packet}/>
                </Modal>
            </div>
        );
    }
}

export default EditPacket;