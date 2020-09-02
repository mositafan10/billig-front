import React from 'react';
import { Modal, Button } from 'antd';


class OfferDetailView extends React.Component {

    state = {
        modalvisible: false,
    }

    showmodal = () => {
        this.setState({
            modalvisible: true
        })
    }

    onCancel = () => {
        this.setState({
            modalvisible: false,
        })
    }

    render(){
        return(
            <div>
                <Button 
                style={{fontSize:"12px", borderRadius:"8px"}}
                onClick={this.showmodal}>جزئیات</Button>
                <Modal 
                visible={this.state.modalvisible}
                onCancel={this.onCancel}
                title="جزئیات"
                >
                </Modal>
            </div>
        )
    }
}

export default OfferDetailView;