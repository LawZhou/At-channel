import React, { Component } from 'react';
import channel_logo from '../@Channel.png'
import { Layout, Menu, Typography, Space, PageHeader, Avatar, Button } from 'antd';
import './App.css'
import Identicon from 'identicon.js';


const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

function Navbar(props) {
  return (
      <PageHeader 
      title="@Channel" 
      avatar={{src: channel_logo, size: 80}}
      style={{ backgroundColor:'#F4F5F7' }}
      extra={[
              <span id="account" key='1'>{props.account}</span>,
            <span key='2'>
              { props.account? 
              <img
                className='ml-2'
                style={{width: 30, height: 30, borderRadius:'50%' }}
                src={`data:image/png;base64,${new Identicon(props.account, 30).toString()}`}
                alt=""
              />
              : <span></span>
            }
            </span>
            
      ]}
      >
        
      </PageHeader>
  );
}

export default Navbar;