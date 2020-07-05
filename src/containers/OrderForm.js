import React from 'react';
import { Steps, Button, message, Row , Col } from 'antd';
import PacketForm from '../components/PacketForm';
import TypeBuy from '../components/buying/TypeBuy';
import  OrderType  from '../components/Order/OrderType';

const { Step } = Steps;


class OrderForm extends React.Component {
  
  state = {
    current: 0,
    type:0,
    buy: true
  }

  async post(){
      await this.setState({
          buy: false 
        });
        this.next();
        console.log(this.state.buy)
  }

  async buy(){
    await this.setState({
        buy: true 
      })     
      this.next();
    console.log(this.state.buy)
  }

  onChange = current => {
      console.log('onChange:', current);
      this.setState({ current });
    };

  async next() {
      const current = this.state.current + 1;
      await this.setState({ current });
    }

  prev() {
      const current = this.state.current - 1;
      this.setState({ current });
    }

steps = [
    {
      title: 'نوع آگهی',
      content: 
      <div>
            <br/>
            <div style={{display:"flex", justifyContent:"center" ,margin:"20px"}}>
                <Button style={{borderRadius:"10px"}} onClick={this.buy.bind(this)}> خرید</Button>
            </div>
            <div style={{display:"flex", justifyContent:"center" ,margin:"20px"}}>
               <p>چنانچه کالا مورد نظر قابلیت خریداری دارد.</p>
            </div>
            {/* <div style={{border:"solid", borderRadius:"20px", height:"200px",  }}></div> */}
            <hr width="50%"/>

            <div style={{display:"flex", justifyContent:"center" ,margin:"20px"}}>
                 <Button onClick={this.post.bind(this)} style={{borderRadius:"10px"}}>پست </Button>
            </div>
            <div style={{display:"flex", justifyContent:"center" ,margin:"20px"}}>
               <p>چنانچه کالا مورد نظر در مبدا موجود است  و صرفا نیاز به جابه‌جایی دارد</p>
            </div>
            {/* <div style={{border:"solid", borderRadius:"20px", height:"200px",  }}></div> */}
        </div>
    },
    {
      title: 'اطلاعات خرید',
      content: 
          this.state.buy ? 
          // <TypeBuy /> 
          "خرید"
          : 
          "پست" 
        
    },
    {
      title: 'مشخصات کالا',
      content: <div style={{width:"50%", textAlign:"-moz-right"}}><PacketForm/></div>,
    },
  ];

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
          {current < this.steps.length - 1 && (
            <Button  type   ="primary" onClick={() => this.next()}>
              بعدی
            </Button>
          )}
          {current === this.steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('ارسال شد!')}>
              ارسال
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
              بازگشت
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default OrderForm;