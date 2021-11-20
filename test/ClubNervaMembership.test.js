// test/Box.test.js
// Load dependencies
const { expect } = require('chai');

// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert, ZERO_BYTES32, ZERO_ADDRESS } = require('@openzeppelin/test-helpers');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

// Load compiled artifacts
const ClubNervaMembership = artifacts.require('ClubNervaMembership');

// Start test block
contract('CNM', function ([ owner, other ]) {

  beforeEach(async function () {
    //this.box = await Box.new({ from: owner });
    this.accounts = await web3.eth.getAccounts();
    this.cnm = await deployProxy(ClubNervaMembership, [], { owner });
  });

  it('safeMint fails for non owner', async function () {
    await expectRevert(
      this.cnm.safeMint(other, 'testuri' , { from: other }),
      'Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.',
    );
    // Use large integer comparisons
    // expect(await this.box.retrieve()).to.be.bignumber.equal(value);
  });

  it('safeMint works for owner and changes approver', async function() {
    const receipt = await this.cnm.safeMint(other, 'testuri' , { from: owner });
    expect(await this.cnm.ownerOf(new BN(0))).to.equal(other);
    expect(await this.cnm.getApproved(new BN(0))).to.equal(owner);
    expectEvent(receipt, 'Transfer', { to: other, tokenId: new BN(0) });
    expectEvent(receipt, 'Approval', { owner: other, approved: owner, tokenId: new BN(0) });
  });

  it('setTokenURI fails for non owner', async function () {
    await this.cnm.safeMint(other, 'testuri', { from: owner });
    await expectRevert(
      this.cnm.setTokenURI(new BN(0), 'anotheruri', { from: other }),
      'Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.',
    );
    // Use large integer comparisons
    // expect(await this.box.retrieve()).to.be.bignumber.equal(value);
  });

  it('setTokenURI works for owner and changes metadata uri', async function() {
    await this.cnm.safeMint(other, 'testuri', { from: owner });
    await this.cnm.setTokenURI(new BN(0), 'anotheruri', { from: owner });
    expect(await this.cnm.tokenURI(new BN(0))).to.equal('anotheruri');
  });

  it('safeTransferFrom fails for non owner', async function () {
    await this.cnm.safeMint(other, 'testuri', { from: owner });
    await expectRevert(
      this.cnm.safeTransferFrom(other, owner, new BN(0), { from: other }),
      'Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.',
    );
    // Use large integer comparisons
    // expect(await this.box.retrieve()).to.be.bignumber.equal(value);
  });

  it('safeTransferFrom works for owner and transfer the NFT', async function() {
    await this.cnm.safeMint(other, 'testuri', { from: owner });
    const receipt = await this.cnm.safeTransferFrom(other, owner, new BN(0), { from: owner });
    expect(await this.cnm.ownerOf(new BN(0))).to.equal(owner);
    expectEvent(receipt, 'Transfer', { from: other, to: owner});
  });

  it('transferFrom fails for non owner', async function () {
    await this.cnm.safeMint(other, 'testuri', { from: owner });
    await expectRevert(
      this.cnm.transferFrom(other, owner, new BN(0), { from: other }),
      'Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.',
    );
    // Use large integer comparisons
    // expect(await this.box.retrieve()).to.be.bignumber.equal(value);
  });

  it('transferFrom works for owner and transfer the NFT', async function() {
    await this.cnm.safeMint(other, 'testuri', { from: owner });
    const receipt = await this.cnm.transferFrom(other, owner, new BN(0), { from: owner });
    expect(await this.cnm.ownerOf(new BN(0))).to.equal(owner);
    expectEvent(receipt, 'Transfer', { from: other, to: owner});
  });

  it('approve not supported', async function() {
    await this.cnm.safeMint(other, 'testuri', { from: owner });
    await expectRevert(
      this.cnm.approve(other, new BN(0), { from: other }),
      'Not supported!',
    );
    // Use large integer comparisons
    // expect(await this.box.retrieve()).to.be.bignumber.equal(value);
  });

  it('setApprovalForAll not supported', async function() {
    await this.cnm.safeMint(other, 'testuri', { from: owner });
    await expectRevert(
      this.cnm.setApprovalForAll(other, { from: other }),
      'Not supported!',
    );
    // Use large integer comparisons
    // expect(await this.box.retrieve()).to.be.bignumber.equal(value);
  });


 /*
  it('store emits an event', async function () {
    const receipt = await this.box.store(value, { from: owner });

    // Test that a ValueChanged event was emitted with the new value
    expectEvent(receipt, 'ValueChanged', { value: value });
  });

  it('non owner cannot store a value', async function () {
    // Test a transaction reverts
    await expectRevert(
      this.box.store(value, { from: other }),
      'AdminBox: not admin',
    );
  });
  */
});