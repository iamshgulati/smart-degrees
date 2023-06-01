var SmartDegree = artifacts.require('./SmartDegree.sol');
module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(SmartDegree);
};
