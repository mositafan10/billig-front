import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { config } from '../../Constant'

var url = config.url.API_URL
const UploadFile = (props) => {

  const [fileList, setFileList] = useState([]);

  const sendData = (fileList) => { props.parentCallback(fileList); };

  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    sendData(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
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
    <ImgCrop rotate>
      <Upload 
        action={`${url}api/v1/advertise/upload/`}
        name="billig"
        listType="picture-card"
        onChange={onChange}
        onPreview={onPreview}
        fileList={fileList}
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default UploadFile;