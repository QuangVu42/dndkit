import { useState } from 'react';
import { Box, Button, ClickAwayListener, Divider, MenuItem, Typography } from '@mui/material';
import { useChainId } from "wagmi"
import { useSwitchChain } from "wagmi";
import { infoChain } from "src/wallet/config";
import { TAppChainId } from "src/types/recipe";
import { HourglassEmpty } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ButtonSelectChain() {

    // state
    const [open, setOpen] = useState<boolean>(false);

    // select
    const chainIdConnected = useChainId() as TAppChainId;
    const { chains, switchChain, isPending } = useSwitchChain();

    // logo
    const IconChainConnected = infoChain[chainIdConnected]?.logoChain;

    // onClick away
    const handleClickAway = () => {
        setOpen(false);
    };

    // switch chain
    const onSwitchChain = (item: number) => {
        switchChain({ chainId: item as 42161 | 97 });
        handleClickAway();
    };

    // show
    const handleClick = () => {
        setOpen(!open);
    };

    console.log('chainIdConnected', chainIdConnected)
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative', mr: 1 }}>
                {isPending ? (
                    <Button
                        startIcon={
                            <HourglassEmpty
                                sx={{
                                    fontSize: '17px'
                                }}
                            />
                        }
                        variant="outlined"
                        sx={{ borderColor: '#2465DE', color: 'white', height: { xs: '36px', xsm: '44px' } }}
                    >
                        <Box component={'span'} sx={{ display: { sm: 'block', xs: 'none' } }}>
                            Switching...
                        </Box>
                    </Button>
                ) : (
                    <Button
                        onClick={handleClick}
                        variant="outlined"
                        sx={{ borderColor: '#2465DE', color: 'white', height: { xs: '36px', xsm: '44px' } }}
                        endIcon={<ExpandMoreIcon sx={{ color: 'white', fontSize: '24px' }} />}
                    >
                        <IconChainConnected sx={{ fontSize: '24px', mr: { xs: 0, sm: 1 } }} />
                        <Box component={'span'} sx={{ display: { sm: 'block', xs: 'none' } }}>
                            {infoChain[chainIdConnected]?.name}
                        </Box>
                    </Button>
                )}

                {open ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100%',
                            minWidth: '180px',
                            bgcolor: 'background.paper',
                            borderRadius: '16px',
                            boxShadow: 4,
                            py: 2,
                        }}
                    >
                        <Typography sx={{ textAlign: 'center', mb: 1 }} variant="body2" fontWeight={600}>
                            Select a network
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {chains.map((chain, index) => {
                            if (chain.id !== chainIdConnected) {
                                const MenuIcon = infoChain[chain.id as TAppChainId]?.logoChain;

                                return (
                                    <MenuItem
                                        sx={{ mb: 0.5 }}
                                        key={index + '' + chain.id}
                                        onClick={() => {
                                            onSwitchChain(chain.id);
                                        }}
                                    >
                                        <MenuIcon sx={{ fontSize: '24px', mr: 1 }} />
                                        <Typography>{infoChain[chain.id as TAppChainId]?.name || 'Unknow'}</Typography>
                                    </MenuItem>
                                );
                            }
                            return null;
                        })}
                    </Box>
                ) : null}
            </Box>
        </ClickAwayListener>
    )
}
