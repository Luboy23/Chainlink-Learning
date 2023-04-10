const hre =require("hardhat")

async function main() {
    const DataFeedDemo = await hre.ethers.getContractFactory("DataFeedDemo");
    const dataFeedDemo = await DataFeedDemo.deploy();

    await dataFeedDemo.deployed();
    console.log("DataFeedDemo contract deployed:", dataFeedDemo.address);
}

main()
    .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });