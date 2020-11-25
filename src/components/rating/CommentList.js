import React, { Component } from "react";
import { List, Avatar, Col, Row, Spin } from 'antd';
import Axios from "axios";import {config} from '../../Constant';

const url = config.url.API_URL;

class CommentList extends Component {
    state = {
        comments: [],
        loading: true
    }
  componentDidMount() {
      const token = localStorage.getItem("token") 
    Axios.get(`${url}api/v1/account/comments/`, {
      headers: { Authorization: `Token ${token}` },
    })
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
    <div style={{display:"flex", justifyContent:"center", marginTop:"30px"}}>
        {this.state.loading ? (
            <div style={{ marginTop: "100px" }}>
              <Spin />
            </div>
          ) : (
        <List
                locale={{ emptyText: <div>دیگران هنوز در مورد شما اظهارنظر نکرده‌اند.</div> }}
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
                        margin: "25px 25px 15px 15px",
                        padding: "15px 15px 5px 15px",
                        width: "240px",
                        height: "250px",
                      }}
                    >
                      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{textAlign:"center"}}>
                        <div>
                        <a target="blank" href={`${url}users/` + item.owner_slug}>
                        <Avatar
                          src={`${url}dstatic/media/${item.owner_avatar}`}
                        ></Avatar>
                        </a>
                        <p style={{marginTop:"5px"}}>  {item.owner_name} </p>
                        </div> 
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

export default CommentList;
