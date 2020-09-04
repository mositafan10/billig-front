import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const style={
    borderRadius:"10px",
}

class PageNotFound extends Component {
    render() {
        return (
                <Result
                 status="404"
                 subTitle="صفحه مورد نظر یافت نشد"
                 extra={<Link to='/'><Button style={style} type="primary">بازگشت صفحه اصلی</Button></Link>}
            />
        )
    }
}

export default PageNotFound;