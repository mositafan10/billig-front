import React from "react";
import { Row, Col, Button, Divider, Card } from "antd";
import UploadProfilePicture from "../utils/UploadProfilePicture";
import EditProfileForm from "./EditProfileForm";
import Axios from "axios";
import { config } from "../../Constant";
import Item from "antd/lib/list/Item";

var url = config.url.API_URL;

const style_left = { display: "flex", justifyContent: "left" };
const style_right = { display: "flex", justifyContent: "right" };

class EditProfile extends React.Component {
  state = {
    user_profile: {},
    visible: false
  };

  componentDidMount() {
    const userID = localStorage.getItem("user");
    Axios.get(`${url}api/v1/account/users/profile/${userID}`).then((res) => {
      this.setState({
        user_profile: res.data,
      });
    });
  }

  showedit = () => {
    if (this.state.visible){
      this.setState({visible:false})
  }
    else {
      this.setState({visible:true})
  }
  }

  callbackFunction = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <UploadProfilePicture
                  update={this.callbackFunction}
                  data={this.state.user_profile.picture}
                />
              </Col>
            </Row>
            <br />
            <Card
                style={{ borderRadius: "20px" }}
                title={this.state.user_profile.name}
              >
                <Row style={style_right}>
                  <Col
                    style={style_right}
                    xs={14}
                    sm={14}
                    md={14}
                    lg={14}
                    xl={14}
                  >
                    <h4>ایمیل</h4>
                  </Col>
                  <Col
                    style={style_left}
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    {this.state.user_profile.email}
                  </Col>
                </Row>
                <hr style={{ color: "aliceblue" }} />
                <Row style={style_right}>
                  <Col
                    style={style_right}
                    xs={14}
                    sm={14}
                    md={14}
                    lg={14}
                    xl={14}
                  >
                    <h4>کشور</h4>
                  </Col>
                  <Col
                    style={style_left}
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    {this.state.user_profile.country && this.state.user_profile.country.name}
                  </Col>
                  </Row>
                  <hr style={{ color: "aliceblue" }} />
                  <Row style={style_right}>
                  <Col
                    style={style_right}
                    xs={14}
                    sm={14}
                    md={14}
                    lg={14}
                    xl={14}
                  >
                    <h4>شهر</h4>
                  </Col>
                  <Col
                    style={style_left}
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    {this.state.user_profile.city && this.state.user_profile.city.name}
                  </Col>
                </Row>
                { this.state.user_profile.account_number &&
                <div>
                <hr style={{ color: "aliceblue" }} />
                  <Row style={style_right}>
                  <Col
                    style={style_right}
                    xs={14}
                    sm={14}
                    md={14}
                    lg={14}
                    xl={14}
                  >
                    <h4>شماره شبا</h4>
                  </Col>
                  <Col
                    style={style_left}
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    {this.state.user_profile.account_number}
                  </Col>
                </Row>
                </div>
                }
              </Card>
              <br/>
              <Button onClick={this.showedit} style={{fontSize:"14px", borderRadius:"10px"}} >ویرایش پروفایل</Button>
            <Divider />
            <div style={{display: this.state.visible ? "block" : "none"}}>
            <EditProfileForm
              data={this.state.user_profile}
              update={this.callbackFunction}
            />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditProfile;
