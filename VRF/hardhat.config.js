/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("@nomiclabs/hardhat-waffle");


module.exports = {
  solidity: "0.8.18",
  namedAccounts: {
    deployer: {
      default:0,
    }
  }
};
