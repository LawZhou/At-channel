import { Comment, Avatar, Form, Button, List, Input, Tooltip } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import DComment from '../abis/DComment.json'

import Identicon from 'identicon.js';

import Web3 from 'web3';
import './App.less';
import 'antd/dist/antd.css';

  const { TextArea } = Input;

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => 
      <Comment
        avatar={
            <Avatar
              src={props.author? `data:image/png;base64,${new Identicon(props.author, 30).toString()}`: ""}
              alt={props.author? props.author: ""}
            />
          }
        author = {props.author}
        content = {props.content}
        
       />}
    />
  );
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

  class Comments extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        ipfs: null,
        account: null,
        comments: [],
        submitting: false,
        value: '',
      }
      this.loadBlockchainData()
      this.postComment = this.postComment.bind(this)
    }

    componentDidUpdate(prevProps){
      if(this.props.account !== prevProps.account){
        this.setState({
          account: this.props.account,
          ipfs: this.props.ipfs
        })
      }
    }

    // async loadWeb3() {
    //   if (window.ethereum) {
    //     window.web3 = new Web3(window.ethereum)
    //     await window.ethereum.enable()
    //   }
    //   else if (window.web3) {
    //     window.web3 = new Web3(window.web3.currentProvider)
    //   }
    //   else {
    //     window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    //   }
    // }
  
    async loadBlockchainData() {
      const web3 = window.web3
      // Network ID
      const networkId = await web3.eth.net.getId()
      const networkData = DComment.networks[networkId]
      if(networkData) {
        const dcomment = new web3.eth.Contract(DComment.abi, networkData.address)
        this.setState({ dcomment })
        const commentsCount = await dcomment.methods.commentCount().call()
        this.setState({ commentsCount })
        
        // Load videos, sort by newest
        for (var i=commentsCount; i>=1; i--) {
          const result = await dcomment.methods.comments(i).call()
          const comment = {
            author: result[3],
            content: result.text,
          }
          console.log(comment)
          this.setState({
            comments: [...this.state.comments, comment]
          })
        }
        console.log(this.state)
      } else {
        window.alert('DVideo contract not deployed to detected network.')
      }
    }


      handleSubmit = () => {
        if (!this.state.value) {
          return;
        }
    
        this.setState({
          submitting: true,
        });
    
        this.postComment();
      };

      postComment = () => {
        const buf = Buffer.from(this.state.value, 'utf-8');
        console.log("Submitting comment to IPFS...")

        //adding file to the IPFS
        this.state.ipfs.add(buf, (error, result) => {
          console.log('IPFS result', result)
          if(error) {
            console.error(error)
            return
          }

          this.state.dcomment.methods.postComment(result[0].hash, this.state.value)
            .send({ from: this.state.account }).on('transactionHash', (hash) => {

              this.setState({
                submitting: false,
                value: '',
                // comments: [
                //   {
                //     author: 'Han Solo',
                //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                //     content: <p>{this.state.value}</p>,
                //     // datetime: moment().fromNow(),
                //   },
                //   ...this.state.comments,
                // ],
              });
          })
          // window.location.reload()
        })
      }
    
      handleChange = e => {
        this.setState({
          value: e.target.value,
        });
      };
    
      render() {
        console.log(this.state)
        const { comments, submitting, value } = this.state;
      return (
        <div>
        <Comment
          avatar={
            <Avatar
              src={this.props.account? `data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`: ""}
              alt={this.props.account? this.props.account: ""}
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
        {this.props.account && comments.length > 0 && <CommentList comments={comments} />}
    </div>
      );
        }
    }
    

  export default Comments;
