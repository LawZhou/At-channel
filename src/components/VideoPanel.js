import React, { Component , useState} from 'react';
import { Layout, Menu, Breadcrumb, Typography, Rate } from 'antd';
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
  Checkbox,
  Row,
  Col,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title, Paragraph, Text, Link } = Typography;



function VideoPanel(props) {
    const handleRate = (value) => {
      props.updateRate(value)
    }
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
              &nbsp;
              &nbsp;
              &nbsp;
              <Title level={1}>{props.currentTitle}</Title>
              &nbsp;
              &nbsp;
              <span className="ant-rate-text">Rate this video: </span>
              <Rate 
                value={
                    props.currentNumRate===0? 
                    0:
                    Math.floor(props.currentTotalRate/props.currentNumRate)
                  } 
                onChange={handleRate}
                />
          </div>
        </div>
      </div>
    );
  }

export default VideoPanel;
