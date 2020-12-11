import React, { Component } from "react";
import Axios from "axios";
import CreateTravel from "../components/travel/CreateTravel";
import TravelList from "../components/travel/TravelUser";
import { config } from "../Constant";

var url = config.url.API_URL;

class TravelProfile extends Component {
  state = {
    travel_user: [],
    travel_user_completed: [],
    loading: true,
  };

  componentDidMount() {
    window.scroll(0, 0);
    document.title = "بیلیگ - لیست سفرهای من";
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/advertise/travels/`, {
      headers: { Authorization: `Token ${token}` },
    }).then((res) => {
      this.setState({
        travel_user: res.data,
        loading: false,
      });
    });

    Axios.get(`${url}api/v1/advertise/travels/completed/`, {
      headers: { Authorization: `Token ${token}` },
    }).then((res) => {
      this.setState({
        travel_user_completed: res.data,
        loading: false,
      });
    });
  }

  callbackFunction = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <div>
        <CreateTravel parentCallback={this.callbackFunction} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TravelList
            parentCallback={this.callbackFunction}
            data={this.state.travel_user}
            data1={this.state.travel_user_completed}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}

export default TravelProfile;
