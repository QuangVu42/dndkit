import BigNumber from "bignumber.js";

export function copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text);
}

// format 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BN(value: any): BigNumber {
    return new BigNumber(value);
}