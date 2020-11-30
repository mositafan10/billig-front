import React, { useState } from "react";
import { Upload, notification, message } from "antd";
import ImgCrop from "antd-img-crop";
import { config } from "../../Constant";
import DownloadPic from "../utils/DownloadPic";

var url = config.url.API_URL;

const UploadFile = (props) => {
  const [fileList, setFileList] = useState([]);

  const sendData = (newFileList) => {
    props.parentCallback(newFileList);
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      notification["error"]({
        message: "حجم تصویر باید کمتر از ۱۰ مگابایت باشد",
        style: {
          fontFamily: "VazirD",
          textAlign: "right",
          float: "right",
          width: "max-content",
        },
        duration: 2,
      });
    }
    return isJpgOrPng && isLt2M;
  }

  const onChange = ({ fileList: newFileList }) => {
    if (newFileList[0] && newFileList[0].status == "error") {
      notification["error"]({
        message: newFileList[0].response,
        style: {
          fontFamily: "VazirD",
          textAlign: "right",
          float: "right",
          width: "max-content",
        },
        duration: 2,
      });
    }
    setFileList(newFileList);
    sendData(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {props.picture ? (
        <div>
          <DownloadPic size={150} data={props.picture} />
        </div>
      ) : (
        <ImgCrop
          modalOk={<p style={{ fontFamily: "VazirD" }}>ارسال</p>}
          modalCancel={<p style={{ fontFamily: "VazirD" }}>انصراف</p>}
          modalTitle={
            <p style={{ fontFamily: "VazirD", textAlign: "center" }}>
              ویرایش تصویر
            </p>
          }
        >
          <Upload
            style={{ fontFamily: "VazirD" }}
            action={`${url}api/v1/advertise/upload/`}
            name="billig"
            listType="picture-card"
            onChange={onChange}
            beforeUpload={beforeUpload}
            onPreview={onPreview}
            fileList={fileList}
          > 
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
      )}
    </div>
  );
};

export default UploadFile;
