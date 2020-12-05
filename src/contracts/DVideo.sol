pragma solidity ^0.5.0;
// import "./DComment.sol" as DComment;

contract DVideo {
  uint public videoCount = 0;
  string public name = "DVideo";
  mapping(uint => Video) public videos;

  struct Video {
    uint id;
    string hash;
    string title;
    address author;
    uint rateTotal;
    uint rateNumber;
    uint commentsCount;
    mapping(uint => Comment) videoComments;
  }

  event VideoUploaded(
    uint id,
    string hash,
    string title,
    uint videoCount,
    address author,
    uint rateTotal,
    uint rateNumber,
    uint commentsCount
  );

  event VideoRateUpdated(
    uint id,
    string title,
    uint rateTotal,
    uint rateNumber
  );

  struct Comment {
    uint id;
    string text;
    address poster;
  }

  event CommentPosted(
    uint id,
    string text,
    uint commentsCount,
    address poster
  );

  constructor() public {
  }

  function uploadVideo(string memory _videoHash, string memory _title) public {
    // Make sure the video hash exists
    require(bytes(_videoHash).length > 0);
    // Make sure video title exists
    require(bytes(_title).length > 0);
    // Make sure uploader address exists
    require(msg.sender!=address(0));

    // Add video to the contract
    videos[videoCount].id = videoCount;
    videos[videoCount].hash = _videoHash;
    videos[videoCount].title = _title;
    videos[videoCount].author = msg.sender;
    videos[videoCount].rateTotal = 0;
    videos[videoCount].rateNumber = 0;
    videos[videoCount].commentsCount = 0;

    // Increment video id
    videoCount ++;

    // Trigger an event
    emit VideoUploaded(videoCount, _videoHash, _title, videoCount, msg.sender, 0, 0, 0);
  }

  function updateRate(uint _id, uint _rateTotal, uint _rateNumber, string memory _title) public {
    require(_id >= 0);
    require(_rateTotal >= 0);
    require(_rateNumber >= 0);
    // Make sure uploader address exists
    require(msg.sender!=address(0));

    videos[_id].rateTotal = _rateTotal;
    videos[_id].rateNumber = _rateNumber;
    emit VideoRateUpdated(_id, _title, _rateTotal, _rateNumber);
  }

  function postComment(uint _id, string memory _text) public {
    require(_id>=0);
    // Make sure comment content exists
    require(bytes(_text).length > 0);
    // Make sure uploader address exists
    require(msg.sender!=address(0));

    // Add comment to the contract
    videos[_id].videoComments[videos[_id].commentsCount] = Comment(videos[_id].commentsCount, _text, msg.sender);

    // Increment comment id
    videos[_id].commentsCount++;

    // Trigger an event
    emit CommentPosted(videos[_id].commentsCount, _text, videos[_id].commentsCount, msg.sender);
  }

  function getComment(uint _videoId, uint _commentId) public returns (string memory text, address poster){
    require(_commentId>=0);
    return (videos[_videoId].videoComments[_commentId].text, videos[_videoId].videoComments[_commentId].poster);
  }

  function getCommentsCount(uint _videoId) public returns (uint commentsCount){
    require(_videoId>=0);
    return videos[_videoId].commentsCount;
  }
}

  
