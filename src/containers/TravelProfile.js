import React, { Component } from 'react';
import CreateTravel from '../components/CreateTravel';
import TravelList from '../components/TravelUser';
import { Divider } from 'antd';
import Axios from 'axios';

class TravelProfile extends Component {

    state = {
        travel_user : []
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        Axios.get('http://127.0.0.1:8000/api/v1/advertise/travellist/',{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                this.setState({
                    travel_user: res.data
                });
                console.log(res.data);  
            })
            .catch(error => console.error(error));
    }

    callbackFunction = () => {
        this.componentDidMount()
    }

    render() {
        return (
            <div>
                <CreateTravel parentCallback = {this.callbackFunction}/> 
                <Divider />
                <TravelList parentCallback = {this.callbackFunction} data={this.state.travel_user}/>
            </div>
        );
    }
}

export default TravelProfile;