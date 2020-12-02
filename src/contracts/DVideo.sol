pragma solidity ^0.5.0;

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
  }

  event VideoUploaded(
    uint id,
    string hash,
    string title,
    address author,
    uint rateTotal,
    uint rateNumber
  );

  event VideoRateUpdated(
    uint id,
    string title,
    uint rateTotal,
    uint rateNumber
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

    // Increment video id
    videoCount ++;
    uint rateTotal = 0;
    uint rateNumber = 0;
    // Add video to the contract
    videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender, rateTotal, rateNumber);
    // Trigger an event
    emit VideoUploaded(videoCount, _videoHash, _title, msg.sender, rateTotal, rateNumber);
  }

  function updateRate(uint _id, uint _rateTotal, uint _rateNumber, string memory _title) public {
    require(_id >= 0);
    require(_rateTotal >= 0);
    require(_rateNumber >= 0);
    videos[_id].rateTotal = _rateTotal;
    videos[_id].rateNumber = _rateNumber;
    emit VideoRateUpdated(_id, _title, _rateTotal, _rateNumber);
  }
}

  
