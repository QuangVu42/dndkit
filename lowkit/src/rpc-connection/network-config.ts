import { NativeTokenTransferPermission } from "node_modules/viem/_types/experimental/erc7715/types/permission";
export interface BaseChain {
    name: string;
    nativeCurrency: NativeToken;
    chainId: number;
}

export interface Chain extends BaseChain {
    blockExplorerUrls: Array<string>;
    urls: Array<string>;
    keyToWagmi: string;
}

export type ChainType = StringListType<Chain>;
export const CHAINS: ChainType = {
    [56]: {
        chainId: 56 ,
        blockExplorerUrls: ['https://bscscan.com/'],
        name: 'BSC Mainnet',
        nativeCurrency: BNB,
        urls: [
            // 'https://bsc-dataseed1.defibit.io/',
            // 'https://bsc-dataseed2.defibit.io/',
            'https://bsc-dataseed1.ninicoin.io/',
            'https://bsc-dataseed2.ninicoin.io/',
            'https://bsc-dataseed.binance.org/',
        ],
        keyToWagmi: 'bsc',
    },
    [97]: {
        chainId: 97,
        blockExplorerUrls: ['https://testnet.bscscan.com/'],
        name: 'BSC Testnet',
        nativeCurrency: BNB,
        urls: [
            'https://data-seed-prebsc-2-s2.binance.org:8545/',
            'https://data-seed-prebsc-1-s3.binance.org:8545/',
            'https://data-seed-prebsc-2-s1.binance.org:8545/',
            'https://data-seed-prebsc-1-s1.binance.org:8545/',
            'https://data-seed-prebsc-1-s2.binance.org:8545/',
            'https://data-seed-prebsc-2-s3.binance.org:8545/',
        ],
        keyToWagmi: 'bscTestnet',
    },
};