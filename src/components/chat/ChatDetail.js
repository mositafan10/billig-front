import React, { Component } from 'react';
import { List, Avatar, Row, Col, Form, Spin, message, Drawer } from 'antd';
import Axios from 'axios';
import TextInput from './TextInput';
import moment from 'moment';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const right_test_style = {
    display:"inline",
    border:"solid",
    borderRadius:"15px 10px 15px 10px ",
    backgroundColor:"deepskyblue",
    borderColor:"deepskyblue",
    padding:"10px 10px 10px 10px",
    width:"auto",
    maxWidth:"70%"
    }

const left_test_style = {
    marginBottom:"15px",
    float:"inline-end",
    border:"solid",
    borderRadius:"10px 15px 10px 15px ",
    backgroundColor:"aliceblue",
    borderColor:"deepskyblue",
    padding:"10px 10px 10px 10px",
    width:"auto",
    maxWidth:"70%"
    }
    

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
                            <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}></Col>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}> 
                                <Row>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        {(user == this.props.sender) ? 
                                        <Link to={'/users/' + this.props.sender}><Avatar src = {`http://127.0.0.1/dstatic/media/${this.props.avatar2}`} /></Link>
                                        :
                                        <Link to={'/users/' + this.props.receiver}><Avatar src = {`http://127.0.0.1/dstatic/media/${this.props.avatar1}`} /></Link>
                                        }
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        {/* <p style={{fontSize:"14px"}}>وضعیت پیشنهاد : </p> */}
                                        <p style={{fontSize:"14px"}}>{this.state.offer}</p>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        {(user == this.props.sender) ? 
                                        <Link to={'/users/' + this.props.receiver}><Avatar src = {`http://127.0.0.1/dstatic/media/${this.props.avatar1}`} /></Link>
                                        :
                                        <Link to={'/users/' + this.props.sender}><Avatar src = {`http://127.0.0.1/dstatic/media/${this.props.avatar2}`} /></Link>
                                        }  
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}></Col>
                        </Row>
                    }
                    footer={
                        <Row>
                            <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}></Col>
                            <Col xs={20} sm={20} md={20} lg={12} xl={12} xxl={12}> 
                                <TextInput data={chatid} handler = {this.handler} />
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
                    >
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.massages}
                        locale={{emptyText:" "}}
                        renderItem={item => (
                        <Row >
                            <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}></Col>
                            <Col xs={20} sm={20} md={20} lg={12} xl={12} xxl={12} 
                            style={{borderRight:"solid",borderLeft:"solid",borderColor:"#9cd3ee",padding:"0 10px 0 10px"}} >
                            <div style={{textAlign:"center"}}>
                            { item.first_day ? 
                            moment(item.create_at).format('dddd Do MMM')
                            :
                            ""
                            }
                            </div>
                            { (user == item.ownerid) ?
                                <List.Item >
                                    <div style={right_test_style} >
                                        <List.Item.Meta
                                        style={{fontSize:"8px"}}
                                        description={item.text}
                                        />
                                        {moment(item.create_at).format('HH:mm')}
                                    </div>
                                </List.Item>
                                :
                                <List.Item style={left_test_style}>
                                    <div >
                                        <List.Item.Meta
                                        style={{fontSize:"8px"}}
                                        description={item.text}
                                        />
                                        {moment(item.create_at).format('HH:mm')}
                                    </div>
                                </List.Item>
                            }
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