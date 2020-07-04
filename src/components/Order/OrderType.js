import React from 'react';
import { Button, Row, Col } from "antd";

class OrderType extends React.Component {

    state = {
        buy: 0,
    }

    buy = () => {
        this.setState({
            buy:1,
        })
    }

    render(){
        return (
        <div>
            <br/>
            <div style={{display:"flex", justifyContent:"center" ,margin:"20px"}}>
                <Button style={{borderRadius:"10px"}} onClick={this.buy.bind(this)}> خرید</Button>
            </div>
            <div style={{display:"flex", justifyContent:"center" ,margin:"20px"}}>
               <p>چنانچه کالا مورد نظر قابلیت خریداری دارد.</p>
            </div>
            <hr/>
            <div style={{display:"flex", justifyContent:"center" ,margin:"20px"}}>
                 <Button style={{borderRadius:"10px"}}>پست </Button>
            </div>
            <div style={{display:"flex", justifyContent:"center" ,margin:"20px"}}>
               <p>چنانچه کالا مورد نظر در مبدا موجود است  و صرفا نیاز به جابه‌جایی دارد</p>
            </div>
        </div>
        )
    }
}

export default OrderType;