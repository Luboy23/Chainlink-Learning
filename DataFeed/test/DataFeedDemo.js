const { ethers } = require("hardhat");
const { expect } = require("chai");
const chai = require("chai");
const BN = require('bn.js');

chai.use(require('chai-bn')(BN));

describe("Data Feed Demo Test", function () {
    this.timeout(60000);
    it("check if the price data returned by oracle > 0",  async function() {
        //部署合约
        const DataFeed = await ethers.getContractFactory("DataFeedDemo");
        const dataFeed = await DataFeed.deploy();
        dataFeed.deployed();
        // 获取价格数据
        console.log("the contract is deployed successfully");
        const result = await dataFeed.getPrice();
        const resultStr = new ethers.BigNumber.from(result._hex).toString();
        //检查数据是否 >0
        console.log("the price is" + resultStr);
        expect(resultStr).to.be.bignumber.greaterThan("0");
    });
});