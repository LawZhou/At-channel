pragma solidity ^0.5.0;

contract DComment {
  uint public commentCount = 0;
  string public name = "DComment";
  mapping(uint => Comment) public comments;

  struct Comment {
    uint id;
    string text;
    address poster;
  }

  event CommentPosted(
    uint id,
    string text,
    address poster
  );

  constructor() public {
  }

  function postComment(string memory _text) public {
    // Increment comment id
    commentCount ++;

    // Add comment to the contract
    comments[commentCount] = Comment(commentCount, _text, msg.sender);
    // Trigger an event
    emit CommentPosted(commentCount, _text, msg.sender);
  }
}
