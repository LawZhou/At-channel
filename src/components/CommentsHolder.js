import { Comment, Avatar, Form, Button, List, Input, Tooltip } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import DComment from '../abis/DComment.json'

import Identicon from 'identicon.js';

import Web3 from 'web3';
import './App.css';
import 'antd/dist/antd.css';

class CommentsHolder extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            comments: [],
            dvideo: props.dvideo,
            video: props.video
        }
        this.addCommentsToHolder(this.state.video, this.state.dvideo)
    }

    async addCommentsToHolder(video, dvideo){
        for (var i=video.commentsCount; i >= 0; i--){
            const comment = await dvideo.methods.getComment(video.id, i).call()
            this.state.comments = [...this.state.comments, comment]
        }
    }

    getComments(){
        console.log(this.state)
        console.log(this.state.comments)
        return this.state.comments
    }

}

export default CommentsHolder;