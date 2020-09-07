import React from 'react';
import Axios from 'axios';
import { Row, Col, Divider, Button, Card,} from 'antd';
import { Link } from 'react-router-dom';
import bag from '../media/Icon/022-bag.svg';
import Orders from '../components/packet/Orders';
import main_banner from '../media/main_banner.svg';
import { config } from '../Constant';

var url = config.url.API_URL
const { Meta } = Card;

const style_text = {
    alignContent:"center",
    textAlign:"center",
    display:"flex",
    alignItems:"center",
}
const style_center = {
    display:"flex",
    justifyContent:"center",
    color:"black",
}
const card_style = {
    borderRadius:"20px 10px 20px 10px",
    border:"solid",
    borderWidth:"0.5px",
    borderColor:"#707070",
    padding:"20px 20px 20px 20px",
    backgroundColor:"white"
}
const style_icon = {width:"50px", display:"inline"}


class LandingPage extends React.Component {

    state = {
        orders : []
    }

    componentDidMount(){
        Axios.get(`${url}api/v1/advertise/packet/`)
            .then(res => {
                this.setState({
                    orders: res.data
                });
            })
            .catch(error => console.error(error));
    }

    render(){
        return(
            <div>
                <Row >
                    <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                    <img
                        alt = "billlig.com"
                        src = {main_banner}
                        style={{width:"100%", height:"auto"}}
                        />
                    </Col>
                    <Col style={style_text} xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                        <Row>
                            <Row>
                                <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24} style={{padding:"0 100px"}}>
                                    <h1 style={{fontSize:33, textAlign:"right"}}>از هر جا می‌خوای<span style={{color:'#46a0ae'}}> خرید</span> کن<br/>به هر جا می‌خوای<span style={{color:'#46a0ae'}}> سفر</span> کن</h1>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0} style={{textAlign:"center"}}>
                                <Divider />
                                <h1 style={{fontSize:20}}>از هر جا می‌خوای<span style={{color:'#46a0ae'}}> خرید</span> کن<br/>به هر جا می‌خوای<span style={{color:'#46a0ae'}}> سفر</span> کن</h1>
                                </Col>
                            </Row>
                            <br/>
                            <Row >
                                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0} >
                                    <h3 style={{fontSize:"14px",textAlign:"right"}}>بیلیگ مسافرانی که فضای اضافی در چمدان دارند رو به کسانی که به خرید و یا پست از خارج از کشور دارند متصل می‌کند</h3>
                                </Col>
                                <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24} style={{padding:"0 100px"}}>
                                    <h3 style={{fontSize:"18px",textAlign:"right"}}>بیلیگ مسافرانی که فضای اضافی در چمدان دارند رو به کسانی که به خرید و یا پست از خارج از کشور دارند متصل می‌کند.   </h3>
                                </Col>
                            </Row>
                            <Row >
                                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0} >
                                <Divider plain orientation="center">
                                    <Link><span>بیلیگ‌پست چگونه کار می‌کند؟</span></Link>
                                    </Divider>
                                </Col>
                                <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24} style={{padding:"0 85px"}}>
                                <Divider plain orientation="center">
                                    <Link>بیلیگ‌پست چگونه کار می‌کند؟</Link>
                                    </Divider>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                </Row>
                <Row >
                    <Divider><h1 style={{display:"flex", justifyContent:"center", fontSize:"25px", fontFamily:"IRANSans"}}>آخرین آگهی‌ها</h1></Divider>
                    <br/>
                    <Col xs={24} sm={24} md={24} lg={1} xl={1} xxl={1}></Col>
                    <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={22}>
                        <Orders data={this.state.orders} page={8} pagesize={8}/>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={1} xl={1} xxl={1}></Col>
                </Row>
                <Row style={{display:"flex", justifyContent:"center"}}>
                    <Col>
                    <Link to='/orders'><Button style={{borderRadius:"8px"}}>نمایش همه آگهی</Button></Link>
                    </Col>
                </Row>
                <Divider     />
                <Row gutter={[20, 20]} style={{backgroundColor:"aliceblue", textAlign:"center"}}>
                <Divider><h1 style={{display:"flex", justifyContent:"center", fontSize:"25px", fontFamily:"IRANSans"}}>مزیت‌های بیلیگ برای شما</h1></Divider>
                <br/>
                    <Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={3}>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} style={style_center}>
                        <Card
                            style={{backgroundColor:"aliceblue"}}
                            bordered={false}
                            cover={<img alt="example" src={bag} style={style_icon} />}
                            >
                            <h3 style={{paddingBottom:"5px"}}>خرید کالاهای خاص و غیر قابل دسترس</h3>
                            <Meta  
                            style={card_style}
                            description="بسیاری از کلکسیونرها و افرادی که به دنبال کالا خاص
                            هستند، باید به بازارهای جهانی دسترسی داشته باشند.
                            از طرفی هزینه حمل‌ونقل برای آوردن کالا به ایران صرفه
                            اقتصادی ندارد، بستر  بیلیگ به شما کمک می‌کند در هر 
                            لحظه در هرجا جهان قصد خرید کالایی را داشتید با هزینه
                            حمل‌ونقل پایین آن راخریداری کنید" />                        
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} style={style_center}>
                        <Card
                            style={{backgroundColor:"aliceblue"}}
                            bordered={false}
                            cover={<img alt="example" src={bag} style={style_icon} />}
                            >
                            <h3 style={{paddingBottom:"5px"}}>خرید کالاهای خاص و غیر قابل دسترس</h3>
                            <Meta  
                            style={card_style}
                            description="بسیاری از کلکسیونرها و افرادی که به دنبال کالا خاص
                            هستند، باید به بازارهای جهانی دسترسی داشته باشند.
                            از طرفی هزینه حمل‌ونقل برای آوردن کالا به ایران صرفه
                            اقتصادی ندارد، بستر  بیلیگ به شما کمک می‌کند در هر 
                            لحظه در هرجا جهان قصد خرید کالایی را داشتید با هزینه
                            حمل‌ونقل پایین آن راخریداری کنید" />                        
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} style={style_center}>
                    <Card
                            style={{backgroundColor:"aliceblue"}}
                            bordered={false}
                            cover={<img alt="example" src={bag} style={style_icon} />}
                            >
                            <h3 style={{paddingBottom:"5px"}}>خرید کالاهای خاص و غیر قابل دسترس</h3>
                            <Meta  
                            style={card_style}
                            description="بسیاری از کلکسیونرها و افرادی که به دنبال کالا خاص
                            هستند، باید به بازارهای جهانی دسترسی داشته باشند.
                            از طرفی هزینه حمل‌ونقل برای آوردن کالا به ایران صرفه
                            اقتصادی ندارد، بستر  بیلیگ به شما کمک می‌کند در هر 
                            لحظه در هرجا جهان قصد خرید کالایی را داشتید با هزینه
                            حمل‌ونقل پایین آن راخریداری کنید" />                        
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={3}></Col>
                </Row>
                <Row gutter={[20, 20]} style={{backgroundColor:"aliceblue", textAlign:"center"}}>
                    <Divider/>
                    <Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={3}>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} style={style_center}>
                        <Card
                            style={{backgroundColor:"aliceblue"}}
                            bordered={false}
                            cover={<img alt="example" src={bag} style={style_icon} />}
                            >
                            <h3 style={{paddingBottom:"5px"}}>خرید کالاهای خاص و غیر قابل دسترس</h3>
                            <Meta  
                            style={card_style}
                            description="بسیاری از کلکسیونرها و افرادی که به دنبال کالا خاص
                            هستند، باید به بازارهای جهانی دسترسی داشته باشند.
                            از طرفی هزینه حمل‌ونقل برای آوردن کالا به ایران صرفه
                            اقتصادی ندارد، بستر  بیلیگ به شما کمک می‌کند در هر 
                            لحظه در هرجا جهان قصد خرید کالایی را داشتید با هزینه
                            حمل‌ونقل پایین آن راخریداری کنید" />                        
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} style={style_center}>
                    <Card
                            style={{backgroundColor:"aliceblue"}}
                            bordered={false}
                            cover={<img alt="example" src={bag} style={style_icon} />}
                            >
                            <h3 style={{paddingBottom:"5px"}}>خرید کالاهای خاص و غیر قابل دسترس</h3>
                            <Meta  
                            style={card_style}
                            description="بسیاری از کلکسیونرها و افرادی که به دنبال کالا خاص
                            هستند، باید به بازارهای جهانی دسترسی داشته باشند.
                            از طرفی هزینه حمل‌ونقل برای آوردن کالا به ایران صرفه
                            اقتصادی ندارد، بستر  بیلیگ به شما کمک می‌کند در هر 
                            لحظه در هرجا جهان قصد خرید کالایی را داشتید با هزینه
                            حمل‌ونقل پایین آن راخریداری کنید" />                        
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} style={style_center}>
                    <Card
                            style={{backgroundColor:"aliceblue"}}
                            bordered={false}
                            cover={<img alt="example" src={bag} style={style_icon} />}
                            >
                            <h3 style={{paddingBottom:"5px"}}>خرید کالاهای خاص و غیر قابل دسترس</h3>
                            <Meta  
                            style={card_style}
                            description="بسیاری از کلکسیونرها و افرادی که به دنبال کالا خاص
                            هستند، باید به بازارهای جهانی دسترسی داشته باشند.
                            از طرفی هزینه حمل‌ونقل برای آوردن کالا به ایران صرفه
                            اقتصادی ندارد، بستر  بیلیگ به شما کمک می‌کند در هر 
                            لحظه در هرجا جهان قصد خرید کالایی را داشتید با هزینه
                            حمل‌ونقل پایین آن راخریداری کنید" />                        
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={3}></Col>
                </Row>
          </div>
        )
    }
}

export default LandingPage;