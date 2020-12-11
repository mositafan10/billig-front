import React, { Component } from "react";
import { List, Avatar, Spin, Card } from "antd";
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
              xl: 4,
              xxl: 5,
            }}
            pagination={{
              hideOnSinglePage: true,
              pageSize: this.props.count,
            }}
            dataSource={this.state.comments}
            renderItem={(item) => (
              <List.Item>
                <Card
                title={item.owner != null ? (
                  <div style={{textAlign:"center"}}>
                    <Avatar
                      src={`${url}dstatic/media/${item.picture}`}
                    ></Avatar>
                    <p style={{ marginTop: "5px" }}> {item.name} </p>
                  </div>
                ) : (
                  <div style={{textAlign:"center"}}>
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
                >
                      <p >
                        {item.text}
                      </p>
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
