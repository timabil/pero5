import { parseEther, parseUnits } from "@ethersproject/units";
import { sleep, linea_provider } from "../utils.js";
import { BigNumber, Wallet, ethers } from "ethers";
import { defaultAbiCoder } from "@ethersproject/abi";
import { importETHWallets, writeContractToFile, writeResToFile } from "../accs.js";

let hapiWallet = "0x1ed47146ba443D16F67f489800dc5d7786e07c5d";

async function sendEth(signer, to, value) {
    let tx = {
        to: to,
        value: value
    }
    let hash = await signer.sendTransaction(tx);
}

async function doQuest(signer) {
    let hapiAmount = parseEther("0.0001");
    let wallet2Amount = parseEther("0.0002");
    let wallet3Amount = parseEther("0.0003");
}