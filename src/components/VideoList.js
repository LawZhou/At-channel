import React, { Component , useState} from 'react';
import { Layout, Menu, Breadcrumb, Typography, Tabs } from 'antd';
import Uploader from './Uploader'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

function VideoList(props) {
  const [videoTitle, setVideoTitle] = useState(null);
  // render() {
    return (
      <div>
        
          {/* Sider menu */}

            {/* Upload video form */}

            {/* <form onSubmit={(event) => {
              event.preventDefault()
              const title = videoTitle.value
              props.uploadVideo(title)
            }} >
              &nbsp;
              <input type='file' accept=".mp4, .mkv .ogg .wmv" onChange={props.captureFile} style={{ width: '250px' }} />
                <div className="form-group mr-sm-2">
                  <input
                    id="videoTitle"
                    type="text"
                    ref={(input) => { setVideoTitle(input) }}
                    className="form-control-sm"
                    placeholder="Title..."
                    required />
                </div>
              <button type="submit" className="btn btn-danger btn-block btn-sm">Upload!</button>
              &nbsp;
            </form> */}
            <Tabs 
            defaultActiveKey="2"
            style={{ backgroundColor:'#F4F5F7', maxHeight:'700px' }}
          >
            <TabPane tab="Upload Video" key='1'>
                {/* <Uploader 
                    uploadVideo={props.uploadVideo}
                    captureFile={props.captureFile}>

                </Uploader> */}
            <Form 
              onFinish={(event) => {
              const title = videoTitle.value
              props.uploadVideo(title)
            }} >
              &nbsp;
              {/* <input type='file' accept=".mp4, .mkv .ogg .wmv" onChange={props.captureFile} style={{ width: '250px' }} />
                <div className="form-group mr-sm-2">
                  <input
                    id="videoTitle"
                    type="text"
                    ref={(input) => { setVideoTitle(input) }}
                    className="form-control-sm"
                    placeholder="Title..."
                    required />
                </div> */}
                <Uploader 
                    uploadVideo={props.uploadVideo}
                    captureFile={props.captureFile}>

                </Uploader>
                &nbsp;
                &nbsp;

                <div className="form-group mr-sm-2">
                  <input
                    id="videoTitle"
                    type="text"
                    ref={(input) => { setVideoTitle(input) }}
                    className="form-control-sm"
                    placeholder="Title..."
                    required />
                </div> 

              <Button htmlType="submit" type="primary">Upload!</Button>
              &nbsp;
            </Form>
            </TabPane>

            <TabPane tab="Videos" key='2' style={{overflow: 'auto', maxHeight:"700px"}}>
                {/* Video List */}
                { props.videos.map((video, key) => {
                return(
                    <div className="card mb-4 text-center bg-secondary mx-auto" style={{ width: '175px'}} key={key} >
                    <div className="card-title bg-dark">
                        <small className="text-white"><b>{video.title}</b></small>
                    </div>
                    <div>
                        <p onClick={() => props.changeVideo(video.hash, video.title)}>
                        <video
                            src={`https://ipfs.infura.io/ipfs/${video.hash}`}
                            style={{ width: '150px' }}
                        />
                        </p>
                    </div>
                    </div>
                )
                })}
            </TabPane>
          </Tabs>
            

            

            
        </div>
    );
  }
// }

export default VideoList;
