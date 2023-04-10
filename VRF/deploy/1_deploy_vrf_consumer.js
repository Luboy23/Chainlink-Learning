const { getNamedAccounts, deployments, } = require("hardhat");
const { ethers } = require("ethers");



module.exports = async ({  }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();


    let vrfCoordinatorAddr;
    let subId;

    // get coordinator address
    const vrfCoordinator = await ethers.getContract("VRFCoordinatorV2Mock");
    vrfCoordinatorAddr = vrfCoordinator.address;

    // create subscription and get subId
    const tx = await vrfCoordinator.createSubscription();
    const txReceipt = await tx.wait(1);
    subId = ethers.BigNumber.from(txReceipt.events[0].topics[1]);

    // fund subscription
    await vrfCoordinator.fundSubscription(subId, "100000000000000000000");

    // deploy
    await deploy("ChainlinkVRF", {
        from: deployer,
        args: [subId, vrfCoordinatorAddr],
        log: true,
    });
}

module.exports.tags = ["vrf"];
