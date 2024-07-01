import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { configEvmChain } from './wallet/config';
import { appStore } from './store/appStore';
import { Provider } from 'jotai';
import Header from './component/Header/Header';
import { Box, Container } from '@mui/material';
import Home from './pages/Home/Home';
import ModalCustom from './component/Modal/ModalCustom/ModalCustom';

export default function App({ children }: { children: ReactNode }) {

  const queryClient = new QueryClient()

  return (
    <WagmiProvider config={configEvmChain}>
      <QueryClientProvider client={queryClient}>
        <Provider store={appStore}>
          <Box>
            <Header />
          </Box>
          <Container>
            <Home />
            {children}
            <ModalCustom />
          </Container>
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
