import React, { useState } from "react";
import { Upload, notification } from "antd";
import ImgCrop from "antd-img-crop";
import { config } from "../../Constant";
import DownloadPic from "../utils/DownloadPic";
import imageCompression from "browser-image-compression";

var url = config.url.API_URL;

const UploadFile = (props) => {
  const [fileList, setFileList] = useState([]);

  const sendData = (newFileList) => {
    props.parentCallback(newFileList);
  };

  const handleImageUpload = (file) => {
    return new Promise((resolve) => {
      var options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      imageCompression(file, options)
        .then(function (compressedFile) {
          var mayfile = new File([compressedFile], "adsPicture", {
            type: "image/png",
          });
          resolve(mayfile);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    });
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type == "image/jpeg" || file.type == "image/png";
    if (!isJpgOrPng) {
      notification["error"]({
        message: "فرمت تصویر قابل قبول نیست",
        style: {
          fontFamily: "VazirD",
          textAlign: "right",
          float: "right",
          width: "max-content",
        },
        duration: 3,
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      notification["error"]({
        message: "حجم تصویر خیلی زیاد است",
        style: {
          fontFamily: "VazirD",
          textAlign: "right",
          float: "right",
          width: "max-content",
        },
        duration: 3,
      });
    }
    const lowerLimit = file.size / 1024 / 1024 > 0.001;
    if (!lowerLimit) {
      notification["error"]({
        message: "اندازه تصویر خیلی کم است",
        style: {
          fontFamily: "VazirD",
          textAlign: "right",
          float: "right",
          width: "max-content",
        },
        duration: 3,
      });
    }
    return isJpgOrPng && isLt2M && lowerLimit;
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
            transformFile={handleImageUpload}
            onPreview={onPreview}
            fileList={fileList}
          >
            {fileList.length < 1 && "+ تصویر"}
          </Upload>
        </ImgCrop>
      )}
    </div>
  );
};

export default UploadFile;
