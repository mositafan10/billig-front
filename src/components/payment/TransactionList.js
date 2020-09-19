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
      title: "تاریخ",
      dataIndex: "create_at",
      key: "transId",
      align: "right",
      render: (dataIndex) => <p>{moment(dataIndex).format("Do MMMM YYYY")}</p>,
    },
    {
      title: "مقدار",
      dataIndex: "amount",
      key: "transId",
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
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        this.setState({
          transactions: res.data,
          loading: false,
        });
      })
      .catch((error) => console.error(error));
  }
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
            scroll={{ x: 300 }}
            locale={{ emptyText: "تراکنشی وجود ندارد" }}
            style={{ padding: "30px 30px 30px 30px" }}
            columns={this.columns}
            dataSource={this.state.transactions}
          />
        )}
      </div>
    );
  }
}

export default TransactionList;
