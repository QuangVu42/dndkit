import { Box, Typography } from '@mui/material';
import { IconSpinLoading } from 'src/assets/icon';
import { useModalFunction } from 'src/jotai/modal/modal';
import { infoChain,infoWallet } from 'src/wallet/config';
import { TAppChainId } from 'src/types/recipe';
import { Connector, useChainId, useConnect } from 'wagmi';

export default function ModalListWalletConnect() {
    const { connectAsync, connectors, isPending } = useConnect();
    const { closeModal } = useModalFunction();
    const chainIdConnected = useChainId() as TAppChainId;
    const infoChainConnected = infoChain[chainIdConnected];
    const ChainIcon = infoChainConnected.logoChain;

    const handleConnect = async (connector: Connector) => {
        try {
            await connectAsync({ connector });
            closeModal();
        } catch (error) {
            console.error('Connection failed:', error);
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', placeItems: 'center', px: 2, justifyContent: 'center', mb: 1 }}>
                <ChainIcon sx={{ fontSize: '32px', mr: 1 }} />
                <Typography variant="body2" fontWeight={600} textAlign={'center'} sx={{ display: 'block', fontSize: '25px' }}>
                    {infoChainConnected.name}
                </Typography>
            </Box>
            {isPending ? (
                <Box mt={2} mb={4}>
                    <IconSpinLoading sx={{ fontSize: '120px' }} />
                </Box>
            ) : (
                <Box mt={2} mb={4}>
                    {connectors.map((connector, index) => {
                        const walletInfo = infoWallet[connector.id];
                        if (walletInfo) {
                            return (
                                <Box
                                    key={connector.id + index}
                                    sx={{
                                        borderRadius: '8px',
                                        px: 2.5,
                                        display: 'flex',
                                        gap: 1.5,
                                        py: 1,
                                        mb: 1,
                                        placeItems: 'center',
                                        cursor: 'pointer',
                                        '&:hover': { '& > .wallet-name': { color: 'primary.main' } },
                                        bgcolor: '#3396ff17',
                                    }}
                                    onClick={() => handleConnect(connector)}
                                >
                                    <img src={walletInfo.logoWallet} alt={`logo wallet ${walletInfo.name}`} style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                                    <Typography className="wallet-name" variant="body2" fontWeight={600} sx={{ transition: 'color 0.2s' }}>
                                        {walletInfo.name}
                                    </Typography>
                                </Box>
                            );
                        }
                        return <Box key={connector.id + index}></Box>;
                    })}
                </Box>
            )}
        </Box>
    );
}