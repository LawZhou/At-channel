pragma solidity ^0.5.0;

contract DComment {
  uint public commentCount = 0;
  string public name = "DComment";
  mapping(uint => Comment) public comments;

  struct Comment {
    uint id;
    string hash;
    string text;
    address poster;
  }

  event CommentPosted(
    uint id,
    string hash,
    string text,
    address poster
  );

  constructor() public {
  }

  function postComment(string memory _commentHash, string memory _text) public {
    // Make sure the comment hash exists
    require(bytes(_commentHash).length > 0);
    // Make sure comment content exists
    require(bytes(_text).length > 0);
    // Make sure uploader address exists
    require(msg.sender!=address(0));

    // Increment comment id
    commentCount ++;

    // Add comment to the contract
    comments[commentCount] = Comment(commentCount, _commentHash, _text, msg.sender);
    // Trigger an event
    emit CommentPosted(commentCount, _commentHash, _text, msg.sender);
  }
}
