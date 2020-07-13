import React from 'react';
import Axios from 'axios';


class UserOffer extends React.Component {
    
    componentDidMount(){
        const token = localStorage.getItem('token');
        Axios.get('http://127.0.0.1:8000/api/v1/advertise/getuseroffer/',
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
    }
    render(){
        return(
            <a>...</a>
        )
    }
}

export default UserOffer;