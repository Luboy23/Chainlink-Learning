const {expect, assert} = require("chai")
const { deployments, ethers } = require("hardhat");


describe("test VRFConsumer", async function () {
    let VrfCoordinator;
    let VrfConsumer;

    //get fixture
    beforeEach(async () => {
        await deployments.fixture("mock","vrf");
        VrfCoordinator = await ethers.getContract("VRFCoordinatorV2Mock")
        VrfConsumer = await ethers.getContract("ChainlinkVRF");
        
    })
        
    // check event
    it("check if we can request random number", async () => { 
        expect(vrfConsumer.requestRandomWords()).to.emit(
            vrfCoordinator,
            "RandomWordsRequested"
        )
    });
    
    //check the randomwords
    it("check if we can receive random number", async () => {
        vrfConsumer.requestRandomWords();
        const requestId = vrfConsumer.requestId();
        vrfConsumerAddr = await vrfConsumer.address;

        await vrfCoordinator.fufillRandomWords(requestId, vrfConsumerAddr);

        const  firstRandomWord = await vrfConsumer.s_randomWords(0);
        const secondRandomWord = await vrfConsumer.s_randomWords(1);
        const thirdRandomWord = await vrfConsumer.s_randomWords(2);

        assert(firstRandomWord.gt(ethers.constants.Zero), " first random word is greater than 0");
        assert(secondRandomWord.gt(ethers.constants.Zero), " second random word is greater than 0");
        assert(thirdRandomWord.gt(ethers.constants.Zero), " third random word is greater than 0");

    });

})