import { BACKEND_URL } from './baseURL';
import { Address } from 'viem';
import { TAppChainId } from 'src/types/recipe';

export const apiUrl = {
    getListVaultByChainId: (chainId: TAppChainId) => `${BACKEND_URL}/tcv/vault?chainId=${chainId}`,
    getPoolInfoByVaultAddress: (vaultAddress: Address, chainId: TAppChainId) => `${BACKEND_URL}/tcv/vault/${vaultAddress}/pool?chainId=${chainId}`,
};