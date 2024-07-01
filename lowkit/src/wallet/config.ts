import { http, createConfig } from 'wagmi';
import { bscTestnet, arbitrum, arbitrumSepolia } from 'wagmi/chains';
import { createClient } from 'viem';
import { injected, walletConnect } from 'wagmi/connectors';
import { IconArbitrum, IconBNB, SvgComponent } from 'src/assets/icon';
import { TAppChainId,TAppDenom } from 'src/types/recipe';
import { imagePath } from 'src/constants/imagePath';

export const configEvmChain = createConfig({
    chains: [bscTestnet, arbitrumSepolia, arbitrum],
    connectors: [
        injected({ target: 'metaMask' }),
        walletConnect({
            projectId: '3f1b6f6df161912ee478fb745054babb',
            showQrModal: true,
            qrModalOptions: {
                themeVariables: {
                    '--wcm-z-index': '1400',
                },
            },
        }),
    ],
    client({ chain }) {
        return createClient({ chain, transport: http() });
    },
});


export const infoChain: { [k in TAppChainId]: { logoChain: SvgComponent; name: string; baseToken: TAppDenom; url: string } } = {
    [arbitrum.id]: {
        logoChain: IconArbitrum,
        name: 'Arbitrum',
        baseToken: 'WETH',
        url: arbitrum.blockExplorers.default.url,
    },
    [bscTestnet.id]: {
        logoChain: IconBNB,
        name: 'BNBTestnet',
        baseToken: 'WBNB',
        url: bscTestnet.blockExplorers.default.url,
    },
    [arbitrumSepolia.id]: {
        logoChain: IconArbitrum,
        name: 'Arbitrum Sepolia',
        baseToken: 'WETH',
        url: arbitrumSepolia.blockExplorers.default.url,
    },
};

export const infoWallet: { [k in string]: { logoWallet: string; name: string } } = {
    // ! only write id wallet allow for connect on web
    // ['io.metamask']: { logoWallet: imagePath.Logo_Metamask, name: 'Metamask' },
    ['metaMask']: { logoWallet: imagePath.Logo_Metamask, name: 'Metamask' },
    ['walletConnect']: { logoWallet: imagePath.Logo_WalletConnect, name: 'WalletConnect' },
};