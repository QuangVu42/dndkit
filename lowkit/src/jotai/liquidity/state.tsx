import BigNumber from "bignumber.js";
import { TAccordionVaultState } from "src/types/recipe";
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useAccount, useChainId, useClient } from 'wagmi';
import { getListVaultByChainId } from "src/services/api/liquidity/liquidity";
import { BN } from "src/utils";

export type TLiquidityDataState = {
    loading: boolean;
    error: Error | null;
    listVault: TAccordionVaultState[];
    isFetchingBalance: boolean;
    isFetchingRate: boolean;
    isFetchingUserVaultData: boolean;
    balance: { [key: string]: BigNumber };
    priceTokens: { [key: string]: BigNumber };
}

export const liquidityStateData = atom<TLiquidityDataState>({
    loading: true,
    isFetchingRate: true,
    error: null,
    listVault: [],
    balance: {},
    isFetchingBalance: true,
    priceTokens: {},
    isFetchingUserVaultData: false,
} as TLiquidityDataState);

export const useLiquidityData = () => useAtomValue(liquidityStateData);

export const viewAtom = atom(0);

export const useLiquidityFunction = () => {
    const setLiquidityStateData = useSetAtom(liquidityStateData);
    const chainIdSelected = useChainId() as 97 | 421614 | 42161;
    const { address } = useAccount();
    const client = useClient();

    // native token
    function isCanChangeToNativeToken(token: string) {
        if (chainIdSelected == 97) {
            return token == `WBNB`;
        }
        return token == 'WETH';
    }

    // sort list 
    async function arrangeListVaults(oldIndex: number, newIndex: number) {
        setLiquidityStateData((prev) => {
            const arrPrev = prev.listVault;
            const item = arrPrev.splice(oldIndex, 1);
            const newArr = arrPrev.splice(newIndex, 0, item[0])
            return {
                ...prev,
                listVault: arrPrev
            }
        })
    }

    // get all state all vault data
    async function getStateAllVaultsData() {
        setLiquidityStateData((prev) => ({
            ...prev,
            loading: true,
            error: null,
        }))

        if (chainIdSelected) {
            try {

                const response = await getListVaultByChainId(chainIdSelected)

                const listVaultAddress = response.map((vault) => ({ tcvVault: vault.addressVault }));

                console.log('listVaultAddress', listVaultAddress)

                setLiquidityStateData((prev) => {
                    return {
                        ...prev,
                        listVault: response.map((vault) => {
                            return {
                                tvl: vault.tvl,
                                apr: vault.apr,
                                tvlPool: vault.tvlPool as string,
                                addressVault: vault.addressVault,
                                vaultStaking: vault.vaultStaking,
                                deposited: '0',
                                rewards: '0',
                                token1Info: { ...vault.token1, rate: BN(0) },
                                token2Info: { ...vault.token2, rate: BN(0) },
                                tokenRewardInfo: vault.tokenReward,
                                isCanUseETH: isCanChangeToNativeToken(vault.token1.symbol) ? 'token1' : isCanChangeToNativeToken(vault.token2.symbol) ? 'token2' : null,
                                removeLiquidity: { amount1Input: '0', amount2Input: '0', isUseETH: false },
                                addLiquidity: { amount1Input: '0', amount2Input: '0', isUseETH: false, isZapIn: false, slippage: '1', tokenSelectedZapInOn: 'token1' },
                                dataChart: null,
                                avgApr: null,
                                tcvApr: null,
                                isFetchingPoolData: true,
                            } as TAccordionVaultState;
                        }),
                        loading: false,
                    };
                });
            } catch (err) {
                console.log('error get adll vault', err)
                setLiquidityStateData((prev) => {
                    return {
                        ...prev,
                        listVault: [],
                        loading: false,
                        error: err as Error,
                    };
                });
            }
        }
    }

    return {
        getStateAllVaultsData,
        setLiquidityStateData,
        isCanChangeToNativeToken,
        arrangeListVaults
    };
}