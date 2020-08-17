import React from 'react';
import Axios from 'axios';
import { Spin } from 'antd';
import  { LoadingOutlined } from '@ant-design/icons';


const antIcon = <LoadingOutlined type="loading" style={{fontsize: 24, textAlign:"center"}} spin />; {/*should be place in center*/}

class DownloadPic extends React.Component {

    state = {
        url: "",
        loading: true
    }


    componentDidUpdate = (prevProps) => {
        if (this.props.data !== prevProps.data) {
        Axios.get(`http://127.0.0.1:8000/api/v1/advertise/get_picture/${this.props.data}`)
        .then((res) => this.setState({
            url: res.data.image_file
        }))
    }
    }

    componentDidMount = () => {
        Axios.get(`http://127.0.0.1:8000/api/v1/advertise/get_picture/${this.props.data}`)
        .then((res) => this.setState({
            url: res.data.image_file
        }))
    }

    render(){
        return(
            <div>
                {this.props.data ?
                <img
                src = {`http://127.0.0.1/dstatic/${this.state.url}`}
                style = { {margin:"10px 50px 10px -90px", borderRadius:"8px"}}
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