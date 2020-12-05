import { Comment, Avatar, Form, Button, List, Input, Tooltip } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import DComment from '../abis/DComment.json'

import Identicon from 'identicon.js';

import Web3 from 'web3';
import './App.css';
import 'antd/dist/antd.css';

  const { TextArea } = Input;

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => 
      <Comment
        style={{borderBottom: '1px solid #f0f0f0'}}
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
        dvideo: null,
        ipfs: null,
        account: null,
        submitting: false,
        currentVideo: null,
        value: '',
        comments: []
      }
      // this.loadBlockchainData()
      this.postComment = this.postComment.bind(this)
    }

    resetState = () => {
      this.setState({
        submitting: false,
        value: '',
        comments: [],
      })
    }

    componentDidUpdate(prevProps){
      if(this.props !== prevProps){
        this.setState({
          account: this.props.account,
          ipfs: this.props.ipfs,
          dvideo: this.props.dvideo,
          currentVideo: this.props.currentVideo,
        }, ()=> {
          if (this.state.currentVideo && (this.props.currentVideo !== prevProps.currentVideo)){
            this.resetState()
            this.addCommentsToHolder()
          }
        }) 
      }
    }
    
    async addCommentsToHolder(){
      const video = this.state.currentVideo
      const dvideo = this.state.dvideo
      for (var i=this.state.currentVideo.commentsCount-1; i >= 0; i--){
          const result = await dvideo.methods.getComment(video.id, i).call()
          const comment = {
            author: result.poster,
            content: result.text,
          }
          this.setState({
            comments: [...this.state.comments, comment]
          }) 
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
        this.state.dvideo.methods.postComment(this.state.currentVideo.id, this.state.value)
          .send({ from: this.state.account }).on('transactionHash', (hash) => {
            // reset comment state
            this.resetState()
            // reset video state
            this.props.resetState()
            this.props.loadBlockchainData()
        })
      }
    
      handleChange = e => {
        this.setState({
          value: e.target.value,
        });
      };
    
      render() {
        const { submitting, value } = this.state;
        const comments = this.state.comments
          
      return (
        <div className="container-fluid text-monospace">
        <div className="row">
          {/* Video */}
            <div className="col-sm-12">
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
        
        </div>
    </div>
      );
        }
    }
    

  export default Comments;
