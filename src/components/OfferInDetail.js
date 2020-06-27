import React from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import Axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';

class OfferDetail extends React.Component {

    state = {
        visible:false,
        slug : "",
        price: "",
        flight_date: "",
        description:""
    }

    offer = () => {
        {this.showModal()}
    }
    
    success = () => {
        message.success({content:'پیشنهاد شما با موفقیت ثبت شد.',
                          style:{fontFamily:"IRANSans"}});
    };
      

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    

    handleOk = values => {
        this.setState({
          visible: false,
          price: values.price,
          flight_date: values.flight_date,
          description: values.description,
          slug : this.props.data,
        });

        const token = localStorage.getItem('token');
        console.log("HI", this.state.price, this.state.flight_date, this.state.id, this.state.description);
        Axios.post('http://127.0.0.1:8000/api/v1/advertise/offer/', {
                price: this.state.price,
                flight_date: this.state.flight_date,
                description: this.state.description,
                packet : this.state.slug
              },
              { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => { console.log(res); window.location.reload(); })
            .catch(error => console.error(error), message.info("ابتدا وارد سایت شوید"));
      
      };

    handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    render(){
    return(
          <div style={{display:'flex', justifyContent:'center' , textAlign:"center"}}>
              <Button style={{borderRadius:"10px", fontSize:"12px"}} onClick={this.offer}> ثبت پیشنهاد </Button>
                <Modal
                  onCancel={this.handleCancel}
                  okButtonProps={{form:'offering', key: 'submit', htmlType: 'submit'}}
                  visible={this.state.visible}
                  >
                 <Form
                  layout="vertical"
                  style={{fontFamily:"IRANSans"}}  
                  name="offering"
                  onFinish={this.handleOk}
                  > <br/><br/><br/>
                    <label style={{float:"right" ,textAlign:"right", marginTop:"-30px"}}>قیمت پیشنهادی</label>
                    <Form.Item 
                      name="price" 
                      rules={[
                        {
                          required: true,
                        },
                      ]}>
                      <Input style={{textAlign:"right"}} placeholder="به تومان وارد کنید"/>
                    </Form.Item >
                    <br/>
                    <label style={{float:"right" ,textAlign:"right", marginTop:"-30px"}} >تاریخ پرواز</label>
                    <Form.Item name="flight_date">
                        <Input type='date'/>
                    </Form.Item>
                    <br/>
                    <label style={{float:"right" ,textAlign:"right", marginTop:"-30px"}} >توضیحات بیشتر </label>
                    <Form.Item name="description">
                        <TextArea />
                    </Form.Item>
                  </Form>
                </Modal>
          </div>
        );
    
}
}

export default OfferDetail;