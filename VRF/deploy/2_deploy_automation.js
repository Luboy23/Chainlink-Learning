const { getNamedAccounts, deployments } = require("hardhat");

module.exports = async ({getNamedAccounts,deployments}) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    deploy("AutomationDemo", {
        from: deployer,
        args: [],
        log: true,
    });
}

module.exports.tags = ["automation"];