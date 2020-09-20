import React, { Component } from 'react';
import { Divider } from 'antd';
import Axios from 'axios';
import CreateTravel from '../components/travel/CreateTravel';
import TravelList from '../components/travel/TravelUser';
import { config } from '../Constant';

var url = config.url.API_URL

class TravelProfile extends Component {

    state = {
        travel_user : [],
        loading: true
    }

    componentDidMount(){
        document.title = 'بیلیگ - لیست سفرهای من';
        const token = localStorage.getItem('token');
        Axios.get(`${url}api/v1/advertise/travellist/`,{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                this.setState({
                    travel_user: res.data,
                    loading: false
                });
            })
            .catch(error => console.error(error));
    }

    callbackFunction = () => {
        this.componentDidMount()
    }

    render() {
        return (
            <div >
                <CreateTravel parentCallback = {this.callbackFunction}/> 
                <div style={{display:"flex", justifyContent:"center"}}>
                <TravelList parentCallback = {this.callbackFunction} data={this.state.travel_user} loading={this.state.loading}/>
                </div>
            </div>
        );
    }
}

export default TravelProfile;