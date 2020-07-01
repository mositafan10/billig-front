import React from 'react';
import { Steps, Button, message, Row , Col } from 'antd';
import PacketForm from '../components/PacketForm';
import TypeBuy from '../components/buying/TypeBuy';
import  OrderType  from '../components/Order/OrderType';

const { Step } = Steps;



class OrderForm extends React.Component {
  state = {
    current: 0,
    buy: true
  }

post = () => {
    this.setState({
        buy: true   
    })
}


onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };

steps = [
    {
      title: 'نوع آگهی',
      content: <OrderType/>
    },
    {
      title: 'اطلاعات خرید',
      content: ( 
          this.state.buy ? 
          <TypeBuy /> 
          : 
          "2" 
        )
    },
    {
      title: 'مشخصات کالا',
      content: <div style={{width:"50%", textAlign:"-moz-right"}}><PacketForm/></div>,
    },
  ];

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current} onChange={this.onChange}>
          {this.steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{this.steps[current].content}</div>
        <div className="steps-action">
          {/* {current < this.steps.length - 1 && (
            <Button  type   ="primary" onClick={() => this.next()}>
              بعدی
            </Button>
          )} */}
          {current === this.steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('ارسال شد!')}>
              ارسال
            </Button>
          )}
          {/* {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
              بازگشت
            </Button>
          )} */}
        </div>
      </div>
    );
  }
}

export default OrderForm;