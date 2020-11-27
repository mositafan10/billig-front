import React, { Component } from "react";
import Axios from "axios";
import moment from "moment";
import { config } from "../../Constant";
import { Table, Spin } from "antd";

var url = config.url.API_URL;


class TransactionList extends Component {
  state = {
    transactions: [],
    loading: true,
  };

  columns = [
    {
      title: "تاریخ پرداخت",
      dataIndex: "create_at",
      key: "transId",
      align: "right",
      render: (dataIndex) => <p>{moment(dataIndex).format("Do MMM")}</p>,
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
      .catch((error) => console.error(error));
  }

  currency = (value) => {
    const p = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return p;
  };

  render() {
    return (
      <div>
        {" "}
        {this.state.loading ? (
          <div style={{ marginTop: "100px" }}>
            <Spin />
          </div>
        ) : (
          <Table
            locale={{ emptyText: "تراکنشی وجود ندارد" }}
            style={{ padding: "40px 10px 30px 10px" }}
            columns={this.columns}
            dataSource={this.state.transactions}
          />
        )}
      </div>
    );
  }
}

export default TransactionList;
