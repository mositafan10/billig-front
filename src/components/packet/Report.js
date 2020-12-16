import React, { Component } from "react";
import { Button, notification, Radio, Modal, Input, Tooltip} from "antd";
import Axios from "axios";
import { config } from "../../Constant";
import report from '../../media/report.svg'
var url = config.url.API_URL; 
const token = localStorage.getItem("token");
const { TextArea } = Input;
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

class Bookmark extends Component {
  state = {
    loading: false,
    reported: false,
    visible: false,
    value: 0,
    text: ""
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

// Settimeout maybe will not work correctly
  componentDidMount (){
    setTimeout(()=>{
      Axios.get(`${url}api/v1/advertise/reports/${this.props.data}`, {
        headers: { Authorization: `Token ${token}` },
      }).then((res) => {
        if (res.data.report == true) {
          this.setState({ reported: true });
        }
      });
    },1000)
  }

  report = () => {
    this.setState({ loading: true });
    const token = localStorage.getItem("token");

    if (token == null){
      this.setState({visible: true, loading:false})
    }
    else {
    Axios.post(
      `${url}api/v1/advertise/report/`,
      {
        packet: this.props.data,
        title: this.state.value,
        text: this.state.text
        },
      { headers: { Authorization: `Token ${token}` } }
    )
      .then((res) => {
          this.setState({ loading: false, reported: true });
          notification["success"]({
            message: "گزارش با موفقیت ارسال شد",
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              width: "max-content",
            },
            duration: 2,
          });
        this.setState({visible:false})
      })
      .catch(
        (error) =>
          notification["error"]({
            message: error.response.data.detail,
            style: {
              fontFamily: "VazirD",
              textAlign: "right",
              float: "right",
              marginTop: "50px",
              width: "max-content",
              fontSizeAdjust: "0.5 ",
            },
            duration: 2,
          }),
        this.setState({ loading: false })
      );
      }
  };

  handlecance = () => {
    this.setState({visible:false})
  }

  render() {
    return (
      <div>
        {!this.state.reported && 
        <Tooltip overlayStyle={{fontFamily:"VazirD"}} title="گزارش مشکل در آگهی">
          <Button
            style={{ fontSize: "13px", borderRadius: "10px", color:"white", border:"hidden" }}
            onClick={()=>this.setState({visible:true})}
            loading={this.state.loading}
          >
            <img src={report} alt="billligReport" width={30} style={{marginTop:"-7px"}}/>
          </Button>
        </Tooltip>
        }
        <Modal 
        style={{fontFamily:"VazirD"}}
        visible={this.state.visible}
        onCancel={this.handlecance.bind(this)}
        onOk={this.report.bind(this)}
        okText="ارسال"
        cancelText="انصراف"
        >
        {token == null ?
            <p style={{textAlign:"center"}}>برای نشان کردن آگهی ابتدا باید وارد حساب کاربری خود شوید</p>
        :
        <div>
        <Radio.Group name="value" onChange={this.onChange} value={this.state.value}>
        <Radio style={radioStyle} value={0}>
          عدم تطابق آگهی با صحبت‌های بیلیگر
        </Radio>
        <Radio style={radioStyle} value={1}>
          مغایرت محتویات بسته با قوانین
        </Radio>
        <Radio style={radioStyle} value={2}>
          دستمزد نامتعارف
        </Radio>
        <Radio style={radioStyle} value={3}>
          به دلایل دیگر
        </Radio>
      </Radio.Group>
          {this.state.value === 3 && <TextArea name="text" onChange={this.onChange} value={this.state.text} style={{ borderRadius:"10px", marginTop:"20px" }} rows={5} /> }
        </div>
        }
        </Modal>
      </div>
    );
  }
}

export default Bookmark;
