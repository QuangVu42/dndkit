import { Box, Container } from '@mui/material'
import DropMenu from '../DropMenu/DropMenu';
import ButtonSelectChain from '../ButtonSelectChain/ButtonSelectChain';
import ButtonConnectWallet from '../ButtonConnectWallet/ButtonConnectWallet';

export default function Header() {
    return (
        <Box
            sx={{
                position: 'sticky',
                zIndex: '1000',
                width: '100%',
                top: 0,
                left: 0,
            }}
        >
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        py: 2,
                        background: 'white',
                        borderRadius: '32px',
                        maxHeight: '63.5px',
                        border: '1px solid black',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        backgroundColor: '#000000'
                    }}
                >
                    <Box sx={{ mr: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ButtonSelectChain />
                        <ButtonConnectWallet />
                        <Box sx={{ display: { sm: 'flex', md: 'none' }, cursor: 'pointer', margin: 'auto 0' }}>
                            <DropMenu />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}