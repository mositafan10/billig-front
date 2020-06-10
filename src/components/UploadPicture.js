import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const UploadFile = (props) => {


  const [fileList, setFileList] = useState([]);
  const [id, setid] = useState([]);


  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // var id = setid(newFileList[0].response.id);
    console.log(newFileList);
    // var i = 0;
    // for(i = 0 ; i <= newFileList.length ; i++ ){
    //   console.log(newFileList[i].response);
    
    // for (x in fileList) {
    // console.log(fileList[x].response)};
    // id = setid(fileList[1].response.id)
    // console.log(id)
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
        action="http://127.0.0.1:8000/api/v1/advertise/upload/"
        name="billig"
        listType="picture-card"
        onChange={onChange}
        onPreview={onPreview}
        fileList={fileList}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default UploadFile;