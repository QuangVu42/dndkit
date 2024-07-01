/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { JsonRpcProvider, JsonRpcSigner } from 'ethers';
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { CHAINS } from 'src/configs/network-config';

export interface RPCProviderContextProps {
  rpc: string;
  web3Reader: JsonRpcProvider | null;
  web3Sender: JsonRpcSigner | null;
  setWeb3Reader: (chainId: number) => Promise<void>;
  setWeb3Sender: (web3: JsonRpcSigner | null) => void;
}

const RPCProviderContext = createContext<RPCProviderContextProps>({
  rpc: '',
  web3Reader: null,
  web3Sender: null,
  setWeb3Reader: async () => {},
  setWeb3Sender: () => {},
});

interface Props {
  children: ReactNode;
}

export default function RPCProviderProvider({ children }: Props) {
  const [rpc, setRpc] = useState<string>('');
  const [web3Reader, setWeb3Reader] = useState<JsonRpcProvider | null>(null);
  const [web3Sender, setWeb3Sender] = useState<JsonRpcSigner | null>(null);

  async function _setWeb3Reader(chainId: number) {
    const chain = CHAINS[chainId];
    const promises = chain.urls.map(async (rpc) => {
      const web3 = new JsonRpcProvider(rpc);
      await web3.getBlockNumber();
      return { web3, rpc };
    });
    const { web3, rpc } = await Promise.any(promises);
    setWeb3Reader(web3);
    setRpc(rpc);
  }

  const contextData = useMemo<RPCProviderContextProps>(() => {
    return { rpc, web3Reader, web3Sender, setWeb3Reader: _setWeb3Reader, setWeb3Sender };
  }, [rpc, web3Reader, web3Sender]);

  return <RPCProviderContext.Provider value={contextData}>{children}</RPCProviderContext.Provider>;
}

export function useRPCProviderContext() {
  return useContext(RPCProviderContext);
}

export function useRPCProviderSelector<T = any>(selectorFn: (data: RPCProviderContextProps) => T) {
  const data = useRPCProviderContext();
  return useMemo(() => {
    return selectorFn(data);
  }, [data, selectorFn]);
}