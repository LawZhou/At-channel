import React, { Component } from 'react';
import { Upload, Button, message, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 2000);
  };

class Uploader extends Component {
    state = {
        selectedFile: null,
        selectedFileList: []
    };

    beforeUpload = file => {
        if (file.type !== 'video/mp4' && file.type !== 'video/mkv'
            && file.type !== 'video/ogg' && file.type !== 'video/wmv') {
            message.error(`${file.name} is not a video`);
            return false;
        } else {
            return true;
        }
    };

    action =  async file => {
        await this.props.captureFile(file)
    }
    onChange = info => {
    const nextState = {};
    switch (info.file.status) {
        case "uploading":
        nextState.selectedFileList = [info.file];
        break;
        case "done":
        nextState.selectedFile = info.file;
        nextState.selectedFileList = [info.file];
        break;
        default:
        // error or removed
        nextState.selectedFile = null;
        nextState.selectedFileList = [];
    }
    this.setState(() => nextState);
    };
    render() {
        return (
          <div className="App">
            {/* <h1>antd &lt;Upload/> as file selector</h1> */}
            <Upload
              beforeUpload={this.beforeUpload}
              fileList={this.state.selectedFileList}
              customRequest={dummyRequest}
              onChange={this.onChange}
              action={this.action}
            >
              <Button icon={<UploadOutlined />}>Upload video only</Button>
            </Upload>
          </div>
        );
      }
    
  };
  
  export default Uploader;