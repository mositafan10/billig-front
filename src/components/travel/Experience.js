import React, { Component } from 'react';
import { Button } from 'antd';

class Experience extends Component {
    render() {
        return (
            <div>
        <Button
          onClick={this.showmodal}
          style={{
            border: "hidden",
            backgroundColor: "#46A0AE",
            color:"white",
            borderRadius: "10px",
            fontSize:"12px"
          }}
        >
         تجربیات سفر
        </Button>
            </div>
        );
    }
}

export default Experience;