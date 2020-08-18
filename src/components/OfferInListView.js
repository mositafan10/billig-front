import React from 'react';
import { Button, Modal, Space } from 'antd';
import OfferDetail from '../components/OfferInDetail';
import PacketOfferPublic from '../components/PacketOfferPublic';

const IconText1 = ({ text }) => (
    <Space style={{fontSize:"12px"}}>
      تعداد پیشنهاد : {text} 
    </Space>
  );

class OfferInListView extends React.Component {

    state = {
        offerModal: false
    }
    
      showOffer = () => {
        this.setState({
          offerModal: true
        })
    }
  
      handleCancel = () => {
        this.setState({
          offerModal: false,
        });
    };

    render(){
        return(
            <div>
                <Button style={{border:"hidden"}} onClick={this.showOffer}>
                    <IconText1 text={this.props.data.offer_count}/>
                </Button>
                <Modal
                    visible={this.state.offerModal}
                    width='80%'
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    okText="بازگشت"
                    okButtonProps={{textAlign:"center",}}
                    cancelButtonProps={{hidden:"true"}}
                    style={{fontFamily:"IRANSans", overflow:"hidden", borderRadius:"20px"}}
                    >
                    <PacketOfferPublic data={this.props.data.slug} /><br/>
                    <OfferDetail data={this.props.data.slug}></OfferDetail>
                </Modal>
            </div>
        )
    }
}

export default OfferInListView;