import React, { Component } from 'react';
import DVideo from '../abis/DVideo.json'
import Navbar from './Navbar'
import VideoPanel from './VideoPanel'
import VideoList from './VideoList'
import Comments from './Comments'
import Web3 from 'web3';
import './App.css';
import { DatePicker, message } from 'antd';
import { Layout, Menu, Breadcrumb, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {


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

      // Load videos, sort by newest
      for (var i=videosCount; i>=1; i--) {
        const video = await dvideo.methods.videos(i).call()
        this.setState({
          videos: [...this.state.videos, video]
        })
      }
      

      // Set latest video with title to view as default 
      const latest = await dvideo.methods.videos(videosCount).call()
      this.setState({
        currentHash: latest.hash,
        currentTitle: latest.title,
        currentVideoId: parseInt(latest.id),
        currentTotalRate: parseInt(latest.rateTotal),
        currentNumRate: parseInt(latest.rateNumber),
      })
      // console.log(this.state)
      this.setState({ loading: false})
    } else {
      window.alert('DVideo contract not deployed to detected network.')
    }
  }

  captureFile = event => {
    const file = event
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  updateRate = rate => {
    console.log(rate)
    console.log(this.state.currentNumRate)
    console.log(this.state.currentTotalRate)
    const numRate = this.state.currentNumRate+1
    const totalRate = this.state.currentTotalRate+rate
    this.state.dvideo.methods.updateRate(this.state.currentVideoId, totalRate, numRate, this.state.currentTitle)
      .send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({
        currentNumRate: numRate,
        currentTotalRate: totalRate,
      })
    })
    
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
    })
  }

  changeVideo = (hash, title, rateTotal, rateNumber, videoId) => {
    this.setState({'currentHash': hash});
    this.setState({'currentTitle': title});
    this.setState({
      currentVideoId: videoId,
      currentHash: hash,
      currentTitle: title,
      currentTotalRate: rateTotal,
      currentNumRate: rateNumber
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      buffer: null,
      account: '',
      dvideo: null,
      videos: [],
      loading: true,
      currentVideoId: -1,
      currentHash: null,
      currentTitle: null,
      currentTotalRate: 0,
      currentNumRate: 0,
    }

    this.uploadVideo = this.uploadVideo.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.changeVideo = this.changeVideo.bind(this)
    this.updateRate = this.updateRate.bind(this)
    this.loadWeb3()
    this.loadBlockchainData()
  }
  
  render() {
    console.log(this.state)
    return (
      <Layout>
        <Layout>
            <Navbar 
                account={this.state.account}
              />
        </Layout>
      
        <Layout>
          <Content style={{backgroundColor: '#fff'}}>
              { this.state.loading
                ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
                : <VideoPanel
                    videos={this.state.videos}
                    uploadVideo={this.uploadVideo}
                    captureFile={this.captureFile}
                    changeVideo={this.changeVideo}
                    updateRate={this.updateRate}
                    currentHash={this.state.currentHash}
                    currentTitle={this.state.currentTitle}
                    currentTotalRate={this.state.currentTotalRate}
                    currentNumRate={this.state.currentNumRate}
                  />
              }
              <Comments 
                account = {this.state.account}
                ipfs = {ipfs}
              />
            </Content>
            <Sider align='center' width={'16%'} style={{backgroundColor:'#F4F5F7'}} >
              { this.state.loading
                ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
                : <VideoList
                    videos={this.state.videos}
                    uploadVideo={this.uploadVideo}
                    captureFile={this.captureFile}
                    changeVideo={this.changeVideo}
                    currentHash={this.state.currentHash}
                    currentTitle={this.state.currentTitle}
                  />
              }
          </Sider>
        </Layout>
      </Layout>
    );
  }
}

export default App;