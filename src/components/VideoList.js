import React, {useState} from 'react';
import Uploader from './Uploader'
import {Form, Button, Tabs} from 'antd';

const { TabPane } = Tabs;


function VideoList(props) {
  const [videoTitle, setVideoTitle] = useState(null);
    return (
      <div>
        
          {/* Sider menu */}
            <Tabs 
            defaultActiveKey="2"
            style={{ backgroundColor:'#F4F5F7', maxHeight:'100%'}}
          >
            <TabPane tab="Upload Video" key='1'>
            <Form 
              onFinish={(event) => {
              const title = videoTitle.value
              props.uploadVideo(title)
            }} >
              &nbsp;
                <Uploader 
                    uploadVideo={props.uploadVideo}
                    captureFile={props.captureFile}>

                </Uploader>
                &nbsp;
                &nbsp;
                <div className="form-group mr-sm-2">
                  <input
                    id="videoTitle"
                    type="text"
                    ref={(input) => { setVideoTitle(input) }}
                    className="form-control-sm"
                    placeholder="Title..."
                    required />
                </div> 
              <Button htmlType="submit" type="primary">Upload!</Button>
              &nbsp;
            </Form>
            </TabPane>
            <TabPane tab="Videos" key='2' style={{overflow: 'auto', maxHeight:"700px"}}>
                {/* Video List */}
                { props.videos.map((state, key) => {
                var video = state
                return(
                    <div className="card mb-4 text-center bg-secondary mx-auto" style={{ width: '175px'}} key={key} >
                    <div className="card-title bg-dark">
                        <small className="text-white"><b>{video.title}</b></small>
                    </div>
                    <div>
                        <p onClick={() => props.changeVideo(video)}>
                        <video
                            src={`https://ipfs.infura.io/ipfs/${video.hash}`}
                            style={{ width: '150px' }}
                        />
                        </p>
                    </div>
                    </div>
                )
                })}
            </TabPane>
          </Tabs>
        </div>
    );
  }

export default VideoList;
