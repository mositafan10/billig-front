import React, { Component } from "react";
import { List, Avatar, Col, Row, Spin, Card } from "antd";
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
                  <Row>
                    <Col
                      span={24}
                      style={{ textAlign: "center" }}
                    >
                      {item.owner != null ? (
                        <div>
                          <Avatar
                            src={`${url}dstatic/media/${item.picture}`}
                          ></Avatar>
                          <p style={{ marginTop: "5px" }}> {item.name} </p>
                        </div>
                      ) : (
                        <div>
                          <Avatar
                            style={{
                              backgroundColor: "white",
                              color: "black",
                              border: "1px solid",
                            }}
                            icon={<UserOutlined />}
                          ></Avatar>
                          <p style={{ marginTop: "5px" }}>کاربر مهمان</p>
                        </div>
                      )}
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

export default CommentsBilllig;
