import React, { Component } from 'react';
import { List, Avatar, Row, Col, Form, Spin, message, Drawer } from 'antd';
import Axios from 'axios';
import TextInput from './TextInput';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import { LeftOutlined } from '@ant-design/icons';


class ChatDetail extends Component {

    state = {
        massages : [],
        offer: "",
        visible: false,
    }

    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
      onClose = () => {
        this.setState({
          visible: false,
        });
      };


    componentDidUpdate = (prevProps, callback) => {
        const token = localStorage.getItem('token');
        const chatid = this.props.data;
        if (this.props.data !== prevProps.data) {
            this.setState({
                offer: this.props.offer,
                visible: true
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

    render() {
        const user = localStorage.getItem('user');
        const chatid = this.props.data;
            return (
            <div>
                <br/>
                <span>
               چت را انتخاب کنید
                </span>
                <div>
                <Drawer
                    title={
                        <Row>
                            <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}></Col>
                            <Col xs={20} sm={20} md={20} lg={12} xl={12} xxl={12}> 
                            <p>وضعیت پیشنهاد : {this.state.offer} </p>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}></Col>
                        </Row>
                    
                    }
                    placement="left"
                    width={"100%"}
                    closeIcon={<LeftOutlined/>}
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    getContainer={false}
                    headerStyle={{marginTop: 20}}
                    bodyStyle={{ marginBottom: 30, }}
                    footer={
                        <Row>
                            <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}></Col>
                            <Col xs={20} sm={20} md={20} lg={12} xl={12} xxl={12}> 
                                <TextInput  data={chatid} handler = {this.handler} />
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}></Col>
                        </Row>
                    }
                    >
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.massages}
                        locale={{emptyText:" "}}
                        renderItem={item => (
                        <Row>
                            <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}></Col>
                            <Col xs={20} sm={20} md={20} lg={12} xl={12} xxl={12}>
                            <List.Item style={{fontSize:"10px"}}>
                                { (user == item.ownerid) ?
                                    <div style={{width:"-moz-available",textAlign:"right"}}>
                                        <List.Item.Meta
                                        style={{fontSize:"8px"}}
                                        description={item.text}
                                        title={<a href="https://ant.design"></a>}
                                        // avatar={<div class="float-left"><Avatar src = {`http://127.0.0.1/dstatic/media/${item.owner_avatar}`} /></div>}
                                        />
                                        {moment(item.create_at).format('HH:mm')}
                                    </div>
                                    :
                                    <div style={{width:"-moz-available",textAlign:"left"}}>

                                        <List.Item.Meta
                                        style={{fontSize:"8px"}}
                                        title={<a href="https://ant.design"></a>}
                                        description={item.text}
                                        // avatar={<Avatar src = {`http://127.0.0.1/dstatic/media/${item.owner_avatar}`} />}
                                        />
                                        {moment(item.create_at).format('HH:mm')}
                                    </div>
                                }
                            </List.Item>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}></Col>
                        </Row>
                        )
                        }
                    />
                </Drawer>
                <br/>
                </div>
            </div>
        );
    }
}

export default ChatDetail;