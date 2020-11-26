import React, { Component } from 'react';
import dvideo from '../dvideo.png'
import { Layout, Menu, Breadcrumb } from 'antd';


const { Header, Content, Footer } = Layout;

class Navbar extends Component {
  render() {
    return (
      <Layout className="layout">
    <Header>
      {/* <div className="logo" />  */}
      <div className="logo">
      </div>
      
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <a
          // className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={dvideo} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp;DVide0
        </a>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
  </Layout>
    );
  }
  
}




// class Navbar extends Component {

//   render() {
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
//         <ul className="navbar-nav px-3">
//           <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
//             <small className="text-secondary">
//               <small id="account">{this.props.account}</small>
//             </small>
//             { this.props.account
//               ? <img
//                 className='ml-2'
//                 width='30'
//                 height='30'
//                 src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
//                 alt=""
//               />
//               : <span></span>
//             }
//           </li>
//         </ul>
//       </nav>
//     );
//   }
// }

export default Navbar;