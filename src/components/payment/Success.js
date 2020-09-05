import React, { Component } from 'react';
import { Button } from 'antd';

class Success extends Component {
    render() {
        return (
            <div>
                <p>پرداخت شما با موفقیت انجام شد</p>   
                <Link to='/'><Button>بازگشت به صفحه اصلی </Button></Link>
            </div>
        );
    }
}

export default Success;