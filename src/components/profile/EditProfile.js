import React from "react";
import { Row, Col, Button, Divider, Card, Modal, Rate, Tooltip, Space } from "antd";
import { InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  FacebookOutlined } from "@ant-design/icons";
import UploadProfilePicture from "../utils/UploadProfilePicture";
import EditProfileForm from "./EditProfileForm";
import Axios from "axios";
import { config } from "../../Constant";
import { Link } from "react-router-dom";
import ResetPassword from "./ResetPassword";

var url = config.url.API_URL;

const style_left = { display: "flex", justifyContent: "flex-end" , fontSize:"16px"};
const style_right = { display: "flex", justifyContent: "right", fontSize:"16px" };

class EditProfile extends React.Component {
  state = {
    user_profile: {},
    visible: false,
    modalvisible: false,
    social: []
  };

  componentDidMount() {
    const userID = localStorage.getItem("user");
    const token = localStorage.getItem("token");
      Axios.get(`${url}api/v1/account/users/profile/pr/${userID}`,{ headers: {"Authorization" : `Token ${token}`} }).then((res) => {
      this.setState({
        user_profile: res.data,
      });
    });
    Axios.get(`${url}api/v1/account/socials/${userID}`).then((res) => {
      this.setState({
        social: res.data,
      });
    });
  }

  setIcon = (type, address) => {
    switch (type) {
      case "Linkdin":
        return <a style={{color:"black"}} href={`https://linkdin.com/${address}`}><LinkedinOutlined style={{fontSize:"35px"}} /></a>;
      case "Twitter":
        return <a style={{color:"black"}} href={`https://twitter.com/${address}`}><TwitterOutlined style={{fontSize:"35px"}}/></a>;
      case "Facebook":
        return <a style={{color:"black"}} href={`https://facebook.com/${address}`}><FacebookOutlined style={{fontSize:"35px"}}/></a>;
      case "Instagram":
        return <a style={{color:"black"}} href={`https://instagram.com/${address}`}><InstagramOutlined style={{fontSize:"35px"}}/></a>;    
      default:
        break;
    }
  }

  handleCancel = (e) => {
    this.setState({
      modalvisible: false,
    });
  };

  showedit = () => {
    this.setState({ modalvisible: true });
  };

  callbackFunction = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <div >
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
              style={{ borderRadius: "20px"}}
              title={this.state.user_profile.name}
            > 
              <Rate allowHalf value={this.state.user_profile.score} disabled={true} />
              <br/><br/>
              <Space>
              { this.state.social[0] && this.setIcon(this.state.social[0].account_type ,this.state.social[0].address)  }
              { this.state.social[1] && this.setIcon(this.state.social[1].account_type ,this.state.social[0].address)  }
              { this.state.social[2] && this.setIcon(this.state.social[2].account_type ,this.state.social[0].address)  }
              { this.state.social[3] && this.setIcon(this.state.social[3].account_type ,this.state.social[0].address)  }
              </Space>
              <Divider/>
              <div>
              <Row style={style_right}>
                <Col
                  style={style_right}
                  xs={14}
                  sm={14}
                  md={14}
                  lg={14}
                  xl={14}
                >
                  <h4>شماره موبایل</h4>
                </Col>
                <Col style={style_left} xs={10} sm={10} md={10} lg={10} xl={10}>
                  {this.state.user_profile.phone_number}
                </Col>
              </Row>
              </div>
              {this.state.user_profile.email &&
              <div>
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
                <Col style={style_left} xs={10} sm={10} md={10} lg={10} xl={10}>
                  {this.state.user_profile.email}
                </Col>
              </Row>
              </div>
              }
              {this.state.user_profile.country &&
              <div>
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
                <Col style={style_left} xs={10} sm={10} md={10} lg={10} xl={10}>
                  {this.state.user_profile.country &&
                    this.state.user_profile.country.name}
                </Col>
              </Row>
              </div>
              }
              { this.state.user_profile.city &&
                <div>
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
                <Col style={style_left} xs={10} sm={10} md={10} lg={10} xl={10}>
                  {this.state.user_profile.city &&
                    this.state.user_profile.city.name}
                </Col>
              </Row>
              </div>
              }
            </Card>
            <br />
            <Button
              onClick={this.showedit}
              style={{ fontSize: "14px", borderRadius: "10px" }}
            >
              ویرایش پروفایل
            </Button>
            <Modal
              onCancel={this.handleCancel}
              cancelText="بازگشت"
              okButtonProps={{ hidden: true }}
              visible={this.state.modalvisible}
              style={{ fontFamily: "VazirD" }}
            >
              <EditProfileForm
                data={this.state.user_profile}
                update={this.callbackFunction}
                social={this.state.social}
              />
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditProfile;
