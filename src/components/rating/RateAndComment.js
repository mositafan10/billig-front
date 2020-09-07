import React, { Component } from 'react';
import { message, Button } from 'antd';

class RateAndComment extends Component {
    alert = () => {
        message.success("دارم درست میشم صبر کن")
    }

    render() {
        return (
            <div>
                <Button onClick={this.alert.bind(this)} style={{fontSize:"12px", border:"hidden", color:"white", backgroundColor:"green", borderRadius:"10px"}}>امتیازدهی</Button>
            </div>
        );
    }
}

export default RateAndComment;