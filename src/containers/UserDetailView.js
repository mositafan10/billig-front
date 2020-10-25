import React from "react";
import Axios from "axios";
import { Card, Tabs, Rate, Space } from "antd";
import { config } from "../Constant";
import CommentUser from "../components/comment/CommentUser";
import { Breakpoint } from "react-socks";
import {
    InstagramOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    FacebookOutlined,
  } from "@ant-design/icons";

var url = config.url.API_URL;
const { TabPane } = Tabs;

class UserProfile extends React.Component {
  state = {
    user_profile: [],
    social: []
  };

  componentDidMount() {
    const userID = this.props.match.params.userID;
    Axios.get(`${url}api/v1/account/users/profile/${userID}`).then((res) => {
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

  render() {
    const userID = this.props.match.params.userID;
    return (
      <div>
        <Breakpoint medium up>
          <div style={{ textAlign: "center" }}>
            <img
              width={300}
              // alt="profile pic"
              style={{ borderRadius: "10px" }}
              src={`${url}dstatic/${this.state.user_profile.picture}`}
            />
            <br />
            <Card bordered={false}>
              <h3>{this.state.user_profile.name}</h3>
              <Rate
                allowHalf
                value={this.state.user_profile.score}
                disabled={true}
              />
              <br/><br/>
              <Space>
              { this.state.social[0] && this.setIcon(this.state.social[0].account_type ,this.state.social[0].address)  }
              { this.state.social[1] && this.setIcon(this.state.social[1].account_type ,this.state.social[0].address)  }
              { this.state.social[2] && this.setIcon(this.state.social[2].account_type ,this.state.social[0].address)  }
              { this.state.social[3] && this.setIcon(this.state.social[3].account_type ,this.state.social[0].address)  }
              </Space>
            </Card>
            <br />
            <Tabs tabPosition="top" style={{ textAlign: "center" }}>
              <TabPane tab="نظرات دیگران " key="1">
                <CommentUser userID={userID} />
              </TabPane>
            </Tabs>
          </div>
        </Breakpoint>
        <Breakpoint small down>
          <div style={{ textAlign: "center" }}>
            <img
              width={300}
              // alt="profile pic"
              style={{ borderRadius: "10px" }}
              src={`${url}dstatic/${this.state.user_profile.picture}`}
            />
            <br />
            <Card bordered={false}>
              <h3>{this.state.user_profile.name}</h3>
              <Rate
                allowHalf
                value={this.state.user_profile.score}
                disabled={true}
              />
              <br />
              <br />
              <p>{this.state.user_profile.bio}</p>
            </Card>
            <br />
            <Tabs tabPosition="top" style={{ textAlign: "center" }}>
              <TabPane tab="نظرات دیگران " key="1">
                <CommentUser />
              </TabPane>
            </Tabs>
          </div>
        </Breakpoint>
      </div>
    );
  }
}

export default UserProfile;
