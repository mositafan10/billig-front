import React, { Component } from "react";
import { Comment, Avatar, Tooltip, List, Rate } from "antd";
import moment from "moment";
import Axios from "axios";
import { config } from "../../Constant";
import TimeDiff from "../utils/TimeDiff";
import { Breakpoint } from "react-socks";

const url = config.url.API_URL;

class CommentUser extends Component {
  state = {
    comments: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    Axios.get(`${url}api/v1/account/comments/${this.props.userID}`).then((res) =>
      this.setState({
        comments: res.data,
        loading: false,
      })
    );
  }

  render() {
    return (
      <div>
        <p> {this.state.comments.length} نقطه نظر درباره ایشان ثبت شده است.</p>

        <Breakpoint medium up>
          <List
            locale={{ emptyText: "در مورد کاربر نظری ثبت نشده است" }}
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
            itemLayout="horizontal"
            dataSource={this.state.comments}
            renderItem={(item) => (
              <List.Item>
                <Comment
                  author={item.owner_name}
                  avatar={
                    <Avatar src={`${url}dstatic/media/${item.owner_avatar}`} />
                  }
                  content={<p>{item.text}</p>}
                  datetime={
                    <Rate
                      disabled
                      style={{ fontSize: "small" }}
                      value={item.score}
                    />
                  }
                />
              </List.Item>
            )}
          />
        </Breakpoint>
        <Breakpoint small down>
          <List
            locale={{ emptyText: "در مورد کاربر نظری ثبت نشده است" }}
            style={{ padding: "10px" }}
            itemLayout="horizontal"
            dataSource={this.state.comments}
            renderItem={(item) => (
              <List.Item>
                <Comment
                  author={item.owner_name}
                  avatar={
                    <Avatar src={`${url}dstatic/media/${item.owner_avatar}`} />
                  }
                  content={<p>{item.text}</p>}
                  datetime={
                    <Rate
                      disabled
                      style={{ fontSize: "small" }}
                      value={item.score}
                    />
                  }
                />
              </List.Item>
            )}
          />
        </Breakpoint>
      </div>
    );
  }
}

export default CommentUser;
