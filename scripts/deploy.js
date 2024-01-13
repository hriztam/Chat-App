const hre = require("hardhat");

async function main() {

  const chatApp = await hre.ethers.deployContract("ChatApp");

  await chatApp.waitForDeployment();

  console.log(
    `Contract Address: ${chatApp.address} ` 
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
