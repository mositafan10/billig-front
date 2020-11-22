import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { config } from '../../Constant';

var url = config.url.API_URL;

const style={
    borderRadius:"15px",
    margin:"5px 10px"
}

class AuthorizationFail extends Component {
    render() {
        return (
            <div>
                <Result
                 status="403"
                 subTitle="لطفا ابتدا وارد سایت شوید"
                 />
                 <div style={{display:"flex",justifyContent:"center"}}>
                 <a href={`${url}/login`}><Button style={style} type="primary">ورود به سایت</Button></a>
                 </div>
                 <br/>
            </div>
            
        )
    }
}

export default AuthorizationFail;