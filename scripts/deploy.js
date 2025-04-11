const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const ChatApp = await hre.ethers.getContractFactory("ChatApp");
  
  // Deploy the contract
  const chatApp = await ChatApp.deploy();
  
  // Wait for deployment to finish
  await chatApp.waitForDeployment();
  
  // Get the contract address
  const chatAppAddress = await chatApp.getAddress();
  console.log("ChatApp deployed to:", chatAppAddress);
}

// Execute deployment
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
