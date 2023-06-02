import { BigNumber, Contract, Wallet, utils } from "ethers";
import { sleep, linea_provider } from "./utils.js";
import { importETHWallets } from "./accs.js";

function getRandomValue() {
    let amount_min = utils.parseEther("0.08");
    let amount_max = utils.parseEther("0.11");
    let delta = amount_max.sub(amount_min);
    let random = Math.round(Math.random() * 100);
    let randomValue = amount_min.add(delta.mul(random.toString()).div("100"));
    return randomValue;
}
async function getGasPrice() {
    let fee = await linea_provider.getFeeData();
    let price = fee.gasPrice.mul("15").div("10");
    return price;
}
async function sendEth() {
    let mainSigner = new Wallet(privates[0], linea_provider);
    for (let i = 1; i < privates.length; i++) {
        let signer = new Wallet(privates[i], linea_provider);
        let toAddress = signer.address;
        let amount = getRandomValue().toString();
        let tx;
        try{ 
            tx = await mainSigner.sendTransaction({
                to: toAddress,
                value: amount,
                gasPrice: await getGasPrice()
            });
        } catch(err) {
            console.log("ERROR ON", signer.address);
            await sleep(10);
            tx = await mainSigner.sendTransaction({
                to: toAddress,
                value: amount,
                gasPrice: await getGasPrice()
            });
        }
        await sleep(10)
        console.log("sent", utils.formatEther(amount), "eth to", toAddress);
    }
}
let privates = await importETHWallets();

await sendEth()