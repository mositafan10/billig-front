import React, { Component } from "react";
import { List, Avatar, Col, Row, Spin, Card } from "antd";
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
      <div>
        {this.state.loading ? (
          <div style={{ marginTop: "100px" }}>
            <Spin />
          </div>
        ) : (
          <List
            locale={{
              emptyText: <div>دیگران هنوز در مورد شما اظهارنظر نکرده‌اند.</div>,
            }}
            grid={{
              gutter: 24,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={this.state.comments}
            renderItem={(item) => (
              <List.Item>
                <Card>
                  <Row style={style_center}>
                    <Col span={24} style={{ textAlign: "center" }}>
                      <div>
                        <a
                          target="_blank"
                          href={`${url}users/` + item.owner_slug}
                        >
                          <Avatar
                            src={`${url}dstatic/media/${item.owner_avatar}`}
                          ></Avatar>
                        </a>
                        <p style={{ marginTop: "5px" }}> {item.owner_name} </p>
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
