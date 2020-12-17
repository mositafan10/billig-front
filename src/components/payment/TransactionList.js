import React, { Component } from "react";
import Axios from "axios";
import moment from "moment";
import { config } from "../../Constant";
import { Table, Spin, Tabs } from "antd";
const { TabPane } = Tabs;


var url = config.url.API_URL;


class TransactionList extends Component {
  state = {
    transactions: [],
    cashoutList: [],
    loading: true,
  };

  columns_payment = [
    {
      title: "تاریخ پرداخت",
      dataIndex: "create_at",
      key: "transId",
      align: "right",
      render: (dataIndex) => <p>{moment(dataIndex).format("DD MMM")}</p>,
    },
    {
      title: "مبلغ (تومان)",
      dataIndex: "amount",
      key: "transId",
      render: (dataIndex) => <p>{this.currency(dataIndex)}</p>
    },
    {
      title: "شماره تراکنش",
      dataIndex: "transId",
      key: "transId",
      render: (dataIndex) => <p>{dataIndex}</p>
    },
  ];

  columns_cashout = [
    {
      title: "تاریخ برداشت",
      dataIndex: "create_at",
      key: "transId",
      align: "right",
      render: (dataIndex) => <p>{moment(dataIndex).format("DD MMM")}</p>,
    },
    {
      title: "مبلغ (تومان)",
      dataIndex: "amount",
      key: "transId",
      render: (dataIndex) => <p>{this.currency(dataIndex)}</p>
    },
    {
      title: "شماره تراکنش",
      dataIndex: "transaction_id",
      key: "transaction_id",
      render: (dataIndex) => <p>{dataIndex}</p>
    },
  ];

  componentDidMount() {
    const token = localStorage.getItem("token");
    Axios.get(`${url}api/v1/payment/list/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        this.setState({
          transactions: res.data,
          loading: false,
        });
      })
    Axios.get(`${url}api/v1/payment/cashoutList/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        this.setState({
          cashoutList: res.data,
          loading: false,
        });
      })
  }

  currency = (value) => {
    const p = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return p;
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div style={{ marginTop: "100px" }}>
            <Spin />
          </div>
        ) : (
          <Tabs             
          defaultActiveKey="1"
          type="card"
          style={{ textAlign: "center", fontSize: "25px" }}
          centered>
          <TabPane tab="واریز" key="1">
          <Table
            locale={{ emptyText: "تراکنشی وجود ندارد" }}
            style={{ padding: "40px 10px 30px 10px" }}
            columns={this.columns_payment}
            dataSource={this.state.transactions}
          />
          </TabPane>
          <TabPane tab="برداشت‌" key="2">
          <Table
            locale={{ emptyText: "تراکنشی وجود ندارد" }}
            style={{ padding: "40px 10px 30px 10px" }}
            columns={this.columns_cashout}
            dataSource={this.state.cashoutList}
          />
          </TabPane>
          </Tabs>
        )}
      </div>
    );
  }
}

export default TransactionList;
