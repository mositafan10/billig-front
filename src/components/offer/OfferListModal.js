import React from 'react';
import { Button, Modal } from 'antd';
import PacketOffer from '../packet/PacketOffer';

class OfferListModal extends React.Component {

    state = {
        offer_visible: false,
    }

    offerlistmodal = () => {
        this.setState({
          offer_visible: true
        });
    }
  
    handleCancel = () => {
        this.setState({
          offer_visible: false,
        });
    };
  
    render(){
        return(
            <div>
                <Button style={{border:"hidden", fontSize:"12px", borderRadius:"10px"}} onClick={this.offerlistmodal}> پیشنهادها </Button> <span>{this.props.count}</span>
                <Modal
                    visible={this.state.offer_visible}
                    title=" پیشنهادها"
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    okText="بازگشت"
                    okButtonProps={{textAlign:"center",}}
                    cancelButtonProps={{hidden:"true"}}
                    style={{fontFamily:"IRANSans", textAlign:"center", overflow:"hidden", borderRadius:"10px"}}
                    width="80%"
                    bodyStyle={{borderRadius:"20px"}}
                    maskStyle={{borderRadius:"20px"}}
                    >
                    <PacketOffer data={this.props.data}/>
                </Modal>
            </div>
        );
    }
}

export default OfferListModal;