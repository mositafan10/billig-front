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
    return <div>
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
                        borderRadius: "10px",
                        margin: "15px 25px 15px 15px",
                        padding: "20px 20px 20px 20px",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={24}
                        xxl={24}
                        style={{ textAlign: "center" }}
                      >
                        <hr />
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Avatar
                          src={`${url}dstatic/media/${item.receiver_avatar}`}
                        ></Avatar>
                        <span> {item.receiver} </span>
                        <p style={{ textAlign: "left", marginTop: "20px" }}>
                        </p><hr/>
                      </Col>
                    </Row>
                  </div>
                )}
              />
          )}
    </div>;
  }
}

export default CommentList;
