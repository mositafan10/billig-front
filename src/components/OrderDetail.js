import React from 'react';
import { Card, Button } from 'antd';

class Detail extends React.Component {
        render(){
        return(
            <div style={{display:'flex', justifyContent:'center' , textAlign:"center"}}>
                <Card title={this.props.data.title} bordered={false} style={{width: 500 }}>
                    <p style={{textAlign:"center"}}>{this.props.data.title}</p>
                    <div>
                        {this.props.data.picture}
                    </div>
                </Card>
            </div>
        );
    }
}

export default Detail;