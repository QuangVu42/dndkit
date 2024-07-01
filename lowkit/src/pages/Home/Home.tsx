import { useEffect } from "react";
import { Box } from "@mui/material";
import HomeLeft from "src/component/HomeLeft/HomeLeft"
import HomeRight from "src/component/HomeRight/HomeRight"
import { useLiquidityFunction } from 'src/jotai/liquidity/state';
import { useChainId } from "wagmi";
import HomeTop from "src/component/HomeTop/HomeTop";

export default function Home() {

    const chainIdSelected = useChainId()

    // const get data all 
    const { getStateAllVaultsData } = useLiquidityFunction()

    // call api
    useEffect(() => {
        getStateAllVaultsData()
    }, [chainIdSelected])

    return (
        <>
            <div style={{margin: '20px 0'}}>
                <HomeTop />
            </div>
            <Box>
                <HomeLeft />
                <HomeRight />
            </Box>
        </>
    )
}
