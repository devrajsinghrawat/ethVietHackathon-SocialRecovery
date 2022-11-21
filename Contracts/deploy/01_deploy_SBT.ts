import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types"
// import { ethers } from "hardhat"
// import "@typechain/hardhat"
import "dotenv/config"
import verify from "../utils/helper-function"
import { developmentChains } from "../utils/helper-hardhat-config"
const deploySBT: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const SBTContract = await deploy("SocialRecoveryDAOSBT", {
        from: deployer,
        args: []
    });

    console.log(`deployed to: ${SBTContract.address}`);
    await setTimeout(async () => { }, 10000);
    if (!developmentChains.includes(network.name) && (process.env.ETHERSCAN_API_KEY || process.env.POLYSCAN_API_KEY)) {
        await verify(SBTContract.address, [])
    }
}

export default deploySBT;
deploySBT.tags = ["all", "sbt"]