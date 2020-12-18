import React, { Component } from 'react';
import { Tabs } from 'antd';
import CommentList from './CommentList';
import CommentListMe from './CommentListMe';
const { TabPane } = Tabs;


class AllComments extends Component {
    render() {
        return (
            <div>
        <Tabs             
          defaultActiveKey="1"
          type="card"
          style={{ textAlign: "center", fontSize: "25px" }}
          centered>
          <TabPane tab="نظرات دیگران" key="1">
            <CommentList />
          </TabPane>
          <TabPane tab="نظرات من" key="2">
            <CommentListMe />
          </TabPane>
        </Tabs>
            </div>
        );
    }
}

export default AllComments;