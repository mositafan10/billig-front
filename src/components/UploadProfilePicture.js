import React  from 'react';
// import { Button, message, Upload } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// class UploadProfilePicture extends Component {
//     token = localStorage.getItem('token');
//     props = {
//         action: 'http://127.0.0.1:8000/api/v1/account/users/update/',
//         transformFile(file) {
//           return new Promise(resolve => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => {
//               const canvas = document.createElement('canvas');
//               const img = document.createElement('img');
//               img.src = reader.result;
//               img.onload = () => {
//                 const ctx = canvas.getContext('2d');
//                 ctx.drawImage(img, 0, 0);
//                 ctx.fillStyle = 'red';
//                 ctx.textBaseline = 'middle';
//                 ctx.fillText('Ant Design', 20, 20);
//                 canvas.toBlob(resolve);
//               };
//             };
//           });
//         },
//       };
      

//     render() {
//         return (
//             <Upload {...this.props}>
//                 <Button>
//                     <UploadOutlined /> تغییر تصویر
//                 </Button>
//             </Upload>
//         )
//     }
// }

// export default UploadProfilePicture;

import { Upload, message, Row, Col } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class UploadProfilePicture extends React.Component {

state = { 
        loading: false, 
        imageUrl: this.props.data 
    }

handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
        console.log(info.file);
        this.setState({
          imageUrl: info.file.response,
          loading: false,
        });

    }
};

render() {
    const token = localStorage.getItem('token'); 
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">بارگذاری</div>
      </div>
    );
    return (
        <div style={{display:"flex", justifyContent:"center"}}>
        <Row>
            <Col xs={2} sm={2} md={2} lg={2} xl={0} xxl={0}></Col>
            <Col xs={20} sm={20} md={20} lg={20} xl={24} xxl={24}>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="http://127.0.0.1:8000/api/v1/account/upload/"
                    headers={{"Authorization":`Bearer ${token}`}}
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                {this.props.data ? <img src = {`http://127.0.0.1/dstatic/${this.props.data}`} alt="avatar" width={300} style={{borderRadius:"15px"}} /> : "بارگذاری تصویر"}
                </Upload>
                <p>برای تغییر تصویر پروفایل بر روی آن کلیک کنید</p>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={0} xxl={0}></Col>
        </Row>
        </div>
    );
  }
}

export default UploadProfilePicture;