import React from 'react';
import { Button } from 'antd';

class TypeBuy extends React.Component {

    state= {
        type:0
    }

    typebuy = (int) => {
        this.setState({
            type:int
        })
        console.log("type",this.state.type);
    }

    render(){
        return(
            <div>
            <br/> 
            <div style={{display:"flex", justifyContent:"center" ,margin:"20px"}}>
                <Button style={{borderRadius:"10px"}} onClick={this.typebuy.bind(this,"1")}>خرید از فروشگاه آنلاین</Button><br/>
            </div>
            <div style={{display:"flex", justifyContent:"center" ,margin:"20px"}}> 
                <p>چنانچه کالا دارای لینک خرید از یک فروشگاه آنلاین باشد</p>
            </div>
            <hr/>
            <div style={{display:"flex", justifyContent:"center", margin:"20px"}}>
                <Button style={{borderRadius:"10px"}} onClick={this.typebuy.bind(this,"2")}>خرید از فروشگاه فیزیکی</Button> 
            </div>
            <div style={{display:"flex", justifyContent:"center" ,margin:"20px"}}> 
                <p>چنانچه کالا قابل خریداری از یک فروشگاه فیزیکی با آدرس مشخص باشد </p>
            </div>
            <hr/>
            <div style={{display:"flex", justifyContent:"center", margin:"20px"}}>
                <Button style={{borderRadius:"10px"}} onClick={this.typebuy.bind(this,"3")}>خرید از بازار</Button> 
            </div>
            <div style={{display:"flex", justifyContent:"center" ,margin:"20px"}}> 
                <p>چنانچه کالا قابل خریداری از یک فروشگاه بدون مشخصات باشد </p>
            </div>
            </div>
        )
    }
}

export default TypeBuy; 