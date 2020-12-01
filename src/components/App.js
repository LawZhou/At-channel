import React, { Component, useEffect, useState, useLayoutEffect } from 'react';
import DVideo from '../abis/DVideo.json'
import Navbar from './Navbar'
import Main from './Main'
import Comments from './Comments'
import Web3 from 'web3';
import './App.css';
import { DatePicker, message } from 'antd';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

// function App(props){
  
  
//   const [state, setState] = useState({
//       buffer: null,
//       account: '',
//       dvideo: null,
//       videos: [],
//       loading: true,
//       currentHash: null,
//       currentTitle: null
    
//   })
  
//   // const [_, __] = useState(async () =>{
//   //   await loadWeb3()
//   //   await loadBlockchainData()
//   // })
//   useEffect(() => {
//     const loadWeb3 = async () => {
//       if (window.ethereum) {
//         window.web3 = new Web3(window.ethereum)
//         await window.ethereum.enable()
//       }
//       else if (window.web3) {
//         window.web3 = new Web3(window.web3.currentProvider)
//       }
//       else {
//         window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
//       }
//     };
//     loadWeb3()
//   })
//   // setState({
//   //     ...state,
//   //     account: 12345
//   //   })
//   useEffect(() => {
//     const loadBlockchainData = async() => {
//       // console.log("calling block chain data")
//       const web3 = window.web3
//       // Load account
//       const accounts = await web3.eth.getAccounts()
//       // console.log(accounts)
//       setState({
//         ...state,
//         account: accounts
//       })
//       // Network ID
//       const networkId = await web3.eth.net.getId()
//       const networkData = DVideo.networks[networkId]
//       if(networkData) {
//         // console.log('setting state........')
//         const _dvideo = new web3.eth.Contract(DVideo.abi, networkData.address)
//         setState({ ...state, dvideo: _dvideo })
//         const _videosCount = await _dvideo.methods.videoCount().call()
//         setState({ ...state, videosCount:_videosCount })
//         // console.log(_dvideo)
//         // console.log(_videosCount)
//         // console.log(state)
//         // Load videos, sort by newest
//         for (var i=_videosCount; i>=1; i--) {
//           const video = await _dvideo.methods.videos(i).call()
//           setState({
//             ...state,
//             videos: [...state.videos, video]
//           })
//         }

//         //Set latest video with title to view as default 
//         const latest = await _dvideo.methods.videos(_videosCount).call()
//         setState({
//           ...state,
//           currentHash: latest.hash,
//           currentTitle: latest.title,
//         })
//         setState({ ...state, loading: false})
//       } else {
//         window.alert('DVideo contract not deployed to detected network.')
//       }
//     }
//     loadBlockchainData()
//   }, [state.loading])

//     const changeVideo = (hash, title) => {
//       setState({...state, 'currentHash': hash });
//       setState({...state, 'currentTitle': title });
//     }
  
//     const captureFile = event => {
//       event.preventDefault()
//       const file = event.target.files[0]
//       const reader = new window.FileReader()
//       reader.readAsArrayBuffer(file)

//       reader.onloadend = () => {
//         setState({ ...state, buffer: Buffer(reader.result) })
//         console.log('buffer', state.buffer)
//       }
//   }


//     const uploadVideo = title => {
//       console.log("Submitting file to IPFS...")

//       //adding file to the IPFS
//       ipfs.add(state.buffer, (error, result) => {
//         console.log('IPFS result', result)
//         if(error) {
//           console.error(error)
//           return
//         }

//         setState({ ...state, loading: true })
//         state.dvideo.methods.uploadVideo(result[0].hash, title).send({ from: state.account }).on('transactionHash', (hash) => {
//           setState({ ...state, loading: false })
//         })
//         // window.location.reload()
//     })
//   }
//     // console.log(state)
//     return (
//           <div>
//           <Navbar 
//             account={state.account}
//           />
//           { state.loading
//             ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
//             : <Main
//                 videos={state.videos}
//                 uploadVideo={uploadVideo}
//                 captureFile={captureFile}
//                 changeVideo={changeVideo}
//                 currentHash={state.currentHash}
//                 currentTitle={state.currentTitle}
//               />
//           }
//           <Comments />
//         </div>
//     );

// }

class App extends Component {

  // componentDidMount() {
  //   this.loadWeb3()
  //   this.loadBlockchainData()
  // }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = DVideo.networks[networkId]
    if(networkData) {
      const dvideo = new web3.eth.Contract(DVideo.abi, networkData.address)
      this.setState({ dvideo })
      const videosCount = await dvideo.methods.videoCount().call()
      this.setState({ videosCount })
      // console.log(this.state)
      // Load videos, sort by newest
      for (var i=videosCount; i>=1; i--) {
        const video = await dvideo.methods.videos(i).call()
        this.setState({
          videos: [...this.state.videos, video]
        })
      }

      //Set latest video with title to view as default 
      const latest = await dvideo.methods.videos(videosCount).call()
      this.setState({
        currentHash: latest.hash,
        currentTitle: latest.title
      })
      this.setState({ loading: false})
    } else {
      window.alert('DVideo contract not deployed to detected network.')
    }
  }

  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }


  uploadVideo = title => {
    console.log("Submitting file to IPFS...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.dvideo.methods.uploadVideo(result[0].hash, title).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
      // window.location.reload()
    })
  }

  changeVideo = (hash, title) => {
    this.setState({'currentHash': hash});
    this.setState({'currentTitle': title});
  }

  constructor(props) {
    super(props)
    this.state = {
      buffer: null,
      account: '',
      dvideo: null,
      videos: [],
      loading: true,
      currentHash: null,
      currentTitle: null
    }

    this.uploadVideo = this.uploadVideo.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.changeVideo = this.changeVideo.bind(this)
    this.loadWeb3()
    this.loadBlockchainData()
  }
  
  render() {
    // console.log(this.state)
    return (
      <div>
      <Header>
        <Navbar 
            account={this.state.account}
          />
      </Header>
        <Content>
          { this.state.loading
            ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            : <Main
                videos={this.state.videos}
                uploadVideo={this.uploadVideo}
                captureFile={this.captureFile}
                changeVideo={this.changeVideo}
                currentHash={this.state.currentHash}
                currentTitle={this.state.currentTitle}
              />
          }
          <Comments 
          account = {this.state.account}
          ipfs = {ipfs}
        />
        </Content>
        <Footer>Footer</Footer>
        
      </div>
    );
  }
}

export default App;