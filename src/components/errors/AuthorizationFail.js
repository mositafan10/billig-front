import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

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
                 {/* <Link to='/'><Button style={style} type="primary">بازگشت صفحه اصلی</Button></Link> */}
                 <Link to='/login'><Button style={style} type="primary">ورود به سایت</Button></Link>
                 </div>
                 <br/>
            </div>
            
        )
    }
}

export default AuthorizationFail;