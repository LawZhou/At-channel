import React from 'react';
import { Typography, Rate } from 'antd';


const { Title } = Typography;



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
