import React, { Component } from 'react';
import Axios from 'axios';

class ChatContacs extends Component {
    componentDidMount(){
        const token = localStorage.getItem('token');
        Axios.get('http://127.0.0.1:8000/api/v1/chat/getcontacs/',
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
    }

    render() {
        return (
            <div>
                sdhfkshf
            </div>
        );
    }
}

export default ChatContacs;