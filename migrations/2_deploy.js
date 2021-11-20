// migrations/2_deploy.js
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const ClubNervaMembership = artifacts.require('ClubNervaMembership');

module.exports = async function (deployer) {
  await deployProxy(ClubNervaMembership, [], { deployer });
};