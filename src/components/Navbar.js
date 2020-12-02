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
        
          {/* <span style={{ fontSize:'xx-large', fontWeight: 'bold', color: 'white'}}>
            @Channel
         </span> */}

      
      {/* <Space style={{ float:'right'}}>
            <span style={{ fontSize:'medium', color: 'white'}}>
              <span id="account">{props.account}</span>
            </span>
            { props.account
              ? <img
                className='ml-2'
                style={{width: 30, height: 30, borderRadius:'50%' }}
                src={`data:image/png;base64,${new Identicon(props.account, 30).toString()}`}
                alt=""
              />
              : <span></span>
            }
        </Space> */}
        
      </PageHeader>
  );
}

// class Navbar extends Component {

//   render() {
//     // console.log(this.props)
//     return (
//       <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace">
//         <a
//           className="navbar-brand col-sm-3 col-md-2 mr-0"
//           href="http://www.dappuniversity.com/bootcamp"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <img src={dvideo} width="30" height="30" className="d-inline-block align-top" alt="" />
//           &nbsp;DVide0
//         </a>
        // <ul className="navbar-nav px-3">
        //   <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
        //     <small className="text-secondary">
        //       <small id="account">{this.props.account}</small>
        //     </small>
        //     { this.props.account
        //       ? <img
        //         className='ml-2'
        //         width='30'
        //         height='30'
        //         src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
        //         alt=""
        //       />
        //       : <span></span>
        //     }
        //   </li>
        // </ul>
//       </nav>
//     );
//   }
// }

export default Navbar;