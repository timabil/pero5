import { ethers, providers } from "ethers";

const linea_provider = new providers.JsonRpcProvider("https://rpc.goerli.linea.build");
const explorer = "https://goerli.lineascan.build/tx/";
function sleep(sec) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}


export {
    linea_provider,
    explorer,
    sleep
}