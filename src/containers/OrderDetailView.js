import React from 'react';
import Axios from 'axios';
import { Modal, Form, Input, Button} from 'antd';
import Detail from '../components/OrderDetail';



class OrderDetail extends React.Component {

    state = {
        order : [],
        visible: false,
        price: "",
        flight_date: ""
    }

    
      offer = () => {
        {this.showModal()}
      }
    
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = values => {
        this.setState({
          visible: false,
          price: values.price,
          flight_date: values.flight_date
        });

        console.log(this.state.price, this.state.flight_date)
        Axios.post('http://127.0.0.1:8000/api/v1/advertise/offer/', {
                price: this.state.price,
                flight_date: this.state.flight_date,
                packet: '1'
            })
            .then(res => console.log(res))
            .catch(error => console.error(error));
      };

      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
    
    componentDidMount(){
        const orderID = this.props.match.params.orderID;
        Axios.get(`http://127.0.0.1:8000/api/v1/advertise/packet/${orderID}`)
            .then(res => {
                this.setState({
                    order: res.data
                });
            })
    }

    render(){
        return(
            <div> 
            <Detail data={this.state.order} />
            <div style={{display:'flex', justifyContent:'left'}}>
              <Button onClick={this.offer}> ثبت پیشنهاد </Button>
            </div>
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
                  <Input />
                </Form.Item >
                <br/>
                <label style={{float:"right" ,textAlign:"right", marginTop:"-30px"}} >تاریخ پرواز</label>
                <Form.Item name="flight_date">
                    <Input type='date'/>
                </Form.Item>
              </Form>
              </Modal>
            <br></br>
            </div>
        )
    }
}

export default OrderDetail;