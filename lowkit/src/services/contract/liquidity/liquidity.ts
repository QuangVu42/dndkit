import { ethers } from "ethers";
import { abiTCV } from "src/wallet/abi/TCV";

export async function callContract(address: string) {

    const contractAbi = new ethers.Contract(address, abiTCV, )
}