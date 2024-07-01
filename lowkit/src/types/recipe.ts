import { configEvmChain } from "src/wallet/config";
import BigNumber from "bignumber.js";
import { Address } from "viem";
import { IconETH, SvgComponent, IconUSDT, IconWBTC, IconBUSD, IconCAKE, IconUSDC, IconBNB, IconTrava, IconARB } from 'src/assets/icon'

// group recipe
export type TGroupOfRecipe = 'oraidex' | 'orchaiLiquidStake' | 'orchaiMoneyMarket';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

// type 
export type TAppChainId = (typeof configEvmChain)['chains'][number]['id'];

// TAppDenom
export type TAppDenom = 'WBTC' | 'ETH' | 'wstETH' | 'WETH' | 'USDT' | 'BUSD' | 'CAKE' | 'Cake' | 'USDC' | 'WBNB' | 'TRAVA' | 'ARB' | 'BNB';

// type token 
export type TTokenInfo = { address: Address; decimal: number; symbol: string };

// map icon
export const mapTokenToIcon: { [key in TAppDenom]: SvgComponent } = {
    ETH: IconETH,
    wstETH: IconETH,
    WETH: IconETH,
    USDT: IconUSDT,
    BUSD: IconBUSD,
    CAKE: IconCAKE,
    Cake: IconCAKE,
    WBNB: IconBNB,
    USDC: IconUSDC,
    TRAVA: IconTrava,
    ARB: IconARB,
    BNB: IconBNB,
    WBTC: IconWBTC,
};

// type
type TokenState = {
    // price: BigNumber;
    rate: BigNumber;
    // userBalance: BigNumber;
};

// type 
export type TVaultRawData  = {
    chainId: string;
    addressVault: Address;
    vaultStaking: Address;
    token1: TTokenInfo;
    token2: TTokenInfo;
    tokenReward: TTokenInfo;
    tvl: string;
    tvlPool: string;
    apr: string;
}

// type fecthdata
export type TFetchDataChart = {
    ticks: string[];
    liquiditys: number[];
    prices: string[];
    currentTick: number;
    currentPrice: number;
    currentIndex: number;
    newMin: number;
    newMax: number;
};

export type TAddLiquidState = {
    isZapIn: boolean;
    isUseETH: boolean;
    tokenSelectedZapInOn: 'token1' | 'token2';
    amount1Input: string;
    amount2Input: string;
    slippage: string;
};

export type TRemoveLiquidState = {
    isUseETH: boolean;
    amount1Input: string;
    amount2Input: string;
};

export type TAccordionVaultState = {
    token1Info: TTokenInfo & TokenState;
    token2Info: TTokenInfo & TokenState;
    isCanUseETH: 'token1' | 'token2' | null;
    addLiquidity: TAddLiquidState;
    removeLiquidity: TRemoveLiquidState;
    tvl: string;
    apr: string;
    tvlPool: string;
    deposited: string;
    rewards: string;
    tokenRewardInfo: TTokenInfo;
    addressVault: Address;
    vaultStaking: Address;
    avgApr: number | null;
    tcvApr: number | null;
    dataChart: TFetchDataChart | null;
    isFetchingPoolData: boolean;
};