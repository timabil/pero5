import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import * as stream from "stream";
import { once } from "events";

const __dirname = path.resolve();

export const importETHWallets = async () => {
  let accs = [];
  let instream = fs.createReadStream(path.join(__dirname, "./privates.txt"));
  let outstream = new stream.Stream();
  let rl = readline.createInterface(instream, outstream);
  rl.on("line", (line) => {
    accs.push(line);
  });
  await once(rl, "close");
  return accs;
};
export const importContracts = async () => {
  let accs = [];
  let instream = fs.createReadStream(path.join(__dirname, "./privates.txt"));
  let outstream = new stream.Stream();
  let rl = readline.createInterface(instream, outstream);
  rl.on("line", (line) => {
    accs.push(line);
  });
  await once(rl, "close");
  return accs;
};
export const writeContractToFile = async (data) => {
  fs.writeFile("./contracts.txt", data, (err) => {
    if (err) throw err;
  })
};

export const writeContractResToFile = async (data) => {
  fs.appendFileSync("./failed_contract.txt", data, (err) => {
    if (err) throw err;
  })
};
export const writeOpenResToFile = async (data) => {
  fs.appendFileSync("./failed_open.txt", data, (err) => {
    if (err) throw err;
  })
};
export const writeMintResToFile = async (data) => {
  fs.appendFileSync("./failed_mint.txt", data, (err) => {
    if (err) throw err;
  })
};
export const writeTransferResToFile = async (data) => {
  fs.appendFileSync("./failed_transfer.txt", data, (err) => {
    if (err) throw err;
  })
};