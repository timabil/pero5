import { deployErc20, openMint, mintToken, transferToken } from "./week5/create_contract.js";
import {
    importETHWallets,
    writeContractResToFile,
    writeOpenResToFile,
    writeMintResToFile,
    writeTransferResToFile,
    writeResultsToFile,
} from "./accs.js";
import { swapEthForApe, swapEthPancake, swapOpenOcean, placeLimitIzi } from "./uniswap_ape.js";
import { Wallet, ethers } from "ethers";
import { linea_provider, sleep } from "./utils.js";
import chalk from "chalk";

let privates = await importETHWallets();
let modules = [
    swapEthForApe, // 15
    swapOpenOcean, // 15
    swapEthPancake, // 10
    placeLimitIzi, // 10
];

for (let i = 0; i < privates.length; i++) {
    let signer = new Wallet(privates[i], linea_provider);
    let sum = 0;
    console.log(chalk.magenta("start acc", signer.address, "key", privates[i]));
    for (let j = 0; j < modules.length; j++) {
        let res = await modules[j](signer);
        if (res == 0) {
            await writeResultsToFile(modules[j].name, privates[i]);
        }
        await sleep(20);
        sum += res;
    }
    console.log("got", chalk.green(sum), "PTS", signer.address, "key", privates[i]);
}
