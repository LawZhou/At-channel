import React, { Component , useState} from 'react';
import { Layout, Menu, Breadcrumb, Typography } from 'antd';
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

function VideoPanel(props) {
  const [videoTitle, setVideoTitle] = useState(null);
  // render() {
    return (
      <div className="container-fluid text-monospace">
          <br></br>
          &nbsp;
          <br></br>
          <div className="row">
          {/* Video */}
            <div className="col-sm-12">
              <div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '768px'}}>
                <video
                  src={`https://ipfs.infura.io/ipfs/${props.currentHash}`}
                  controls
                >
                </video>
              </div>
            <h3><b><i>{props.currentTitle}</i></b></h3>
          </div>
        </div>
      </div>
    );
  }
// }

export default VideoPanel;
