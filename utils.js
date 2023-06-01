import { ethers, providers } from "ethers";

const linea_provider = new providers.JsonRpcProvider("https://rpc.goerli.linea.build");
function sleep(sec) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}


export {
    linea_provider,
    sleep
}