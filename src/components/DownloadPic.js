import React from 'react';
import Axios from 'axios';

class DownloadPic extends React.Component {

    state = {
        url: "",
        loading: true
    }


    componentDidMount () {
        Axios.get(`http://127.0.0.1:8000/api/v1/advertise/get_picture/${this.props.data}`)
        .then((res) => this.setState({
            url: res.data.image_file
        }))
    }

    componentDidUpdate () {
        if (this.state.loading == true) {
        Axios.get(`http://127.0.0.1:8000/api/v1/advertise/get_picture/${this.props.data}`)
        .then((res) => this.setState({
            url: res.data.image_file
        }))
        this.setState({
            loading: false
        })
        }
    }

    render(){
        return(
            <div>
                <img
                src = {`http://127.0.0.1/dstatic/${this.state.url}`}
                style = { {margin:"10px 30px 10px -90px", borderRadius:"8px"}}
                width = {this.props.size}
                >
                </img>
            </div>
        )
    }
}

export default DownloadPic;