import React, { Component } from "react";
import { List, Avatar, Col, Row, Spin } from "antd";
import Axios from "axios";
import { config } from "../../Constant";
import { UserOutlined } from "@ant-design/icons";

const url = config.url.API_URL;

class CommentsBilllig extends Component {
  state = {
    comments: [],
    loading: true,
  };
  componentDidMount() {
    Axios.get(`${url}api/v1/account/comments_billlig/`)
      .then((res) =>
        this.setState({
          comments: res.data,
          loading: false,
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div style={{ marginTop: "100px" }}>
            <Spin />
          </div>
        ) : (
          <List
            locale={{ emptyText: "اظهارنظر وجود ندارد" }}
            grid={{
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            dataSource={this.state.comments}
            renderItem={(item) => (
              <div>
                <Row
                  style={{
                    color: "black",
                    border: "1px solid",
                    boxShadow:"0 0 12px -2px",
                    borderRadius: "10px",
                    margin: "15px 25px 15px 15px",
                    padding: "15px 15px 5px 15px",
                    width: "240px",
                    height: "250px",
                    alignItems:""
                  }}
                >
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{textAlign:"center"}}>
                    {item.owner != null ? 
                    <div>
                    <Avatar
                      src={`${url}dstatic/media/${item.picture}`}
                    ></Avatar>
                    <p style={{marginTop:"5px"}}>  {item.name} </p>
                    </div> 
                    : 
                    <div>
                    <Avatar
                    style={{backgroundColor:"white", color:"black", border:"1px solid"}}
                      icon={<UserOutlined/>}
                    ></Avatar>
                    <p style={{marginTop:"5px"}}>کاربر مهمان</p>
                    </div>
                    }
                    <hr style={{color:"aliceblue"}}/>
                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                      {item.text}
                    </p>
                  </Col>
                </Row>
              </div>
            )}
          />
        )}
      </div>
    );
  }
}

export default CommentsBilllig;
