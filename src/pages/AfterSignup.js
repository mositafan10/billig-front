import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

class AfterSignup extends React.Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          padding: "10px",
        }}
      >
        <p style={{ fontSize: "18px" }}> ثبت نام شما با موفقیت انجام شد</p>
        <p style={{ fontSize: "18px" }}>
          از این پس برای ورود به سایت از شماره همراه و رمز عبورتان استفاده کنید
        </p>
        <Link to={"/profile/editprofile"}>
          <Button style={{ borderRadius: "10px" }}>تکمیل پروفایل</Button>
        </Link>
      </div>
    );
  }
}

export default AfterSignup;
