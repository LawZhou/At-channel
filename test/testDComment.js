const DComment = artifacts.require('./DComment.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('DComment', ([deployer, poster]) => {
  let dcomment

  before(async () => {
    dcomment = await DComment.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await dcomment.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await dcomment.name()
      assert.equal(name, 'DComment')
    })
  })

  describe('comments', async () => {
    let result, commentCount
    const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'

    before(async () => {
      result = await dcomment.postComment(hash, 'Comment testing!!!', { from: poster })
      commentCount = await dcomment.commentCount()
    })

    //check event
    it('post comments', async () => {
      // SUCESS
      assert.equal(commentCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), commentCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.text, 'Comment testing!!!', 'content is correct')
      assert.equal(event.poster, poster, 'poster is correct')

      // FAILURE: comment must have hash
      await dcomment.postComment('', 'Comment testing!!!', { from: poster }).should.be.rejected;

      // FAILURE: comment must have text
      await dcomment.postComment('comment hash', '', { from: poster }).should.be.rejected;
    })

    //check from Struct
    it('lists comment', async () => {
      const comment = await dcomment.comments(commentCount)
      assert.equal(comment.id.toNumber(), commentCount.toNumber(), 'id is correct')
      assert.equal(comment.hash, hash, 'Hash is correct')
      assert.equal(comment.text, 'Comment testing!!!', 'content is correct')
      assert.equal(comment.poster, poster, 'poster is correct')
    })
  })
})