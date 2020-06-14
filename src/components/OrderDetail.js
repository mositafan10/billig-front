import React from 'react';
import { Card } from 'antd';

const Detail = (props) => {
 
        return(
            <div style={{display:'flex', justifyContent:'center' , textAlign:"center"}}>
                <Card title={props.data.title} bordered={false} style={{width: 500 }}>
                    <p style={{textAlign:"center"}}>{props.data.title}</p>
                    <div>
                        {props.data.picture}
                    </div>
                </Card>
            </div>
        );
    
}

export default Detail;