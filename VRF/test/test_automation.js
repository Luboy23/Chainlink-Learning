const {expect, assert} = require("chai")
const { deployments, ethers } = require("hardhat");


describe("test automation", async function () {
    let automation;
    let vrfConsumer;

    //get fixture
    beforeEach(async () => {
        await deployments.fixture("automation");
        vrfCoordinator = await ethers.getContract("AutomationDemo")
    })
        
    // check if checkUpkeep returns false after deployment
    it("checkUpkeep should return false", async () => { 
        const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes());
        const {upkeepNeeded} = await automation.checkUpkeep(checkData);
        assert.equal(upkeepNeeded, false);
    });

    //check if checkUpkeep returns true after withdraw called
    it("checkUpkeep should return true", async () => { 
        await automation.withdraw(100, [10, 20]);
        const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes());
        const {upkeepNeeded} = await automation.checkUpkeep(checkData);
        assert.equal(upkeepNeeded, true);
    });

    // check if checkUpkeep returns false after preformUpkeep called
    it("checkUpkeep should return false", async () => { 
        await automation.withdraw(100, [10, 20]);
        const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes());

        const { performData } = automation.checkUpkeep(checkData);
        
        await automation.performUpkeep(performData);
        const {upkeepNeeded} = await automation.checkUpkeep(checkData);
        
        assert.equal(upkeepNeeded, false);

    });
})