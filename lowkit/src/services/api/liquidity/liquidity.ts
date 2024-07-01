import axios from "axios";
import { TAppChainId } from "src/types/recipe";
import { TVaultRawData } from "src/types/recipe";
import { apiUrl } from "src/services/apiUrl";
import { ZERO_ADDRESS } from "src/types/recipe";

export async function getListVaultByChainId(chainId: TAppChainId): Promise<TVaultRawData[]> {
    const response = await axios.get(apiUrl.getListVaultByChainId(chainId));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = response.data as any[];


    return data.map((vault) => {
        return {
            addressVault: vault.addressVault,
            vaultStaking: vault.vaultStaking || ZERO_ADDRESS,
            apr: vault.apr,
            tvl: vault.tvl,
            tvlPool: vault.tvlPool,
            chainId: vault.chainId,
            token1: {
                address: vault.token0?.address || ZERO_ADDRESS,
                decimal: vault.token0?.decimals || 18,
                symbol: vault.token0?.symbol || 'Unknow',
            },
            token2: {
                address: vault.token1?.address || ZERO_ADDRESS,
                decimal: vault.token1?.decimals || 18,
                symbol: vault.token1?.symbol || 'Unknow',
            },
            tokenReward: {
                address: vault.rewardToken?.address || ZERO_ADDRESS,
                decimal: vault.rewardToken?.decimals || 18,
                symbol: vault.rewardToken?.symbol || 'Unknow',
            },
        };
    }) as TVaultRawData[];

}