import React, { Component } from "react";
import { List, Avatar, Col, Row, Spin, Card } from "antd";
import { Link } from 'react-router-dom';
import Axios from "axios";
import { config } from "../../Constant";

const url = config.url.API_URL;
const style_center = {
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
};

class CommentList extends Component {
  state = {
    comments: [],
    loading: true,
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/account/myComments/`, {
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
      <div>
        {this.state.loading ? (
          <div style={{ marginTop: "100px" }}>
            <Spin />
          </div>
        ) : (
          <List
            locale={{
              emptyText: <div>شما هنوز در مورد دیگران اظهارنظر نکرده‌اید.</div>,
            }}
            grid={{
              gutter: 24,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              xxl: 5,
            }}
            dataSource={this.state.comments}
            renderItem={(item) => (
              <List.Item>
                <Card>
                  <Row style={style_center}>
                    <Col span={24} style={{ textAlign: "center" }}>
                      <div>
                        <Link
                          to={`${url}users/` + item.receiver_slug}
                        >
                          <Avatar
                            src={`${url}dstatic/media/${item.receiver_avatar}`}
                          ></Avatar>
                        <p style={{ marginTop: "5px", color:"black" }}> {item.receiver_name} </p>
                        </Link>
                      </div>
                      <hr style={{ color: "aliceblue" }} />
                      <p style={{ textAlign: "center", marginTop: "20px" }}>
                        {item.text}
                      </p>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }
}

export default CommentList;
