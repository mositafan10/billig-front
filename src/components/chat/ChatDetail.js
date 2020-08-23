import React, { Component } from 'react';
import { List, Avatar, Row, Col, Form, Spin, message } from 'antd';
import Axios from 'axios';
import TextInput from './TextInput';
import InfiniteScroll from 'react-infinite-scroller';

class ChatDetail extends Component {

    state = {
        massages : [],
        offer: "",
        loading: false,
        hasMore: true,
    }

    handleInfiniteOnLoad = () => {
        this.setState({
          loading: true,
        });
        if (this.state.massages.length > 5) {
          message.warning('Infinite List loaded all');
          this.setState({
            hasMore: false,
            loading: false,
          });
          return;
        }
        this.componentDidUpdate(res => {
            this.state.massages = this.state.massages.concat(res.results);
          this.setState({
            loading: false,
          });
        });
      };

    
    // fetchData = callback => {
    //     reqwest({
    //     url: fakeDataUrl,
    //     type: 'json',
    //     method: 'get',
    //     contentType: 'application/json',
    //     success: res => {
    //         callback(res);
    //     },
    //     });
    // };

    componentDidUpdate = (prevProps, callback) => {
        const token = localStorage.getItem('token');
        const chatid = this.props.data;
        if (this.props.data !== prevProps.data) {
            this.setState({
                offer: this.props.offer
            })
            Axios.get(`http://127.0.0.1:8000/api/v1/chat/massagelist/${chatid}`,
            { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => (this.setState({
                massages: res.data
            }), callback(res) )      
            )
            .catch((error) => console.log(error))
    }
    }

    // componentWillReceiveProps = callback => {
    //     const token = localStorage.getItem('token');
    //     const chatid = this.props.data;
    //     this.setState({
    //         offer: this.props.offer
    //     })
    //     Axios.get(`http://127.0.0.1:8000/api/v1/chat/massagelist/${chatid}`,
    //     { headers: {"Authorization" : `Bearer ${token}`} })
    //     .then((res) => (this.setState({
    //         massages: res.data
    //     }), callback(res) )      
    //     )
    //     .catch((error) => console.log(error))
    // }

    handler = (callback) => {
        const token = localStorage.getItem('token');
        const chatid = this.props.data;
        Axios.get(`http://127.0.0.1:8000/api/v1/chat/massagelist/${chatid}`,
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res) => (this.setState({
            massages: res.data
        }), callback(res) )      
        )
        .catch((error) => console.log(error))
        console.log("Hi");
    }

    // handleInfiniteOnLoad = () => {
    //     let { massages } = this.state;
    //     this.setState({
    //       loading: true,
    //     });
    //     if (massages.length > 5) {
    //       message.warning('Infinite List loaded all');
    //       this.setState({
    //         hasMore: false,
    //         loading: false,
    //       });
    //       return;
    //     }
    //     this.componentWillReceiveProps(res => {
    //     massages = massages.concat(res.results);
    //       this.setState({
    //         massages,
    //         loading: false,
    //       });
    //     });
    //   };

    render() {
        const user = localStorage.getItem('user');
        const chatid = this.props.data;
            return (
            <div>
                <br/>
                { this.state.offer ? 
                <div>وضعیت مذاکره : {this.state.offer} </div>
                :
                "چت را انتخاب کنید"
                }
                <div>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                    >
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.massages}
                        locale={{emptyText:" "}}
                        renderItem={item => (
                        <List.Item style={{fontSize:"10px"}}>
                            { (user == item.ownerid)
                            ?
                            <div style={{width:"-moz-available",textAlign:"right"}}>
                                <List.Item.Meta
                                style={{fontSize:"8px"}}
                                description={item.text}
                                title={<a href="https://ant.design"></a>}
                                // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                />
                                {item.create_at}
                            </div>
                            :
                            <div style={{width:"-moz-available",textAlign:"left"}}>

                                <List.Item.Meta
                                style={{fontSize:"8px"}}
                                title={<a href="https://ant.design"></a>}
                                description={item.text}
                                // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                />
                                {item.create_at}
                            </div>
                            }
                        </List.Item>
                        )
                        }
                    />
                    
                </InfiniteScroll>
                <br/>
                    { this.state.offer ? 
                    <TextInput data={chatid} handler = {this.handler} />
                    :
                    " "
                        }
                </div>
            </div>
        );
    }
}

export default ChatDetail;