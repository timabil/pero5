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

let privates = await importETHWallets();

for (let i = 0; i < privates.length; i++) {
    let signer = new Wallet(privates[i], linea_provider);
    let tokenAddress = await deployErc20(signer);
    if (tokenAddress == "") {
        await writeContractResToFile(signer.address);
        continue;
    }
    await sleep(10);
    let success = false;

    success = await openMint(signer, tokenAddress);
    if (!success) {
        await writeOpenResToFile(signer.address);
        continue;
    }
    await sleep(10);

    success = await mintToken(signer, tokenAddress);
    if (!success) {
        await writeMintResToFile(signer.address);
        continue;
    }
    await sleep(10);

    success = await transferToken(signer, tokenAddress);
    if (!success) {
        await writeTransferResToFile(signer.address);
        continue;
    }
}
