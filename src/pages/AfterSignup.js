import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const AfterSignup = () => {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          padding: "30px",
        }}
      >
        <p style={{ fontSize: "22px" }}> به بیلیگ خوش آمدید</p>
        <p style={{ fontSize: "18px" }}>
        .از این پس برای ورود به سایت از شماره موبایل و رمز عبورتان استفاده کنید
        </p>
        <p style={{ fontSize: "18px" }}> :بیلیگ به دو صورت به شما کمک می‌کند</p>
        <div style={{border:"1px solid", padding:"20px", borderRadius:"10px", backgroundColor:"#FCA468", color:"white"}}>
        <p style={{ fontSize: "14px" }}>  می‌خواهید کالایی پست و یا خریداری کنید و دنبال مسافری برای آن هستید</p>
        <p style={{ fontSize: "14px" }}>  در این صورت باید آگهی خود را ثبت کنید</p>
        <Link to={"/profile/mypacket"}>
          <Button style={{ borderRadius: "10px", backgroundColor:"#FCA468", color:"white" }}><b>ثبت آگهی</b></Button>
        </Link>
        </div>
        <br/>
        <div style={{border:"1px solid", padding:"20px", borderRadius:"10px", backgroundColor:"#46A0AE", color:"white"}}>
        <p style={{ fontSize: "14px" }}>  می‌خواهید از سفر خود در‌امد کسب کنید و دنبال بسته‌ای برای جابه‌جایی هستید</p>
        <p style={{ fontSize: "14px" }}> در این صورت باید سفر خود را ثبت کنید</p>
        <Link to={"/profile/mytravel"}>
          <Button style={{ borderRadius: "10px", backgroundColor:"#46A0AE", color:"white"}}><b>ثبت سفر</b></Button>
        </Link>
        </div>
      </div>
    );
}

export default AfterSignup;
