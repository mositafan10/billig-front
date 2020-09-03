import React, { Component } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

class LoadingIPG extends Component {
    render() {
        return (
            <div style={{textAlign:"center"}}>
                در حال انتقال به صفحه انتقال
                <LoadingOutlined />
            </div>
        );
    }
}

export default LoadingIPG;