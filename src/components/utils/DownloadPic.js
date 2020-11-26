import React from 'react';
import Axios from 'axios';
import { Spin } from 'antd';
import  { LoadingOutlined } from '@ant-design/icons';
import { config } from '../../Constant';

var url = config.url.API_URL;
const antIcon = <LoadingOutlined type="loading" style={{fontsize: 24, textAlign:"center"}} spin />; {/*should be place in center*/}

class DownloadPic extends React.Component {

    state = {
        url: "",
        loading: true
    }

    componentDidMount(){
        Axios.get(`${url}api/v1/advertise/get_picture/${this.props.data}`)
        .then((res) => this.setState({
            url: res.data.image_file
        }))
    }

    render(){
        return(
            <div>
                {this.props.data ?
                <img
                src = {`${url}dstatic/${this.state.url}`}
                style = { {borderRadius:"10px"}}
                width = {this.props.size}
                
                >
                </img>
                :
                <Spin indicator={antIcon}></Spin>}
            </div>
        )
    }
}

export default DownloadPic;