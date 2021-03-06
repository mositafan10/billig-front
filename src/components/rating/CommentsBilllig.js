import React, { Component } from "react";
import { List, Spin, Card } from "antd";
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
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              xxl: 6,
            }}
            pagination={{
              hideOnSinglePage: true,
              pageSize: this.props.count,
            }}
            dataSource={this.state.comments}
            renderItem={(item) => (
              <List.Item>
                <Card
                  title={
                    item.owner != null ? (
                      <div style={{ textAlign: "center" }}>
                        <img
                          src={`${url}dstatic/media/${item.picture}`}
                          width="50%"
                          height="auto"
                          style={{ borderRadius: "10px" }}
                        />
                        <p style={{ marginTop: "5px" }}> {item.name} </p>
                      </div>
                    ) : (
                      <div style={{ textAlign: "center" }}>
                      <UserOutlined style={{ fontSize: "110px" }} />
                      <p style={{ marginTop: "5px" }}>کاربر میهمان</p>
                      </div>
                    )
                  }
                >
                  <p>{item.text}</p>
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
