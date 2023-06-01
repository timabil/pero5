import { deployErc20, openMint, mintToken, transferToken } from "./create_contract.js";
import {
    importETHWallets,
    writeContractResToFile,
    writeOpenResToFile,
    writeMintResToFile,
    writeTransferResToFile,
} from "./accs.js";
import { Wallet, ethers } from "ethers";
import { linea_provider, sleep } from "./utils.js";
import chalk from "chalk";

let privates = await importETHWallets();

for (let i = 0; i < privates.length; i++) {
    let signer = new Wallet(privates[i], linea_provider);
    console.log(chalk.magenta("start acc", signer.address, "key", privates[i]))
    let tokenAddress = await deployErc20(signer);
    if (tokenAddress == "") {
        await writeContractResToFile(signer.address);
        console.log(chalk.yellow("skipping wallet", signer.address));
        continue;
    }
    await sleep(20);
    let success = false;

    success = await openMint(signer, tokenAddress);
    if (!success) {
        await writeOpenResToFile(signer.address);
        console.log(chalk.yellow("skipping wallet", signer.address));
        continue;
    }
    await sleep(20);

    success = await mintToken(signer, tokenAddress);
    if (!success) {
        await writeMintResToFile(signer.address);
        console.log(chalk.yellow("skipping wallet", signer.address));
        continue;
    }
    await sleep(20);

    success = await transferToken(signer, tokenAddress);
    if (!success) {
        await writeTransferResToFile(signer.address);
        console.log(chalk.yellow("skipping wallet", signer.address));
        continue;
    }
    console.log(chalk.green("finished acc", signer.address, "key", privates[i]))
}
