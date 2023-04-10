const { getNamedAccounts, deployments } = require("hardhat");

const baseFee = "10000000000000000"; //0.1link
const gasPriceLink = "1000000000"; // 1 gwei
module.exports = async ({getNamedAccounts,deployments}) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    deploy("VRFCoordinatorV2Mock", {
        from: deployer,
        args: [
            baseFee,
            gasPriceLink
        ],
        log: true,
    });
}

module.exports.tags = ["mock"];