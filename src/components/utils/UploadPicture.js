import React, { useState } from "react";
import { Upload, notification } from "antd";
import ImgCrop from "antd-img-crop";
import { config } from "../../Constant";
import DownloadPic from "../utils/DownloadPic";

var url = config.url.API_URL;

const UploadFile = (props) => {
  const [fileList, setFileList] = useState([]);

  const sendData = (newFileList) => {
    props.parentCallback(newFileList);
  };

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
            onPreview={onPreview}
            fileList={fileList}
            modalOk="salam"
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
      )}
    </div>
  );
};

export default UploadFile;
